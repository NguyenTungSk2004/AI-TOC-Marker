import { extractTOCByQA } from "./extractTOCByQA";

export function observeTOCUpdates() {
  let debounceTimer: ReturnType<typeof setTimeout>;

  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const toc = extractTOCByQA();
      chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc });
      chrome.storage.local.set({ toc });
    }, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
