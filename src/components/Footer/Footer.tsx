import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { FooterProps } from "./../../interfaces/footer";
import { Full } from "./Full";
import { Empty } from "./Empty";

export const Footer: FC<FooterProps> = ({
  departure,
  return: ret,
  additional,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignItems={"start  "}
      bg={"blue.200"}
      color="white"
      p={"18px 23px"}
    >
      {departure ? (
        <Full departure={departure} return={ret} additional={additional} />
      ) : (
        <Empty />
      )}
    </Box>
  );
};

Footer.defaultProps = {
  // departure: {
  //   from: "ZRH",
  //   to: "JFK",
  //   type: "ECONOMY - Eco Light",
  //   code: "UA0018",
  //   time: "Departure 19:00",
  //   date: new Date().toDateString(),
  //   passenger: 1,
  //   price: 3100,
  // },
  // return: {
  //   from: "JFK",
  //   to: "ZRH",
  //   type: "ECONOMY - Eco Light",
  //   code: "UA0018",
  //   time: "Departure 08:00",
  //   date: new Date("1012-10-10").toDateString(),
  //   passenger: 1,
  //   price: 3100,
  // },
  // additional: [
  //   ["Seat Selection", 100],
  //   ["Extra Baggage", 2100],
  // ],
};
