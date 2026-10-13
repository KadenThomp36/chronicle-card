import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleAction, ChronicleEvent } from '../../models/event';
import { buttonActionConfig, fireHassAction } from '../../utils/actions';
import { expandActionConfig } from '../../utils/action-placeholders';

@customElement('chronicle-action-button')
export class ActionButton extends LitElement {
  @property({ attribute: false }) action!: ChronicleAction;
  /** The event this button belongs to — source of `{field}` placeholders. */
  @property({ attribute: false }) event!: ChronicleEvent;

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
      <button @click=${this._handleClick} @pointerdown=${(e: Event) => e.stopPropagation()}>
        ${this.action.icon ? html`<ha-icon .icon=${this.action.icon}></ha-icon>` : ''}
        ${this.action.label}
      </button>
    `;
  }

  private _handleClick(e: Event) {
    e.stopPropagation();
    if (!this.action || !this.event) return;

    // Legacy custom DOM event — not an HA action type
    if (!this.action.action && this.action.type === 'fire-event') {
      if (this.action.eventType) {
        this.dispatchEvent(new CustomEvent(this.action.eventType, {
          bubbles: true,
          composed: true,
          detail: expandActionConfig(this.action.eventData ?? {}, this.event),
        }));
      }
      return;
    }

    const config = buttonActionConfig(this.action);
    if (config) fireHassAction(this, this.event, config);
  }
}
