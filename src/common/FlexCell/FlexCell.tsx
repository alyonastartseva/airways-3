import { Row, Col } from 'antd';

import { IFlexCell } from './flex.interfaces';

const FlexCell = ({ padding, value }: IFlexCell) => (
  <Row
    style={{
      paddingLeft: `${padding / 16}rem`,
      height: '2.5rem',
      alignItems: 'center',
      display: 'flex',
    }}
  >
    <Col>{value}</Col>
  </Row>
);

export default FlexCell;
