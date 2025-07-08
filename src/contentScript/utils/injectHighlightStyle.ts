export function injectHighlightStyle() {
  const style = document.createElement('style')
  style.textContent = `
    [data-toc-highlight] {
      scroll-margin-top: 100px;
    }

    .toc-highlight {
      background-color: rgba(255, 255, 100, 0.5);
    }

    .toc-highlight.fade-out {
      transition: background-color 1.2s ease;
      background-color: transparent;
    }
  `
  document.head.appendChild(style)
}
