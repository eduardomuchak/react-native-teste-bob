import { THEME } from '@/theme';

declare global {
  type ResponsiveSize = keyof typeof THEME.sizes;
  interface Number {
    toCurrencyBRL: () => string;
  }
}
