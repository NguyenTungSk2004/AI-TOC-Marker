import { renderTOC } from './renderTOC';

export function setupTOCMessageHandler(main: HTMLElement) {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'TOC_DATA') {
      const toc: QAGroup[] = request.toc || [];
      renderTOC(main, toc);
    }
  });

  chrome.storage.local.get(['toc'], (result) => {
    const toc: QAGroup[] = result.toc || [];
    renderTOC(main, toc);
  });
}
