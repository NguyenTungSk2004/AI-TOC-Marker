import { injectHighlightStyle } from "./utils/injectHighlightStyle";
import { observeTOCUpdates } from "./core/tocObserver";
import { setupScrollToHeading } from "./core/scrollToHeading";
import { watchUrlChange } from "../utils/urlChangeWatcher.utils";

// Inject CSS
injectHighlightStyle();

// Theo dõi nội dung Markdown
observeTOCUpdates();

// Cuộn đến Heading
setupScrollToHeading();

// Reset TOC khi thay đổi URL
watchUrlChange(() => {
  try{
    if (chrome.runtime?.id) {
      chrome.storage.local.set({ toc: [] });
      chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc: [] });
    }
  }catch (error) {
    console.error("[TOC] Lỗi khi reset TOC:", error);
  }
  observeTOCUpdates();
});
