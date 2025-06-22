import { renderHeadings } from './renderHeadings';

function createTitle(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'text-center mb-2';

  const title = document.createElement('h2');
  title.textContent = 'Conversation TOC';
  title.className =
    'text-yellow-400 text-lg font-bold uppercase tracking-wide mb-0';

  const survey = document.createElement('span');
  survey.className = 'block text-[15px] leading-relaxed text-gray-300 font-normal mt-2';
  survey.innerHTML = `
    <span style="font-size: inherit; font-family: inherit;">Bạn có góp ý gì không?</span>
    <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSenVrkHtZwrhJkt-K-TbjFaImE9Ue6EYEq-SXI3Qwwzf-fttA/viewform?usp=sharing" 
        target="_blank" 
        class="text-blue-400 underline hover:text-blue-300 ml-1"
        style="font-size: inherit; font-family: inherit; margin-left: 4px;"
    >
        📝 Khảo sát
    </a>
  `;

  container.appendChild(title);
  container.appendChild(survey);
  return container;
}

function createDivider(): HTMLDivElement {
  const divider = document.createElement('hr');
  divider.className = 'my-2 border-t border-gray-700';
  return divider;
}

function createGroupElement(): HTMLDivElement {
  const groupEl = document.createElement('div');
  groupEl.className =
    'bg-gray-800 border border-gray-700 rounded p-3 shadow space-y-2';
  
  return groupEl;
}

function createQuestionElement(question: string): HTMLDivElement {
    const questionEl = document.createElement('div');
    questionEl.title = question;
    questionEl.className =
      'bg-gray-700 px-3 py-2 rounded text-white font-semibold flex items-start text-base';
    
    return questionEl;
}

function createPrefixElement(index: number): HTMLSpanElement {
    const prefix = document.createElement('span');
    prefix.textContent = `Q${index}.`;
    prefix.className = 'text-green-400 font-mono mr-2 shrink-0';
    return prefix;
}

export function renderTOC(main: HTMLElement, data: QAGroup[]) {
  main.innerHTML = '';

  main.appendChild(createTitle());
  main.appendChild(createDivider());

  const reversedData = [...data].reverse();
  const total = reversedData.length;

  reversedData.forEach((group, indexReversed) => {
    const displayIndex = total - indexReversed; // QN → Q1

    const groupEl = createGroupElement();
    const questionEl = createQuestionElement(group.question);
    const prefix = createPrefixElement(displayIndex);

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
