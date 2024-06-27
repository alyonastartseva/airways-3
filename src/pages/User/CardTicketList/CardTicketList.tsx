import { ITicketsPost } from 'src/interfaces/tickets.interface';

import CardTicket from '../CardTicket/CardTicket';

import scss from './CardTicketList.module.scss';

const CardTicketList = () => {
  const testArrTickets: ITicketsPost[] = [
    {
      id: 0,
      ticketNumber: 'string',
      passengerId: '',
      firstName: 'string',
      lastName: 'string',
      flightCode: 'string',
      from: 'AAQ',
      to: 'LED',
      departureDateTime: '2024-06-27T06:54:08.129Z',
      arrivalDateTime: '2024-06-27T06:54:08.129Z',
      flightSeatId: 0,
      seatNumber: 'strin',
      bookingId: 0,
      boardingStartTime: '2024-06-27T06:54:08.129Z',
      boardingEndTime: '2024-06-27T06:54:08.129Z',
    },
    {
      id: 1,
      ticketNumber: 'string',
      passengerId: '',
      firstName: 'string',
      lastName: 'string',
      flightCode: 'string',
      from: 'DME',
      to: 'KGD',
      departureDateTime: '2024-06-27T06:54:08.129Z',
      arrivalDateTime: '2024-06-27T06:54:08.129Z',
      flightSeatId: 0,
      seatNumber: 'strin',
      bookingId: 0,
      boardingStartTime: '2024-06-27T06:54:08.129Z',
      boardingEndTime: '2024-06-27T06:54:08.129Z',
    },
  ];

  return (
    <ul className={scss.listTicket}>
      {testArrTickets.map((ticket) => (
        <CardTicket key={ticket.id} ticket={ticket} />
      ))}
      {/* <CardTicket /> */}
    </ul>
  );
};

export default CardTicketList;
