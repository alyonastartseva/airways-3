import { Icon } from '@chakra-ui/react';

import { useTheme } from '@context/:ThemeProvider';

const Arrows = () => {
  const { theme } = useTheme();

  return (
    <Icon w="26" h="26" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m26.712 22.712-4 4a1.037 1.037 0 0 1-1.1.213A1 1 0 0 1 21 26v-3H6a1 1 0 1 1 0-2h15v-3a1 1 0 0 1 .613-.925 1.05 1.05 0 0 1 1.1.213l4 4a1.012 1.012 0 0 1 0 1.424Zm-17.424-8a1.037 1.037 0 0 0 1.1.213A1 1 0 0 0 11 14v-3h15a1 1 0 1 0 0-2H11V6a1 1 0 0 0-.613-.925 1.05 1.05 0 0 0-1.1.213l-4 4a1.013 1.013 0 0 0 0 1.425l4 4Z"
        fill={theme === 'dark' ? '#d9d9d9' : 'black'}
      />
    </Icon>
  );
};
export default Arrows;
