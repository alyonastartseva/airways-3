import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { UserHeader, AdminHeader } from '@/components';
import { WebsiteLogo } from '@/common';
import { ELinks } from '@/services';
import { useAuth } from '@/hooks';
import setParams from '@utils/set-params.utils';

import styles from './Header.module.scss';

const Header = () => {
  const { isAdmin: isLogged } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // TODO заглушка для отображения контента для неавторизованного пользователя
  const isSignIn = pathname === ELinks.AUTHORIZATION;
  const { backgroundColor } = setParams('header', isLogged && !isSignIn);

  const UNAUTH_LINKS = [
    { path: ELinks.AUTHORIZATION, name: 'Вход' },
    { path: ELinks.REGISTRATION, name: 'Регистрация' },
    { path: '/', name: 'На главную' },
  ];

  const unAuthContent = (
    <div className={styles.buttons}>
      {UNAUTH_LINKS.map(
        ({ path, name }) =>
          path !== pathname && (
            <Button
              key={name}
              className={styles.buttonAntd}
              size="large"
              onClick={() => navigate(path)}
            >
              {name}
            </Button>
          )
      )}
    </div>
  );

  const authContent = isLogged ? <AdminHeader /> : <UserHeader />;

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <WebsiteLogo isFooter={false} isLogged={isLogged && !isSignIn} />

      {isLogged && !isSignIn ? unAuthContent : authContent}
    </div>
  );
};

export default Header;
