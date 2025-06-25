interface ToggleParams {
  questionEl: HTMLElement;
  headingsList: HTMLElement;
  key: string;
  tocState: any;
}

export function toggleGroupVisibility({ questionEl, headingsList, key, tocState }: ToggleParams) {
  const visible = headingsList.style.display === 'block';
  headingsList.style.display = visible ? 'none' : 'block';
  questionEl.setAttribute('aria-expanded', (!visible).toString());
  tocState.toggle(key, !visible);
}
