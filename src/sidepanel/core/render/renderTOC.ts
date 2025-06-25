import { tocState } from '../state/tocState';
import { createQuestionGroup } from './renderQuestion';
import { createTitle } from './renderTitle';

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  tocState.load();
  main.innerHTML = '';
  main.className = 'h-full p-3 space-y-3 mt-32';
  main.appendChild(createTitle());

  let lastGroupEl: HTMLElement | null = null;
  let lastHeadingsEl: HTMLElement | null = null;

  data.forEach((group, index) => {
    const groupEl = createQuestionGroup(group, index, tocState);
    const headingsEl = groupEl.querySelector('[data-toc-heading-list]') as HTMLElement;

    lastGroupEl = groupEl;
    lastHeadingsEl = headingsEl;

    main.appendChild(groupEl);
  });

  requestAnimationFrame(() => {
    if (lastGroupEl && lastHeadingsEl) {
      lastHeadingsEl.style.display = 'block';
      lastGroupEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
