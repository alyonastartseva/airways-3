import { FC } from 'react';
import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { IAlertMessageProps } from './AlertMessage.interfaces';

const AlertMessage: FC<IAlertMessageProps> = ({
  status = 'error',
  message = 'Something went wrong',
}) => (
  <Flex minHeight="81vh" justifyContent="center" alignItems="center">
    <Alert status={status} justifyContent="center" width="20rem" height="6rem">
      <AlertIcon />
      <AlertTitle>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Flex>
);

export default AlertMessage;
