import { injectHighlightStyle } from './utils/injectHighlightStyle'
import { observeTOCUpdates, stopTOCObserver } from './core/tocObserver'
import { setupScrollToHeading } from './core/scrollToHeading'
import { watchUrlChange } from '../utils/urlChangeWatcher.utils'
import { platformFactory } from './platforms/platformFactory'

/**
 * Khởi tạo extension cho platform hiện tại
 * Chỉ hoạt động trên các platform được hỗ trợ (ChatGPT, Grok)
 */
function initializeExtension() {
  if (!platformFactory.isSupported()) {
    console.warn('[TOC] Platform không được hỗ trợ, bỏ qua khởi tạo')
    return
  }
  injectHighlightStyle()
  observeTOCUpdates()
  setupScrollToHeading()
}

initializeExtension()

/**
 * Listen messages từ background script
 * Xử lý yêu cầu extract TOC ngay lập tức khi user switch tabs
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT_TOC_NOW') {
    // Extract TOC ngay lập tức và gửi về background
    if (platformFactory.isSupported()) {
      const platform = platformFactory.getCurrentPlatform()
      if (platform) {
        const toc = platform.extractTOC()
        try {
          if (chrome.runtime?.id) {
            chrome.runtime.sendMessage({ type: 'TOC_DATA_FROM_CONTENT', toc })
          }
        } catch (error) {
          console.error('[TOC] Lỗi khi gửi TOC ngay lập tức:', error)
        }
      }
    } else {
      console.warn('[TOC] Platform không hỗ trợ extract ngay lập tức')
    }
  }
})

/**
 * Xử lý URL change - reset và khởi tạo lại
 * Quan trọng để đảm bảo extension hoạt động đúng khi navigate trong SPA
 */
watchUrlChange(() => {
  try {
    // Dừng tất cả operations đang chạy để tránh conflicts
    stopTOCObserver()
    platformFactory.reset()

    // Clear TOC data cũ
    if (chrome.runtime?.id) {
      chrome.storage.local.set({ toc: [] })
      chrome.runtime.sendMessage({ type: 'TOC_DATA_FROM_CONTENT', toc: [] })
    }
  } catch (error) {
    console.error('[TOC] Lỗi khi reset URL change:', error)
  }

  // Khởi tạo lại cho URL mới sau delay nhỏ
  setTimeout(() => {
    initializeExtension()
  }, 100) // Delay để DOM settle
})
