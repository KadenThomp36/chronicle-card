import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleAction } from '../../models/event';
import { HomeAssistant } from '../../types';

@customElement('chronicle-action-button')
export class ActionButton extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) action!: ChronicleAction;

  static styles = css`
    :host {
      display: inline-flex;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.15));
      border-radius: 20px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color, #333);
      font-size: 10.5px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
      font-family: inherit;
      line-height: 1.4;
      letter-spacing: 0.1px;
    }
    button:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 1px 4px rgba(3,169,244,0.25);
    }
    button:active {
      transform: scale(0.97);
    }
    ha-icon {
      --mdc-icon-size: 13px;
    }
  `;

  protected render() {
    return html`
      <button @click=${this._handleClick}>
        ${this.action.icon ? html`<ha-icon .icon=${this.action.icon}></ha-icon>` : ''}
        ${this.action.label}
      </button>
    `;
  }

  private async _handleClick(e: Event) {
    e.stopPropagation();
    if (!this.action) return;

    switch (this.action.type) {
      case 'service': {
        if (!this.hass || !this.action.service) return;
        const [domain, service] = this.action.service.split('.');
        if (domain && service) {
          await this.hass.callService(
            domain,
            service,
            this.action.serviceData ?? {},
            this.action.target,
          );
        }
        break;
      }
      case 'navigate': {
        if (this.action.url) {
          if (this.action.url.startsWith('http')) {
            window.open(this.action.url, '_blank');
          } else {
            history.pushState(null, '', this.action.url);
            window.dispatchEvent(new Event('location-changed'));
          }
        }
        break;
      }
      case 'fire-event': {
        if (this.action.eventType) {
          const event = new CustomEvent(this.action.eventType, {
            bubbles: true,
            composed: true,
            detail: this.action.eventData ?? {},
          });
          this.dispatchEvent(event);
        }
        break;
      }
    }
  }
}
