export const searchState = {
  results: [] as HTMLElement[],
  currentIndex: -1,

  reset() {
    this.results = [];
    this.currentIndex = -1;
  },

  setResults(newResults: HTMLElement[]) {
    this.results = newResults;
    this.currentIndex = newResults.length ? 0 : -1;
  },

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  },

  next() {
    if (this.currentIndex < this.results.length - 1) this.currentIndex++;
  },
};
