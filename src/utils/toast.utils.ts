import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

let notyfInstance: Notyf | null = null;
let showCount = 0;
let baseDuration = 1500;
let durationStep = 300;

function getNotyf(): Notyf {
  if (!notyfInstance) {
    notyfInstance = new Notyf({
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
            className: 'fas fa-info-circle',
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

function getDynamicDuration(): number {
  const duration = baseDuration + showCount * durationStep;
  showCount++;
  setTimeout(() => showCount--, duration); // Giảm sau khi thông báo tắt
  return duration;
}

function show(type: string, message: string, options?: any) {
  getNotyf().open({
    type,
    message,
    duration: getDynamicDuration(),
    ...options,
  });
}

export function showSuccess(message: string, options?: any) {
  show('success', message, options);
}

export function showError(message: string, options?: any) {
  show('error', message, options);
}

export function showInfo(message: string, options?: any) {
  show('info', message, options);
}

export function showWarning(message: string, options?: any) {
  show('warning', message, options);
}
