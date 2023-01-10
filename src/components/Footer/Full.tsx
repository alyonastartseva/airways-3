import { RedButton } from "@/common/RedButton";
import { IDeparture, IReturn, TAdditionalServices } from "@/interfaces/footer";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import Dayjs from "dayjs";
import React, { FC } from "react";
import LogoSvg from "@images/LOGO.svg";

interface IProps {
	departure?: IDeparture;
	return?: IReturn;
	additional?: TAdditionalServices;
}

export const Full: FC<IProps> = ({ additional, departure, return: ret }) => {
	const { to, from, date, time, code, type, price, passenger } = departure!;

	const allAdditional = additional?.reduce((acc, item) => acc + item[1], 0);
	const total = additional
		? price + ret?.price! + allAdditional!
		: price + ret?.price!;

	const dateText = Dayjs(date).format("D MMM, ") + date.slice(0, 2);
	const dateText2 = ret && Dayjs(ret.date).format("D MMM, ") + date.slice(0, 2);
	return (
		<>
			<Flex>
				<Flex columnGap="2.875rem" fontWeight={"700"} fontSize={".875rem"}>
					<Flex columnGap="1.25rem">
						<Heading>Departure</Heading>
						<Heading>{`${from} - ${to}`}</Heading>
						<Box fontSize={".750rem"}>
							<Text
								position={"relative"}
								_before={{
									content: `""`,
									display: "inline-block",
									position: "absolute",
									left: "-1rem",
									top: ".56rem",
									w: "1rem",
									h: ".125rem",
									bg: "border",
									opacity: "0.6",
								}}
							>
								{dateText}
							</Text>
							<Text>{time}</Text>
							<Text>{type}</Text>
							<Text position={"relative"}>
								<Image position={"absolute"} left="-1.25rem" src={LogoSvg} />
								{code}
							</Text>
						</Box>
					</Flex>
					<Box h={"100%"} w="1px" bg={"#fff"}>
						{" "}
					</Box>
					{ret ? (
						<Flex columnGap="1.25rem">
							<Heading>Return</Heading>
							<Heading>{`${ret.from} - ${ret.to}`}</Heading>
							<Box fontSize={".750rem"}>
								<Text
									position={"relative"}
									_before={{
										content: `""`,
										display: "inline-block",
										position: "absolute",
										left: "-1rem",
										top: ".56rem",
										w: "1rem",
										h: ".125rem",
										bg: "border",
										opacity: "0.6",
									}}
								>
									{dateText2}
								</Text>
								<Text>{ret.time}</Text>
								<Text>{ret.type}</Text>
								<Text position={"relative"}>
									<Image position={"absolute"} left="-1.25rem" src={LogoSvg} />
									{ret.code}
								</Text>
							</Box>
						</Flex>
					) : (
						<Text color={"#EE5F5F"}>Select Return Flight</Text>
					)}
					{departure && ret && (
						<>
							<Box h={"100%"} w="1px" bg={"#fff"}>
								{" "}
							</Box>
							<Text marginLeft={"-1.5rem"} color={"#EE5F5F"}>
								See Price Details
							</Text>
						</>
					)}
				</Flex>
			</Flex>

			<Box>
				{additional && (
					<Flex w="80%">
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
					</Flex>
				)}
				<Flex columnGap="1.5rem">
					{departure && ret && (
						<>
							<Box>
								<Text>Total price for {passenger} passengers</Text>
								<Text textAlign={"right"}>CHF {total}</Text>
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
