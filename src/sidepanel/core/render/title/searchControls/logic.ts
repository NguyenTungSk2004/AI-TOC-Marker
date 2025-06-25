// title/searchControls/logic.ts

export function setupSearchLogic({
  input,
  navBar,
  prevBtn,
  nextBtn,
  counter,
}: {
  input: HTMLInputElement;
  navBar: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  counter: HTMLSpanElement;
}) {
  let results: HTMLElement[] = [];
  let currentIndex = -1;

  function updateButtons() {
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= results.length - 1;
    counter.textContent = results.length > 0 ? `🔎 ${currentIndex + 1} / ${results.length} kết quả` : '';
    navBar.style.display = results.length > 0 ? 'flex' : 'none';
  }

  function highlightCurrent() {
    results.forEach((el) => el.classList.remove('ring', 'ring-yellow-400', 'rounded'));

    if (results[currentIndex]) {
      const el = results[currentIndex];

      const headingList = el.closest('[data-toc-heading-list]') as HTMLElement;
      if (headingList && headingList.style.display === 'none') {
        headingList.style.display = 'block';
      }

      const headerEl = document.querySelector('.fixed');
      const offset = headerEl ? headerEl.getBoundingClientRect().height + 10 : 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      el.classList.add('ring', 'ring-yellow-400', 'rounded');
    }

    updateButtons();
  }

  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      results = [];
      currentIndex = -1;
      updateButtons();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const keyword = input.value.trim().toLowerCase();
      if (!keyword) {
        results = [];
        currentIndex = -1;
        updateButtons();
        return;
      }

      results = [];

      document.querySelectorAll('[data-group-key]').forEach((el) => {
        if (el.textContent?.toLowerCase().includes(keyword)) {
          results.push(el as HTMLElement);
        }
      });

      document.querySelectorAll('[data-toc-heading-list] span').forEach((el) => {
        if (el.textContent?.toLowerCase().includes(keyword)) {
          results.push(el as HTMLElement);
        }
      });

      currentIndex = results.length ? 0 : -1;
      if (results.length === 0) {
        alert('Không tìm thấy kết quả phù hợp!');
      } else {
        highlightCurrent();
      }
    }
  });

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      highlightCurrent();
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < results.length - 1) {
      currentIndex++;
      highlightCurrent();
    }
  };
}
