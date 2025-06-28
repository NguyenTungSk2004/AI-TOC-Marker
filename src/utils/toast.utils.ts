import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

let notyfInstance: Notyf | null = null;

function getNotyf(): Notyf {
  if (!notyfInstance) {
    notyfInstance = new Notyf({
      duration: 2000,
      ripple: true,
      position: {
        x: 'right',
        y: 'top',
      },
      types: [
        {
          type: 'info',
          background: '#2f86eb',
          icon: {
            className: 'fas fa-info-circle', // FontAwesome
            tagName: 'i',
            color: 'white',
          },
        },
        {
          type: 'warning',
          background: '#ffa502',
          icon: {
            className: 'fas fa-exclamation-triangle',
            tagName: 'i',
            color: 'white',
          },
        },
        {
          type: 'error',
          background: '#e74c3c',
          icon: {
            className: 'fas fa-times-circle',
            tagName: 'i',
            color: 'white',
          },
        },
        {
          type: 'success',
          background: '#2ecc71',
          icon: {
            className: 'fas fa-check-circle',
            tagName: 'i',
            color: 'white',
          },
        },
      ],
    });
  }

  return notyfInstance;
}

export function showSuccess(message: string, options?: any) {
  getNotyf().open({ type: 'success', message, ...options });
}

export function showError(message: string, options?: any) {
  getNotyf().open({ type: 'error', message, ...options });
}

export function showInfo(message: string, options?: any) {
  getNotyf().open({ type: 'info', message, ...options });
}

export function showWarning(message: string, options?: any) {
  getNotyf().open({ type: 'warning', message, ...options });
}
