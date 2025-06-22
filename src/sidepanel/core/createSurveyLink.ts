export function createSurveyLink(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'text-sm text-gray-300 text-center mb-1 font-medium';

  container.innerHTML = `
    <span style="font-size: inherit; font-family: inherit;">Bạn có góp ý gì không?</span>
    <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSenVrkHtZwrhJkt-K-TbjFaImE9Ue6EYEq-SXI3Qwwzf-fttA/viewform?usp=sharing" 
        target="_blank" 
        class="text-blue-400 underline hover:text-blue-300"
        style="font-size: inherit; font-family: inherit; margin-left: 4px;"
    >
        📝 Khảo sát
    </a>
  `;
  return container;
}
