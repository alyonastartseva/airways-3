import { ListItem, UnorderedList } from '@chakra-ui/react';

import { IAxiosErrResponseData } from '@/interfaces';

export interface IAxiosErrResDataProps {
  resData: IAxiosErrResponseData | IAxiosErrResponseData[];
}

const AxiosErrorMessage = ({ resData }: IAxiosErrResDataProps): JSX.Element => {
  const renderErrMgs = (data: typeof resData) => {
    if (Array.isArray(data)) {
      return data.map((dataObj) => {
        const msg = dataObj.exceptionMessage;
        return msg ? (
          <ListItem key={dataObj.exceptionMessage}>{msg}</ListItem>
        ) : null;
      });
    } else {
      const msg = data.exceptionMessage;
      return msg ? <ListItem>{msg}</ListItem> : null;
    }
  };

  return <UnorderedList>{renderErrMgs(resData)}</UnorderedList>;
};

export default AxiosErrorMessage;
