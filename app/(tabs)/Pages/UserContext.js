import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [devices, setDevices] = useState([]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, devices, setDevices }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
