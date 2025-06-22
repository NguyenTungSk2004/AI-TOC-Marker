chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TOC_REQUEST') {
    chrome.storage.local.get(['toc'], (result) => {
      chrome.runtime.sendMessage({ type: 'TOC_DATA', toc: result.toc || [] });
    });
  }

  if (request.type === 'TOC_DATA_FROM_CONTENT') {
    const toc = request.toc;
    chrome.storage.local.set({ toc });

    chrome.runtime.sendMessage({ type: 'TOC_DATA', toc }, () => {
      if (chrome.runtime.lastError) {
        console.warn('[TOC] Sidepanel chưa sẵn sàng:', chrome.runtime.lastError.message);
      }
    });

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
