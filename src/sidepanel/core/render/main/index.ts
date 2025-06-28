import { tocState } from '../../state/tocState';
import { createQuestionGroup } from './TOC-Marker/components';

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  tocState.load();
  main.innerHTML = '';
  main.className = `scroll-container h-screen p-3 space-y-3 overflow-y-auto`;
  
  const headerEl = document.getElementById('toc-header');
  const surveyEl = document.getElementById('toc-survey');
  requestAnimationFrame(() => {
    const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
    const surveyHeight = surveyEl?.getBoundingClientRect().height ?? 0;

    // Set chiều cao trừ header và survey
    main.style.height = `calc(100vh - ${headerHeight + surveyHeight}px)`;
    main.style.overflowY = 'auto';
    main.style.marginTop =  `${headerHeight-10}px`; 
    main.style.marginBottom = `${surveyHeight-30}px`;
  });

  let lastGroupEl: HTMLElement | null = null;
  let lastHeadingsEl: HTMLElement | null = null;

  data.forEach((group, index) => {
    const groupEl = createQuestionGroup(group, index);
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
