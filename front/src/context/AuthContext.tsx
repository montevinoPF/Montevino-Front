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
  isAuthReady: boolean;
  handleLogout: () => void;
  checkAdmin: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userData: null,
  setUserData: () => {},
  isAuthLoading: true,
  isAuthReady: false,
  showPassword: false,
  setShowPassword: () => {},
  handleLogout: () => {},
  checkAdmin: async () => {},
});

export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const router = useRouter();

  const checkAdmin = () => {
    if (!isAuthReady) return;
    if (!userData) {
      handleLogout();
      router.push("/login");
      return;
    }
    if (userData.user.role !== "ADMIN") {
      router.push("/"); // Redirige a la página principal si no es admin
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para acceder a esta página.",
        confirmButtonColor: "#000",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUserData(null);
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente",
      confirmButtonText: "OK",
      confirmButtonColor: "black",
    });
    router.push("/");
  };

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
        handleLogout,
        checkAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
