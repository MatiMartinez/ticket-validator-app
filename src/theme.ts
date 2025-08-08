import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    brand: {
      50: '#E5F0FF',
      100: '#B8D5FF',
      200: '#8ABBFF',
      300: '#5CA1FF',
      400: '#2E87FF',
      500: '#006DFF',
      600: '#0057CC',
      700: '#004199',
      800: '#002B66',
      900: '#001533',
    },
    gray: {
      900: '#0A0B0D',
      800: '#111215',
      700: '#1A1B1F',
      600: '#2A2C31',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'whiteAlpha.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;
