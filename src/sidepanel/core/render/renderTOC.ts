import { tocState } from '../state/tocState';
import { createQuestionGroup } from './questionGroup';
import { createTitle } from './title';

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  tocState.load();
  main.innerHTML = '';
  main.appendChild(createTitle());

  const headerEl = document.querySelector('.fixed');
  const offset = headerEl ? headerEl.getBoundingClientRect().height : 160;
  main.className = `h-full p-3 space-y-3`;
  main.style.marginTop = `${offset}px`;

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
