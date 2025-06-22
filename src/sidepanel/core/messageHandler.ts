import { renderTOC } from './renderTOC';

export function setupTOCMessageHandler(main: HTMLElement) {
  try{
    chrome.runtime.sendMessage({ type: 'TOC_REQUEST' });
  }catch (error) {
    console.warn('[TOC] Không thể gửi yêu cầu TOC:', error);
  }

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'TOC_DATA') {
      const toc: QAGroup[] = request.toc || [];
      renderTOC(main, toc);
    }
    return false;
  });

}
