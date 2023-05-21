import React, { createContext, useState, useContext, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const authenticateUser = async () => {
        try {
          const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));
          const accessToken = cookie ? cookie.split("=")[1] : null;

          if (accessToken) {
            const userDataResponse = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}api/user/`,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setCurrentUser(userDataResponse.data);
          } else {
            throw new Error("Access token not found");
          }
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      };

      authenticateUser();
    }
  }, []);

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
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
