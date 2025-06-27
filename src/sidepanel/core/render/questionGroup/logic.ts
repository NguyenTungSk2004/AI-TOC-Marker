import { tocState } from "../../state/tocState";

interface ToggleParams {
  questionEl: HTMLElement;
  headingsList: HTMLElement;
  key: string;
}

export function toggleGroupVisibility({ questionEl, headingsList, key }: ToggleParams) {
  const visible = headingsList.style.display === 'block';
  headingsList.style.display = visible ? 'none' : 'block';
  questionEl.setAttribute('aria-expanded', (!visible).toString());
  tocState.toggle(key, !visible);
}
