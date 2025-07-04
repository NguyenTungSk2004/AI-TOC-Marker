import { renderTOC } from "@sidepanel/layout/main";
import { tocState } from "@sidepanel/state/tocState";

let previousTOCJSON = '';
let previousURL = '';

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
            if (!currentJSON.includes(previousTOCJSON) && previousURL !== window.location.href) tocState.closeAll();
            if (currentJSON !== previousTOCJSON){
                renderTOC(main, toc);
                previousTOCJSON = currentJSON;
                previousURL = window.location.href;
            }
        }
        }
        return false;
    });
}
