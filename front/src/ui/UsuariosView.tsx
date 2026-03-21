"use client";
import Sidebar from "@/components/admin/Sidebar";
import { getUsers } from "@/services/usersService";
import { IUser } from "@/types/types";
import React, { useEffect, useState } from "react";

const UsuariosView = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

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
    <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
      <Sidebar />
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
                      <td className="w-1/6 px-3 py-3 text-center">{u.name}</td>
                      <td className="w-1/6 px-3 py-3 text-center">{u.email}</td>
                      <td className="w-1/6 px-3 py-3 text-center">{u.role}</td>
                      <td className="w-1/6 px-3 py-3 text-center">
                        <button
                          className={
                            u.role === "ADMIN"
                              ? "px-3 py-1.5 min-w-50 text-white transition-colors bg-red-800 rounded cursor-pointer hover:bg-red-600"
                              : "px-3 py-1.5 min-w-50 text-white transition-colors bg-green-800 rounded cursor-pointer hover:bg-green-600"
                          }
                        >
                          {u.role === "ADMIN"
                            ? "REVERTIR A USUARIO"
                            : "PROMOVER A ADMIN"}
                        </button>
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
  );
};

export default UsuariosView;
