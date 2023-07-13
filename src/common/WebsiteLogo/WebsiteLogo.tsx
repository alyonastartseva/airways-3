import { Box, Text } from '@chakra-ui/react';

import { Logo } from '@common/icons';
import setLogoParams from '@utils/set-logo-params.utils';

const WebsiteLogo = (props: { isFooter: boolean; isLogged: boolean }) => {
  const { isFooter, isLogged } = props;
  const { width, height, color } = setLogoParams(isFooter, isLogged);

  return (
    <Box
      display="flex"
      gap="8px"
      alignItems="center"
      height="40px"
      data-testid="websiteLogo"
    >
      <Logo width={width} height={height} color={color} />
      <Text
        color={color}
        fontWeight="500"
        fontSize={isFooter ? '1rem' : '1.25rem'}
        lineHeight="1.125rem"
        _hover={{ cursor: 'default' }}
      >
        Air Alien
      </Text>
    </Box>
  );
};

export default WebsiteLogo;
