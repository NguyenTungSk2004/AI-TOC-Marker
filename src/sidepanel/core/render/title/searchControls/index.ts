// title/searchControls/index.ts
import { createSearchUI } from './ui';
import { setupSearchLogic } from './logic';

export function createTocSearchInput(): HTMLElement {
  const { wrapper, input, navBar, prevBtn, nextBtn, counter } = createSearchUI();
  setupSearchLogic({ input, navBar, prevBtn, nextBtn, counter });
  return wrapper;
}
