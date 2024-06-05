import { RouteData } from './popoverTable.interfaces';

const mapRoutesFormData = (data: RouteData): number | undefined => {
  const { model, id } = data;
  if (model) {
    return id;
  }
};

export { mapRoutesFormData };
