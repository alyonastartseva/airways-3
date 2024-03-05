interface IHeaderParams {
  color: string;
  backgroundColor: string;
  buttonBackgroundColor: string;
  buttonColor: string;
  hover: string;
}

const setHeaderParams = (isLogged: boolean) => {
  const result: IHeaderParams = {
    color: '',
    backgroundColor: '',
    buttonBackgroundColor: '',
    buttonColor: '',
    hover: '',
  };

  if (isLogged) {
    result.color = '#141414';
    result.backgroundColor = '#F5F5F5';
    result.buttonBackgroundColor = '#006FFF';
    result.buttonColor = '#fff';
    result.hover = '#4797FF';
  } else {
    result.color = '#fff';
    result.backgroundColor = '#006FFF';
    result.buttonBackgroundColor = '#fff';
    result.buttonColor = '#141414';
    result.hover = '#646cff';
  }

  return result;
};

export default setHeaderParams;
