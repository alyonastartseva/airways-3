import { IAircraft } from '@interfaces/aircraft.interfaces';

export const mapRoutesFormData = (data: IAircraft): number | undefined => {
  // пока что только для самолетов
  const { model, id } = data;
  if (model && id <= 10) {
    return id;
  }
};
