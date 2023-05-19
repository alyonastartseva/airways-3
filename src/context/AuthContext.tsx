import { createContext, useState } from 'react';

type TAuthContextType = {
  isAdmin: boolean;
  setIsAdmin: (auth: boolean) => void;
};

export const AuthContext = createContext<TAuthContextType>({
  isAdmin: Boolean(localStorage.getItem('adminToken')),
  setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  // когда будет использоваться токен для автоматической авторизации при наличии токена,
  // можно будет с false поменять на Boolean(localStorage.getItem('adminToken')) и потом где-то с этим что-то делать (слать запросы и т.д.)
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
