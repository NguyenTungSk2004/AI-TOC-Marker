chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TOC_REQUEST') {
    chrome.storage.local.get(['toc'], (result) => {
      try{
          chrome.runtime.sendMessage({ type: 'TOC_DATA', toc: result.toc || [] });
      }catch (error) {
        console.warn('[TOC] Không thể gửi dữ liệu TOC:', error);
      }
    });
  }

  if (request.type === 'TOC_DATA_FROM_CONTENT') {
    const toc = request.toc;
    chrome.storage.local.set({ toc });

    try {
      chrome.runtime.sendMessage({ type: 'TOC_DATA', toc, tabUrl: sender.tab?.url }, () => {
      if (chrome.runtime.lastError) {
        console.warn('[TOC] Sidepanel chưa sẵn sàng:', chrome.runtime.lastError.message);
      }
      });
    } catch (error) {
      console.warn('[TOC] Không thể gửi dữ liệu TOC:', error);
    }

    sendResponse({ status: 'received' });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const isChatGPT = tab.url?.includes("chat.openai.com") || tab.url?.includes("chatgpt.com");

  if (isChatGPT) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true, 
    });

  }
  if(!isChatGPT) {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });

    await chrome.sidePanel.setOptions({
      tabId,
      path: "",
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isChatGPT = tab.url.includes("chat.openai.com") || tab.url.includes("chatgpt.com");

    if (isChatGPT) {
      chrome.sidePanel.setOptions({
        tabId,
        path: "sidepanel.html",
        enabled: true
      });
    } else {
      chrome.sidePanel.setOptions({
        tabId,
        enabled: false
      });
    }
  }
});

