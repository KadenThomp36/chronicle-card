import { HomeAssistant } from '../types';
import { MEDIA_CACHE_TTL } from '../constants';

interface CacheEntry {
  url: string;
  timestamp: number;
}

/** In-memory cache keyed by media_content_id. */
const cache = new Map<string, CacheEntry>();

/**
 * Remove all expired entries from the cache.
 */
function pruneCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.timestamp > MEDIA_CACHE_TTL) {
      cache.delete(key);
    }
  }
}

/**
 * Resolve a Home Assistant media_content_id to a playable/displayable URL.
 *
 * Uses the `media_source/resolve_media` WebSocket command and caches
 * successful results for 3 hours (MEDIA_CACHE_TTL).
 *
 * Returns `undefined` on any failure (network error, unknown media, etc.)
 * instead of throwing an exception, so callers can safely fall back.
 */
export async function resolveMediaUrl(
  hass: HomeAssistant,
  mediaContentId: string,
): Promise<string | undefined> {
  if (!mediaContentId) {
    return undefined;
  }

  // Check the cache first
  const cached = cache.get(mediaContentId);
  if (cached && Date.now() - cached.timestamp < MEDIA_CACHE_TTL) {
    return cached.url;
  }

  // Evict stale entries periodically
  pruneCache();

  try {
    const result = await hass.callWS<{ url: string }>({
      type: 'media_source/resolve_media',
      media_content_id: mediaContentId,
    });

    if (result && result.url) {
      cache.set(mediaContentId, { url: result.url, timestamp: Date.now() });
      return result.url;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Manually clear the entire media cache. Useful when the card is torn down
 * or when the user requests a refresh.
 */
export function clearMediaCache(): void {
  cache.clear();
}
