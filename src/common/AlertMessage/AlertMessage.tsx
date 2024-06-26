import { FC } from 'react';
import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { IAlertMessageProps } from './AlertMessage.interfaces';

const AlertMessage: FC<IAlertMessageProps> = ({ status, message }) => (
  <Flex minHeight="81vh" justifyContent="center" alignItems="center">
    <Alert status={ status ? status : 'error' } justifyContent="center" width="20rem" height="6rem">
      <AlertIcon />
      <AlertTitle>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Error'}
      </AlertTitle>
      <AlertDescription>{ message ?? 'Something went wrong'}</AlertDescription>
    </Alert>
  </Flex>
);

export default AlertMessage;
