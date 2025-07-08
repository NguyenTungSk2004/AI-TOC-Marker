import { BaseChatPlatform } from './basePlatform';
import { QAGroup, TOCHeading } from '../../types/toc.types';
import { ChatPlatform } from '../../constants/chatgptUrls';

/**
 * Implementation cho ChatGPT platform
 * Xử lý DOM structure cụ thể của chat.openai.com và chatgpt.com
 */
export class ChatGPTPlatform extends BaseChatPlatform {
  constructor() {
    super(ChatPlatform.CHATGPT);
  }

  /**
   * Extract TOC từ ChatGPT conversation
   * ChatGPT sử dụng structure: conversation-turn containers với user/assistant roles
   */
  extractTOC(): QAGroup[] {
    const result: QAGroup[] = [];
    const turns = Array.from(document.querySelectorAll("div.group\\/conversation-turn"));
    let tocIndex = 0;

    // Duyệt qua các conversation turns theo cặp (user + assistant)
    for (let i = 0; i < turns.length - 1; i++) {
      const userTurn = turns[i];
      const assistantTurn = turns[i + 1];

      // Tìm user và assistant message trong các turn
      const userRole = userTurn.querySelector('[data-message-author-role="user"]');
      const assistantRole = assistantTurn.querySelector('[data-message-author-role="assistant"]');

      if (!userRole || !assistantRole) continue;

      // Extract question từ user message
      const question = userRole.querySelector(".whitespace-pre-wrap")?.textContent?.trim() || "";

      // Extract headings từ assistant response
      const headings = this.extractHeadingsFromAssistantResponse(assistantRole, tocIndex);

      if (headings.headings.length > 0) {
        result.push({ question, headings: headings.headings });
        tocIndex = headings.nextIndex;
      }

      i++; // Skip assistant turn trong iteration tiếp theo
    }

    return result;
  }

  /**
   * Extract headings từ assistant response
   * ChatGPT render markdown trong div.markdown containers
   */
  private extractHeadingsFromAssistantResponse(assistantElement: Element, startIndex: number): { headings: TOCHeading[], nextIndex: number } {
    const headings: TOCHeading[] = [];
    let currentH2: TOCHeading | null = null;
    let currentH3: TOCHeading | null = null;
    let tocIndex = startIndex;

    // ChatGPT specific selector cho markdown headings
    const headingElements = assistantElement.querySelectorAll("div.markdown h2, div.markdown h3, div.markdown h4");
    
    headingElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;

      const tag = el.tagName.toLowerCase();
      const tocId = this.createTOCId(tocIndex++);
      this.addTOCAttributes(el, tocId);

      const headingObj: TOCHeading = { title: text, id: tocId };

      // Tạo hierarchical structure
      if (tag === "h2") {
        currentH2 = { ...headingObj, children: [] };
        headings.push(currentH2);
        currentH3 = null;
      } else if (tag === "h3") {
        const h3Item = { ...headingObj, children: [] };
        if (currentH2) {
          currentH2.children!.push(h3Item);
        } else {
          headings.push(h3Item);
        }
        currentH3 = h3Item;
      } else if (tag === "h4") {
        if (currentH3) {
          currentH3.children!.push(headingObj);
        } else if (currentH2) {
          currentH2.children!.push(headingObj);
        } else {
          headings.push(headingObj);
        }
      }
    });

    return { headings, nextIndex: tocIndex };
  }
}
