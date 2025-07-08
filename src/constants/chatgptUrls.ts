/**
 * Định nghĩa các platform chatbot được hỗ trợ
 */
export enum ChatPlatform {
  CHATGPT = 'chatgpt',
  GROK = 'grok',
  UNKNOWN = 'unknown'
}

/**
 * Cấu hình cho từng platform chatbot
 * Bao gồm URL patterns và domains để nhận diện chính xác platform
 */
export const CHAT_BOT_CONFIGS = {
  [ChatPlatform.CHATGPT]: {
    patterns: [
      /^https:\/\/chat\.openai\.com\/.*/,
      /^https:\/\/chatgpt\.com\/.*/
    ],
    domains: ['chat.openai.com', 'chatgpt.com']
  },
  [ChatPlatform.GROK]: {
    patterns: [
      /^https:\/\/x\.ai\/grok.*/,  // Grok thực tế sử dụng x.ai/grok
      /^https:\/\/grok\.com\/.*/
    ],
    domains: ['x.ai', 'grok.com']
  }
};

// Tạo danh sách domains để sử dụng trong manifest
export const CHAT_BOT_URLS = Object.values(CHAT_BOT_CONFIGS)
  .flatMap(config => config.domains);

// Tạo match patterns cho content scripts
export const CHAT_BOT_MATCH_PATTERNS = CHAT_BOT_URLS.map(url => `*://${url}/*`);

/**
 * Phát hiện platform dựa trên URL hiện tại
 * Sử dụng regex patterns để nhận diện chính xác
 */
export function detectChatPlatform(url: string): ChatPlatform {
  for (const [platform, config] of Object.entries(CHAT_BOT_CONFIGS)) {
    if (config.patterns.some(pattern => pattern.test(url))) {
      return platform as ChatPlatform;
    }
  }
  return ChatPlatform.UNKNOWN;
}

/**
 * Kiểm tra xem URL có phải là chatbot được hỗ trợ không
 */
export function isChatBotUrl(url: string): boolean {
  return detectChatPlatform(url) !== ChatPlatform.UNKNOWN;
}
