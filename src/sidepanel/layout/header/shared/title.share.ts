import { platformState } from '../../../state/platformState'

export function createTitleBlock(): HTMLDivElement {
  const titleBlock = document.createElement('div')
  titleBlock.className = `
    flex items-center gap-2 text-yellow-400 text-xl font-bold uppercase tracking-wide leading-none h-[28px]
  `

  updateTitleContent(titleBlock)

  return titleBlock
}

export function updateTitleContent(titleBlock: HTMLDivElement): void {
  const platformName = platformState.isValid() ? platformState.getPlatformName() : 'Unknown'
  const platformIcon = getPlatformIcon(platformName)

  titleBlock.innerHTML = `${platformIcon} <span class="truncate">TOC - ${platformName}</span>`
}

function getPlatformIcon(platformName: string): string {
  switch (platformName.toLowerCase()) {
    case 'chatgpt':
      return '🤖'
    case 'grok':
      return '🚀'
    default:
      return '📑'
  }
}
