export function createSearchUI(): {
  wrapper: HTMLElement;
  input: HTMLInputElement;
  navBar: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  counter: HTMLSpanElement;
  searchBtn: HTMLButtonElement;
} {
  const wrapper = document.createElement('div');
  wrapper.className = 'mt-4 flex flex-col items-center gap-2 w-full';

  // Input group
  const formWrapper = document.createElement('div');
  formWrapper.className = 'w-full max-w-2xl flex gap-2';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'relative flex-1';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Tìm từ khóa trong tiêu đề Qx hoặc heading...';
  input.className =
    'w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow';

  const icon = document.createElement('span');
  icon.textContent = '🔍';
  icon.className = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none';

  inputWrapper.append(icon, input);

  const searchBtn = document.createElement('button');
  searchBtn.textContent = '🔍 Tìm kiếm';
  searchBtn.className =
    'px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-500 rounded shadow transition';

  formWrapper.append(inputWrapper, searchBtn);

  // Nav bar
  const navBar = document.createElement('div');
  navBar.className =
    'flex items-center justify-between w-full max-w-2xl px-4 py-3 rounded-xl ' +
    'bg-gray-700 border border-gray-600 shadow-md mt-2 transition-all duration-300';
  navBar.style.display = 'none';

  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  const counter = document.createElement('span');

  [prevBtn, nextBtn].forEach((btn) => {
    btn.className =
      'px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 shadow transition';
  });

  prevBtn.textContent = '⬅️ Trước';
  nextBtn.textContent = '➡️ Sau';

  counter.className = 'text-sm text-purple-300 font-medium tracking-wide';

  navBar.append(prevBtn, counter, nextBtn);
  wrapper.append(formWrapper, navBar);

  return { wrapper, input, navBar, prevBtn, nextBtn, counter, searchBtn };
}
