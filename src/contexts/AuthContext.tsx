import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [currentUser, setCurrentUser] = useState<userData | null>(() => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  });

  const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          onUnauthenticated();
        }
        return Promise.reject(error);
      }
    );
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/token/`,
        { username, password }
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const userDataResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/user/`,
        { headers: { Authorization: `Bearer ${response.data.access}` } }
      );

      localStorage.setItem("currentuser", userDataResponse.data);

      setCurrentUser(userDataResponse.data);
      setupAxiosInterceptors(logout);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setCurrentUser(null);
    navigate("/login");
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
