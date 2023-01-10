import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  text: string;
  clickHandler: Function;
}

export const RedButton: FC<Props> = ({ text, clickHandler }) => {
  return (
    <Button
      fontWeight={"700"}
      bg="red.200"
      borderRadius={"4px"}
      p="10px 36px"
      onClick={() => clickHandler()}
    >
      {text}
    </Button>
  );
};
