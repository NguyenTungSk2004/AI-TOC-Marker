export const searchState = {
  results: [] as HTMLElement[],
  currentIndex: 0,
  keyword: '',

  setResults(results: HTMLElement[]) {
    this.results = results
    this.currentIndex = 0
  },

  next() {
    if (this.currentIndex < this.results.length - 1) this.currentIndex++
  },

  prev() {
    if (this.currentIndex > 0) this.currentIndex--
  },

  reset() {
    this.results = []
    this.currentIndex = 0
    this.keyword = ''
  },
}
