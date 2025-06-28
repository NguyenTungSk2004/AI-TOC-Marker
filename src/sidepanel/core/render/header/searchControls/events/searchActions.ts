import { showInfo } from "../../../../../../utils/toast.utils";
import { searchState } from "./searchState";

export function updateButtons(prevBtn: HTMLButtonElement, nextBtn: HTMLButtonElement, counter: HTMLSpanElement, navBar: HTMLElement) {
  const { currentIndex, results } = searchState;
  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex >= results.length - 1;
  counter.textContent =
    results.length > 0 ? `🔎 ${currentIndex + 1} / ${results.length} kết quả` : '';
  navBar.style.display = results.length > 0 ? 'flex' : 'none';
}

export function clearHighlights() {
  searchState.results.forEach((el) =>
    el.classList.remove('ring', 'ring-yellow-400', 'rounded')
  );
}

export function highlightCurrent(prevBtn: HTMLButtonElement, nextBtn: HTMLButtonElement, counter: HTMLSpanElement, navBar: HTMLElement) {
  clearHighlights();

  const el = searchState.results[searchState.currentIndex];
  if (!el) return;

  const headingList = el.closest("[data-toc-heading-list]") as HTMLElement;
  if (headingList && headingList.style.display === "none") {
    headingList.style.display = "block";
  }

  requestAnimationFrame(() => {
    const scrollContainer = document.querySelector('.scroll-container') || document.scrollingElement || document.documentElement;
    const headerHeight = document.getElementById('toc-header')?.offsetHeight ?? 0;
    const extraOffset = 32;
    const scrollTop = el.offsetTop - headerHeight - extraOffset;

    scrollContainer.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });

    el.classList.add('ring', 'ring-yellow-400', 'rounded');
  });

  updateButtons(prevBtn, nextBtn, counter, navBar);
}

export function collectSearchResults(keyword: string): HTMLElement[] {
  const lower = keyword.toLowerCase();
  const matches: HTMLElement[] = [];

  document.querySelectorAll("[data-group-key]").forEach((el) => {
    if (el.textContent?.toLowerCase().includes(lower)) {
      matches.push(el as HTMLElement);
    }
  });

  document.querySelectorAll("[data-toc-question]").forEach((el) => {
    if (el.textContent?.toLowerCase().includes(lower)) {
      matches.push(el as HTMLElement);
    }
  });

  return matches;
}

export function triggerSearch(
  keyword: string,
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  counter: HTMLSpanElement,
  navBar: HTMLElement
) {
  if (!keyword) {
    clearHighlights();
    searchState.reset();
    updateButtons(prevBtn, nextBtn, counter, navBar);
    return;
  }

  const results = collectSearchResults(keyword);
  searchState.setResults(results);

  if (results.length === 0) {
    showInfo("Không tìm thấy kết quả phù hợp!");
    clearHighlights();
  } else {
    highlightCurrent(prevBtn, nextBtn, counter, navBar);
  }
}
