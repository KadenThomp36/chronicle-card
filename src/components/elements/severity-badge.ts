import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SeverityLevel } from '../../models/event';
import { SEVERITY_COLORS } from '../../constants';

@customElement('chronicle-severity-badge')
export class SeverityBadge extends LitElement {
  @property() severity: SeverityLevel = 'info';
  @property() customColors?: Partial<Record<SeverityLevel, string>>;

  static styles = css`
    :host {
      display: inline-flex;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 16px;
      padding: 0 7px;
      border-radius: 20px;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: #fff;
      line-height: 1;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `;

  protected render() {
    const color = this.customColors?.[this.severity] ?? SEVERITY_COLORS[this.severity] ?? SEVERITY_COLORS.info;
    return html`
      <span class="badge" style="background-color: ${color}">
        ${this.severity}
      </span>
    `;
  }
}
