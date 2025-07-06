export function createQuestionHeader(question: string, index: number, key: string): HTMLDivElement {
  const questionEl = document.createElement('div');
  questionEl.setAttribute('data-toc-question', key);
  questionEl.title = question;
  questionEl.className =
    'bg-gray-700 px-3 py-2 rounded text-white font-semibold flex items-start text-base cursor-pointer';

  const prefix = document.createElement('span');
  prefix.textContent = `Q${index + 1}.`;
  prefix.className = 'text-green-400 font-mono mr-2 shrink-0';

  const text = document.createElement('span');
  const truncated = question.length > 100 ? question.slice(0, 100) + '...' : question;
  text.textContent = truncated;
  text.className = 'truncate';

  questionEl.append(prefix, text);
  return questionEl;
}