import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('chronicle-empty-state')
export class EmptyState extends LitElement {
  @property() message = 'No events found';

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 36px 16px;
      text-align: center;
    }
    .icon-ring {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px dashed var(--divider-color, rgba(127,127,127,0.18));
      display: flex;
      align-items: center;
      justify-content: center;
      animation: chronicle-pulse 3s ease-in-out infinite;
    }
    @keyframes chronicle-pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.04); }
    }
    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--secondary-text-color, #999);
      opacity: 0.5;
    }
    .text {
      font-size: 12.5px;
      color: var(--secondary-text-color, #999);
      font-weight: 400;
      letter-spacing: 0.1px;
      opacity: 0.7;
    }
  `;

  protected render() {
    return html`
      <div class="empty">
        <div class="icon-ring">
          <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>
        </div>
        <span class="text">${this.message}</span>
      </div>
    `;
  }
}
