import { createFooter } from './layout/footer';
import { createHeader } from './layout/header';
import { setupTOCMessageHandler } from './handlers/tocMessageHandler';
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
