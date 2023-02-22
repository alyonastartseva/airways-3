import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import { FC } from 'react';

import Full from '@common/Full/Full';
import appstore from '@images/app-store.png';
import googleplay from '@images/google-play.png';
import {
  IDeparture,
  ITickerReturn,
  TAdditionalServices,
} from '@interfaces/footer.interfaces';

interface IFooterProps {
  departure?: IDeparture;
  return?: ITickerReturn;
  additional?: TAdditionalServices;
}

const Footer: FC<IFooterProps> = ({ departure, return: ret, additional }) => (
  <Flex
    justifyContent="space-between"
    alignItems="start"
    bg="#04396D"
    color="#fff"
    p="1.125rem 1.5rem"
  >
    {departure ? (
      <Full departure={departure} ticketReturn={ret} additional={additional} />
    ) : (
      <>
        <Box display="flex" columnGap="1.25rem" fontSize=".875rem">
          <Link href="/about-us" target="_blank">
            About us
          </Link>
          I
          <Link href="/terms-and-conditions" target="_blank">
            Terms and Conditions
          </Link>
          I
          <Link href="/contact-us" target="_blank">
            Contact Us
          </Link>
        </Box>
        <Flex alignItems="center" columnGap="3.875rem">
          <Text fontWeight="700">UX AIR APP</Text>
          <Flex columnGap="1.25rem">
            <Link href="https://www.apple.com/" target="_blank">
              <Image src={appstore} />
            </Link>
            <Link href="https://play.google.com/" target="_blank">
              <Image src={googleplay} />
            </Link>
          </Flex>
        </Flex>
      </>
    )}
  </Flex>
);

export default Footer;
