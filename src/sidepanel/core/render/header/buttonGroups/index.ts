import { toggleEvent } from './logic';
import {
  createButtonWrapper,
  createButtonGroupContainer,
  createMenuButton,
  createNavButton
} from './ui';

export function createButtonGroup(): HTMLElement {
  function updateToggleText() {
    toggleBtn.textContent = allGroupsAreOpen() ? '🔽 Đóng tất cả' : '🔼 Mở tất cả';
  }

  function allGroupsAreOpen(): boolean {
    const lists = document.querySelectorAll('[data-toc-heading-list]');
    return Array.from(lists).every(
      el => (el as HTMLElement).style.display !== 'none'
    );
  }

  const wrapper = createButtonWrapper();
  const { left, right } = createButtonGroupContainer();

  // Tạo menu dropdown
  const menu = document.createElement('div');
  menu.className = `
    absolute mt-2 bg-gray-800 text-white rounded shadow-lg z-50 hidden
    flex flex-col gap-1 p-2 w-100
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

  // Nút điều hướng chính
  const navBtn = createNavButton('🧭 Điều hướng ▾', () => {
    updateToggleText();
    menu.classList.toggle('hidden');
  });
  
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

