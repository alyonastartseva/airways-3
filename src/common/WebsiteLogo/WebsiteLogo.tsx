import { Box, Text } from '@chakra-ui/react';

import { Logo } from '@common/icons';

const WebsiteLogo = (props: { isFooter: boolean }) => {
  const { isFooter } = props;
  return (
    <Box
      display="flex"
      gap="8px"
      alignItems="center"
      height="40px"
      data-testid="websiteLogo"
    >
      <Logo width={isFooter ? 21.5 : 43} height={isFooter ? 25 : 50} />
      <Text
        color="white"
        fontWeight="500"
        fontSize={isFooter ? '1rem' : '1.5rem'}
        lineHeight="1.125rem"
        _hover={{ cursor: 'default' }}
      >
        Air Alien
      </Text>
    </Box>
  );
};

export default WebsiteLogo;
