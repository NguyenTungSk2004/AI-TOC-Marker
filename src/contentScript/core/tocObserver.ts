import { extractTOCByQA } from "./extractTOCByQA";

export function observeTOCUpdates() {
  let debounceTimer: ReturnType<typeof setTimeout>;

  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const toc = extractTOCByQA();
      try{
        if (chrome.runtime?.id) {
          chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc });
          chrome.storage.local.set({ toc });
        }
      }catch (error) {
        console.error("[TOC] Lỗi khi gửi TOC:", error);
      }
    }, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
