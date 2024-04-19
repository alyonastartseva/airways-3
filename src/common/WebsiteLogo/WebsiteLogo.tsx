import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Logo } from '@common/icons';
import setParams from '@utils/set-params.utils';

const WebsiteLogo = (props: { isFooter: boolean; isLogged: boolean }) => {
  const { isFooter, isLogged } = props;
  const {
    width = 29,
    height = 34,
    color = '#FFFFFF',
  } = setParams('logo', isLogged, isFooter);

  return (
    <Link to="/">
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
        >
          Air Alien
        </Text>
      </Box>
    </Link>
  );
};

export default WebsiteLogo;
