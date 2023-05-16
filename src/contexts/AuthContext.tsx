import React, { createContext, useState, useContext } from "react";
import axios from "axios";

type AuthContextType = {
  currentUser: string | null;
  login: (username: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/token/`,
        { username, password }
      );

      // TODO: do not store tokens in local storage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setCurrentUser(username);
    } catch (error) {
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    currentUser,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
