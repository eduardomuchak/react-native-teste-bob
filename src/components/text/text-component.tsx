import React, { type ReactNode } from 'react'
import { Text as NativeText, type TextProps as NativeTextProps, type TextStyle } from 'react-native'

import { theme } from '../../theme'

import { styles } from './text-styles'

export type TextProps = {
  letterSpacing?: number
  color?: TextStyle['color']
  children?: string | ReactNode
  textAlign?: TextStyle['textAlign']
  fontSize?: keyof typeof theme.fontSizes
  fontWeight?: 'normal' | 'semiBold' | 'bold' | 'extraBold' | 'light'
} & NativeTextProps

export function Text({
  color,
  style,
  children,
  fontSize,
  textAlign,
  fontWeight,
  letterSpacing,
  ...rest
}: TextProps): JSX.Element {
  return (
    <NativeText
      {...rest}
      style={[styles.text({ color, fontSize, fontWeight, textAlign, letterSpacing }), style]}
    >
      {children}
    </NativeText>
  )
}
