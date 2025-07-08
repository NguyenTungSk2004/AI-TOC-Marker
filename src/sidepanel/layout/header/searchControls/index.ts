import { showInfo, showSuccess, showWarning } from '@utils/toast.utils'
import { createNavBar } from './components/createNavBar'
import { createSearchButton } from './components/createSearchButton'
import { createSearchInput } from './components/createSearchInput'
import { highlightCurrent, triggerSearch } from './events/searchActions'
import { searchState } from '@sidepanel/state/searchState'

export function createTocSearchInput(): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'mt-4 flex flex-col items-center gap-2 w-full'

  const formWrapper = document.createElement('div')
  formWrapper.className = 'w-full max-w-2xl flex gap-2'

  const { wrapper: inputWrapper, input } = createSearchInput()
  const searchBtn = createSearchButton()
  const { navBar, prevBtn, nextBtn, counter } = createNavBar()

  function resetSearch() {
    const keyword = input.value.trim()

    if (!keyword) {
      showInfo('Vui lòng nhập từ khóa tìm kiếm.')
      return
    }

    // Nếu keyword đã thay đổi → trigger tìm kiếm mới
    const isNewKeyword = keyword !== searchState.keyword

    if (isNewKeyword || searchState.results.length === 0) {
      searchState.keyword = keyword // Cập nhật từ khóa tìm kiếm
      triggerSearch(keyword, prevBtn, nextBtn, counter, navBar)

      if (searchState.results.length === 0) {
        showWarning('Không tìm thấy kết quả phù hợp!')
      } else {
        showSuccess(`Tìm thấy ${searchState.results.length} kết quả phù hợp!`)
      }
    } else {
      // Từ khóa cũ → điều hướng trong kết quả
      if (searchState.currentIndex < searchState.results.length - 1) {
        searchState.next()
        highlightCurrent(prevBtn, nextBtn, counter, navBar)
      } else {
        showInfo('Đã đến kết quả cuối cùng.')
      }
    }
  }

  input.addEventListener('input', () => {
    const keyword = input.value.trim()
    if (!keyword) {
      triggerSearch('', prevBtn, nextBtn, counter, navBar)
      return
    }
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      resetSearch()
    }
  })

  searchBtn.onclick = () => {
    resetSearch()
  }

  prevBtn.onclick = () => {
    searchState.prev()
    highlightCurrent(prevBtn, nextBtn, counter, navBar)
  }

  nextBtn.onclick = () => {
    searchState.next()
    highlightCurrent(prevBtn, nextBtn, counter, navBar)
  }

  formWrapper.append(inputWrapper, searchBtn)
  wrapper.append(formWrapper, navBar)

  return wrapper
}
