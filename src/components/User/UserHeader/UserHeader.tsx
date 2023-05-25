import { FC } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Spacer,
  IconButton,
  Divider,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Popover,
  PopoverHeader,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import HeaderLogo from '@common/icons/Logo';
import ELinks from '@services/adminRouterLinks.service';
import { PlanetIcon, SearchIcon, ProfileIcon } from '@/common/icons';

const UserHeader: FC = () => {
  const onHoverSearchStyle = {
    backgroundColor: 'transparent',
  };

  return (
    <Box bg="#04396D" width="full" p="2">
      <Flex alignItems="center">
        <Flex position="relative" alignItems="flex-end">
          <HeaderLogo />
          <Text color="#fff" position="absolute" left="16" whiteSpace="nowrap">
            UX AIR
          </Text>
        </Flex>
        <Spacer />
        <Flex
          gap="1rem"
          color="black"
          alignItems="center"
          h="30px"
          direction="row"
        >
          <IconButton
            _hover={onHoverSearchStyle}
            bgColor="transparent"
            outline="none"
            aria-label="Search"
            data-testid="search-button"
          >
            <SearchIcon />
          </IconButton>

          <Popover>
            <PopoverTrigger>
              <Button>
                <Flex gap="0.5rem" alignItems="center" fontSize="15">
                  <PlanetIcon />
                  SWITZERLAND - EN - CHF
                </Flex>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Select a language</PopoverHeader>
              <PopoverBody>
                <RadioGroup name="language-select">
                  <Radio isDisabled value="en">
                    EN
                  </Radio>
                </RadioGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Link to="sign-up">
            <Button fontSize="15">SIGN-UP</Button>
          </Link>
          <Link to={ELinks.ADMIN_LOGIN}>
            <Button data-testid="sign-in-button" fontSize="15">
              <Flex gap="0.5rem" alignItems="center" fontSize="15">
                <ProfileIcon />
                SIGN-IN
              </Flex>
            </Button>
          </Link>
          <Divider colorScheme="whiteAlpha" orientation="vertical" />
          <Link to="#">
            <span style={{ color: 'white', fontSize: '15px' }}>HELP</span>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserHeader;
