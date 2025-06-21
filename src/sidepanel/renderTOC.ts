import { renderHeadings } from './renderHeadings';

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  main.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Conversation TOC';
  title.className =
    'text-yellow-400 text-lg font-bold uppercase tracking-wide border-b border-gray-700 pb-2 text-center';
  main.appendChild(title);

  const reversedData = [...data].reverse();
  const total = reversedData.length;

  reversedData.forEach((group, indexReversed) => {
    const displayIndex = total - indexReversed; // QN → Q1

    const groupEl = document.createElement('div');
    groupEl.className =
      'bg-gray-800 border border-gray-700 rounded p-3 shadow space-y-2';

    const questionEl = document.createElement('div');
    questionEl.title = group.question;
    questionEl.className =
      'bg-gray-700 px-3 py-2 rounded text-white font-semibold flex items-start text-base';

    const prefix = document.createElement('span');
    prefix.textContent = `Q${displayIndex}.`;
    prefix.className = 'text-green-400 font-mono mr-2 shrink-0';

    const truncatedText =
      group.question.length > 100
        ? group.question.slice(0, 100) + '...'
        : group.question;

    const text = document.createElement('span');
    text.textContent = truncatedText;
    text.className = 'truncate';

    questionEl.appendChild(prefix);
    questionEl.appendChild(text);
    groupEl.appendChild(questionEl);

    const headingsList = renderHeadings(group.headings);
    groupEl.appendChild(headingsList);

    main.appendChild(groupEl);
  });
}
