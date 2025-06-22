import { injectHighlightStyle } from "./utils/injectHighlightStyle";
import { observeTOCUpdates } from "./core/tocObserver";
import { setupScrollToHeading } from "./core/scrollToHeading";
import { watchUrlChange } from "../utils/urlChangeWatcher";

// Inject CSS
injectHighlightStyle();

// Theo dõi nội dung Markdown
observeTOCUpdates();

// Cuộn đến Heading
setupScrollToHeading();

// Reset TOC khi thay đổi URL
watchUrlChange(() => {
  chrome.storage.local.set({ toc: [] }, () => {
    console.log("✅ Reset TOC data on URL change");
  });
  chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc: [] });
  observeTOCUpdates();
});
