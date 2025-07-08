export function createSearchInput(): {
  wrapper: HTMLDivElement
  input: HTMLInputElement
} {
  const wrapper = document.createElement('div')
  wrapper.className = 'relative flex-1'

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Tìm từ khóa trong tiêu đề...'
  input.className =
    'w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow'

  const icon = document.createElement('span')
  icon.textContent = '🔍'
  icon.className =
    'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none'

  wrapper.append(icon, input)
  return { wrapper, input }
}
