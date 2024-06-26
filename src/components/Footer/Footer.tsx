import { Link } from 'react-router-dom';

import { ELinks } from '@/services';
import { useAuth } from '@/hooks';
import { WebsiteLogo } from '@/common';
import { useTheme } from '@context/:ThemeProvider';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { isAdmin: isLogged } = useAuth();
  const { theme } = useTheme();

  // TODO заглушка для отображения контента для неавторизованного пользователя
  const { pathname } = window.location;
  const isSignIn = pathname === ELinks.AUTHORIZATION;

  const unAuthContent = (
    <Link to="/" className={styles.link}>
      Air Alien © 2023
    </Link>
  );

  const authContent = (
    <>
      <Link to="/" className={styles.link}>
        О нас
      </Link>
      <Link to="/" className={styles.link}>
        Политика конфиденциальности
      </Link>
      <Link to="/" className={styles.link}>
        Связаться с нами
      </Link>
    </>
  );

  return (
    <div
      className={`${styles.container} ${
        theme === 'dark' ? styles['dark-theme'] : ''
      }`}
    >
      <div className={styles.links}>
        {isLogged && !isSignIn ? unAuthContent : authContent}
      </div>

      <WebsiteLogo isFooter={true} isLogged={isLogged && !isSignIn} />
    </div>
  );
};

export default Footer;
