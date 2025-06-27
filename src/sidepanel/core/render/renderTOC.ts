import { tocState } from '../state/tocState';
import { createFooter } from './footer';
import { createHeader } from './header';
import { createQuestionGroup } from './questionGroup';

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  tocState.load();
  main.innerHTML = '';
  main.className = `h-full p-3 space-y-3`;
  
  createHeader(main);
  createFooter(main);

  const headerEl = document.getElementById('toc-header');
  const surveyEl = document.getElementById('toc-survey');
  if (headerEl){
    requestAnimationFrame(() => {
      const offset = headerEl.getBoundingClientRect().height - 30;
      main.style.marginTop = `${offset}px`;
    });
  }
  if (surveyEl) {
    requestAnimationFrame(() => {
      const surveyHeight = surveyEl.getBoundingClientRect().height - 20;
      main.style.marginBottom = `${surveyHeight}px`;
    });
  }
     
  // main.style.marginBottom = 

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
