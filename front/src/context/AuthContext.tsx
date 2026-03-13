"use client";
import { IUserSession } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

export interface IAuthContext {
  userData: IUserSession | null;
  setUserData: (values: IUserSession | null) => void;
  isAuthLoading: boolean;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isAuthReady: boolean
}

export const AuthContext = createContext<IAuthContext>({
  userData: null,
  setUserData: () => {},
  isAuthLoading: true,
  isAuthReady: false,
  showPassword: false,
  setShowPassword: () => {},
});

export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "userSession",
        JSON.stringify({ token: userData.token, user: userData.user }),
      );
    }
  }, [userData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthLoading(true);
    const userData = JSON.parse(localStorage.getItem("userSession")!);
    setUserData(userData);
    setIsAuthLoading(false);
    setIsAuthReady(true)
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthLoading,
        showPassword,
        setShowPassword,
        isAuthReady
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
