"use client";
import Sidebar from "@/components/admin/Sidebar";
import Card from "@/components/Card";
import { getPlatos } from "@/services/platosService";
import { IProduct } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PlatosYCategoriasView = () => {
  const [loading, setLoading] = useState(true);
  const [platos, setPlatos] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const platos = await getPlatos(1, 100);
        setPlatos(platos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatos();
  }, []);

  return (
    <>
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
        <Sidebar />
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Platos
          </h2>
          <div className="flex justify-center gap-5">
            <div className="w-300 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
              <h3 className="mb-4 text-3xl text-red-950">Lista de Platos</h3>
              <div className="flex-grow w-full px-6 py-8 m-6 mx-auto">
                {loading && (
                  <p className="text-xl text-center">Cargando platos...</p>
                )}

                {!loading && (
                  <div className="grid items-stretch grid-cols-2 gap-8 mx-auto md:grid-cols-4 lg:grid-cols-4 max-w-300">
                    {platos.map((p: any) => (
                      <Card
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        price={Number(p.price)}
                        imageUrl={p.imageUrl}
                        ingredientes={p.ingredientes}
                        stock={p.stock}
                        description=""
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Link
              href="/admin/crear-plato"
              className="flex justify-center cursor-pointer"
            >
              <button className="relative overflow-hidden py-3 w-50 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer mt-5">
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
