import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider, Button, Switch } from 'antd';

import { UserHeader, AdminHeader } from '@/components';
import { WebsiteLogo } from '@/common';
import { ELinks } from '@/services';
import { useAuth } from '@/hooks';
import { themeValue, set } from '@store/slices';

import styles from './Header.module.scss';

const Header = () => {
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector(themeValue);
  const setTheme = (value: string) => dispatch(set(value));

  // TODO заглушка для отображения контента для неавторизованного пользователя
  const isSignIn = pathname === ELinks.AUTHORIZATION;

  const UNAUTH_LINKS = [
    { path: ELinks.AUTHORIZATION, name: 'Вход' },
    { path: ELinks.REGISTRATION, name: 'Регистрация' },
    { path: '/', name: 'На главную' },
  ];

  const handleChangeTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const authContent = isAdmin ? <AdminHeader /> : <UserHeader />;

  return (
    <div className={styles.container}>
      <WebsiteLogo isFooter={false} isLogged={isAdmin && !isSignIn} />

      <div className={styles.actions}>
        {isSignIn ? unAuthContent : authContent}

        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: '#000000',
                colorPrimaryHover: '#ffffff2a',
              },
            },
          }}
        >
          <Switch
            className={styles.switch}
            checkedChildren="Темная тема"
            unCheckedChildren="Светлая тема"
            checked={theme === 'dark'}
            onClick={handleChangeTheme}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Header;
