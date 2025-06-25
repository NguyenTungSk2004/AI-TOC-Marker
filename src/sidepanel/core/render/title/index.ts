import { createButtonGroup } from './buttonGroups';
import { createTocSearchInput } from './searchControls';

export function createTitle(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'toc-header';
  container.className =
    'fixed top-0 left-0 w-full bg-gray-900 text-white z-50 border-b border-gray-700 shadow-md';

  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col gap-3 w-full px-6 py-3'; // 👈 padding đều 2 bên và trên dưới

  // Khối 1: Title & khảo sát
  const headerBlock = document.createElement('div');
  headerBlock.className = 'text-center';

  const title = document.createElement('h2');
  title.textContent = '📑 CONVERSATION TOC';
  title.className = 'text-yellow-400 text-xl font-bold uppercase tracking-wide';

  const survey = document.createElement('div');
  survey.className = 'text-sm text-gray-300 mt-1';
  survey.innerHTML = `
    <span style="font-size: inherit; font-family: inherit;">Bạn có góp ý gì không?</span>
    <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSenVrkHtZwrhJkt-K-TbjFaImE9Ue6EYEq-SXI3Qwwzf-fttA/viewform?usp=sharing" 
        target="_blank" 
        class="text-blue-400 underline hover:text-blue-300 ml-1"
        style="font-size: inherit; font-family: inherit; margin-left: 4px;"
    >
        📝 Khảo sát
    </a>`;

  headerBlock.append(title, survey);

  // Khối 2: Button group (bám 2 bên)
  const buttonGroup = createButtonGroup(); // nhớ dùng justify-between, px-0

  // Khối 3: Search
  const searchControls = createTocSearchInput();

  wrapper.append(headerBlock, buttonGroup, searchControls);
  container.appendChild(wrapper);
  return container;
}
