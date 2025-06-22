console.log('✅ background is running');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TOC_REQUEST') {
    chrome.storage.local.get(['toc'], (result) => {
      chrome.runtime.sendMessage({ type: 'TOC_DATA', toc: result.toc || [] });
    });
  }

  if (request.type === 'TOC_DATA_FROM_CONTENT') {
    const toc = request.toc;
    chrome.storage.local.set({ toc }, () => {
      console.log('Background đã nhận và lưu TOC:', toc);
    });

    // Optional: vẫn có thể gửi nếu sidepanel đang mở
    chrome.runtime.sendMessage({ type: 'TOC_DATA', toc }, () => {
      if (chrome.runtime.lastError) {
        console.warn('[TOC] Sidepanel chưa sẵn sàng:', chrome.runtime.lastError.message);
      }
    });

    sendResponse({ status: 'received' });
  }
});


chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "../../sidepanel.html",
      enabled: true,
    });

    await (chrome.sidePanel as any).open({ tabId: tab.id });
  } catch (error) {
    console.error("❌ Failed to open side panel:", error);
  }
});

// Lắng nghe khi side panel được mở
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });