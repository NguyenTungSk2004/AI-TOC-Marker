import { createButtonGroup } from './buttonGroups';
import { createTocSearchInput } from './searchControls';

export function createHeader(main: HTMLElement) {
  const container = document.createElement('div');
  container.id = 'toc-header';
  container.className =
    'fixed top-0 left-0 w-full bg-gray-900 text-white z-50 border-b border-gray-700 shadow-md';

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full px-6 py-4 flex flex-col gap-3';

  // === CONVERSATION TOC + Điều hướng ===
  const topRow = document.createElement('div');
  topRow.className = 'flex items-center justify-between h-[28px]';

  const titleBlock = document.createElement('div');
  titleBlock.className = `
    flex items-center gap-2 text-yellow-400 text-xl font-bold uppercase tracking-wide leading-none h-[28px] mt-5
  `;
  titleBlock.innerHTML = `📑 <span class="truncate">CONVERSATION TOC</span>`;

  const nav = createButtonGroup();
  topRow.append(titleBlock, nav);

  // === Tìm kiếm ===
  const searchControls = createTocSearchInput();
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'w-full flex justify-between items-center gap-2';
  searchWrapper.append(searchControls);

  // === Tổng hợp ===
  wrapper.append(topRow,searchWrapper);
  container.append(wrapper);
  
  main.appendChild(container);
}
