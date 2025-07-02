import { tocState } from '@sidepanel/state/tocState';
import { toggleGroupVisibility } from '../events/toggleGroupVisibility';
import { createGroupContainer } from './createGroupContainer';
import { createHeadingsList } from './createHeadingsList';
import { createQuestionHeader } from './createQuestionHeader';

export function createQuestionGroup(group: QAGroup, index: number): HTMLElement {
  const key: string = `TOC-Q${index}`;

  const groupEl = createGroupContainer(key);
  const questionEl = createQuestionHeader(group.question, index, key);

  const headingsList = createHeadingsList(group.headings);
  headingsList.setAttribute('data-toc-heading-list', key);

  const isExpanded = tocState.expandedGroups.has(key);
  headingsList.style.display = isExpanded ? 'block' : 'none';
  questionEl.setAttribute('aria-expanded', isExpanded.toString());

  questionEl.addEventListener('click', () => {
    toggleGroupVisibility({
      groupEl,
      headingsList,
      key
    });
  });

  groupEl.appendChild(questionEl);
  groupEl.appendChild(headingsList);

  return groupEl;
}
