"use client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import promoteUserRole, { getUsers } from "@/services/usersService";
import { IUser } from "@/types/types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UsuariosView = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Usuarios
          </h2>
          <div className="flex justify-center gap-5">
            <div className="w-300 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
              <h3 className="mb-4 text-3xl text-red-950">Lista de Usuarios</h3>
              <table className="table-fixed">
                <thead className="text-sm text-black bg-gray-100">
                  <tr>
                    <th className="w-1/6 px-3 py-3 text-center">Nombre</th>
                    <th className="w-1/6 px-3 py-3 text-center">Correo</th>
                    <th className="w-1/6 px-3 py-3 text-center">Rol</th>
                    <th className="w-1/6 px-3 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center">
                        <h2>No hay usuarios para mostrar.</h2>
                      </td>
                    </tr>
                  ) : (
                    users.map((u, i) => (
                      <tr key={i} className="cursor-pointer hover:bg-gray-50">
                        <td className="w-1/6 px-3 py-3 text-center">
                          {u.name}
                        </td>
                        <td className="w-1/6 px-3 py-3 text-center">
                          {u.email}
                        </td>
                        <td className="w-1/6 px-3 py-3 text-center">
                          {u.role}
                        </td>
                        <td className="w-1/6 px-3 text-center">
                          {u.role === "USER" ? (
                            <button
                              className="relative overflow-hidden py-2 px-3 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer text-[15px]"
                              onClick={async () => {
                                const response = await promoteUserRole(u.id);
                                if (response) {
                                  // Actualizar la lista de usuarios después de promover
                                  setUsers((prevUsers) =>
                                    prevUsers.map((user) =>
                                      user.id === u.id
                                        ? { ...user, role: "ADMIN" }
                                        : user,
                                    ),
                                  );
                                  Swal.fire({
                                    title: "Usuario promovido",
                                    text: "El usuario ha sido promovido a administrador",
                                    icon: "success",
                                    confirmButtonText: "Aceptar",
                                    confirmButtonColor: "#000",
                                  });
                                }
                              }}
                            >
                              HACER ADMIN
                              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsuariosView;
