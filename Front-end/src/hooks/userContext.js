import React, { createContext, useState } from 'react';

export const UserContext = createContext({id:''});
export const UserProvider = ({ children }) => {
  const [userIdProvider, setUserProvider] = useState(''); // set initial value to an empty string
  const login = (userId) => {
    setUserProvider(userId);
  };

  const logoutUser = () => {
    setUserProvider('');
  };

  return (
    <UserContext.Provider value={{ userIdProvider, setUserProvider }}>
      {children}
    </UserContext.Provider>
  );
};

