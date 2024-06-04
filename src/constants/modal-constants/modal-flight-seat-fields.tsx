import { FormInputProps } from '@/common/ModalElements/ModalInput';
import { seatCategory } from '@/constants';
import { useFlightSeatsQuery, useFlightsQuery, useSeatQuery } from '@/hooks';
import { ISeatPost } from '@/interfaces';
import {
  // IFSForm,
  // IFSpostField,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';

const seatCategoryOptions = seatCategory.map((el) => (
  <option key={el.eng} value={el.eng}>
    {el.ru}
  </option>
));

const FlightIdOptions = () => {
  const { data } = useFlightsQuery();
  if (data) {
    return data.content.map(({ id, aircraftId }) => {
      return (
        <option key={id} value={id}>
          aircraftId{aircraftId} flight: {id}
        </option>
      );
    });
  }
  return (
    <option key={66} value={66}>
      little problems
    </option>
  );
};

const SeatsOptions = (props: { id: number }) => {
  const { data } = useFlightSeatsQuery(0, 10, props.id);
  if (data) {
    return data.content.map(({ id, seat }) => {
      return (
        <option key={id} value={id}>
          {seat!.seatNumber}
        </option>
      );
    });
  }
  return (
    <option key={66} value={66}>
      little problems
    </option>
  );
};
// litle problems заглушки на случай ошибки

export const modalFlightSeatFields: FormInputProps<IFlightSeatsPost>[] = [
  {
    fieldName: 'flightId',
    type: 'select',
    label: 'ID Рейса',
    rules: {},
    children: <FlightIdOptions />,
  },
  {
    fieldName: 'seat.seatNumber',
    type: 'select',
    label: 'Номер сиденья',
    rules: {},
    children: <SeatsOptions id={10} />,
  },
  {
    fieldName: 'fare',
    typeInput: 'number',
    label: 'Цена',
    rules: {
      required: 'Введите цену',
    },
  },
  {
    type: 'select',
    fieldName: 'seat.category',
    label: 'Класс',
    rules: {
      required: 'Введите класс бронирования',
    },
    children: seatCategoryOptions,
  },
  {
    checkbox: true,
    fieldName: 'isSold',
    label: 'Продано',
    rules: {},
  },
  {
    checkbox: true,
    fieldName: 'isRegistered',
    label: 'Зарегистрировано',
    rules: {},
  },
  {
    checkbox: true,
    fieldName: 'isBooked',
    label: 'Забронировано',
    rules: {},
  },
];
