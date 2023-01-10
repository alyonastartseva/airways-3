import { RedButton } from "@/common/RedButton";
import { FooterProps } from "@/interfaces/footer";
import { Box, Heading, Text } from "@chakra-ui/react";
import * as dayjs from "dayjs";
import React, { FC } from "react";

export const Full: FC<FooterProps> = ({
  additional,
  departure,
  return: ret,
}) => {
  const { to, from, date, time, code, type, price, passenger } = departure!;

  const allAdditional = additional?.reduce((acc, item) => acc + item[1], 0);
  const total = additional
    ? price + ret?.price! + allAdditional!
    : price + ret?.price!;
  return (
    <>
      <Box display={"flex"}>
        <Box
          display={"flex"}
          columnGap="30px"
          fontWeight={"700"}
          fontSize={"14px"}
        >
          <Box display={"flex"} columnGap="20px">
            <Heading>Departure</Heading>
            <Heading>{`${from} - ${to}`}</Heading>
            <Box fontSize={"12px"}>
              <Text>{dayjs(date).format("D MMM, ") + date[0] + date[1]}</Text>
              <Text>{time}</Text>
              <Text>{type}</Text>
              <Text>{code}</Text>
            </Box>
          </Box>
          <Box h={"100%"} w="1px" bg={"white"}>
            {" "}
          </Box>
          {ret ? (
            <Box display={"flex"} columnGap="30px">
              <Heading>Return</Heading>
              <Heading>{`${ret.from} - ${ret.to}`}</Heading>
              <Box fontSize={"12px"}>
                <Text>
                  {dayjs(ret.date).format("D MMM, ") +
                    ret.date[0] +
                    ret.date[1]}
                </Text>
                <Text>{ret.time}</Text>
                <Text>{ret.type}</Text>
                <Text>{ret.code}</Text>
              </Box>
            </Box>
          ) : (
            <Text color={"red.100"}>Select Return Flight</Text>
          )}
          {departure && ret && (
            <>
              <Box h={"100%"} w="1px" bg={"white"}>
                {" "}
              </Box>
              <Text marginLeft={"-25px"} color={"red.100"}>
                See Price Details
              </Text>
            </>
          )}
        </Box>
      </Box>

      <Box>
        {additional && (
          <Box w="80%" display={"flex"}>
            <Box w="60%">
              <Heading textAlign={"right"} fontWeight={"700"} as={"h3"}>
                Ticket Price
              </Heading>
              <Text textAlign={"right"} color="border">
                Flight Price{" "}
              </Text>
              <Text textAlign={"right"} color="border">
                Taxes and Fees{" "}
              </Text>
              <Heading textAlign={"right"} fontWeight={"700"} as={"h3"}>
                Additional Services
              </Heading>
              {additional!.map((e) => (
                <Text key={e[0]} textAlign={"right"}>
                  {e[0]}
                </Text>
              ))}
            </Box>
            <Box w="40%">
              <Heading textAlign={"right"} fontWeight={"700"} as={"h3"}>
                {price + ret?.price!}
              </Heading>
              <Text textAlign={"right"} color="border">
                {((price + ret?.price!) / 100) * 95}
              </Text>
              <Text textAlign={"right"} color="border">
                {((price + ret?.price!) / 100) * 5}
              </Text>
              <Heading textAlign={"right"} fontWeight={"700"} as={"h3"}>
                {allAdditional}
              </Heading>
              {additional!.map((e) => (
                <Text key={e[0]} textAlign={"right"}>
                  {e[1]}
                </Text>
              ))}
            </Box>
          </Box>
        )}
        <Box display={"flex"} columnGap="25px">
          {departure && ret && (
            <Box>
              <Text>Total price for {passenger} passengers</Text>
              <Text textAlign={"right"}>CHF {total}</Text>
            </Box>
          )}
          <RedButton text="Confirm" clickHandler={() => {}} />
        </Box>
      </Box>
    </>
  );
};
