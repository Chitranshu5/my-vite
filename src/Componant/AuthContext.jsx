import React, { createContext, useState } from "react";

export const ChinuContext = createContext();

export const ChinuProvider = ({ children }) => {
  const [name, setName] = useState("chinu");
  const [user, setUser] = useState(null);
  const [authen, setAuthen] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setAuthen(true)
  };

  const logout = () => {
    setUser(null);
    setAuthen(false)
  };

  return (
    <ChinuContext.Provider
      value={{ name, setName, login, logout, user, setUser, authen, setAuthen }}
    >
      {children}
    </ChinuContext.Provider>
  );
};
