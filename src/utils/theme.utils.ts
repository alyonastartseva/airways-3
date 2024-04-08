import { extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
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

const antdTheme = {
  components: {
    Select: {
      fontFamily: 'Roboto',
      selectorBg: '#F9F9F9',
      colorText: '#393939',
      paddingSM: 17,
      optionHeight: 40,
      controlHeight: 40,
      zIndexPopup: 1400,
      colorError: '#F56565',
      optionSelectedBg: '#1DA1F2',
      optionSelectedColor: '#FFFFFF',
      colorPrimary: '#3182ce',
      controlOutline: '#3182ce',
      controlOutlineWidth: 1,
      boxShadowSecondary: 'none',
      colorBgElevated: '#F9F9F9',
      controlItemBgHover: '#E3E3E3',
      paddingXXS: 0,
      borderRadiusSM: 0,
    },
  },
  token: {
    borderRadius: 2,
  },
};

export { chakraTheme, antdTheme };
