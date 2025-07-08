import { ChatPlatform } from '../../constants/chatgptUrls'

interface PlatformState {
  currentPlatform: ChatPlatform
  currentUrl: string
  lastUpdated: number
}

const PLATFORM_STORAGE_KEY = 'platformState'

export const platformState = {
  currentPlatform: ChatPlatform.UNKNOWN,
  currentUrl: '',
  lastUpdated: 0,

  load: () => {
    const raw = localStorage.getItem(PLATFORM_STORAGE_KEY)
    if (raw) {
      try {
        const state: PlatformState = JSON.parse(raw)
        platformState.currentPlatform = state.currentPlatform || ChatPlatform.UNKNOWN
        platformState.currentUrl = state.currentUrl || ''
        platformState.lastUpdated = state.lastUpdated || 0
      } catch (error) {
        console.error('Error parsing platform state from localStorage:', error)
        platformState.reset()
      }
    }
  },

  save: () => {
    const state: PlatformState = {
      currentPlatform: platformState.currentPlatform,
      currentUrl: platformState.currentUrl,
      lastUpdated: Date.now(),
    }
    localStorage.setItem(PLATFORM_STORAGE_KEY, JSON.stringify(state))
  },

  update: (platform: ChatPlatform, url: string) => {
    platformState.currentPlatform = platform
    platformState.currentUrl = url
    platformState.lastUpdated = Date.now()
    platformState.save()
  },

  reset: () => {
    platformState.currentPlatform = ChatPlatform.UNKNOWN
    platformState.currentUrl = ''
    platformState.lastUpdated = 0
    platformState.save()
  },

  isValid: () => {
    return platformState.currentPlatform !== ChatPlatform.UNKNOWN && platformState.currentUrl !== ''
  },

  getPlatformName: () => {
    switch (platformState.currentPlatform) {
      case ChatPlatform.CHATGPT:
        return 'ChatGPT'
      case ChatPlatform.GROK:
        return 'Grok'
      default:
        return 'Unknown'
    }
  },
}

// Load state on module initialization
platformState.load()
