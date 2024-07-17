import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { Logo } from '@common/icons';

import setParams from './set-params.utils';
import styles from './WebsiteLogo.module.scss';

const WebsiteLogo = (props: { isFooter: boolean; isLogged: boolean }) => {
  const { isFooter, isLogged } = props;
  const navigate = useNavigate();

  const {
    width = 29,
    height = 34,
    color = '#FFFFFF',
  } = setParams('logo', isLogged, isFooter);

  return (
    <Button
      type="link"
      className={styles.container}
      onClick={() => navigate('/')}
    >
      <Logo width={width} height={height} color={color} />

      <span
        className={styles.text}
        style={{ color: color, fontSize: isFooter ? '1rem' : '1.25rem' }}
      >
        Air Alien
      </span>
    </Button>
  );
};

export default WebsiteLogo;
