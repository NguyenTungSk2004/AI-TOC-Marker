export function createSearchButton(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = '🔍 Tìm kiếm';
  btn.className =
    'px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-500 rounded shadow transition';
  return btn;
}
