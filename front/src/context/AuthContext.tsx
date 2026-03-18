"use client";
import { IUserSession } from "@/types/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export interface IAuthContext {
  userData: IUserSession | null;
  setUserData: (values: IUserSession | null) => void;
  isAuthLoading: boolean;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  role: string | null;
  setRole: (value: string | null) => void;
  isAuthReady: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  userData: null,
  setUserData: () => {},
  isAuthLoading: true,
  isAuthReady: false,
  showPassword: false,
  setShowPassword: () => {},
  role: null,
  setRole: () => {},
});

export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

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
    setIsAuthReady(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthLoading,
        showPassword,
        setShowPassword,
        isAuthReady,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
