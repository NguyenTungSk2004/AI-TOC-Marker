import { showInfo } from "../../../../../utils/toast.utils";

export function setupSearchLogic({
  input,
  navBar,
  prevBtn,
  nextBtn,
  counter,
  searchBtn,
}: {
  input: HTMLInputElement;
  navBar: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  counter: HTMLSpanElement;
  searchBtn: HTMLButtonElement;
}) {
  let results: HTMLElement[] = [];
  let currentIndex = -1;

  function updateButtons() {
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= results.length - 1;
    counter.textContent =
      results.length > 0
        ? `🔎 ${currentIndex + 1} / ${results.length} kết quả`
        : "";
    navBar.style.display = results.length > 0 ? "flex" : "none";
  }

  function clearHighlights() {
    results.forEach((el) =>
      el.classList.remove("ring", "ring-yellow-400", "rounded")
    );
  }

  function highlightCurrent() {
    clearHighlights();

    const el = results[currentIndex];
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

    updateButtons();
  }


  function collectSearchResults(keyword: string): HTMLElement[] {
    const lower = keyword.toLowerCase();
    const matches: HTMLElement[] = [];

    document.querySelectorAll("[data-group-key]").forEach((el) => {
      if (el.textContent?.toLowerCase().includes(lower)) {
        matches.push(el as HTMLElement);
      }
    });

    document.querySelectorAll("[data-toc-heading-list] span").forEach((el) => {
      if (el.textContent?.toLowerCase().includes(lower)) {
        matches.push(el as HTMLElement);
      }
    });

    console.log(matches)
    return matches;
  }

  function triggerSearch() {
    const keyword = input.value.trim();
    if (!keyword) {
      clearHighlights();
      results = [];
      currentIndex = -1;
      updateButtons();
      return;
    }

    results = collectSearchResults(keyword);
    currentIndex = results.length ? 0 : -1;

    if (results.length === 0) {
      showInfo("Không tìm thấy kết quả phù hợp!");
      clearHighlights();
    } else {
      highlightCurrent();
    }
  }

  input.addEventListener("input", () => {
    const keyword = input.value.trim();
    if (!keyword) {
      clearHighlights();
      results = [];
      currentIndex = -1;
      updateButtons();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  });

  searchBtn.onclick = () => {
    triggerSearch();
  };

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      highlightCurrent();
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < results.length - 1) {
      currentIndex++;
      highlightCurrent();
    }
  };
}
