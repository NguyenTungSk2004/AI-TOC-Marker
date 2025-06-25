import { tocState } from '../../../state/tocState';

export function bindButtonGroupLogic(controls: {
  btnCollapseAll: HTMLButtonElement;
  btnExpandAll: HTMLButtonElement;
  btnScrollTop: HTMLButtonElement;
  btnScrollBottom: HTMLButtonElement;
}) {
  const { btnCollapseAll, btnExpandAll, btnScrollTop, btnScrollBottom } = controls;

  btnCollapseAll.onclick = () => {
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    tocState.closeAll();
  };

  btnExpandAll.onclick = () => {
    const keys: string[] = [];
    document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
      (el as HTMLElement).style.display = 'block';
      const groupEl = el.closest('[data-group-key]');
      if (groupEl) keys.push(groupEl.getAttribute('data-group-key')!);
    });
    tocState.openAll(keys);
  };

  btnScrollTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  btnScrollBottom.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
