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
    console.log('[TOC] Cancelled pending render operation')
  }
  if (pendingRequestTimeout) {
    clearTimeout(pendingRequestTimeout)
    pendingRequestTimeout = null
    console.log('[TOC] Cancelled pending request operation')
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
        console.log(`[TOC] Bỏ qua TOC data từ tab cũ: ${currentTabUrl} (hiện tại: ${previousURL})`)
        return false
      }

      // Update platform state
      if (currentTabUrl && platform !== ChatPlatform.UNKNOWN) {
        platformState.update(platform, currentTabUrl)
        console.log(
          `[TOC] Cập nhật platform state: ${platformState.getPlatformName()} tại ${currentTabUrl}`,
        )

        // Update title ngay lập tức
        const titleBlock = document.querySelector('#toc-header .text-yellow-400') as HTMLDivElement
        if (titleBlock) {
          updateTitleContent(titleBlock)
        }
      }

      // Chỉ render TOC nếu data thay đổi và đến từ tab đúng
      if (currentJSON !== previousTOCJSON) {
        if (previousURL !== currentTabUrl) {
          tocState.closeAll()
          console.log(
            `[TOC] URL thay đổi từ ${previousURL} sang ${currentTabUrl}, đóng tất cả groups`,
          )
        }
        renderTOC(main, toc)
        previousTOCJSON = currentJSON
        previousURL = currentTabUrl

        console.log(`[TOC] Render ${toc.length} TOC groups cho ${platformState.getPlatformName()}`)
      }
    }

    if (request.type === 'PLATFORM_CHANGED') {
      const currentTabUrl = request.tabUrl || ''
      const platform = request.platform || ChatPlatform.UNKNOWN

      console.log(`[TOC] Platform thay đổi sang: ${platform} tại ${currentTabUrl}`)

      // Cancel tất cả pending operations ngay lập tức
      cancelPendingOperations()

      // Clear TOC ngay lập tức để tránh hiển thị data từ tab cũ
      tocState.closeAll()
      renderTOC(main, [])
      previousTOCJSON = ''
      console.log(`[TOC] Đã clear TOC ngay lập tức khi detect platform change`)

      // Update platform state và UI
      if (currentTabUrl && platform !== ChatPlatform.UNKNOWN) {
        platformState.update(platform, currentTabUrl)
        previousURL = currentTabUrl

        // Update title ngay lập tức
        const titleBlock = document.querySelector('#toc-header .text-yellow-400') as HTMLDivElement
        if (titleBlock) {
          updateTitleContent(titleBlock)
        }

        // Request fresh TOC data với delay nhỏ
        pendingRequestTimeout = setTimeout(() => {
          pendingRequestTimeout = null
          try {
            chrome.runtime.sendMessage({ type: 'TOC_REQUEST' })
            console.log(`[TOC] Yêu cầu TOC data mới cho ${platformState.getPlatformName()}`)
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
