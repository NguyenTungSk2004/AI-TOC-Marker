import { createFooter } from './layout/footer';
import { createHeader } from './layout/header';
import { setupTOCMessageHandler } from './handlers/tocMessageHandler';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;
  const main = document.createElement('main');
  const header = createHeader();
  const footer = createFooter();

  main.id = 'main';
  main.innerHTML = '';
  main.className = `scroll-container h-screen p-3 space-y-3 overflow-y-auto`;

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);

  setupTOCMessageHandler(main);

  // Request current tab platform info immediately when sidepanel opens
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url) {
      chrome.runtime.sendMessage({ 
        type: 'REQUEST_CURRENT_PLATFORM', 
        tabUrl: tabs[0].url,
        tabId: tabs[0].id 
      });
    }
  });
});
