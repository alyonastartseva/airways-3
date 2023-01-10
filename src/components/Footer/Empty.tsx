import { Box, Link, Text, Image } from "@chakra-ui/react";
import React from "react";
import googleplay from "@images/googleplay.png";
import appstore from "@images/appstore.png";

export const Empty = () => {
  return (
    <>
      <Box display={"flex"} columnGap="20px" fontSize={"14px"}>
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
      <Box display={"felex"} alignItems="center" columnGap="62px">
        <Text fontWeight={"700"}>UX AIR APP</Text>
        <Box display={"flex"} columnGap="21px">
          <Link href="#" target={"_blank"}>
            <Image src={appstore} />
          </Link>
          <Link href="#" target={"_blank"}>
            <Image src={googleplay} />
          </Link>
        </Box>
      </Box>
    </>
  );
};
