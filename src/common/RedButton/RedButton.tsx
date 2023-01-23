import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface IRedButtonProps {
  text: string;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RedButton: FC<IRedButtonProps> = ({ text, clickHandler }) => (
  <Button
    fontWeight="700"
    bg="#E32E22"
    borderRadius=".25rem"
    p=".65rem 2.25rem"
    onClick={clickHandler}
  >
    {text}
  </Button>
);
