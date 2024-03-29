import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `${'Roboto'}, sans-serif`,
    body: `${'Roboto'}, sans-serif`,
  },
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: { borderRadius: 0 },
      }),
    },
  },
});

export default theme;
