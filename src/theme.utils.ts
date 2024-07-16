import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
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
