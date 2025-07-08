// Tạo nút menu con với tailwind
export function createMenuButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.textContent = label
  btn.className = `
    w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-700 transition
  `
  btn.onclick = onClick
  return btn
}

export function createNavButton(label: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.textContent = label
  btn.className = `
    h-[28px] px-3 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition
    flex items-center justify-center leading-none
  `
  btn.onclick = onClick
  return btn
}
