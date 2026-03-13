import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChronicleEvent } from '../../models/event';
import { CATEGORY_ICONS } from '../../constants';

function validIcon(icon: string): string {
  return icon && icon.startsWith('mdi:') ? icon : CATEGORY_ICONS.default;
}

/**
 * Detail dialog that renders into document.body so it overlays the entire UI,
 * not just the card's shadow DOM.
 */
@customElement('chronicle-detail-dialog')
export class DetailDialog extends LitElement {
  @property({ attribute: false }) hass?: any;
  @state() private _event: ChronicleEvent | null = null;
  @state() private _open = false;

  private _container: HTMLDivElement | null = null;

  static styles = css`
    :host { display: none; }
  `;

  protected render() {
    return nothing;
  }

  show(event: ChronicleEvent): void {
    this._event = event;
    this._ensureContainer();
    this._renderDialog();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._open = true;
        this._renderDialog();
      });
    });
  }

  close(): void {
    this._open = false;
    this._renderDialog();
    setTimeout(() => {
      this._event = null;
      this._removeContainer();
    }, 350);
  }

  private _ensureContainer(): void {
    if (this._container) return;
    this._container = document.createElement('div');
    this._container.id = 'chronicle-detail-overlay';
    document.body.appendChild(this._container);

    // Attach shadow for style isolation
    const shadow = this._container.attachShadow({ mode: 'open' });
    shadow.innerHTML = '';
  }

  private _removeContainer(): void {
    if (this._container) {
      this._container.remove();
      this._container = null;
    }
  }

  private _renderDialog(): void {
    if (!this._container) return;
    const shadow = this._container.shadowRoot;
    if (!shadow) return;

    const e = this._event;
    const open = this._open;

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 99999;
          opacity: ${open ? '1' : '0'};
          transition: opacity 0.3s ease;
          pointer-events: ${open ? 'auto' : 'none'};
        }

        .dialog {
          position: fixed;
          z-index: 100000;
          background: var(--card-background-color, #fff);
          overflow-y: auto;
          overscroll-behavior: contain;

          /* Mobile: bottom sheet */
          bottom: 0; left: 0; right: 0;
          max-height: 88vh;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);
          transform: translateY(${open ? '0' : '100%'});
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 600px) {
          .dialog {
            bottom: auto; left: 50%; right: auto;
            top: 50%;
            transform: translate(-50%, -50%) scale(${open ? '1' : '0.96'});
            opacity: ${open ? '1' : '0'};
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
            border-radius: 18px;
            max-width: 460px;
            width: 92vw;
            max-height: 82vh;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);
          }
        }

        .handle {
          width: 32px; height: 4px;
          border-radius: 2px;
          background: var(--divider-color, rgba(127,127,127,0.25));
          margin: 10px auto 0;
        }
        @media (min-width: 600px) { .handle { display: none; } }

        .media-wrap {
          position: relative;
          overflow: hidden;
        }
        .media {
          width: 100%;
          max-height: 240px;
          object-fit: cover;
          display: block;
          background: var(--secondary-background-color, #f0f0f0);
        }
        .media-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 48px;
          background: linear-gradient(transparent, var(--card-background-color, #fff));
          pointer-events: none;
        }

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
        .header-text { flex: 1; min-width: 0; }
        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--primary-text-color, #333);
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
          padding: 0;
          transition: background 0.15s ease;
          line-height: 0;
        }
        .close-btn:hover {
          background: rgba(127,127,127,0.22);
        }
        .close-btn svg {
          display: block;
          width: 14px;
          height: 14px;
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
          justify-content: center;
          line-height: 1;
        }

        .description {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--primary-text-color, #444);
          margin-bottom: 16px;
          white-space: pre-wrap;
          word-break: break-word;
          opacity: 0.9;
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
        .meta-value {
          color: var(--primary-text-color, #333);
          font-size: 12.5px;
        }
      </style>

      <div class="overlay"></div>
      <div class="dialog">
        ${e ? `
          <div class="handle"></div>
          <button class="close-btn"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg></button>

          ${e.mediaUrl ? `
            <div class="media-wrap">
              <img class="media" src="${this._escHtml(e.mediaUrl)}" alt="" />
              <div class="media-gradient"></div>
            </div>
          ` : ''}

          <div class="body ${e.mediaUrl ? 'body-with-media' : ''}">
            <div class="header">
              <div class="header-icon" style="background-color: ${e.color}">
                <ha-icon icon="${validIcon(e.icon)}"></ha-icon>
              </div>
              <div class="header-text">
                <div class="header-title">${this._escHtml(e.title)}</div>
                <div class="header-time">${this._formatDateTime(e.start)}</div>
              </div>
            </div>

            <div class="tags">
              <span class="severity-tag" style="background-color: ${this._severityColor(e.severity)}">${e.severity}</span>
              ${e.category ? `<span class="tag">${this._escHtml(e.category)}</span>` : ''}
              ${e.label ? `<span class="tag">${this._escHtml(e.label)}</span>` : ''}
              ${e.sourceType ? `<span class="tag">${this._escHtml(e.sourceType)}</span>` : ''}
            </div>

            ${e.description ? `<div class="description">${this._escHtml(e.description)}</div>` : ''}

            <div class="meta-table">
              ${e.entityName ? `
                <span class="meta-label">Entity</span>
                <span class="meta-value">${this._escHtml(e.entityName)}</span>
              ` : ''}
              ${e.entityId ? `
                <span class="meta-label">Entity ID</span>
                <span class="meta-value">${this._escHtml(e.entityId)}</span>
              ` : ''}
              <span class="meta-label">Source</span>
              <span class="meta-value">${this._escHtml(e.sourceId)}</span>
              <span class="meta-label">Start</span>
              <span class="meta-value">${this._formatDateTime(e.start)}</span>
              ${e.end && e.end !== e.start ? `
                <span class="meta-label">End</span>
                <span class="meta-value">${this._formatDateTime(e.end)}</span>
              ` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Attach event listeners
    const overlay = shadow.querySelector('.overlay');
    const closeBtn = shadow.querySelector('.close-btn');
    overlay?.addEventListener('click', () => this.close());
    closeBtn?.addEventListener('click', () => this.close());
  }

  private _escHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private _severityColor(severity: string): string {
    const map: Record<string, string> = {
      critical: '#D32F2F',
      warning: '#FF9800',
      info: '#2196F3',
      debug: '#9E9E9E',
    };
    return map[severity] || map.info;
  }

  private _formatDateTime(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._boundKeydown = this._handleKeydown.bind(this);
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._boundKeydown) {
      document.removeEventListener('keydown', this._boundKeydown);
    }
    this._removeContainer();
  }

  private _boundKeydown?: (e: KeyboardEvent) => void;

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this._open) {
      this.close();
    }
  }
}
