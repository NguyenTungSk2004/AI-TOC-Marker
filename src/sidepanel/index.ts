import { setupTOCMessageHandler } from './core/handlers/tocMessageHandler';
import { createFooter } from './core/render/footer';
import { createHeader } from './core/render/header';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;
  const main = document.createElement('main');
  const header = createHeader();
  const footer = createFooter();

  main.className = 'space-y-6';

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);

  setupTOCMessageHandler(main);
});
