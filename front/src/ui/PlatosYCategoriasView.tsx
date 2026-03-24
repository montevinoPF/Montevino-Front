"use client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import {
  crearCategoria,
  deletePlato,
  getPlatos,
} from "@/services/platosService";
import { ICategory, IProduct } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { set } from "date-fns";

const ITEMS_PER_PAGE = 10;

const PlatosYCategoriasView = () => {
  const [loading, setLoading] = useState(true);
  const [platos, setPlatos] = useState<IProduct[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlatos, setTotalPlatos] = useState(0);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const router = useRouter();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const { isAuthReady, userData, checkAdmin } = useAuth();
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!isAuthReady || !userData) return;
    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
      setLoading(true);
      try {
        const data = await getPlatos(currentPage, ITEMS_PER_PAGE);
        const platosArray = Array.isArray(data) ? data : (data.platos ?? []);
        setPlatos(platosArray);
        // Si devuelve exactamente ITEMS_PER_PAGE, probablemente hay más
        setHasNextPage(platosArray.length === ITEMS_PER_PAGE);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      fetch(`${BACKURL}/categories`)
        .then((res) => res.json())
        .then((data) => setCategorias(data))
        .catch(() => setCategorias([]));
    };
    init();
  }, [BACKURL, userData, isAuthReady, currentPage]);

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

  const totalPages = Math.ceil(totalPlatos / ITEMS_PER_PAGE);

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
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Platos
          </h2>

          <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] overflow-hidden">
            {loading ? (
              <p className="py-10 text-xl text-center">Cargando platos...</p>
            ) : (
              <>
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
                      <th className="px-6 py-4 font-medium text-left text-gray-500">
                        Acciones
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
                              router.push(`/admin/platos/editar-plato/${p.id}`)
                            }
                          >
                            Editar
                            <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                          </button>
                          <button
                            className="relative overflow-hidden py-1 px-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                            onClick={() => {
                              deletePlato(p.id, router);
                              setPlatos((prev) =>
                                prev.filter((plato) => plato.id !== p.id),
                              );
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

                {/* Paginado */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    Página{" "}
                    <span className="font-medium text-gray-700">
                      {currentPage}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#350A06] text-white text-sm font-medium">
                      {currentPage}
                    </span>

                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={!hasNextPage}
                      className="p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/admin/platos/crear-plato">
              <button className="relative overflow-hidden py-3 w-50 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
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
