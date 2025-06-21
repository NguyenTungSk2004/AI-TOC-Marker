console.log('✅ background is running');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'TOC_DATA_FROM_CONTENT') {
        const toc = request.toc;
        chrome.storage.local.set({ toc: toc }, () => {
            console.log('Background đã nhận và lưu toc:', toc);
        });
        chrome.runtime.sendMessage({ type: 'TOC_DATA', toc: toc });
        sendResponse({ status: 'received' });
    }
});

// Lắng nghe khi side panel được mở
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });