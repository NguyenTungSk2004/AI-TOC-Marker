import { createGroupContainer, createQuestionHeader } from './ui';
import { renderHeadings } from '../headings';
import { toggleGroupVisibility } from './logic';
import { tocState } from '../../state/tocState';

export function createQuestionGroup(group: QAGroup, index: number): HTMLElement {
  const key = group.question;

  const groupEl = createGroupContainer();
  const questionEl = createQuestionHeader(group.question, index);

  const headingsList = renderHeadings(group.headings);
  headingsList.setAttribute('data-toc-heading-list', 'true');

  const isExpanded = tocState.expandedGroups.has(key);
  headingsList.style.display = isExpanded ? 'block' : 'none';
  questionEl.setAttribute('aria-expanded', isExpanded.toString());

  questionEl.addEventListener('click', () => {
    toggleGroupVisibility({
      questionEl,
      headingsList,
      key
    });
  });

  groupEl.appendChild(questionEl);
  groupEl.appendChild(headingsList);

  return groupEl;
}
