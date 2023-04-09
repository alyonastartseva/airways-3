import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  Box,
} from '@chakra-ui/react';

import Calendar from '@common/Calendar';

interface Props {
  children: React.ReactNode;
  select: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}
import { RedButton } from '../RedButton';

const CalendarPopover = ({ children, select, startDate, endDate }: Props) => {
  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Box cursor="pointer">{children}</Box>
          </PopoverTrigger>
          <PopoverContent data-testid="popover-content" p={5} width="100%">
            <PopoverCloseButton data-testid="close" p={5} size="md" />
            <PopoverArrow />
            <PopoverHeader
              color={
                startDate && endDate ? 'rgb(110,150,210)' : 'blackAlpha.300'
              }
              pb={6}
              border="none"
            >
              Date selection is completed
            </PopoverHeader>
            <PopoverBody p={0}>
              <Calendar
                select={(day: Date) => select(day)}
                startDate={startDate}
                endDate={endDate}
                calendarFormat={2}
              />
            </PopoverBody>
            <PopoverFooter
              display="flex"
              justifyContent="flex-end"
              color="white"
              p={4}
              border="none"
            >
              <RedButton text="ok" clickHandler={onClose} />
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default CalendarPopover;
