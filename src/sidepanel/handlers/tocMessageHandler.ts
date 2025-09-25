import { renderTOC } from '@sidepanel/layout/main'
import { tocState } from '@sidepanel/state/tocState'
import { platformState } from '@sidepanel/state/platformState'
import { updateTitleContent } from '@sidepanel/layout/header/shared/title.share'
import { ChatPlatform } from '../../constants/chatgptUrls'

let previousTOCJSON = ''
let previousURL = ''
let pendingRenderTimeout: ReturnType<typeof setTimeout> | null = null
let pendingRequestTimeout: ReturnType<typeof setTimeout> | null = null

// Cancel all pending operations
function cancelPendingOperations() {
  if (pendingRenderTimeout) {
    clearTimeout(pendingRenderTimeout)
    pendingRenderTimeout = null
  }
  if (pendingRequestTimeout) {
    clearTimeout(pendingRequestTimeout)
    pendingRequestTimeout = null
  }
}

export function setupTOCMessageHandler(main: HTMLElement) {
  try {
    chrome.runtime.sendMessage({ type: 'TOC_REQUEST' })
  } catch (error) {
    console.warn('[TOC] Không thể gửi yêu cầu TOC:', error)
  }
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'TOC_DATA') {
      const toc = request.toc || []
      const currentTabUrl = request.tabUrl || ''
      const platform = request.platform || ChatPlatform.UNKNOWN
      const currentJSON = JSON.stringify(toc)

      // Validation: chỉ render TOC nếu đến từ tab hiện tại
      if (previousURL && currentTabUrl && previousURL !== currentTabUrl) {
        return false
      }

      // Update platform state
      if (currentTabUrl && platform !== ChatPlatform.UNKNOWN) {
        platformState.update(platform, currentTabUrl)
        const titleBlock = document.querySelector('#toc-header .text-yellow-400') as HTMLDivElement
        if (titleBlock) updateTitleContent(titleBlock)
      }

      // Chỉ render TOC nếu data thay đổi và đến từ tab đúng
      if (currentJSON !== previousTOCJSON) {
        if (previousURL !== currentTabUrl) {
          tocState.closeAll()
        }
        renderTOC(main, toc)
        previousTOCJSON = currentJSON
        previousURL = currentTabUrl
      }
    }

    if (request.type === 'PLATFORM_CHANGED') {
      const currentTabUrl = request.tabUrl || ''
      const platform = request.platform || ChatPlatform.UNKNOWN

      // Cancel tất cả pending operations ngay lập tức
      cancelPendingOperations()

      // Clear TOC ngay lập tức để tránh hiển thị data từ tab cũ
      tocState.closeAll()
      renderTOC(main, [])
      previousTOCJSON = ''

      // Update platform state và UI
      if (currentTabUrl && platform !== ChatPlatform.UNKNOWN) {
        platformState.update(platform, currentTabUrl)
        previousURL = currentTabUrl

        const titleBlock = document.querySelector('#toc-header .text-yellow-400') as HTMLDivElement
        if (titleBlock) updateTitleContent(titleBlock)

        // Request fresh TOC data với delay nhỏ
        pendingRequestTimeout = setTimeout(() => {
          pendingRequestTimeout = null
          try {
            chrome.runtime.sendMessage({ type: 'TOC_REQUEST' })
          } catch (error) {
            console.warn('[TOC] Lỗi yêu cầu TOC data mới:', error)
          }
        }, 300) // Delay tăng lên để content script có thời gian load
      } else {
        // Platform không được hỗ trợ hoặc unknown
        previousURL = currentTabUrl
      }
    }

    return false
  })
}
