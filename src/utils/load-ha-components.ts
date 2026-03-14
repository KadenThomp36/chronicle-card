// Hack to load ha-components needed for editor
// Based on the pattern used by Mushroom card
export const loadHaComponents = () => {
  if (!customElements.get('ha-form')) {
    (customElements.get('hui-tile-card') as any)?.getConfigElement();
  }
  if (!customElements.get('ha-entity-picker')) {
    (customElements.get('hui-entities-card') as any)?.getConfigElement();
  }
  if (!customElements.get('hui-action-editor')) {
    (customElements.get('hui-button-card') as any)?.getConfigElement();
  }
};
