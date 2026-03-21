"use client";
import { getUsers } from "@/services/usersService";
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
  handleLogout: () => void;
  checkAdmin: () => Promise<void>;
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
  const [role, setRole] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const router = useRouter();

  const checkAdmin = async () => {
    try {
      const users = await getUsers();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = users.find((u: any) => u.email === userData?.user?.email);
      if (user?.role !== "ADMIN") {
        router.push("/");
        Swal.fire({
          icon: "error",
          title: "Acceso Denegado",
          text: "No tienes permisos para acceder a esta página.",
          confirmButtonColor: "#000",
        });
      }
    } catch (error) {
      console.error(error);
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
        handleLogout,
        checkAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
