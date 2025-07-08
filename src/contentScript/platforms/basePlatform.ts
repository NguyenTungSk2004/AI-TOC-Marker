import { QAGroup, TOCHeading } from '../../types/toc.types';
import { ChatPlatform } from '../../constants/chatgptUrls';

/**
 * Abstract base class cho tất cả các platform chatbot
 * Định nghĩa interface chung và các utility methods
 */
export abstract class BaseChatPlatform {
  protected platform: ChatPlatform;

  constructor(platform: ChatPlatform) {
    this.platform = platform;
  }

  // Abstract methods - mỗi platform cần implement riêng
  abstract extractTOC(): QAGroup[];

  /**
   * Tạo ID duy nhất cho TOC heading
   */
  protected createTOCId(index: number): string {
    return `toc-${this.platform}-${index}`;
  }

  /**
   * Thêm attributes cho heading element để hỗ trợ highlighting và scroll
   */
  protected addTOCAttributes(element: Element, id: string): void {
    element.setAttribute('id', id);
    element.setAttribute('data-toc-highlight', '');
    element.setAttribute('data-platform', this.platform);
  }

  /**
   * Extract headings từ content element và tạo hierarchical structure
   * Hỗ trợ 3 levels: H2 -> H3 -> H4
   */
  protected extractHeadingsFromContent(content: Element, startIndex: number): { headings: TOCHeading[], nextIndex: number } {
    const headings: TOCHeading[] = [];
    let currentH2: TOCHeading | null = null;
    let currentH3: TOCHeading | null = null;
    let tocIndex = startIndex;

    const headingElements = content.querySelectorAll('h2, h3, h4');
    
    headingElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;

      const tag = el.tagName.toLowerCase();
      const tocId = this.createTOCId(tocIndex++);
      this.addTOCAttributes(el, tocId);

      const headingObj: TOCHeading = { title: text, id: tocId };

      // Tạo cấu trúc phân cấp H2 > H3 > H4
      if (tag === 'h2') {
        currentH2 = { ...headingObj, children: [] };
        headings.push(currentH2);
        currentH3 = null; // Reset H3 khi gặp H2 mới
      } else if (tag === 'h3') {
        const h3Item = { ...headingObj, children: [] };
        if (currentH2) {
          currentH2.children!.push(h3Item);
        } else {
          headings.push(h3Item); // H3 orphan
        }
        currentH3 = h3Item;
      } else if (tag === 'h4') {
        if (currentH3) {
          currentH3.children!.push(headingObj);
        } else if (currentH2) {
          currentH2.children!.push(headingObj);
        } else {
          headings.push(headingObj); // H4 orphan
        }
      }
    });

    return { headings, nextIndex: tocIndex };
  }
}
