"use client";
import Sidebar from "@/components/admin/Sidebar";
<<<<<<< HEAD
<<<<<<< HEAD
import Navbar from "@/components/NavBar";
import { deletePlato, getPlatos } from "@/services/platosService";
import { IProduct } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import Card from "@/components/Card";
import { getPlatos } from "@/services/platosService";
import { IProduct } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
>>>>>>> 99dd073 (Panel de usuarios, stats y platos)
=======
import Navbar from "@/components/NavBar";
import { deletePlato, getPlatos } from "@/services/platosService";
import { IProduct } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
>>>>>>> 4064a16 (Mejoras)
=======
import { useAuth } from "@/context/AuthContext";
import { is } from "date-fns/locale";
>>>>>>> a7bf492 (Proteccion de la ruta terminada)

const PlatosYCategoriasView = () => {
  const [loading, setLoading] = useState(true);
  const [platos, setPlatos] = useState<IProduct[]>([]);
<<<<<<< HEAD
<<<<<<< HEAD
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { checkAdmin, isAuthReady, userData } = useAuth();
  const router = useRouter();
=======
>>>>>>> 99dd073 (Panel de usuarios, stats y platos)
=======
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
>>>>>>> 4064a16 (Mejoras)

  useEffect(() => {
    if (!isAuthReady || !userData) return;

    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
      try {
        const platos = await getPlatos(1, 100);
        if (Array.isArray(platos)) {
          setPlatos(platos);
        } else {
          setPlatos([]);
        }
      } catch (error) {
        console.error(error);
        setPlatos([]);
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    fetchPlatos();
  }, []);
=======
    init();
  }, [isAuthReady, userData]);

  if (!isAuthReady || !userData) return null;
>>>>>>> a7bf492 (Proteccion de la ruta terminada)

  const getStockLabel = (stock: number) => {
    if (stock === 0)
      return <span className="ml-3 font-semibold text-red-500">Sin Stock</span>;
    if (stock <= 10)
      return (
        <span>
          {stock}{" "}
          <span className="ml-3 font-semibold text-yellow-500">Bajo Stock</span>
        </span>
      );
    return <span className="text-gray-700">{stock}</span>;
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
=======

=======
>>>>>>> 4064a16 (Mejoras)
    fetchPlatos();
  }, []);

  const getStockLabel = (stock: number) => {
    if (stock === 0)
      return <span className="ml-3 font-semibold text-red-500">Sin Stock</span>;
    if (stock <= 10)
      return (
        <span>
          {stock}{" "}
          <span className="ml-3 font-semibold text-yellow-500">Bajo Stock</span>
        </span>
      );
    return <span className="text-gray-700">{stock}</span>;
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
<<<<<<< HEAD
        <Sidebar />
>>>>>>> 99dd073 (Panel de usuarios, stats y platos)
=======
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
>>>>>>> 4064a16 (Mejoras)
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Platos
          </h2>
<<<<<<< HEAD
<<<<<<< HEAD

          <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] overflow-hidden">
            {loading ? (
              <p className="py-10 text-xl text-center">Cargando platos...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Nombre
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Categoría
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Stock
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platos.map((p: any) => (
                    <tr
                      key={p.id}
                      className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-lg">
                            <img
                              src={p.imageUrl || "/placeholder.png"}
                              alt={p.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {p.category?.name || "-"}
                      </td>
                      <td className="px-6 py-4">{getStockLabel(p.stock)}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        ${Number(p.price).toFixed(2)}
                      </td>
                      <td className="flex gap-3 py-4">
                        <button
                          className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/admin/platos-y-categorias/editar-plato/${p.id}`,
                            )
                          }
                        >
                          Editar
                          <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                        </button>
                        <button
                          className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                          onClick={() => {
                            deletePlato(p.id, router);
                          }}
                        >
                          Borrar
                          <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/admin/crear-plato">
              <button className="relative overflow-hidden py-3 w-50 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
=======
          <div className="flex justify-center gap-5">
            <div className="w-300 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
              <h3 className="mb-4 text-3xl text-red-950">Lista de Platos</h3>
              <div className="flex-grow w-full px-6 py-8 m-6 mx-auto">
                {loading && (
                  <p className="text-xl text-center">Cargando platos...</p>
                )}
=======
>>>>>>> 4064a16 (Mejoras)

          <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] overflow-hidden">
            {loading ? (
              <p className="py-10 text-xl text-center">Cargando platos...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Nombre
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Categoría
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Stock
                    </th>
                    <th className="px-6 py-4 font-medium text-left text-gray-500">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platos.map((p: any) => (
                    <tr
                      key={p.id}
                      className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-lg">
                            <img
                              src={p.imageUrl || "/placeholder.png"}
                              alt={p.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {p.category?.name || "-"}
                      </td>
                      <td className="px-6 py-4">{getStockLabel(p.stock)}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        ${Number(p.price).toFixed(2)}
                      </td>
                      <td className="flex gap-3 py-4">
                        <button
                          className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/admin/platos-y-categorias/editar-plato/${p.id}`,
                            )
                          }
                        >
                          Editar
                          <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                        </button>
                        <button
                          className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                          onClick={() => {
                            deletePlato(p.id, router);
                          }}
                        >
                          Borrar
                          <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

<<<<<<< HEAD
          <div>
            <Link
              href="/admin/crear-plato"
              className="flex justify-center cursor-pointer"
            >
              <button className="relative overflow-hidden py-3 w-50 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer mt-5">
>>>>>>> 99dd073 (Panel de usuarios, stats y platos)
=======
          <div className="flex justify-center mt-6">
            <Link href="/admin/crear-plato">
              <button className="relative overflow-hidden py-3 w-50 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
>>>>>>> 4064a16 (Mejoras)
                Crear Plato
                <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlatosYCategoriasView;
