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
      bg="red.200"
      borderRadius={"4px"}
      p="10px 36px"
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};
