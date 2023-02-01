import { Box, Image, Text, Button } from '@chakra-ui/react';

import logo from '../../assets/images/logo.png';

const Header = () => (
  <Box
    h={75}
    display="flex"
    bg="#04396D"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box position="relative">
      <Image
        width="5.3em"
        display="inline"
        height="3.8em"
        mt="1em"
        ml="1em"
        src={logo}
      />
      <Text
        className="name"
        position="absolute"
        alignSelf="end"
        color="white"
        fontWeight="600"
        right="-1.2em"
        bottom="0.3em"
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
