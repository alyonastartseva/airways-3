import {
  Text,
  Flex,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { ProfileIcon, HumburgerIcon } from '@common/icons';

const UserHeader = () => {
  const { setIsAdmin } = useAuth();
  const navigate = useNavigate();

  // удаление токена авторизации при нажатии на кнопку выхода
  const handleClick = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/', { replace: true });
  };

  return (
    <Flex gap="0.5rem" data-testid="userHeader">
      <Link to="/search" data-testid="userProfileLink">
        <Flex
          gap="1rem"
          alignItems="center"
          _hover={{ transform: 'scale(1.01)', textDecoration: '2px underline' }}
        >
          <Text color="white" fontWeight="500" data-testid="userName">
            Анна
          </Text>
          <ProfileIcon />
        </Flex>
      </Link>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<HumburgerIcon />}
          variant="outline"
          border="none"
          _hover={{ bgColor: 'transparent', transform: 'scale(1.2)' }}
          _active={{
            bgColor: 'transparent',
            transform: 'scale(1.2) rotate(90deg)',
          }}
          _focus={{ outline: 'none' }}
          data-testid="menuBtn"
        />
        <MenuList>
          <MenuItem>Option placeholder</MenuItem>
          <MenuItem>Option placeholder</MenuItem>
          <MenuItem onClick={handleClick}>Выход</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserHeader;
