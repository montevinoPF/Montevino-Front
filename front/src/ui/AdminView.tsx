"use client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import { useState } from "react";

const AdminView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
