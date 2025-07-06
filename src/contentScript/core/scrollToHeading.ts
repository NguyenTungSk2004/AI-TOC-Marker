const FADE_OUT_DELAY = 300;
const REMOVE_HIGHLIGHT_DELAY = 2000;

export function setupScrollToHeading() {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "SCROLL_TO_HEADING" && request.id) {
      const el = document.getElementById(request.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.remove("toc-highlight", "fade-out");
        void el.offsetWidth;
        el.classList.add("toc-highlight");
        setTimeout(() => el.classList.add("fade-out"), FADE_OUT_DELAY);
        setTimeout(() => el.classList.remove("toc-highlight", "fade-out"), REMOVE_HIGHLIGHT_DELAY);
      }
    }
  });
}
