import { ILogoParams } from '@interfaces/logo-params.interfaces';

const setLogoParams = (isFooter: boolean, isLogged: boolean) => {
  const result: ILogoParams = { width: 0, height: 0, color: '' };

  const headerSizes = { width: 29, height: 34 };
  const footerSizes = { width: 21.5, height: 25 };

  if (isFooter) {
    result.width = footerSizes.width;
    result.height = footerSizes.height;
  } else {
    result.width = headerSizes.width;
    result.height = headerSizes.height;
  }
  isLogged ? (result.color = '#4797FF') : (result.color = '#fff');

  return result;
};

export default setLogoParams;
