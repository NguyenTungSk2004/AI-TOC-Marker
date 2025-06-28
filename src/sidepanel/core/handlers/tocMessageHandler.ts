import { renderTOC } from "../render/main";

let previousTOCJSON = '';

export function setupTOCMessageHandler(main: HTMLElement) {
    try{
        chrome.runtime.sendMessage({ type: 'TOC_REQUEST' });
    }catch (error) {
        console.warn('[TOC] Không thể gửi yêu cầu TOC:', error);
    }
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
        if (request.type === 'TOC_DATA') {
        const toc = request.toc || [];
        const currentJSON = JSON.stringify(toc);
        if (currentJSON !== previousTOCJSON) {
            renderTOC(main, toc);
            previousTOCJSON = currentJSON;
        }
        }
        return false;
    });
}
