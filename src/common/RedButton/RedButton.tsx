import { FC } from 'react';
import { Button } from '@chakra-ui/react';

import { IRedButtonProps } from './RedButton.interfaces';

const RedButton: FC<IRedButtonProps> = ({ text, clickHandler }) => (
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

export default RedButton;
