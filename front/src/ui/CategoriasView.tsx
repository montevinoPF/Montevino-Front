"use client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import { crearCategoria } from "@/services/platosService";
import { ICategory } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const CategoriasView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const router = useRouter();
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const { isAuthReady, userData, checkAdmin } = useAuth();
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!isAuthReady || !userData) return;
    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
      fetch(`${BACKURL}/categories`)
        .then((res) => res.json())
        .then((data) => setCategorias(data))
        .catch(() => setCategorias([]));
    };
    init();
  }, [BACKURL, userData, isAuthReady]);

  if (!isAuthReady || !userData) return null;

  const handleCrearCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return;

    setLoadingCategoria(true);
    try {
      const nueva = await crearCategoria(nuevaCategoria);
      setCategorias((prev) => [...prev, nueva]); // Agrega sin recargar
      setNuevaCategoria(""); // Limpia el input
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategoria(false);
    }
  };
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Categorias
          </h2>
          {/* Grid de categorías */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{p.name}</span>
                <div className="flex gap-2">
                  <button
                    className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/platos-y-categorias/editar-categoria/${p.id}`,
                      )
                    }
                  >
                    Editar
                    <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                  </button>
                  <button className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
                    Borrar
                    <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Formulario nueva categoría */}
          <div className="flex justify-center my-6">
            <form
              onSubmit={handleCrearCategoria}
              className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] w-full max-w-md"
            >
              <input
                type="text"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                placeholder="Nueva categoría..."
                className="flex-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-[#FED0BB]"
              />
              <button
                type="submit"
                disabled={loadingCategoria || !nuevaCategoria.trim()}
                className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
              >
                {loadingCategoria ? "Creando..." : "Agregar"}
                <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriasView;
