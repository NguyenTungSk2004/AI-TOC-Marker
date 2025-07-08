import { isChatBotUrl, detectChatPlatform } from '../constants/chatgptUrls'

/**
 * Background Script - Service Worker cho Chrome Extension
 * Xử lý communication giữa content scripts và sidepanel
 * Quản lý tab switching và platform detection
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  /**
   * Xử lý yêu cầu TOC data từ sidepanel
   * Trigger fresh extraction từ active tab thay vì chỉ lấy từ storage
   */
  if (request.type === 'TOC_REQUEST') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]

      if (activeTab?.id && activeTab.url && isChatBotUrl(activeTab.url)) {
        // Trigger fresh TOC extraction từ content script
        chrome.tabs
          .sendMessage(activeTab.id, { type: 'EXTRACT_TOC_NOW' })
          .then(() => {
            console.log('[TOC] Đã trigger fresh TOC extraction cho active tab')
          })
          .catch(() => {
            // Content script chưa ready -> fallback lấy từ storage
            chrome.storage.local.get(['toc'], (result) => {
              try {
                const platform = detectChatPlatform(activeTab.url!)
                // Chỉ gửi nếu có sidepanel listener
                chrome.runtime.sendMessage({
                  type: 'TOC_DATA',
                  toc: result.toc || [],
                  tabUrl: activeTab.url,
                  platform,
                }, () => {
                  // Bỏ qua lỗi nếu không có receiver
                  if (chrome.runtime.lastError) {
                    // Silently ignore - no sidepanel listening
                  }
                })
              } catch (error) {
                console.warn('[TOC] Lỗi gửi TOC từ storage:', error)
              }
            })
          })
      } else {
        // Không phải chatbot tab -> gửi TOC rỗng
        try {
          chrome.runtime.sendMessage({ type: 'TOC_DATA', toc: [] }, () => {
            // Bỏ qua lỗi nếu không có receiver
            if (chrome.runtime.lastError) {
              // Silently ignore - no sidepanel listening
            }
          })
        } catch (error) {
          console.warn('[TOC] Lỗi gửi TOC rỗng:', error)
        }
      }
    })
    // Không return true vì không cần sendResponse
    return false
  }

  /**
   * Nhận TOC data từ content script và relay tới sidepanel
   */
  if (request.type === 'TOC_DATA_FROM_CONTENT') {
    const toc = request.toc
    const tabUrl = sender.tab?.url
    const platform = tabUrl ? detectChatPlatform(tabUrl) : 'unknown'

    // Lưu vào storage cho fallback
    chrome.storage.local.set({ toc })

    // Gửi tới sidepanel với platform info
    try {
      chrome.runtime.sendMessage(
        {
          type: 'TOC_DATA',
          toc,
          tabUrl,
          platform,
        },
        () => {
          if (chrome.runtime.lastError) {
            // Silently ignore - sidepanel might not be open
          }
        },
      )
    } catch (error) {
      console.warn('[TOC] Lỗi gửi TOC data:', error)
    }
    // Không return true vì không cần sendResponse
    return false
  }

  /**
   * Xử lý yêu cầu platform info từ sidepanel
   */
  if (request.type === 'REQUEST_CURRENT_PLATFORM') {
    const tabUrl = request.tabUrl
    const platform = tabUrl ? detectChatPlatform(tabUrl) : 'unknown'

    console.log(`[TOC] Platform được yêu cầu: ${platform} cho ${tabUrl}`)

    try {
      chrome.runtime.sendMessage({
        type: 'PLATFORM_CHANGED',
        platform,
        tabUrl,
        tabId: request.tabId,
      }, () => {
        if (chrome.runtime.lastError) {
          // Silently ignore - sidepanel might not be open
        }
      })
    } catch (error) {
      console.log('[TOC] Lỗi gửi platform info:', error)
    }
    // Không return true vì không cần sendResponse
    return false
  }

  return false
})

/**
 * Setup sidepanel behavior khi install
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
})

/**
 * Xử lý tab activation - quan trọng cho tab switching
 * Gửi platform change notification và trigger TOC extraction
 */
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId)
  const isChatBot = tab.url ? isChatBotUrl(tab.url) : false
  const platform = tab.url ? detectChatPlatform(tab.url) : 'unknown'

  // Enable/disable sidepanel dựa trên platform
  await chrome.sidePanel.setOptions({
    tabId,
    path: isChatBot ? 'sidepanel.html' : '',
    enabled: isChatBot,
  })

  // Gửi platform change notification khi switch sang chatbot tab
  if (isChatBot && tab.url) {
    try {
      chrome.runtime.sendMessage({
        type: 'PLATFORM_CHANGED',
        platform,
        tabUrl: tab.url,
        tabId,
      }, () => {
        if (chrome.runtime.lastError) {
          // Silently ignore - sidepanel might not be open
        }
      })

      // Trigger TOC extraction cho tab mới
      chrome.tabs.sendMessage(tabId, { type: 'EXTRACT_TOC_NOW' }).catch(() => {
        // Content script có thể chưa ready, ignore error
      })
    } catch (error) {
      console.log('[TOC] Lỗi gửi platform change message:', error)
    }
  }
})

/**
 * Xử lý page load completion
 * Update sidepanel settings và gửi platform info
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isChatBot = isChatBotUrl(tab.url)
    const platform = detectChatPlatform(tab.url)

    // Update sidepanel settings
    chrome.sidePanel.setOptions({
      tabId,
      path: isChatBot ? 'sidepanel.html' : '',
      enabled: isChatBot,
    })

    // Gửi platform update khi page load xong
    if (isChatBot) {
      try {
        chrome.runtime.sendMessage({
          type: 'PLATFORM_CHANGED',
          platform,
          tabUrl: tab.url,
          tabId,
        }, () => {
          if (chrome.runtime.lastError) {
            // Silently ignore - sidepanel might not be open
          }
        })
      } catch (error) {
        console.log('[TOC] Lỗi gửi platform change message:', error)
      }
    }
  }
})
