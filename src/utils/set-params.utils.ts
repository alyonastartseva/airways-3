interface IParams {
  color?: string;
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonColor?: string;
  hover?: string;
  width?: number;
  height?: number;
}

type ParamsType = 'header' | 'logo';

const setParams = (
  type: ParamsType,
  isLogged = false,
  isFooter = false
): IParams => {
  if (type === 'header') {
    return isLogged
      ? {
          color: '#FFFFFF',
          backgroundColor: '#445EBD',
          buttonBackgroundColor: '#006FFF',
          buttonColor: '#fff',
          hover: '#4797FF',
        }
      : {
          color: '#fff',
          backgroundColor: '#445EBD',
          buttonBackgroundColor: '#fff',
          buttonColor: '#141414',
          hover: '#646cff',
        };
  } else if (type === 'logo') {
    const sizes = isFooter
      ? { width: 21.5, height: 25 }
      : { width: 29, height: 34 };

    return { ...sizes, color: '#FFFFFF' };
  }

  return {};
};

export default setParams;
