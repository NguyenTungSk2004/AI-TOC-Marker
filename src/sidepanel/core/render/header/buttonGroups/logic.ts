import { tocState } from "../../../state/tocState";

export const toggleEvent = {
  openAll() {
    const keys: string[] = [];
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'block';
      const groupEl = el.closest('[data-group-key]');
      if (groupEl) keys.push(groupEl.getAttribute('data-group-key')!);
    });
    tocState.openAll(keys);
  },

  closeAll() {
    document.querySelectorAll('[data-toc-heading-list]').forEach(el =>
      (el as HTMLElement).style.display = 'none'
    );
    tocState.closeAll();
  }
};

export function allGroupsAreOpen(): boolean {
  const lists = document.querySelectorAll('[data-toc-heading-list]');
  return Array.from(lists).every(
    el => (el as HTMLElement).style.display !== 'none'
  );
}