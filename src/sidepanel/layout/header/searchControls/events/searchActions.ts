import { searchState } from '@sidepanel/state/searchState'
import { normalizeText } from '@utils/normalizeText.util'

export function updateButtons(
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  counter: HTMLSpanElement,
  navBar: HTMLElement,
) {
  const { currentIndex, results } = searchState
  const el = results[currentIndex]
  const main = document.getElementById('main')

  prevBtn.disabled = currentIndex <= 0
  nextBtn.disabled = currentIndex >= results.length - 1
  counter.textContent =
    results.length > 0 ? `🔎 ${currentIndex + 1} / ${results.length} kết quả` : ''
  navBar.style.display = results.length > 0 ? 'flex' : 'none'

  if (!main) return
  // Apply padding to main based on navBar height when search results are present
  main.style.paddingTop = results.length > 0 ? `${navBar.offsetHeight}px` : '0px'

  if (!el) return
}

export function clearHighlights() {
  searchState.results.forEach((el) => el.classList.remove('ring', 'ring-yellow-400', 'rounded'))
}

export function highlightCurrent(
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  counter: HTMLSpanElement,
  navBar: HTMLElement,
) {
  clearHighlights()

  const el = searchState.results[searchState.currentIndex]
  if (!el) return

  const headingList = el.closest('[data-toc-heading-list]') as HTMLElement
  if (headingList && headingList.classList.contains('hidden')) {
    headingList.classList.remove('hidden')
  }

  requestAnimationFrame(() => {
    const scrollContainer =
      document.querySelector('.scroll-container') ||
      document.scrollingElement ||
      document.documentElement
    const scrollTop = el.offsetTop // Simplified scrollTop calculation

    scrollContainer.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    })

    el.classList.add('ring', 'ring-yellow-400', 'rounded')

    // Call updateButtons without totalOffset
    updateButtons(prevBtn, nextBtn, counter, navBar)
  })
}

export function collectSearchResults(keyword: string): HTMLElement[] {
  const normalizedKeyword = normalizeText(keyword)

  const matches: HTMLElement[] = []

  const checkMatch = (el: Element) => {
    const rawText = el.textContent || ''
    const rawLower = rawText.toLowerCase()
    const normalizedText = normalizeText(rawText)

    // Nếu keyword có dấu → so sánh theo cả 2 cách
    const match =
      rawLower.includes(keyword.toLowerCase()) || normalizedText.includes(normalizedKeyword)
    if (match) {
      matches.push(el as HTMLElement)
    }
  }

  document.querySelectorAll('[data-group-key], [data-toc-question]').forEach(checkMatch)

  return matches
}

export function triggerSearch(
  keyword: string,
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  counter: HTMLSpanElement,
  navBar: HTMLElement,
) {
  clearHighlights() // 🔥 Dọn highlight trước
  const trimmedKeyword = keyword.trim()
  if (!trimmedKeyword) {
    searchState.reset()
    updateButtons(prevBtn, nextBtn, counter, navBar) // Reset padding when no keyword
    return
  }

  const results = collectSearchResults(trimmedKeyword)
  searchState.setResults(results)

  // updateButtons will be called in highlightCurrent if there are results
  // or called directly here if no results to update button state
  if (results.length === 0) {
    updateButtons(prevBtn, nextBtn, counter, navBar)
    return
  }

  highlightCurrent(prevBtn, nextBtn, counter, navBar)
}
