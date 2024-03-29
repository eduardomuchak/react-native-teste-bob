import { Dimensions } from 'react-native'

const fontScale = Dimensions.get('screen').fontScale

export const defaultTheme = {
  colors: {
    primary: {
      100: '#DEF3F3',
      200: '#ACE1E1',
      300: '#1DBAB7',
      350: '#009B94',
      400: '#232731',
      500: '#002023'
    },
    secondary: {
      100: '#fbcdbc',
      200: '#E2F6FC',
      300: '#B5E6F7',
      400: '#F3642D',
      500: '#2BA0F4'
    },
    tertiary: {
      100: '#B0E0EA',
      400: '#239ED9',
      500: '#239EC1'
    },
    green: {
      100: '#E1FFF1',
      500: '#4AE588',
      700: '#388E3C',
      900: '#112000'
    },
    gray: {
      100: '#f8f8f8',
      150: '#F5F5F5',
      200: '#F3F3F3',
      250: '#FAFAFA',
      300: '#ECECEC',
      400: '#EBEBEB',
      500: '#CCCACA',
      600: '#707070',
      650: '#585858',
      700: '#353535',
      800: '#263238',
      disabled: '#D9D9D9'
    },
    orange: {
      500: '#FF7F27'
    },
    blackCoral: '#5C5E64',
    pastelBlue: '#E15252',
    black: '#000000',
    white: '#FFFFFF',
    red: {
      100: '#fce9e8',
      400: '#E15252',
      500: '#e5241a'
    },
    error: '#FC2C00',
    warn: '#FCC400',
    darkWarn: '#FFAE42',
    success: '#0BD307',
    info: '#00B0FC',
    notify: '#F3642D',
    status: {
      normal: '#239ED9',
      autorizada: '#009B94',
      cancelado: '#E15252',
      inconsistente: '#FF7F27',
      substituida: '#353535',
      transmitida: '#A9A9A9'
    },
    heading: {
      dark: '#353535'
    }
  },
  backgroundGradient: ['#1DBAB7', '#2BA0F4'],

  notBackgroundGradient: ['#1DBAB7', '#1DBAB7'],
  fontWeight: {
    normal: 'Poppins',
    thin: 'Poppins100',
    extraLight: 'Poppins200',
    light: 'Poppins300',
    semiBold: 'Poppins500',
    bold: 'Poppins600',
    extraBold: 'Poppins700'
  },
  fontSizes: {
    xs: 12 / fontScale,
    sm: 14 / fontScale,
    md: 16 / fontScale,
    lg: 18 / fontScale,
    xl: 20 / fontScale,
    xxl: 22 / fontScale,
    '3xl': 24 / fontScale,
    '4xl': 26 / fontScale,
    '5xl': 28 / fontScale,
    '6xl': 30 / fontScale,
    '7xl': 32 / fontScale,
    '8xl': 34 / fontScale
  },
  spacing: {
    '1': 4,
    '2': 8,
    '2.5': 10,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32
  },
  sizes: {
    13: 48,
    14: 56,
    33: 148
  },
  breakpoints: {
    base: 0,
    sm: 380,
    md: 768,
    lg: 992,
    xl: 1280
  }
}

export const secondaryTheme = {
  colors: {
    primary: {
      100: 'red',
      200: 'blue',
      300: 'green',
      350: 'yellow',
      400: 'black',
      500: 'white'
    },
    status: {
      transmitida: 'red'
    },
    white: '#D9D',
    error: '#FC2C00',
    warn: '#FCC400',
    darkWarn: '#FFAE42',
    success: '#0BD307',
    info: '#00B0FC',
    notify: '#F3642D'
  }
}
