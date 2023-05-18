import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  currentUser: string | null;
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
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    localStorage.getItem("currentuser")
  );

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

      // TODO: do not store tokens in local storage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("currentuser", username);

      setCurrentUser(username);
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
