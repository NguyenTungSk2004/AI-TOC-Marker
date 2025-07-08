import { QAGroup } from '../../types/toc.types'
import { platformFactory } from '../platforms/platformFactory'

/**
 * Main function để extract TOC từ conversation
 * Sử dụng platform factory để tự động detect platform và áp dụng logic phù hợp
 *
 * Flow:
 * 1. Detect platform hiện tại (ChatGPT/Grok)
 * 2. Sử dụng platform-specific extraction logic
 * 3. Trả về QAGroup[] với hierarchical TOC structure
 */
export function extractTOCByQA(): QAGroup[] {
  // Lấy platform instance từ factory
  const platform = platformFactory.getCurrentPlatform()

  if (!platform) {
    console.warn('[TOC] Không phát hiện được platform hỗ trợ cho URL:', window.location.href)
    return []
  }

  try {
    // Extract TOC sử dụng platform-specific logic
    const result = platform.extractTOC()

    console.log(
      `[TOC] Extract thành công ${result.length} TOC groups từ ${platformFactory.getCurrentPlatformType()}`,
    )
    return result
  } catch (error) {
    console.error('[TOC] Lỗi khi extract TOC:', error)
    return []
  }
}
