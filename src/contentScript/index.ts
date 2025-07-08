import { injectHighlightStyle } from "./utils/injectHighlightStyle";
import { observeTOCUpdates, stopTOCObserver } from "./core/tocObserver";
import { setupScrollToHeading } from "./core/scrollToHeading";
import { watchUrlChange } from "../utils/urlChangeWatcher.utils";
import { platformFactory } from "./platforms/platformFactory";

/**
 * Khởi tạo extension cho platform hiện tại
 * Chỉ hoạt động trên các platform được hỗ trợ (ChatGPT, Grok)
 */
function initializeExtension() {
  console.log('[TOC] Khởi tạo extension cho URL:', window.location.href);
  
  // Kiểm tra platform có được hỗ trợ không
  if (!platformFactory.isSupported()) {
    console.log('[TOC] Platform không được hỗ trợ, bỏ qua khởi tạo');
    return;
  }

  console.log('[TOC] Phát hiện platform:', platformFactory.getCurrentPlatformType());

  // Inject CSS cho highlighting
  injectHighlightStyle();

  // Bắt đầu observe DOM để auto-extract TOC
  observeTOCUpdates();

  // Setup scroll to heading functionality
  setupScrollToHeading();
}

// Khởi tạo lần đầu khi page load
initializeExtension();

/**
 * Listen messages từ background script
 * Xử lý yêu cầu extract TOC ngay lập tức khi user switch tabs
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT_TOC_NOW') {
    console.log('[TOC] Nhận yêu cầu extract TOC ngay lập tức');
    
    // Extract TOC ngay lập tức và gửi về background
    if (platformFactory.isSupported()) {
      const platform = platformFactory.getCurrentPlatform();
      if (platform) {
        const toc = platform.extractTOC();
        try {
          if (chrome.runtime?.id) {
            chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc });
            console.log(`[TOC] Gửi ${toc.length} TOC groups ngay lập tức cho ${platformFactory.getCurrentPlatformType()}`);
          }
        } catch (error) {
          console.error("[TOC] Lỗi khi gửi TOC ngay lập tức:", error);
        }
      }
    } else {
      console.log('[TOC] Platform không hỗ trợ extract ngay lập tức');
    }
  }
});

/**
 * Xử lý URL change - reset và khởi tạo lại
 * Quan trọng để đảm bảo extension hoạt động đúng khi navigate trong SPA
 */
watchUrlChange(() => {
  console.log('[TOC] URL thay đổi thành:', window.location.href);
  
  try {
    // Dừng tất cả operations đang chạy để tránh conflicts
    stopTOCObserver();
    
    // Reset platform factory
    platformFactory.reset();
    
    // Clear TOC data cũ
    if (chrome.runtime?.id) {
      chrome.storage.local.set({ toc: [] });
      chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc: [] });
    }
  } catch (error) {
    console.error("[TOC] Lỗi khi reset URL change:", error);
  }
  
  // Khởi tạo lại cho URL mới sau delay nhỏ
  setTimeout(() => {
    initializeExtension();
  }, 100); // Delay để DOM settle
});
