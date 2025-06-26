import { tocState } from "../../../state/tocState";
import {
  createButtonWrapper,
  createButtonGroupContainer
} from './ui';

export function createButtonGroup(): HTMLElement {
  const wrapper = createButtonWrapper();
  const { left, right } = createButtonGroupContainer();

  // Tạo menu dropdown
  const menu = document.createElement('div');
  menu.className = `
    absolute mt-2 bg-gray-800 text-white rounded shadow-lg z-50 hidden
    flex flex-col gap-1 p-2 w-40
  `;

  // Scroll lên đầu
  const goTop = createMenuButton('⬆ Lên đầu', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    menu.classList.add('hidden');
  });

  // Scroll xuống cuối
  const goBottom = createMenuButton('⬇ Xuống cuối', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    menu.classList.add('hidden');
  });

  // Toggle mở/đóng tất cả
  const toggleBtn = createMenuButton('', () => {
    const isOpen = allGroupsAreOpen();
    if (isOpen) toggleEvent.closeAll();
    else toggleEvent.openAll();
    updateToggleText();
    menu.classList.add('hidden');
  });

  function updateToggleText() {
    toggleBtn.textContent = allGroupsAreOpen() ? '🔽 Đóng tất cả' : '🔼 Mở tất cả';
  }

  function allGroupsAreOpen(): boolean {
    const lists = document.querySelectorAll('[data-toc-heading-list]');
    return Array.from(lists).every(
      el => (el as HTMLElement).style.display !== 'none'
    );
  }

  // Nút điều hướng chính
  const navBtn = document.createElement('button');
  navBtn.className = `
    h-[28px] px-3 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition
    flex items-center justify-center leading-none
  `;

  navBtn.textContent = '🧭 Điều hướng ▾';
  navBtn.onclick = () => {
    updateToggleText();
    menu.classList.toggle('hidden');
  };

  // Ẩn menu nếu click ra ngoài
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target as Node) && !navBtn.contains(e.target as Node)) {
      menu.classList.add('hidden');
    }
  });

  // Menu điều hướng gắn vào container
  const container = document.createElement('div');
  container.className = 'relative inline-block';
  container.append(navBtn, menu);

  menu.append(toggleBtn, goTop, goBottom);
  right.append(container);
  wrapper.append(left, right);
  return wrapper;
}

// Tạo nút menu con với tailwind
function createMenuButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = `
    w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-700 transition
  `;
  btn.onclick = onClick;
  return btn;
}

const toggleEvent = {
  openAll() {
    const keys: string[] = [];
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'block';
      const groupEl = el.closest('[data-group-key]');
      if (groupEl) keys.push(groupEl.getAttribute('data-group-key')!);
    });
    tocState.openAll(keys);
  },

  closeAll() {
    document.querySelectorAll('[data-toc-heading-list]').forEach(el =>
      (el as HTMLElement).style.display = 'none'
    );
    tocState.closeAll();
  }
};
