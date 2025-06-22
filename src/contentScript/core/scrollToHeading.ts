export function setupScrollToHeading() {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "SCROLL_TO_HEADING" && request.id) {
      const el = document.getElementById(request.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.remove("toc-highlight", "fade-out");
        void el.offsetWidth;
        el.classList.add("toc-highlight");
        setTimeout(() => el.classList.add("fade-out"), 300);
        setTimeout(() => el.classList.remove("toc-highlight", "fade-out"), 2000);
      }
    }
  });
}
