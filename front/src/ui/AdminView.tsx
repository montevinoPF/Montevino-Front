"use client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const AdminView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { checkAdmin, isAuthReady, userData } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;
    checkAdmin(); // Solo dentro del useEffect, nunca en el render
  }, [isAuthReady, userData]); // Se ejecuta cuando cambia isAuthReady o userData

  if (!isAuthReady || !userData) return null;

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full mb-10 bg-[#F6E3D9] flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1">
          <h1 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Panel de Administración
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminView;
