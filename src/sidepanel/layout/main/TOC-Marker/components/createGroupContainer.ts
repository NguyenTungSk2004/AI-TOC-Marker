export function createGroupContainer(key: string): HTMLDivElement {
  const container = document.createElement('div');
  container.setAttribute('data-toc-group', key);
  container.className = 'toc-group bg-gray-800 border border-gray-700 rounded p-3 shadow space-y-2';
  return container;
}