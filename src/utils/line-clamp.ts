/**
 * Inline style for a text line limit (`appearance.title_lines` /
 * `description_lines`). 1 or unset = the stylesheet's single line with
 * ellipsis (no override); 0 = wrap freely; N = wrap, truncated after N lines.
 * `preserveNewlines` keeps line breaks from the text itself (descriptions).
 */
export function lineClampStyle(lines: number | undefined, preserveNewlines = false): string {
  const n = Math.floor(Number(lines));
  if (lines == null || !Number.isFinite(n) || n === 1 || n < 0) return '';
  const wrap = `white-space: ${preserveNewlines ? 'pre-line' : 'normal'}; overflow-wrap: anywhere;`;
  if (n === 0) return `${wrap} text-overflow: clip;`;
  return `${wrap} display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${n}; line-clamp: ${n};`;
}
