import { LitElement, html, css, nothing, render, adoptStyles } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleEvent, SeverityLevel } from '../../models/event';
import { getSeverityColor, safeColor, validIcon } from '../../utils/color-utils';
import { formatDateTime } from '../../utils/date-utils';
import { localize } from '../../localize';

const VIDEO_RE = /\.(mp4|webm|mov|m3u8|mkv|ogv)([?#]|$)/i;

const dialogStyles = css`
  :host {
    font-family: var(--ha-font-family-body, Roboto, Noto, sans-serif);
    -webkit-font-smoothing: antialiased;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .open .overlay { opacity: 1; pointer-events: auto; }

  .dialog {
    position: fixed;
    z-index: 100000;
    background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
    color: var(--primary-text-color, #333);
    overflow-y: auto;
    overscroll-behavior: contain;
    outline: none;

    /* Mobile: bottom sheet */
    bottom: 0; left: 0; right: 0;
    max-height: 88vh;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .open .dialog { transform: translateY(0); }

  @media (min-width: 600px) {
    .dialog {
      bottom: auto; left: 50%; right: auto;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.96);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
      border-radius: var(--ha-dialog-border-radius, 18px);
      max-width: 460px;
      width: 92vw;
      max-height: 82vh;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);
    }
    .open .dialog { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay, .dialog { transition: none; }
  }

  .handle {
    width: 32px; height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127,127,127,0.25));
    margin: 10px auto 0;
  }
  @media (min-width: 600px) { .handle { display: none; } }

  .media-wrap { position: relative; overflow: hidden; }
  .media {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    display: block;
    background: var(--secondary-background-color, #f0f0f0);
  }
  video.media { object-fit: contain; background: #000; }
  .media-gradient {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 48px;
    background: linear-gradient(transparent, var(--ha-dialog-surface-background, var(--card-background-color, #fff)));
    pointer-events: none;
  }
  .clip-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 8px 20px 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--primary-color, #03a9f4);
    text-decoration: none;
  }
  .clip-link ha-icon { --mdc-icon-size: 14px; }

  .body { padding: 16px 20px 24px; }
  .body-with-media { padding-top: 8px; }

  .header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  .header-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  }
  .header-icon ha-icon {
    --mdc-icon-size: 20px;
    color: #fff;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
  }
  .header-text { flex: 1; min-width: 0; padding-right: 28px; }
  .header-title {
    font-size: 17px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.2px;
  }
  .header-time {
    font-size: 12px;
    color: var(--secondary-text-color, #888);
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }

  .close-btn {
    position: absolute;
    top: 12px; right: 12px;
    width: 32px; height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(127,127,127,0.12);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--primary-text-color, #333);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: background 0.15s ease;
  }
  .close-btn:hover { background: rgba(127,127,127,0.22); }
  .close-btn ha-icon { --mdc-icon-size: 18px; }
  .close-btn:focus-visible, .more-info-btn:focus-visible, .clip-link:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }
  .tag {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    background: var(--divider-color, rgba(127,127,127,0.08));
    color: var(--secondary-text-color, #777);
    letter-spacing: 0.1px;
  }
  .severity-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    color: #fff;
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  .description {
    font-size: 13.5px;
    line-height: 1.65;
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-break: break-word;
    opacity: 0.9;
  }
  .details {
    font-size: 12.5px;
    color: var(--secondary-text-color, #888);
    margin: -8px 0 16px;
  }

  .meta-table {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 7px 14px;
    font-size: 12px;
    margin-bottom: 16px;
    padding: 14px 16px;
    background: var(--secondary-background-color, rgba(127,127,127,0.04));
    border-radius: 12px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
  }
  .meta-label {
    color: var(--secondary-text-color, #888);
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .meta-value { font-size: 12.5px; word-break: break-word; }

  .more-info-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
    background: var(--secondary-background-color, rgba(127,127,127,0.06));
    color: var(--primary-color, #03a9f4);
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .more-info-btn:hover { border-color: var(--primary-color, #03a9f4); }
  .more-info-btn ha-icon { --mdc-icon-size: 16px; }
`;

/**
 * Event detail dialog. Renders into a container on document.body so it
 * overlays the whole UI rather than being clipped by the card. HA's own dialog
 * elements are internal and have changed implementation repeatedly, so this
 * stays self-contained; theme variables still apply (they're set on <html>).
 */
@customElement('chronicle-detail-dialog')
export class DetailDialog extends LitElement {
  @property({ attribute: false }) severityColors?: Partial<Record<SeverityLevel, string>>;

  private _event: ChronicleEvent | null = null;
  private _open = false;
  private _clipFailed = false;
  private _container: HTMLDivElement | null = null;
  private _returnFocus: Element | null = null;
  private _closeTimer?: ReturnType<typeof setTimeout>;

  static styles = css`:host { display: none; }`;

  protected render() {
    return nothing;
  }

  show(event: ChronicleEvent): void {
    clearTimeout(this._closeTimer);
    this._event = event;
    this._clipFailed = false;
    this._returnFocus = document.activeElement;
    this._ensureContainer();
    this._renderDialog();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._open = true;
        this._renderDialog();
        this._container?.shadowRoot?.querySelector<HTMLElement>('.close-btn')?.focus();
      });
    });
  }

  close(): void {
    if (!this._open) return;
    this._open = false;
    this._renderDialog();
    (this._returnFocus as HTMLElement | null)?.focus?.();
    this._closeTimer = setTimeout(() => {
      this._event = null;
      this._removeContainer();
    }, 350);
  }

  private _ensureContainer(): void {
    if (this._container) return;
    this._container = document.createElement('div');
    this._container.className = 'chronicle-detail-overlay';
    document.body.appendChild(this._container);
    const shadow = this._container.attachShadow({ mode: 'open' });
    adoptStyles(shadow, [dialogStyles]);
  }

  private _removeContainer(): void {
    this._container?.remove();
    this._container = null;
  }

  private _renderDialog(): void {
    const shadow = this._container?.shadowRoot;
    if (!shadow) return;
    render(this._template(), shadow);
  }

  private _template() {
    const e = this._event;
    if (!e) return nothing;

    const clipUrl = (e.metadata?.clip_url as string | undefined) || '';
    const playClip = !!clipUrl && !this._clipFailed;
    const mediaSrc = playClip ? clipUrl : e.mediaUrl || '';
    const mediaIsVideo = playClip || VIDEO_RE.test(mediaSrc);
    const location = e.metadata?.location as string | undefined;
    const severityColor = safeColor(getSeverityColor(e.severity, this.severityColors));
    const showMoreInfo = !!e.entityId && ['history', 'logbook', 'calendar'].includes(e.sourceType);

    return html`
      <div class=${this._open ? 'open' : ''}>
        <div class="overlay" @click=${() => this.close()}></div>
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="chronicle-dialog-title" tabindex="-1">
          <div class="handle"></div>
          <button class="close-btn" aria-label=${localize('chronicle.detail.close')} @click=${() => this.close()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>

          ${mediaSrc ? html`
            <div class="media-wrap">
              ${mediaIsVideo
                ? html`<video class="media" src=${mediaSrc} controls autoplay muted loop playsinline
                    poster=${playClip && e.mediaUrl ? e.mediaUrl : nothing}
                    @error=${() => this._onClipError(playClip)}></video>`
                : html`<img class="media" src=${mediaSrc} alt="" /><div class="media-gradient"></div>`}
            </div>
          ` : nothing}
          ${clipUrl ? html`
            <a class="clip-link" href=${clipUrl} target="_blank" rel="noopener">
              <ha-icon icon="mdi:open-in-new"></ha-icon>${localize('chronicle.detail.open_clip')}
            </a>
          ` : nothing}

          <div class="body ${mediaSrc ? 'body-with-media' : ''}">
            <div class="header">
              <div class="header-icon" style="background-color: ${safeColor(e.color)}">
                <ha-icon .icon=${validIcon(e.icon)}></ha-icon>
              </div>
              <div class="header-text">
                <div class="header-title" id="chronicle-dialog-title">${e.title}</div>
                <div class="header-time">${formatDateTime(e.start)}</div>
              </div>
            </div>

            <div class="tags">
              <span class="severity-tag" style="background-color: ${severityColor}">
                ${localize(`chronicle.severity.${e.severity}`)}
              </span>
              ${e.category ? html`<span class="tag">${e.category}</span>` : nothing}
              ${e.label ? html`<span class="tag">${e.label}</span>` : nothing}
              ${e.sourceType ? html`<span class="tag">${e.sourceType}</span>` : nothing}
            </div>

            ${e.description ? html`<div class="description">${e.description}</div>` : nothing}
            ${e.details ? html`<div class="details">${e.details}</div>` : nothing}

            ${showMoreInfo ? html`
              <button class="more-info-btn" @click=${() => this._moreInfo(e.entityId!)}>
                <ha-icon icon="mdi:information-outline"></ha-icon>
                ${localize('chronicle.detail.more_info')}
              </button>
            ` : nothing}

            <div class="meta-table">
              ${e.entityName ? this._row('chronicle.detail.entity', e.entityName) : nothing}
              ${e.entityId ? this._row('chronicle.detail.entity_id', e.entityId) : nothing}
              ${this._row('chronicle.detail.source', e.sourceId)}
              ${location ? this._row('chronicle.detail.location', location) : nothing}
              ${this._row('chronicle.detail.start', formatDateTime(e.start))}
              ${e.end && e.end !== e.start ? this._row('chronicle.detail.end', formatDateTime(e.end)) : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _row(labelKey: string, value: string) {
    return html`
      <span class="meta-label">${localize(labelKey)}</span>
      <span class="meta-value">${value}</span>
    `;
  }

  /** Clip couldn't play (codec, auth, iOS range requests) — fall back to the still. */
  private _onClipError(wasClip: boolean): void {
    if (!wasClip || this._clipFailed) return;
    this._clipFailed = true;
    this._renderDialog();
  }

  private _moreInfo(entityId: string): void {
    this.close();
    // Let the close animation start before HA's more-info dialog opens.
    // Dispatched from this element — inside the card's DOM tree — so HA hears it.
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }));
    }, 100);
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._open) {
      e.stopPropagation();
      this.close();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeydown);
    clearTimeout(this._closeTimer);
    this._open = false;
    this._removeContainer();
  }
}
