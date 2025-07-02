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
});
