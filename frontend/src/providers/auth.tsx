import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config/settings";

interface UserResponse {
  id: number,
  email: string,
  name: string,
  provider: string,
  uid: string,
  updated_at: Date,
}

interface User {
  id: number,
  email: string,
  name: string,
  provider: string,
  uid: string,
  updatedAt: Date,
}

interface APIResponse {
  user: UserResponse;
}

interface AuthContextType {
  token: string,
  currentUser: User | null;
  logout: () => void;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const convertToUser = (response: UserResponse): User => {
  return {
    id: response.id,
    email: response.email,
    name: response.name,
    provider: response.provider,
    uid: response.uid,
    updatedAt: response.updated_at
  };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const tokenFromUrl = query.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      localStorage.setItem("authToken", tokenFromUrl);
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${BACKEND_URL}/api/v1/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((data: APIResponse) => {
          setCurrentUser(convertToUser(data.user))
        })
        .catch((error: Error) => {
          console.error("Error fetching user:", error);
          logout();
        });
    }
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem("authToken");
  };

  const value: AuthContextType = {
    token,
    logout,
    setToken,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
