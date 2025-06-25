import { tocState } from "../../../state/tocState";
import {
  createButtonWrapper,
  createButton,
  createButtonGroupContainer
} from './ui';

export function createButtonGroup(): HTMLElement {
  const wrapper = createButtonWrapper();
  const { left, right } = createButtonGroupContainer();

  left.append(
    createButton('🔽 Đóng tất cả', () => {
      document.querySelectorAll('[data-toc-heading-list]').forEach(el => (el as HTMLElement).style.display = 'none');
      tocState.closeAll();
    }),
    createButton('🔼 Mở tất cả', () => {
      const keys: string[] = [];
      document.querySelectorAll('[data-toc-heading-list]').forEach(el => {
        (el as HTMLElement).style.display = 'block';
        const groupEl = el.closest('[data-group-key]');
        if (groupEl) keys.push(groupEl.getAttribute('data-group-key')!);
      });
      tocState.openAll(keys);
    })
  );

  right.append(
    createButton('⬆ Lên đầu', () => window.scrollTo({ top: 0, behavior: 'smooth' })),
    createButton('⬇ Xuống cuối', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
  );

  wrapper.append(left, right);
  return wrapper;
}
