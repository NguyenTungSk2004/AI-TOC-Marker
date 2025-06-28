export function createTitleBlock(): HTMLDivElement {
  const titleBlock = document.createElement('div');
  titleBlock.className = `
    flex items-center gap-2 text-yellow-400 text-xl font-bold uppercase tracking-wide leading-none h-[28px]
  `;
  titleBlock.innerHTML = `📑 <span class="truncate">CONVERSATION TOC</span>`;
  return titleBlock;
}
