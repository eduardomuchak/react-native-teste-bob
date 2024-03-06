import type { ToastHandler, ToastOptions } from './toast-types';

export const toast: ToastHandler = {
  error: function (_message: string, _options: ToastOptions): void {},
  success: function (_message: string, _options: ToastOptions): void {},
  notify: function (_message: string, _options: ToastOptions): void {},
  info: function (_message: string, _options: ToastOptions): void {},
};
