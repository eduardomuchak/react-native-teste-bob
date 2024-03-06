import { StyleSheet } from 'react-native';

import { theme } from '../../theme';
import type { TextProps } from './text-component';

export const text = ({
  color,
  fontSize,
  textAlign,
  fontWeight,
  letterSpacing,
}: TextProps) => {
  return StyleSheet.create({
    text: {
      color,
      textAlign,
      letterSpacing,
      fontSize: theme.fontSizes[fontSize ?? 'md'],
      fontFamily: theme.fontWeight[fontWeight ?? 'semiBold'],
      includeFontPadding: false,
    },
  }).text;
};

export const styles = {
  text,
};
