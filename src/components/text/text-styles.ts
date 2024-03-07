import { StyleSheet } from 'react-native'

import { defaultTheme } from '../../theme'

import type { TextProps } from './text-component'

export const text = ({ color, fontSize, textAlign, fontWeight, letterSpacing }: TextProps) => {
  return StyleSheet.create({
    text: {
      color,
      textAlign,
      letterSpacing,
      fontSize: defaultTheme.fontSizes[fontSize ?? 'md'],
      fontFamily: defaultTheme.fontWeight[fontWeight ?? 'semiBold'],
      includeFontPadding: false
    }
  }).text
}

export const styles = {
  text
}
