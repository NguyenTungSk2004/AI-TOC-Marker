import { BaseChatPlatform } from './basePlatform'
import { QAGroup, TOCHeading } from '../../types/toc.types'
import { ChatPlatform } from '../../constants/chatgptUrls'

/**
 * Implementation cho ChatGPT platform
 * Xử lý DOM structure cụ thể của chat.openai.com và chatgpt.com
 */
export class ChatGPTPlatform extends BaseChatPlatform {
  constructor() {
    super(ChatPlatform.CHATGPT)
  }

  /**
   * Extract TOC từ ChatGPT conversation
   * ChatGPT sử dụng structure: conversation-turn containers với user/assistant roles
   */
  extractTOC(): QAGroup[] {
    const result: QAGroup[] = []
    const turns = Array.from(document.querySelectorAll('article[data-turn]'))
    let tocIndex = 0

    // Duyệt qua các conversation turns theo cặp (user + assistant)
    for (let i = 0; i < turns.length - 1; i++) {
      const userTurn = turns[i]
      const assistantTurn = turns[i + 1]

      // Tìm user và assistant message elements
      const userElement = userTurn.querySelector(
        '[data-message-author-role="user"] .whitespace-pre-wrap',
      )
      const assistantElement = assistantTurn.querySelector('[data-message-author-role="assistant"]')

      if (!userElement || !assistantElement) continue

      // Extract question từ user message
      const question = userElement.textContent?.trim() || ''

      // Extract headings từ assistant response
      const headings = this.extractHeadingsFromAssistantResponse(assistantElement, tocIndex)

      if (headings.headings.length > 0) {
        result.push({ question, headings: headings.headings })
        tocIndex = headings.nextIndex
      }

      i++ // Skip assistant turn trong iteration tiếp theo
    }

    return result
  }

  /**
   * Extract headings từ assistant response
   * ChatGPT render markdown trong div.markdown containers
   */
  private extractHeadingsFromAssistantResponse(
    assistantElement: Element,
    startIndex: number,
  ): { headings: TOCHeading[]; nextIndex: number } {
    // Tìm markdown container trong ChatGPT assistant response
    const markdownContainer = assistantElement.querySelector('div.markdown')
    if (!markdownContainer) {
      return { headings: [], nextIndex: startIndex }
    }

    // Sử dụng base class method với ChatGPT-specific container
    return this.extractHeadingsFromContent(markdownContainer, startIndex)
  }
}
