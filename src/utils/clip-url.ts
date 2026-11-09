import { HomeAssistant } from '../types';

/**
 * Turning an event's clip URL into something a `<video>` element can play.
 *
 * Why this exists (issue #21, clips blank on iOS):
 * - Frigate's `clip.mp4` is a fragmented MP4 that ffmpeg pipes out as a
 *   streaming response, with no Content-Length and no byte-range (206)
 *   support. Chrome/Android play it as a stream. iOS WebKit (Safari, every
 *   iOS browser, the HA iOS app's WKWebView) needs range requests for MP4
 *   and fails. Frigate's own API docs say to use the `master.m3u8` HLS
 *   playlist on iOS, and Safari plays HLS natively. The HA Frigate
 *   integration's notification proxy serves that playlist and its segments
 *   at the same path (Frigate itself at `/vod/event/<id>/`), so it's
 *   derived here.
 * - `<video>` can't send HA's bearer token. Authenticated paths (`/api/…`,
 *   `/media/…`) get a short-lived signature from `auth/sign_path`, which is
 *   what HA's own frontend does. A signed request also counts as
 *   authenticated for Frigate's notification proxy when notification expiry
 *   is enabled.
 * - `media-source://` ids are resolved to a signed URL through
 *   `media_source/resolve_media`.
 */

const HLS_MIME = 'application/vnd.apple.mpegurl';
/** Long enough to watch and seek a clip. Signed again each time the dialog opens. */
const SIGN_EXPIRES = 900;

/** HA Frigate integration proxy: `/api/frigate[/<instance>]/notifications/<event id>[/<camera>]/clip.mp4` */
const FRIGATE_NOTIFICATION_CLIP_RE = /^(\/api\/frigate\/(?:[^/]+\/)?notifications\/[^/]+\/(?:[^/]+\/)?)clip\.mp4$/;
/** Frigate itself (optionally under a path prefix): `/api/events/<event id>/clip.mp4` */
const FRIGATE_EVENT_CLIP_RE = /^(.*)\/api\/events\/([^/]+)\/clip\.mp4$/;

let hlsSupport: boolean | undefined;

/** Native HLS in `<video>` (Safari / iOS WebKit; some Android builds). */
export function canPlayNativeHls(): boolean {
  if (hlsSupport === undefined) {
    try {
      hlsSupport = !!document.createElement('video').canPlayType(HLS_MIME);
    } catch {
      hlsSupport = false;
    }
  }
  return hlsSupport;
}

/**
 * Apple WebKit: Safari, every iOS/iPadOS browser and the HA Apple apps. These
 * need byte-range MP4 and play HLS natively, so HLS goes first for them.
 */
export function prefersHls(): boolean {
  return typeof navigator !== 'undefined' && /apple/i.test(navigator.vendor || '') && canPlayNativeHls();
}

export function isHlsUrl(url: string): boolean {
  return /\.m3u8([?#]|$)/i.test(url);
}

function parseSameOrigin(url: string): URL | undefined {
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.origin === window.location.origin ? parsed : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Frigate's HLS playlist for the same event, if `url` is a Frigate event clip:
 * the HA integration's notification proxy or Frigate's own API.
 */
export function frigateHlsAlternative(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url, window.location.href);
  } catch {
    return undefined;
  }
  if (!/^https?:$/.test(parsed.protocol)) return undefined;
  let m = FRIGATE_NOTIFICATION_CLIP_RE.exec(parsed.pathname);
  let hlsPath: string | undefined;
  if (m) {
    hlsPath = `${m[1]}master.m3u8`;
  } else if ((m = FRIGATE_EVENT_CLIP_RE.exec(parsed.pathname))) {
    hlsPath = `${m[1]}/vod/event/${m[2]}/master.m3u8`;
  }
  if (!hlsPath) return undefined;
  // Relative stays relative, absolute stays absolute
  const isAbsolute = /^[a-z][a-z\d+.-]*:|^\/\//i.test(url);
  return `${isAbsolute ? parsed.origin : ''}${hlsPath}${parsed.search}`;
}

/**
 * URLs to try, in order. The configured clip comes first, unless the browser
 * is Apple WebKit and a Frigate HLS alternative exists. HLS URLs are dropped
 * on browsers that can't play HLS natively.
 */
export function clipCandidates(clipUrl: string): string[] {
  if (!clipUrl) return [];
  const hls = frigateHlsAlternative(clipUrl);
  const ordered = hls ? (prefersHls() ? [hls, clipUrl] : [clipUrl, hls]) : [clipUrl];
  const playable = ordered.filter((u) => !isHlsUrl(u) || canPlayNativeHls());
  // Nothing left (an .m3u8 on a browser without native HLS): still try it once,
  // so the dialog shows the fallback rather than nothing.
  return playable.length ? playable : [clipUrl];
}

/** True if a same-origin URL points at an HA path that needs auth for `<video>`/`<a>`. */
function needsSigning(parsed: URL): boolean {
  return /^\/(api|media)\//.test(parsed.pathname) && !parsed.searchParams.has('authSig');
}

/**
 * Make a clip URL loadable without HA's bearer token. `media-source://` ids
 * are resolved and authenticated same-origin paths are signed. Anything else,
 * or any failure, returns the URL unchanged.
 */
export async function authorizeClipUrl(hass: HomeAssistant | undefined, url: string): Promise<string> {
  if (!hass || !url) return url;
  try {
    if (url.startsWith('media-source://')) {
      const res = await hass.callWS<{ url: string }>({
        type: 'media_source/resolve_media',
        media_content_id: url,
        expires: SIGN_EXPIRES,
      });
      return res?.url || url;
    }
    const parsed = parseSameOrigin(url);
    if (!parsed || !needsSigning(parsed)) return url;
    const res = await hass.callWS<{ path: string }>({
      type: 'auth/sign_path',
      path: `${parsed.pathname}${parsed.search}`,
      expires: SIGN_EXPIRES,
    });
    return res?.path || url;
  } catch {
    return url;
  }
}
