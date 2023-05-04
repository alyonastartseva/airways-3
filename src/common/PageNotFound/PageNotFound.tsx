import { Flex, Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const isAdmin = Boolean(localStorage.getItem('adminToken'));
  const pathToMainPage: string = isAdmin ? '/passengers' : '/';

  return (
    <Flex minHeight="81vh" justifyContent="center" alignItems="center">
      <Alert status="error" justifyContent="center" width="20rem" height="6rem">
        <AlertIcon />
        <AlertTitle>PAGE NOT FOUND</AlertTitle>
        <Link to={pathToMainPage}>
          <Button mr="1em" justifySelf="flex-end" fontSize="lx">
            На главную
          </Button>
        </Link>
      </Alert>
    </Flex>
  );
};

export default PageNotFound;
