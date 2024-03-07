/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ToastHandler, ToastOptions } from './toast-types'

export const toast: ToastHandler = {
  error: function (_message: string, _options: ToastOptions) {},
  success: function (_message: string, _options: ToastOptions) {},
  notify: function (_message: string, _options: ToastOptions) {},
  info: function (_message: string, _options: ToastOptions) {}
}
