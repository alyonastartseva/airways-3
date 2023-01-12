import { FC } from "react";
import { IDeparture, IReturn, TAdditionalServices } from "@interfaces/footer";
import { Full } from "@components/Footer/Full";
import { Box, Link, Text, Image, Flex } from "@chakra-ui/react";
import googleplay from "@images/google-play.png";
import appstore from "@images/app-store.png";

interface IProps {
  departure?: IDeparture;
  return?: IReturn;
  additional?: TAdditionalServices;
}

export const Footer: FC<IProps> = ({ departure, return: ret, additional }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="start"
      bg="#04396D"
      color="#fff"
      p="1.125rem 1.5rem"
    >
      {departure ? (
        <Full departure={departure} return={ret} additional={additional} />
      ) : (
        <>
          <Box display="flex" columnGap="1.25rem" fontSize=".875rem">
            <Link href="#" target="_blank">
              About us
            </Link>
            I
            <Link href="#" target="_blank">
              Terms and Conditions
            </Link>
            I
            <Link href="#" target="_blank">
              Contact Us
            </Link>
          </Box>
          <Flex alignItems="center" columnGap="3.875rem">
            <Text fontWeight="700">UX AIR APP</Text>
            <Flex columnGap="1.25rem">
              <Link href="#" target="_blank">
                <Image src={appstore} />
              </Link>
              <Link href="#" target="_blank">
                <Image src={googleplay} />
              </Link>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export const departure: IDeparture = {
  from: "ZRH",
  to: "JFK",
  type: "ECONOMY - Eco Light",
  code: "UA0018",
  time: "Departure 19:00",
  date: new Date().toDateString(),
  passenger: 1,
  price: 3100,
};
export const ret: IReturn = {
  from: "JFK",
  to: "ZRH",
  type: "ECONOMY - Eco Light",
  code: "UA0041",
  time: "Departure 08:00",
  date: new Date("1012-10-10").toDateString(),
  passenger: 1,
  price: 3100,
};

export const additional: TAdditionalServices = [
  ["Seat Selection", 100],
  ["Extra Baggage", 2100],
];
