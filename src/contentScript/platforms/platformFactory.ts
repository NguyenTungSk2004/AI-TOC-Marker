import { BaseChatPlatform } from './basePlatform'
import { ChatGPTPlatform } from './chatgptPlatform'
import { GrokPlatform } from './grokPlatform'
import { ChatPlatform, detectChatPlatform } from '../../constants/chatgptUrls'

/**
 * Singleton Factory để quản lý platform instances
 * Tự động detect platform dựa trên URL và tạo platform phù hợp
 * Cache platform instance để tối ưu performance
 */
export class PlatformFactory {
  private static instance: PlatformFactory
  private currentPlatform: BaseChatPlatform | null = null
  private currentUrl: string = ''

  private constructor() {}

  /**
   * Singleton pattern - chỉ có 1 instance duy nhất
   */
  static getInstance(): PlatformFactory {
    if (!PlatformFactory.instance) {
      PlatformFactory.instance = new PlatformFactory()
    }
    return PlatformFactory.instance
  }

  /**
   * Lấy platform instance hiện tại
   * Tự động detect và cache nếu URL thay đổi
   */
  getCurrentPlatform(): BaseChatPlatform | null {
    const currentUrl = window.location.href

    // Nếu URL không đổi và đã có platform, trả về platform cũ
    if (currentUrl === this.currentUrl && this.currentPlatform) {
      return this.currentPlatform
    }

    // URL thay đổi -> detect platform mới
    this.currentUrl = currentUrl
    this.currentPlatform = this.createPlatformInstance(currentUrl)

    return this.currentPlatform
  }

  /**
   * Tạo platform instance dựa trên URL
   */
  private createPlatformInstance(url: string): BaseChatPlatform | null {
    const platformType = detectChatPlatform(url)

    switch (platformType) {
      case ChatPlatform.CHATGPT:
        return new ChatGPTPlatform()
      case ChatPlatform.GROK:
        return new GrokPlatform()
      default:
        console.warn(`[TOC] Platform không được hỗ trợ: ${url}`)
        return null
    }
  }

  /**
   * Lấy platform type hiện tại
   */
  getCurrentPlatformType(): ChatPlatform {
    return detectChatPlatform(window.location.href)
  }

  /**
   * Kiểm tra platform hiện tại có được hỗ trợ không
   */
  isSupported(): boolean {
    return this.getCurrentPlatform() !== null
  }

  /**
   * Reset factory state - dùng khi URL thay đổi
   */
  reset(): void {
    this.currentPlatform = null
    this.currentUrl = ''
  }
}

// Export singleton instance để sử dụng trong toàn bộ app
export const platformFactory = PlatformFactory.getInstance()
