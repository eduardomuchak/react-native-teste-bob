import type { ReactNode } from 'react';
export interface ToastProps extends IToast {
  onDismiss: (toastId: string) => void;
}

export interface IToast extends ToastEventHandlers, ToastOptions {
  id: string;
  message: string;
  type: ToastFeedbackType;
}

export interface ToastHandler {
  error(message: unknown, options?: ToastOptions): void;
  success(message: unknown, options?: ToastOptions): void;
  info(message: unknown, options?: ToastOptions): void;
  notify(message: unknown, options?: ToastOptions): void;
}

export interface ToastEventHandlers {
  onPress?(): void;
  onHide?(): void;
  onShow?(): void;
}

export interface ToastOptions extends ToastEventHandlers {
  title?: string;
  autoHide?: boolean;
  time?: number;
  position?: 'bottom' | 'top';
}

export type ToastFeedbackType = 'success' | 'error' | 'info' | 'notify';

export type FeedbackTypeLiterals = Record<ToastFeedbackType, string>;

export interface ContainerPositionProps {
  position: ToastOptions['position'];
  children: ReactNode;
}
