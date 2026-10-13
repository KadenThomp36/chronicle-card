/**
 * HA lazy-loads its form components; a custom editor can open before any
 * built-in editor has pulled them in. Asking a built-in card for its editor
 * loads ha-form, the selectors and the action editor. Best-effort: these are
 * HA internals, so failures are ignored and the editor renders once they land.
 */
interface CardHelpers {
  createCardElement(config: Record<string, unknown>): HTMLElement;
}

let loading: Promise<void> | undefined;

export function loadHaComponents(): Promise<void> {
  if (customElements.get('ha-form') && customElements.get('hui-action-editor')) {
    return Promise.resolve();
  }
  loading ??= (async () => {
    try {
      const helpers = await (window as unknown as { loadCardHelpers?: () => Promise<CardHelpers> })
        .loadCardHelpers?.();
      for (const type of ['tile', 'button']) {
        helpers?.createCardElement({ type, entity: 'sun.sun' });
        const tag = `hui-${type}-card`;
        await Promise.race([customElements.whenDefined(tag), new Promise((r) => setTimeout(r, 2000))]);
        const ctor = customElements.get(tag) as unknown as { getConfigElement?: () => Promise<unknown> } | undefined;
        await ctor?.getConfigElement?.();
      }
    } catch {
      /* best-effort */
    }
    await Promise.all(['ha-form', 'ha-expansion-panel'].map((tag) =>
      Promise.race([customElements.whenDefined(tag), new Promise((r) => setTimeout(r, 5000))]),
    ));
  })();
  return loading;
}
