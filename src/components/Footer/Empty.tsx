import { Box, Link, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";
import googleplay from "@images/googleplay.png";
import appstore from "@images/appstore.png";

export const Empty = () => {
  return (
    <>
      <Box display={"flex"} columnGap="1.25rem" fontSize={".875rem"}>
        <Link href="#" target={"_blank"}>
          About us
        </Link>
        I
        <Link href="#" target={"_blank"}>
          Terms and Conditions
        </Link>
        I
        <Link href="#" target={"_blank"}>
          Contact Us
        </Link>
      </Box>
      <Flex alignItems="center" columnGap="3.875rem">
        <Text fontWeight={"700"}>UX AIR APP</Text>
        <Flex columnGap="1.25rem">
          <Link href="#" target={"_blank"}>
            <Image src={appstore} />
          </Link>
          <Link href="#" target={"_blank"}>
            <Image src={googleplay} />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
