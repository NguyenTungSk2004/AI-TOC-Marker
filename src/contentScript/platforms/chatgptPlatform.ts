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
    // Tìm markdown container trong ChatGPT assistant response
    const markdownContainer = assistantElement.querySelector('div.markdown');
    if (!markdownContainer) {
      return { headings: [], nextIndex: startIndex };
    }

    // Sử dụng base class method với ChatGPT-specific container
    return this.extractHeadingsFromContent(markdownContainer, startIndex);
  }
}
