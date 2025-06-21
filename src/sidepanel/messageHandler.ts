import { renderTOC } from './renderTOC';

export function setupTOCMessageHandler(main: HTMLElement) {
  chrome.runtime.sendMessage({ type: 'TOC_REQUEST' });

  chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
    if (request.type === 'TOC_DATA') {
      const toc: QAGroup[] = request.toc || [];
      renderTOC(main, toc);
    }
    return false; // Không cần giữ kênh callback
  });
}
