import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { IDeparture, IReturn, TAdditional } from "@interfaces/footer";
import { Full } from "./Full";
import { Empty } from "./Empty";

interface IProps {
	departure?: IDeparture;
	return?: IReturn;
	additional?: TAdditional;
}

export const Footer: FC<IProps> = ({ departure, return: ret, additional }) => {
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
	code: "UA0018",
	time: "Departure 08:00",
	date: new Date("1012-10-10").toDateString(),
	passenger: 1,
	price: 3100,
};

export const additional: TAdditional = [
	["Seat Selection", 100],
	["Extra Baggage", 2100],
];
