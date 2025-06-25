// === core/render/renderTitle.ts ===
import { tocState } from '../state/tocState';

export function createTitle(): HTMLElement {
  const container = document.createElement('div');
  container.className =
    'fixed top-0 left-0 w-full bg-gray-900 text-center p-5 z-50 border-b border-gray-700';

  const title = document.createElement('h2');
  title.textContent = 'Conversation TOC';
  title.className = 'text-yellow-400 text-lg font-bold uppercase tracking-wide mb-0';

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
    </a>`;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'mt-4 w-full flex justify-center gap-4';

  const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className =
      'px-4 py-1 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-600 transition';
    btn.onclick = onClick;
    return btn;
  };

  const closeAllBtn = createButton('🔼 Đóng tất cả', () => {
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    tocState.closeAll();
  });

  const openAllBtn = createButton('🔽 Mở tất cả', () => {
    const keys: string[] = [];
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'block';
      const groupEl = el.closest('[data-group-key]');
      if (groupEl) {
        keys.push(groupEl.getAttribute('data-group-key')!);
      }
    });
    tocState.openAll(keys);
  });

  buttonGroup.appendChild(closeAllBtn);
  buttonGroup.appendChild(openAllBtn);

  container.appendChild(title);
  container.appendChild(survey);
  container.appendChild(buttonGroup);
  return container;
}
