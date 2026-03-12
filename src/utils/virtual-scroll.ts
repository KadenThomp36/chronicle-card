import { VIRTUAL_SCROLL_BUFFER } from '../constants';

/**
 * Lightweight virtual scroll manager.
 *
 * Computes which items are visible (plus a configurable buffer) based on
 * the current scroll position, container height, and item height. This
 * allows the rendering layer to only create DOM nodes for the visible
 * window, keeping large event lists performant.
 */
export class VirtualScrollManager {
  private _containerHeight: number;
  private _itemHeight: number;
  private _totalItems: number;
  private _scrollTop: number;
  private _buffer: number;

  constructor(containerHeight: number, itemHeight: number, totalItems: number) {
    this._containerHeight = Math.max(0, containerHeight);
    this._itemHeight = Math.max(1, itemHeight); // avoid division by zero
    this._totalItems = Math.max(0, totalItems);
    this._scrollTop = 0;
    this._buffer = VIRTUAL_SCROLL_BUFFER;
  }

  /**
   * Calculate the range of item indices that should be rendered.
   * Includes a buffer of items above and below the visible viewport.
   */
  getVisibleRange(): { start: number; end: number } {
    if (this._totalItems === 0) {
      return { start: 0, end: 0 };
    }

    const firstVisible = Math.floor(this._scrollTop / this._itemHeight);
    const visibleCount = Math.ceil(this._containerHeight / this._itemHeight);

    const start = Math.max(0, firstVisible - this._buffer);
    const end = Math.min(this._totalItems, firstVisible + visibleCount + this._buffer);

    return { start, end };
  }

  /**
   * Update the current scroll offset (pixels from the top).
   */
  setScrollTop(top: number): void {
    this._scrollTop = Math.max(0, top);
  }

  /**
   * Update the total number of items in the list.
   */
  setTotalItems(count: number): void {
    this._totalItems = Math.max(0, count);
  }

  /**
   * Update the container height (visible viewport).
   */
  setContainerHeight(height: number): void {
    this._containerHeight = Math.max(0, height);
  }

  /**
   * Update the per-item height.
   */
  setItemHeight(height: number): void {
    this._itemHeight = Math.max(1, height);
  }

  /**
   * Get the total scrollable height of the list content.
   */
  getTotalHeight(): number {
    return this._totalItems * this._itemHeight;
  }

  /**
   * Get the pixel offset for a specific item by index.
   */
  getItemOffset(index: number): number {
    return index * this._itemHeight;
  }

  /**
   * Get the current scroll position.
   */
  getScrollTop(): number {
    return this._scrollTop;
  }

  /**
   * Get the current number of items.
   */
  getTotalItems(): number {
    return this._totalItems;
  }
}
