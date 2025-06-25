import { handleHeadingClick } from './logic';

export function createHeadingsList(headings: TOCHeading[]): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.className = 'ml-4 pl-3 border-l border-gray-700 space-y-1 text-left';

  headings.forEach((h) => {
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.textContent = h.title;
    span.className =
      'inline-block text-sm text-gray-300 hover:text-white px-2 py-1 cursor-pointer hover:bg-gray-700 rounded transition';

    if (h.id) {
      span.onclick = (e) => handleHeadingClick(e, h.id);
    }

    li.appendChild(span);

    if (h.children && h.children.length > 0) {
      const subList = createHeadingsList(h.children);
      subList.classList.add('ml-4', 'mt-1');
      li.appendChild(subList);
    }

    ul.appendChild(li);
  });

  return ul;
}
