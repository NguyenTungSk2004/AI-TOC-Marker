import { renderTOC } from './renderTOC';

export function setupTOCMessageHandler(main: HTMLElement) {
  chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
    if (request.type === 'TOC_DATA') {
      const toc: QAGroup[] = request.toc || [];
      renderTOC(main, toc);
    }

    return true; 
  });

  chrome.storage.local.get(['toc'], (result) => {
    const toc: QAGroup[] = result.toc || [];
    renderTOC(main, toc);
  });
}
