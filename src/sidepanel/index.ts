import './index.css';
import { setupTOCMessageHandler } from './core/messageHandler';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!;
  const main = document.createElement('main');
  main.className = 'space-y-6';
  app.appendChild(main);

  setupTOCMessageHandler(main);
});
