export function createGroupContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'bg-gray-800 border border-gray-700 rounded p-3 shadow space-y-2';
  return container;
}

export function createQuestionHeader(question: string, index: number): HTMLDivElement {
  const questionEl = document.createElement('div');
  questionEl.title = question;
  questionEl.className =
    'bg-gray-700 px-3 py-2 rounded text-white font-semibold flex items-start text-base';
  questionEl.style.cursor = 'pointer';

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
