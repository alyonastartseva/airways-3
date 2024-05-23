import {
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import {
  BackpackIcon,
  SuitcaseIcon,
  ArrowsClockwiseIcon,
  ArmchairIcon,
  WarningCircleIcon,
} from '@common/icons';
import { seatCategory } from '@constants/constants';
import { pluralize } from '@utils/string.utils';
import { TSeatCategory } from '@interfaces/seat.interfaces';

import { TFacilities, TTariffType } from '../TicketCard';

interface ITicketTariffProps {
  tariff: TTariffType;
  categoryOfSeats: TSeatCategory;
}

const getFormattedPrice = (price: number) => {
  const stringPrice = String(price);
  const right = stringPrice.slice(-3);
  const left = stringPrice.slice(0, stringPrice.length - right.length);
  return `${left} ${right} ₽`;
};

const TicketTariff = ({
  tariff: { facilities, ticketsCount, price, name },
  categoryOfSeats,
}: ITicketTariffProps) => {
  const seatCategoryName = seatCategory.find(
    ({ eng }) => eng === categoryOfSeats
  )?.ru;

  const getIconColor = (facilityName: TFacilities) =>
    facilities.includes(facilityName) ? '#227420' : '#808080';

  const formattedPrice = getFormattedPrice(price);

  const warningText = pluralize(ticketsCount, [
    'Остался',
    'Осталось',
    'Осталось',
  ]);

  return (
    <Card
      boxShadow={0}
      backgroundColor={name.eng === 'plus' ? '#c2dcff' : '#ebf3ff'}
      borderRadius="8px"
      maxW="260px"
      w="100%"
      h="100%"
      p="20px 15px"
      border="1px solid transparent"
      justifyContent="space-between"
      _hover={{
        border: '1px',
        borderColor: '#e0e7f2',
      }}
    >
      <CardHeader p="0">
        <Flex justifyContent="space-between" alignItems="center" mb="20px">
          <Text color="#2e2e2e" fontWeight="medium" pr={1.2}>
            {seatCategoryName} {name.ru}
          </Text>
          <Flex gap="3px">
            <BackpackIcon color={getIconColor('luggage')} size={20} />
            <SuitcaseIcon color={getIconColor('hand-luggage')} size={20} />
            <ArrowsClockwiseIcon color={getIconColor('refund')} size={20} />
            <ArmchairIcon color={getIconColor('comfort')} size={20} />
          </Flex>
        </Flex>

        <Heading fontSize="28px" fontWeight="semibold">
          {formattedPrice}
        </Heading>
      </CardHeader>

      {ticketsCount <= 3 && (
        <CardFooter p="0">
          <WarningCircleIcon color="#f55b51" />
          <Text fontWeight="medium" fontSize="14px" color="#808080" pl={2}>
            {warningText} {ticketsCount}
          </Text>
        </CardFooter>
      )}
    </Card>
  );
};

export default TicketTariff;
