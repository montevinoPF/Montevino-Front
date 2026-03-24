"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import { getPlatos } from "@/services/platosService";
import { getBebidas } from "@/services/bebidasService";

const MenuView = () => {
  const [platos, setPlatos] = useState<any[]>([]);
  const [bebidas, setBebidas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"platos" | "bebidas">("platos");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const [platosData, bebidasData] = await Promise.all([
          getPlatos(1, 100),
          getBebidas(1, 100),
        ]);

        setPlatos(platosData);
        setBebidas(bebidasData);
      } catch (error) {
        console.error("Error al traer productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const visibleItems = activeTab === "platos" ? platos : bebidas;

  const categoryOptions = useMemo(() => {
    const baseOptions =
      activeTab === "platos"
        ? ["todos", "carne", "pescado", "mariscos", "parrilla", "vegetariano", "sin tac"]
        : ["todos", "vinos", "cervezas", "cocktails", "jugos", "agua", "gaseosas"];

    return baseOptions;
  }, [activeTab]);

  const filteredItems = useMemo(() => {
    if (categoryFilter === "todos") return visibleItems;

    return visibleItems.filter((item) => {
      const categoryName =
        typeof item.category === "string"
          ? item.category
          : item.category?.name;

      return categoryName?.toLowerCase() === categoryFilter.toLowerCase();
    });
  }, [visibleItems, categoryFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <section className="min-h-screen bg-gradient-to-b from-[#fcf7f3] to-[#f7efea] py-10 mt-auto">
        <div className="w-full py-24">
          <p className="m-4 text-5xl text-center text-red-950">Menú</p>

          <p className="text-xl text-center text-amber-900">
            Descubrí nuestros platillos destacados con ingredientes frescos y de
            calidad.
          </p>
        </div>

        <div className="w-full px-6 py-4 mx-auto">
          <div className="mx-auto flex w-fit overflow-hidden rounded-2xl border border-[#d8b6ac] bg-[#f8ece6] shadow-sm">
            <button
              onClick={() => {
                setActiveTab("platos");
                setCategoryFilter("todos");
                setCurrentPage(1);
              }}
              className={`px-8 py-4 text-xl font-medium transition ${
                activeTab === "platos"
                  ? "bg-gradient-to-r from-[#7c090c] to-[#520509] text-white"
                  : "bg-transparent text-[#6b3030]"
              }`}
            >
              Platos
            </button>

            <button
              onClick={() => {
                setActiveTab("bebidas");
                setCategoryFilter("todos");
                setCurrentPage(1);
              }}
              className={`px-8 py-4 text-xl font-medium transition ${
                activeTab === "bebidas"
                  ? "bg-gradient-to-r from-[#7c090c] to-[#520509] text-white"
                  : "bg-transparent text-[#6b3030]"
              }`}
            >
              Bebidas
            </button>
          </div>
        </div>

        <div className="w-full px-6 py-4 mx-auto">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
            {categoryOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setCategoryFilter(option);
                  setCurrentPage(1);
                }}
                className={`rounded-full px-6 py-3 text-xl transition ${
                  categoryFilter === option
                    ? "bg-gradient-to-r from-[#7c090c] to-[#520509] text-white"
                    : "border border-[#d8b6ac] bg-[#f8ece6] text-[#6b3030]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="text-3xl text-center text-red-950 m-9">
          {activeTab === "platos" ? "Platos" : "Bebidas"}
        </p>

        <div className="flex-grow w-full px-6 py-8 m-6 mx-auto">
          {!loading && paginatedItems.length > 0 ? (
            <div className="grid items-stretch grid-cols-2 gap-8 mx-auto md:grid-cols-4 lg:grid-cols-4 max-w-300">
              {paginatedItems.map((item: any) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={Number(item.price)}
                  imageUrl={item.imageUrl}
                  ingredientes={item.ingredientes}
                  stock={item.stock}
                  description={item.description}
                  type={activeTab}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-xl text-center text-amber-900">
                No hay productos para esta categoría.
              </p>
            )
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 px-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-[#d8b6ac] bg-[#f8ece6] px-4 py-2 text-[#6b3030] disabled:opacity-50"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2 ${
                  currentPage === page
                    ? "bg-[#7c090c] text-white"
                    : "border border-[#d8b6ac] bg-[#f8ece6] text-[#6b3030]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-[#d8b6ac] bg-[#f8ece6] px-4 py-2 text-[#6b3030] disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuView;
