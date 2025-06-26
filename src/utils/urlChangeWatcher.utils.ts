export function watchUrlChange(callback: () => void) {
  let lastUrl = location.href;

  function handleUrlChange() {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      callback();
    }
  }

  // Ghi đè history API
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });

  window.addEventListener('locationchange', handleUrlChange);

  // Dự phòng: Quan sát thay đổi DOM có thể ảnh hưởng tới URL
  const fallbackObserver = new MutationObserver(() => {
    handleUrlChange();
  });
  fallbackObserver.observe(document.body, { childList: true, subtree: true });
}
