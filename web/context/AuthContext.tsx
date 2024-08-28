import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  authenticated: false,
  login: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(true);

  const login = () => {
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
