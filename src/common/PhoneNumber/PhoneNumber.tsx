import { Box, Text, Link } from '@chakra-ui/react';
import './phonenumber.scss';

const PhoneNumber = () => {
  return (
    <Box
      display="flex"
      gap="8px"
      alignItems="center"
      height="40px"
      data-testid="phoneNumber"
      className="phoneNumber"
    >
      <Text
        color="white"
        lineHeight="1.125rem"
        fontWeight="semibold"
        width="120px"
        _hover={{ cursor: 'default' }}
      >
        <Link href="tel:+88007855896">+8 800 785 58 96</Link>
      </Text>
    </Box>
  );
};

export default PhoneNumber;
