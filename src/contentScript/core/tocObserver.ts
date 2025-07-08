import { extractTOCByQA } from './extractTOCByQA'

// Global state để quản lý observer lifecycle
let currentObserver: MutationObserver | null = null
let currentDebounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Bắt đầu observe DOM changes để auto-extract TOC
 * Sử dụng debounce để tránh extract quá nhiều lần khi DOM thay đổi nhanh
 */
export function observeTOCUpdates() {
  // Cleanup observer và timer hiện tại trước khi tạo mới
  stopTOCObserver()

  currentObserver = new MutationObserver(() => {
    // Clear timer cũ nếu có
    if (currentDebounceTimer) {
      clearTimeout(currentDebounceTimer)
    }

    // Debounce 500ms để tránh extract liên tục khi DOM thay đổi
    currentDebounceTimer = setTimeout(() => {
      currentDebounceTimer = null

      // Extract TOC và gửi về background script
      const toc = extractTOCByQA()
      try {
        if (chrome.runtime?.id) {
          chrome.runtime.sendMessage({ type: 'TOC_DATA_FROM_CONTENT', toc })
          chrome.storage.local.set({ toc })
        }
      } catch (error) {
        console.error('[TOC] Lỗi khi gửi TOC:', error)
      }
    }, 500)
  })

  // Observe toàn bộ document body với deep monitoring
  currentObserver.observe(document.body, {
    childList: true, // Monitor thêm/xóa child elements
    subtree: true, // Monitor tất cả descendants
  })

  console.log('[TOC] Bắt đầu observe DOM changes')
}

/**
 * Dừng TOC observer và cleanup tất cả pending operations
 * Quan trọng để tránh memory leaks và race conditions
 */
export function stopTOCObserver() {
  // Disconnect observer
  if (currentObserver) {
    currentObserver.disconnect()
    currentObserver = null
    console.log('[TOC] Đã dừng TOC observer')
  }

  // Cancel pending extraction
  if (currentDebounceTimer) {
    clearTimeout(currentDebounceTimer)
    currentDebounceTimer = null
    console.log('[TOC] Đã hủy pending TOC extraction')
  }
}
