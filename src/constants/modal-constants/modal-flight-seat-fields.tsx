import { FlightIdOptions, SeatCategoryOptions, SeatsOptions } from '@/common';
import { FormInputProps } from '@/common/ModalInput';
// import { useStore } from '@/common/ModalOptions/store/store';
import { IFlightSeatsPost } from '@/interfaces/flightsSeats.interfaces';
// const Selector = () => {
//   const { id } = useStore();
//   return (
//     <option key={id} value={id}>{id}</option>
//   )
// }

export const modalFlightSeatFields: FormInputProps<IFlightSeatsPost>[] = [
  {
    fieldName: 'flightId',
    type: 'customSelect',
    label: 'ID Рейса',
    rules: {},
    children: <FlightIdOptions />,
  },
  {
    fieldName: 'seat.seatNumber',
    type: 'select',
    label: 'Номер сиденья',
    rules: {},
    children: <SeatsOptions />,
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
    children: <SeatCategoryOptions />,
  },
  {
    checkbox: true,
    fieldName: 'seat.isSold',
    label: 'Продано',
    value: 'true',
  },
  {
    checkbox: true,
    fieldName: 'seat.isRegistered',
    label: 'Зарегистрировано',
    value: 'true',
  },
  {
    checkbox: true,
    fieldName: 'seat.isBooked',
    label: 'Забронировано',
    value: 'true',
  },
  {
    fieldName: 'seat.aircraftId',
    label: 'id',
    typeInput: 'hidden',
    value: 10,
  },
  {
    fieldName: 'seat.id',
    label: 'id',
    typeInput: 'hidden',
    value: 10,
  },
  {
    fieldName: 'seat.isNearEmergencyExit',
    label: 'id',
    typeInput: 'hidden',
    value: 'true',
  },
  {
    fieldName: 'seat.isLockedBack',
    label: 'id',
    typeInput: 'hidden',
    value: 'true',
  },
  {
    fieldName: 'id',
    label: '',
    typeInput: 'hidden',
    value: 10,
  },
];
