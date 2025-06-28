import { createButtonGroup } from './buttonGroups';
import { createTocSearchInput } from './searchControls';
import { createTitleBlock } from './shared/title.share';
import { createHeaderTwoCol } from './shared/wrapper.share';

export function createHeader(): HTMLElement {
  const container = document.createElement('header');
  container.id = 'toc-header';
  container.className =
    'fixed top-0 left-0 w-full bg-gray-900 text-white z-50 border-b border-gray-700 shadow-md';

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full px-6 py-4 flex flex-col gap-3';

  const titleBlock = createTitleBlock();
  const nav = createButtonGroup();
  const navWrapper = createHeaderTwoCol(titleBlock, nav);

  // === Tìm kiếm ===
  const searchControls = createTocSearchInput();
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'w-full flex justify-between items-center gap-2';
  searchWrapper.append(searchControls);

  // === Tổng hợp ===
  wrapper.append(navWrapper, searchWrapper);
  container.append(wrapper);
  
  return container;
}
