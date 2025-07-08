export const CHAT_BOT_URLS = [
  "chat.openai.com",
  "chatgpt.com",
  "grok.com",
];

export const CHAT_BOT_MATCH_PATTERNS = CHAT_BOT_URLS.map(url => `*://${url}/*`);