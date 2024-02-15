import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  AlertDescription,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks';

const PageNotFound = () => {
  const { isAdmin } = useAuth();
  const pathToMainPage: string = isAdmin ? '/passengers' : '/';

  return (
    <>
      <Flex minHeight="81vh" justifyContent="center" alignItems="center">
        <Alert
          status="error"
          justifyContent="center"
          width="40rem"
          height="15rem"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Страница не найдена!!!
          </AlertTitle>
          <AlertDescription maxWidth="sm" textAlign="center" mt={4} mb={4}>
            Пожалуйста, измените запрос или вернитесь на главную страницу
          </AlertDescription>
          <Link to={pathToMainPage}>
            <Button mr="1em" justifySelf="flex-end" fontSize="lx">
              На главную
            </Button>
          </Link>
        </Alert>
      </Flex>
    </>
  );
};

export default PageNotFound;
