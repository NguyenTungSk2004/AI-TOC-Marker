export function createButtonWrapper(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className =
    'mt-4 w-full flex justify-between items-center gap-2 px-0';

  wrapper.style.paddingLeft = '0';
  wrapper.style.paddingRight = '0';
  return wrapper;
}

export function createButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = onClick;
  btn.className =
    'px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 shadow transition';
  return btn;
}

export function createButtonGroupContainer(): {
  left: HTMLDivElement;
  right: HTMLDivElement;
} {
  const left = document.createElement('div');
  left.className = 'flex items-center gap-2';

  const right = document.createElement('div');
  right.className = 'flex items-center gap-2';

  return { left, right };
}

// Tạo nút menu con với tailwind
export function createMenuButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = `
    w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-700 transition
  `;
  btn.onclick = onClick;
  return btn;
}

export function createNavButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = `
    h-[28px] px-3 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition
    flex items-center justify-center leading-none
  `;
  btn.onclick = onClick;
  return btn;
}