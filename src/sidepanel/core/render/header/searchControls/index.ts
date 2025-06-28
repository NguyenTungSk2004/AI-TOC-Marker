import { createNavBar } from "./components/createNavBar";
import { createSearchButton } from "./components/createSearchButton";
import { createSearchInput } from "./components/createSearchInput";
import { clearHighlights, highlightCurrent, triggerSearch, updateButtons } from "./events/searchActions";
import { searchState } from "./events/searchState";

export function createTocSearchInput(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'mt-4 flex flex-col items-center gap-2 w-full';

  const formWrapper = document.createElement('div');
  formWrapper.className = 'w-full max-w-2xl flex gap-2';

  const { wrapper: inputWrapper, input } = createSearchInput();
  const searchBtn = createSearchButton();
  const { navBar, prevBtn, nextBtn, counter } = createNavBar();
  
  input.addEventListener("input", () => {
      const keyword = input.value.trim();
      if (!keyword) {
        clearHighlights();
        searchState.reset();
        updateButtons(prevBtn, nextBtn, counter, navBar);
      }
    });
  
  let searchDone: boolean = false;
  input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if(searchState.results.length > 0 && searchState.currentIndex !== searchState.results.length - 1) searchDone = true;
        else searchDone = false;
        if (searchDone) {
          searchState.next();
          highlightCurrent(prevBtn, nextBtn, counter, navBar);
        }else{
          triggerSearch(input.value.trim(), prevBtn, nextBtn, counter, navBar);
        }
      }
  });

  searchBtn.onclick = () => {
      if(searchState.results.length > 0 && searchState.currentIndex !== searchState.results.length - 1) searchDone = true;
      else searchDone = false;
      if (searchDone) {
        searchState.next();
        highlightCurrent(prevBtn, nextBtn, counter, navBar);
      }else{
        triggerSearch(input.value.trim(), prevBtn, nextBtn, counter, navBar);
      }
  };
  
  prevBtn.onclick = () => {
    searchState.prev();
    highlightCurrent(prevBtn, nextBtn, counter, navBar);
  };
  
  nextBtn.onclick = () => {
    searchState.next();
    highlightCurrent(prevBtn, nextBtn, counter, navBar);
  };

  formWrapper.append(inputWrapper, searchBtn);
  wrapper.append(formWrapper, navBar);

  return wrapper;
}
  