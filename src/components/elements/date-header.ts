import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('chronicle-date-header')
export class DateHeader extends LitElement {
  @property() label = '';
  @property() eventCount = 0;

  static styles = css`
    :host {
      display: block;
    }
    .date-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 0 6px 42px;
      user-select: none;
    }
    .label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--secondary-text-color, #888);
      white-space: nowrap;
      opacity: 0.85;
    }
    .line {
      flex: 1;
      height: 1px;
      background: linear-gradient(
        to right,
        var(--divider-color, rgba(127,127,127,0.18)),
        transparent
      );
    }
    .count {
      font-size: 9.5px;
      font-weight: 600;
      color: var(--secondary-text-color, #999);
      background: var(--divider-color, rgba(127,127,127,0.1));
      border-radius: 10px;
      padding: 2px 8px;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }
  `;

  protected render() {
    return html`
      <div class="date-header">
        <span class="label">${this.label}</span>
        <span class="line"></span>
        ${this.eventCount > 0
          ? html`<span class="count">${this.eventCount}</span>`
          : ''}
      </div>
    `;
  }
}
