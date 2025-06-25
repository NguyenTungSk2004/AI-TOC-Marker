// title/searchControls/index.ts
import { createSearchUI } from './ui';
import { setupSearchLogic } from './logic';

export function createTocSearchInput(): HTMLElement {
  const { wrapper, input, navBar, prevBtn, nextBtn, counter, searchBtn  } = createSearchUI();
  setupSearchLogic({ input, navBar, prevBtn, nextBtn, counter, searchBtn });
  return wrapper;
}
