import React, { createContext, useState } from "react";

const initialState = {
  currentUser: null,
  setCurrentUser: () => null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
