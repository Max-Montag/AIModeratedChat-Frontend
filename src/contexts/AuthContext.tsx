import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export interface userData {
  id: number;
  username: string;
  userprofile: {
    partner: string;
  };
}

type AuthContextType = {
  currentUser: userData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setupAxiosInterceptors = (token: string) => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/token/`,
        { username, password },
        { withCredentials: true }
      );

      setToken(response.data.access);
      setupAxiosInterceptors(response.data.access);

      const userDataResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/user/`,
        { withCredentials: true }
      );

      setCurrentUser(userDataResponse.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/logout/`,
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
