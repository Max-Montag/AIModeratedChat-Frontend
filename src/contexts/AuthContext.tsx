import React, { createContext, useState, useContext, useEffect } from "react";
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

export function createAuthenticatedClient() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  const accessToken = cookie ? cookie.split("=")[1] : null;
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        document.cookie = `access_token=${access_token}; path=/; samesite=lax`;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return client(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return client;
}

const refreshAccessToken = async () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh_token="));
  const refreshToken = cookie ? cookie.split("=")[1] : null;
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}api/token/refresh/`,
    { refresh: refreshToken }
  );
  return response.data.access;
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
          const client = createAuthenticatedClient();
          const userDataResponse = await client.get("api/user/");
          setCurrentUser(userDataResponse.data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      };

      authenticateUser();
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/token/`,
        { username, password },
        { withCredentials: true }
      );

      const client = createAuthenticatedClient();
      const userDataResponse = await client.get("api/user/");

      setCurrentUser(userDataResponse.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const client = createAuthenticatedClient();
      await client.post("api/logout/", {});
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
