import { tocState } from '@sidepanel/state/tocState';
import { createQuestionGroup } from './TOC-Marker/components';

const HEADER_MARGIN_OFFSET = 10;
const SURVEY_MARGIN_OFFSET = 30;

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  main.innerHTML = '';
  tocState.load();
  
  const headerEl = document.getElementById('toc-header');
  const surveyEl = document.getElementById('toc-survey');
  requestAnimationFrame(() => {
    const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
    const surveyHeight = surveyEl?.getBoundingClientRect().height ?? 0;

    // Set chiều cao trừ header và survey
    main.style.height = `calc(100vh - ${headerHeight + surveyHeight}px)`;
    main.style.overflowY = 'auto';
    main.style.marginTop =  `${headerHeight - HEADER_MARGIN_OFFSET}px`; 
    main.style.marginBottom = `${surveyHeight - SURVEY_MARGIN_OFFSET}px`;
  });

  let secondLastGroupEl: HTMLElement | null = null;
  let lastGroupEl: HTMLElement | null = null;
  let lastHeadingsEl: HTMLElement | null = null;

  data.forEach((group, index) => {
    const groupEl = createQuestionGroup(group, index);
    const headingsEl = groupEl.querySelector('[data-toc-heading-list]') as HTMLElement;

    if (index === data.length - 2) {
      secondLastGroupEl = groupEl;
    } 
    if (index === data.length - 1) {
      lastGroupEl = groupEl;
      lastHeadingsEl = headingsEl;
    }

    main.appendChild(groupEl);
  });

  requestAnimationFrame(() => {
    // Logic cuộn: Đảm bảo nhóm cuối cùng hiển thị nếu nhóm thứ hai cuối cùng không hiển thị
    // và không có nhóm nào đang mở. Điều này giúp hiển thị mục TOC mới nhất.
    if (lastGroupEl && lastHeadingsEl && secondLastGroupEl) {
      const rect = secondLastGroupEl.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();
      const isOutOfView = rect.bottom > mainRect.bottom || rect.top < mainRect.top;

      lastHeadingsEl.classList.remove('hidden');

      if (!(isOutOfView && tocState.hasAnyOpen())) {
        main.scrollTop = main.scrollHeight;
      }
    }
  });

}
