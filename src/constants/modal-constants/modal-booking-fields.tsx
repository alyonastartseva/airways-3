import { FormInputProps } from '@common/ModalElements/ModalInput';
import { bookingStatuses } from '@/constants';
import { IFormBooking, IPassenger } from '@/interfaces';
import { useFlightSeatsQuery, usePassengersQuery } from '@/hooks';
import { IFSOne as IFlightSeats } from '@/interfaces/flightsSeats.interfaces';

const PassengersOptions = () => {
  const { data } = usePassengersQuery(0, 100);

  if (data)
    return data.content.map((el: IPassenger) => {
      if (el.passport?.middleName) {
        return (
          <option key={el.id} value={el.id}>
            {`${el.firstName} ${el.passport.middleName} ${el.lastName}`}
          </option>
        );
      } else {
        return (
          <option key={el.id} value={el.id}>
            {`${el.firstName} ${el.lastName}`}
          </option>
        );
      }
    });
};

const SeatsOptions = () => {
  const { data: flightSeatsData } = useFlightSeatsQuery(1);

  if (flightSeatsData)
    return (
      <>
        {flightSeatsData.content.map((el: IFlightSeats) => {
          if (!el.isBooked && !el.isSold) {
            return (
              <option key={el.id} value={el.id}>
                {el.seat!.seatNumber}
              </option>
            );
          }
        })}
      </>
    );
};

const bookingStatusesOptions = bookingStatuses.map((el) => {
  const flightStatus = {
    NOT_PAID: 'Не оплаченный',
    PAID: 'Оплаченный',
    OVERDUE: 'Просроченный',
    CANCELED: 'Отмененный',
  };

  return (
    <option key={el} value={el}>
      {flightStatus[el]}
    </option>
  );
});

export const modalBookingFields: FormInputProps<IFormBooking>[] = [
  {
    type: 'select',
    fieldName: 'passengerId',
    label: 'ФИО пассажира',
    rules: {
      required: 'Выберите пассажира',
    },
    children: <PassengersOptions />,
  },
  {
    type: 'select',
    fieldName: 'flightSeatId',
    label: 'Номер сиденья',
    rules: {
      required: 'Выберите номер сиденья',
    },
    children: <SeatsOptions />,
  },
  {
    type: 'select',
    fieldName: 'bookingStatus',
    label: 'Статус',
    rules: {
      required: 'Укажите статус',
    },
    children: bookingStatusesOptions,
  },
];
