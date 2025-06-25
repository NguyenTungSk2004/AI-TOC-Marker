import { renderHeadings } from "./renderHeadings";

export function createQuestionGroup(group: QAGroup, index: number, tocState: any): HTMLElement {
  const key = group.question;

  const groupEl = document.createElement('div');
  groupEl.className = 'bg-gray-800 border border-gray-700 rounded p-3 shadow space-y-2';

  const questionEl = document.createElement('div');
  questionEl.title = group.question;
  questionEl.className = 'bg-gray-700 px-3 py-2 rounded text-white font-semibold flex items-start text-base';
  questionEl.style.cursor = 'pointer';


  const prefix = document.createElement('span');
  prefix.textContent = `Q${index + 1}.`;
  prefix.className = 'text-green-400 font-mono mr-2 shrink-0';

  const text = document.createElement('span');
  const truncatedText = group.question.length > 100 ? group.question.slice(0, 100) + '...' : group.question;
  text.textContent = truncatedText;
  text.className = 'truncate';

  questionEl.appendChild(prefix);
  questionEl.appendChild(text);
  groupEl.appendChild(questionEl);

  const headingsList = renderHeadings(group.headings);
  headingsList.setAttribute('data-toc-heading-list', 'true');
  
  const isExpanded = tocState.expandedGroups.has(key);
  headingsList.style.display = isExpanded ? 'block' : 'none';

  questionEl.setAttribute('aria-expanded', isExpanded.toString());
  questionEl.addEventListener('click', () => {
    const currentlyVisible = headingsList.style.display === 'block';
    headingsList.style.display = currentlyVisible ? 'none' : 'block';
    tocState.toggle(key, !currentlyVisible);

    questionEl.setAttribute('aria-expanded', (!currentlyVisible).toString());

  });

  groupEl.appendChild(headingsList);
  return groupEl;
}
