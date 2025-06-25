import { createHeadingsList } from './ui';

export function renderHeadings(headings: TOCHeading[]): HTMLUListElement {
  return createHeadingsList(headings);
}
