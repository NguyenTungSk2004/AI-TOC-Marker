import { BaseChatPlatform } from './basePlatform';
import { QAGroup, TOCHeading } from '../../types/toc.types';
import { ChatPlatform } from '../../constants/chatgptUrls';

/**
 * Implementation cho Grok platform
 * Xử lý DOM structure cụ thể của x.ai/grok
 * Grok có structure khác biệt với ChatGPT, sử dụng flex containers
 */
export class GrokPlatform extends BaseChatPlatform {
  constructor() {
    super(ChatPlatform.GROK);
  }

  /**
   * Extract TOC từ Grok conversation
   * Grok sử dụng .flex.flex-col.items-center containers cho messages
   * DOM structure: user message bubble -> assistant response với markdown content
   */
  extractTOC(): QAGroup[] {
    const result: QAGroup[] = [];
    let tocIndex = 0;

    // Tìm tất cả message containers trong Grok
    const allMessages = Array.from(document.querySelectorAll('.flex.flex-col.items-center'));
    
    // Ghép messages thành các cặp user-assistant
    const messagePairs = this.findUserAssistantPairs(allMessages);

    // Xử lý từng cặp message
    for (const pair of messagePairs) {
      if (!pair.user || !pair.assistant) continue;

      // Extract question từ user message
      const question = this.extractUserQuestion(pair.user);

      // Extract headings từ assistant response
      const headings = this.extractAssistantHeadings(pair.assistant, tocIndex);
      
      if (headings.headings.length > 0) {
        result.push({ question, headings: headings.headings });
        tocIndex = headings.nextIndex;
      }
    }

    console.log(`[TOC] Grok: Tìm thấy ${messagePairs.length} cặp tin nhắn, extract được ${result.length} TOC groups`);
    return result;
  }

  /**
   * Tìm và ghép các message thành cặp user-assistant
   * Grok có thể có structure phức tạp nên cần algorithm smart
   */
  private findUserAssistantPairs(allMessages: Element[]): { user: Element | null, assistant: Element | null }[] {
    const pairs: { user: Element | null, assistant: Element | null }[] = [];
    
    for (let i = 0; i < allMessages.length - 1; i++) {
      const current = allMessages[i];
      const next = allMessages[i + 1];
      
      // Kiểm tra xem current có phải user message và next có phải assistant không
      const currentIsUser = current.querySelector('.message-bubble .whitespace-pre-wrap');
      const nextIsAssistant = next.querySelector('.response-content-markdown');
      
      if (currentIsUser && nextIsAssistant) {
        pairs.push({ user: current, assistant: next });
        i++; // Skip assistant message trong iteration tiếp theo
      }
    }
    
    return pairs;
  }

  /**
   * Extract question text từ user message
   * Grok user messages nằm trong .message-bubble containers
   */
  private extractUserQuestion(userElement: Element): string {
    const userText = userElement.querySelector('.message-bubble .whitespace-pre-wrap');
    return userText?.textContent?.trim() || '';
  }

  /**
   * Extract headings từ assistant response
   * Grok assistant responses có .response-content-markdown containers
   */
  private extractAssistantHeadings(assistantElement: Element, startIndex: number): { headings: TOCHeading[], nextIndex: number } {
    const assistantContent = assistantElement.querySelector('.response-content-markdown');
    if (!assistantContent) {
      return { headings: [], nextIndex: startIndex };
    }

    // Sử dụng base class method để extract headings
    return this.extractHeadingsFromContent(assistantContent, startIndex);
  }
}
