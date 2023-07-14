export const mapRoutesFormData = (data: any): number | undefined => {
  // пока что только для самолетов
  const { model, id } = data;
  if (model && id <= 10) {
    return id;
  }
};
