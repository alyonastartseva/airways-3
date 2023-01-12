import { RedButton } from "@/common/RedButton/RedButton";
import { IDeparture, IReturn, TAdditionalServices } from "@/interfaces/footer";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import Dayjs from "dayjs";
import React, { FC, useState } from "react";

interface IProps {
  departure?: IDeparture;
  return?: IReturn;
  additional?: TAdditionalServices;
}

export const Full: FC<IProps> = ({ additional, departure, return: ret }) => {
  const [details, setDetails] = useState(false);

  const { to, from, date, time, code, type, price, passenger } = departure!;

  const allAdditional = additional?.reduce((acc, item) => acc + item[1], 0);
  const total = additional
    ? price + ret?.price! + allAdditional!
    : price + ret?.price!;

  const dateText = Dayjs(date).format("D MMM, ") + date.slice(0, 2);
  const dateText2 = ret && Dayjs(ret.date).format("D MMM, ") + date.slice(0, 2);

  const toggleDetails = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setDetails((details) => !details);
  };
  return (
    <>
      <Flex onClick={() => setDetails(false)}>
        <Flex columnGap="2.875rem" fontWeight="700" fontSize=".875rem">
          <Flex columnGap="1.25rem">
            <Heading fontSize="1rem">Departure</Heading>
            <Heading fontSize="1rem">{`${from} - ${to}`}</Heading>
            <Box fontSize=".750rem">
              <Text position="relative">{dateText}</Text>
              <Text>{time}</Text>
              <Text>{type}</Text>
              <Text position="relative">{code}</Text>
            </Box>
          </Flex>
          <Box h="100%" w="1px" bg="#fff">
            {" "}
          </Box>
          {ret ? (
            <Flex columnGap="1.25rem">
              <Heading fontSize="1rem">Return</Heading>
              <Heading fontSize="1rem">{`${ret.from} - ${ret.to}`}</Heading>
              <Box fontSize=".750rem">
                <Text position="relative">{dateText2}</Text>
                <Text>{ret.time}</Text>
                <Text>{ret.type}</Text>
                <Text position="relative">{ret.code}</Text>
              </Box>
            </Flex>
          ) : (
            <Text color="#EE5F5F">Select Return Flight</Text>
          )}
          {departure && ret && (
            <>
              <Box h="100%" w="1px" bg="#fff">
                {" "}
              </Box>
              <Text
                role="button"
                onClick={toggleDetails}
                marginLeft="-1.5rem"
                color="#EE5F5F"
              >
                See Price Details
              </Text>
            </>
          )}
        </Flex>
      </Flex>

      <Box>
        {details && (
          <Flex data-testid="detail-wrapper" w="80%">
            <Box w="60%">
              <Heading
                fontSize="1rem"
                textAlign="right"
                fontWeight="700"
                as="h3"
              >
                Ticket Price
              </Heading>
              <Text textAlign="right" color="#D9D9D9">
                Flight Price
              </Text>
              <Text textAlign="right" color="#D9D9D9">
                Taxes and Fees
              </Text>
              {additional && (
                <Heading
                  textAlign="right"
                  fontSize="1rem"
                  fontWeight="700"
                  as="h3"
                >
                  Additional Services
                </Heading>
              )}
              {additional?.map((e) => (
                <Text key={e[0]} textAlign="right">
                  {e[0]}
                </Text>
              ))}
            </Box>
            <Box w="40%">
              <Heading
                fontSize="1rem"
                textAlign="right"
                fontWeight="700"
                as="h3"
              >
                {price + ret?.price!}
              </Heading>
              <Text textAlign="right" color="#D9D9D9">
                {((price + ret?.price!) / 100) * 95}
              </Text>
              <Text textAlign="right" color="#D9D9D9">
                {((price + ret?.price!) / 100) * 5}
              </Text>
              <Heading
                fontSize="1rem"
                textAlign="right"
                fontWeight="700"
                as="h3"
              >
                {allAdditional}
              </Heading>
              {additional?.map((e) => (
                <Text key={e[0]} textAlign="right">
                  {e[1]}
                </Text>
              ))}
            </Box>
          </Flex>
        )}
        <Flex columnGap="1.5rem">
          {departure && ret && (
            <>
              <Box>
                <Text fontSize=".875rem">
                  Total price for {passenger} passengers
                </Text>
                <Text textAlign="right">CHF {total}</Text>
              </Box>
              <RedButton
                text="Confirm"
                clickHandler={() => alert("Confirmed")}
              />
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};
