export function handleHeadingClick(e: MouseEvent, id: string) {
  e.stopPropagation();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'SCROLL_TO_HEADING',
        id,
      });
    }
  });
}
