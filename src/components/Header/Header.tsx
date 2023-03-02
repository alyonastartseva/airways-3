import { Box, Text, Button } from '@chakra-ui/react';

import { Logo } from '@common/icons';

const Header = () => (
  <Box
    h={75}
    display="flex"
    bg="#04396D"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box position="relative">
      <Logo />
      <Text
        className="name"
        position="absolute"
        alignSelf="end"
        color="white"
        fontWeight="600"
        right="-1.8em"
        bottom="0.25em"
        fontSize="1.125rem"
        lineHeight="1.125rem"
      >
        UX AIR
      </Text>
    </Box>
    <Button mr="1em" justifySelf="flex-end" fontSize="lx">
      Главная страница
    </Button>
  </Box>
);
export default Header;
