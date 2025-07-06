import { tocState } from "@sidepanel/state/tocState";

interface ToggleParams {
  groupEl: HTMLElement;
  headingsList: HTMLElement;
  key: string;
}

export function toggleGroupVisibility({ groupEl, headingsList, key }: ToggleParams) {
  const isHidden = headingsList.classList.toggle('hidden');
  groupEl.setAttribute('aria-expanded', (!isHidden).toString());
  tocState.toggle(key, !isHidden);
}