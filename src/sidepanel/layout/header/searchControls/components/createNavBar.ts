export function createNavBar(): {
  navBar: HTMLDivElement
  prevBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
  counter: HTMLSpanElement
} {
  const navBar = document.createElement('div')
  navBar.className =
    'flex items-center justify-between w-full max-w-2xl px-4 py-3 rounded-xl ' +
    'bg-gray-700 border border-gray-600 shadow-md mt-2 transition-all duration-300'
  navBar.style.display = 'none'

  const prevBtn = document.createElement('button')
  const nextBtn = document.createElement('button')
  const counter = document.createElement('span')

  ;[prevBtn, nextBtn].forEach((btn) => {
    btn.className =
      'px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 shadow transition'
  })

  prevBtn.textContent = '⬅️ Trước'
  nextBtn.textContent = '➡️ Sau'

  counter.className = 'text-sm text-purple-300 font-medium tracking-wide'

  navBar.append(prevBtn, counter, nextBtn)
  return { navBar, prevBtn, nextBtn, counter }
}
