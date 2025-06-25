// === core/state/tocState.ts ===
const STORAGE_KEY = 'expandedGroups';

export const tocState = {
    expandedGroups: new Set<string>(),

    load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
        try {
            JSON.parse(raw).forEach((key: string) => this.expandedGroups.add(key));
        } catch {}
        }
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.expandedGroups]));
    },

    toggle(key: string, isOpen: boolean) {
        if (isOpen) this.expandedGroups.add(key);
        else this.expandedGroups.delete(key);
        this.save();
    },

    closeAll() {
        this.expandedGroups.clear();
        this.save();
    },
    
    openAll(keys: string[]) {
        keys.forEach(k => this.expandedGroups.add(k));
        this.save();
    }
};
