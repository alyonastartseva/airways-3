import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

interface IProps {
	text: string;
	clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RedButton: FC<IProps> = ({ text, clickHandler }) => {
	return (
		<Button
			fontWeight={"700"}
			bg="#E32E22"
			borderRadius={".25rem"}
			p=".65rem 2.25rem"
			onClick={clickHandler}
		>
			{text}
		</Button>
	);
};
