export function createSearchUI(): {
  wrapper: HTMLElement;
  input: HTMLInputElement;
  navBar: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  counter: HTMLSpanElement;
} {
  const wrapper = document.createElement('div');
  wrapper.className = 'mt-4 flex flex-col items-center gap-2 w-full';

  // Input Search
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '🔍 Tìm từ khóa trong tiêu đề Qx hoặc heading...';
  input.className =
    'w-full max-w-2xl px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow transition';

  // Result Navigation Bar
  const navBar = document.createElement('div');
  navBar.className =
    'flex justify-between items-center w-full max-w-2xl px-4 py-2 rounded-lg ' +
    'bg-gray-700 border border-gray-600 shadow mt-1 transition-all duration-300';
  navBar.style.display = 'none';

  // Buttons & Counter
  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  const counter = document.createElement('span');

  const btnStyle =
    'px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 shadow transition';

  prevBtn.textContent = '⬅️ Trước';
  nextBtn.textContent = '➡️ Sau';
  prevBtn.className = btnStyle;
  nextBtn.className = btnStyle;

  counter.className = 'text-sm text-purple-300 font-medium tracking-wide';

  navBar.append(prevBtn, counter, nextBtn);
  wrapper.append(input, navBar);

  return { wrapper, input, navBar, prevBtn, nextBtn, counter };
}
