// === core/state/tocState.ts ===
const STORAGE_KEY = 'expandedGroups';

export const tocState = {
  expandedGroups: new Set<string>(),

  load: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        JSON.parse(raw).forEach((key: string) => tocState.expandedGroups.add(key));
      } catch {}
    }
  },

  save: () => {
    const arr = Array.from(tocState.expandedGroups);
    console.log('[TOC] Lưu expandedGroups vào storage:', arr);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  },

  openAll: (keys: string[]) => {
    keys.forEach(k => tocState.expandedGroups.add(k));
    tocState.save();
  },

  closeAll: () => {
    tocState.expandedGroups.clear();
    tocState.save();
  },

  toggle: (key: string, isOpen: boolean) => {
    if (isOpen) tocState.expandedGroups.add(key);
    else tocState.expandedGroups.delete(key);
    tocState.save();
  }
};
