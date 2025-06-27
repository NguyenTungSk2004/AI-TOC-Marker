export function createFooter(main: HTMLElement) {
      // === Góp ý + Khảo sát ===
  const survey = document.createElement('div');
  survey.id = 'toc-survey';
  survey.className = 'text-sm text-gray-300 flex items-center whitespace-nowrap ml-1 text-ellipsis leading-none fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 z-50 px-6 py-2';
  survey.innerHTML = `
    <span style="font-size: inherit; font-family: inherit;">Bạn có góp ý gì không?</span>
    <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSenVrkHtZwrhJkt-K-TbjFaImE9Ue6EYEq-SXI3Qwwzf-fttA/viewform?usp=sharing" 
        target="_blank" 
        class="text-blue-400 underline hover:text-blue-300 ml-1"
        style="font-size: inherit; font-family: inherit;"
    >
        📝 Khảo sát
    </a>`;

  main.appendChild(survey);
}