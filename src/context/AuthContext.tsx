import { createContext, useState } from 'react';

type TAuthContextType = {
  isAdmin: boolean;
  setIsAdmin: (auth: boolean) => void;
};

localStorage.setItem('adminToken', 'true'); //delete when admin funcs created

export const AuthContext = createContext<TAuthContextType>({
  isAdmin: Boolean(localStorage.getItem('adminToken')),
  setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    Boolean(localStorage.getItem('adminToken'))
  );

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
