import { tocState } from "../../../../state/tocState";

interface ToggleParams {
  groupEl: HTMLElement;
  headingsList: HTMLElement;
  key: string;
}

export function toggleGroupVisibility({ groupEl, headingsList, key }: ToggleParams) {
  const visible = headingsList.style.display === 'block';
  headingsList.style.display = visible ? 'none' : 'block';
  groupEl.setAttribute('aria-expanded', (!visible).toString());
  tocState.toggle(key, !visible);
}