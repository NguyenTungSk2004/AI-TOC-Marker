import { BaseChatPlatform } from './basePlatform'
import { QAGroup, TOCHeading } from '../../types/toc.types'
import { ChatPlatform } from '../../constants/chatgptUrls'

/**
 * Implementation cho Grok platform
 * Xử lý DOM structure cụ thể của x.ai/grok
 * Grok có structure khác biệt với ChatGPT, sử dụng flex containers
 */
export class GrokPlatform extends BaseChatPlatform {
  constructor() {
    super(ChatPlatform.GROK)
  }

  /**
   * Extract TOC từ Grok conversation
   * Grok sử dụng .flex.flex-col.items-center containers cho messages
   * DOM structure: user message bubble -> assistant response với markdown content
   */
  extractTOC(): QAGroup[] {
    const result: QAGroup[] = [];
    const turns = Array.from(document.querySelectorAll('.flex.flex-col.items-center'));
    let tocIndex = 0;

    // Duyệt qua các conversation turns theo cặp (user + assistant)
    for (let i = 0; i < turns.length - 1; i++) {
      const userTurn = turns[i];
      const assistantTurn = turns[i + 1];

      // Tìm user và assistant message elements
      const userElement = userTurn.querySelector('.message-bubble .whitespace-pre-wrap');
      const assistantElement = assistantTurn.querySelector('.response-content-markdown');

      if (!userElement || !assistantElement) continue;

      // Extract question từ user message
      const question = userElement.textContent?.trim() || "";

      // Extract headings từ assistant response
      const headings = this.extractHeadingsFromAssistantResponse(assistantTurn, tocIndex);

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
   * Grok assistant responses có .response-content-markdown containers
   */
  private extractHeadingsFromAssistantResponse(assistantElement: Element, startIndex: number): { headings: TOCHeading[], nextIndex: number } {
    // Tìm response content container trong Grok assistant response
    const markdownContainer = assistantElement.querySelector('.response-content-markdown');
    if (!markdownContainer) {
      return { headings: [], nextIndex: startIndex };
    }

    // Sử dụng base class method với Grok-specific container
    return this.extractHeadingsFromContent(markdownContainer, startIndex);
  }
}
