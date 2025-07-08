export function createHeaderTwoCol(elLeft: HTMLElement, elRight: HTMLElement): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'mt-4 w-full flex justify-between items-center gap-2 px-0'
  wrapper.style.paddingLeft = '0'
  wrapper.style.paddingRight = '0'

  const left = document.createElement('div')
  left.className = 'flex items-center gap-2'

  const right = document.createElement('div')
  right.className = 'flex items-center gap-2'

  left.append(elLeft)
  right.append(elRight)
  wrapper.append(left, right)
  return wrapper
}
