"use client";

import { useEffect, useMemo, useState } from "react";
import { preloadProduct } from "@/lib/preloadProduct";
import { IProduct } from "@/types/types";
import Protected from "@/components/Protected";
import Swal from "sweetalert2";


type CartItem = IProduct & {
    quantity: number;
};

export default function ReservarPlatosView() {
    const [activeTab, setActiveTab] = useState<"platos" | "bebidas">("platos");
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [cart, setCart] = useState<CartItem[]>([]);
    const [comentarios, setComentarios] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [categoryFilter, setCategoryFilter] = useState<string>("todos");
    
    useEffect(() => {
  const savedCart = localStorage.getItem("montevino_reserva_cart");
  const savedComentarios = localStorage.getItem("montevino_reserva_comentarios");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }

  if (savedComentarios) {
    setComentarios(savedComentarios);
  }
}, []);

useEffect(() => {
  localStorage.setItem("montevino_reserva_cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem("montevino_reserva_comentarios", comentarios);
}, [comentarios]);

    const platos = preloadProduct.filter(
        (item) => item.type?.toLowerCase() === "platos"
    );

    const bebidas = preloadProduct.filter(
        (item) => item.type?.toLowerCase() === "bebidas"
    );

    const totalPages = Math.ceil(platos.length / itemsPerPage);

  const platosPaginados = platos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const visibleItems = activeTab === "platos" ? platosPaginados : bebidas;
  const categoryOptions =
  activeTab === "platos"
    ? ["todos", "carne", "pescado", "mariscos", "parrilla", "vegetariano", "sin tac"]
    : ["todos", "vinos", "cervezas", "cocktails", "sin alcohol"];

  const filteredItems =
  categoryFilter === "todos"
    ? visibleItems
    : visibleItems.filter((item) =>
        item.category?.toLowerCase() === categoryFilter.toLowerCase()
      );

  const getQuantity = (id: number) => quantities[id] ?? 1;

  const disminuirCantidad = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) - 1),
    }));
  };

  const aumentarCantidad = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 1) + 1,
    }));
  };

 const agregarAlCarrito = async (item: IProduct) => {
  const quantity = quantities[item.id] ?? 1;

  const yaHayMismoTipo = cart.find(
    (cartItem) =>
      cartItem.type?.toLowerCase() === item.type?.toLowerCase() &&
      cartItem.id !== item.id
  );

  if (yaHayMismoTipo) {
    await Swal.fire({
      icon: "warning",
      title:
        item.type?.toLowerCase() === "platos"
          ? "Ya hay un plato reservado"
          : "Ya hay una bebida reservada",
      text:
        item.type?.toLowerCase() === "platos"
          ? "Solo se puede reservar un plato por persona."
          : "Solo se puede reservar una bebida por persona.",
      confirmButtonColor: "#63060b",
    });
    return;
}
 const existing = cart.find((cartItem) => cartItem.id === item.id);

  if (existing) {
    return;
  }

  setCart((prev) => [...prev, { ...item, quantity: 1 }]);
  
};

//   const eliminarDelCarrito = (id: number) => {
//   setCart((prev) => prev.filter((item) => item.id !== id));
// };
const eliminarDelCarrito = (id: number) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  const platosEnReserva = cart.filter(
    (item) => item.type?.toLowerCase() === "platos"
  );

  const bebidasEnReserva = cart.filter(
    (item) => item.type?.toLowerCase() === "bebidas"
  );

  const subtotalPlatos = useMemo(() => {
    return platosEnReserva.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [platosEnReserva]);

  const subtotalBebidas = useMemo(() => {
    return bebidasEnReserva.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [bebidasEnReserva]);

  const totalGeneral = subtotalPlatos + subtotalBebidas;

    return (
        <Protected>
        <div className="max-w-8xl mx-auto mt-10">
            <section className="min-h-screen bg-[#f7efea]">
                <div className="bg-[radial-gradient(circle_at_top,#8b0d14_0%,#5d070b_45%,#3d0407_100%)] h-45">
                    <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16 ">
                        <h1 className=" font-serif text-white md:text-4xl ">
                            Reservar platos y bebidas
                        </h1>
                        <p className="mt-3 max-w-3xl text-white/90 md:text-xl">
                            Elegí tus platos y bebidas para reservarlos antes de tu visita.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1.7fr_0.9fr] lg:items-start">
                    <div>
                        <div className="h-13 mb-6 inline-flex items-center overflow-hidden rounded-2xl border border-[#d8b6ac] bg-[#f1dbd098] shadow-sm">
                            <button
                                onClick={() => {
                                setActiveTab("platos");
                                setCurrentPage(1);
                                setCategoryFilter("todos");
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
                                setCurrentPage(1);
                                setCategoryFilter("todos");
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
                        <div className="mb-6 flex flex-wrap gap-3">
                            {categoryOptions.map((option) => (
                                <button
                                key={option}
                                onClick={() => setCategoryFilter(option)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                    categoryFilter === option
                                    ? "bg-gradient-to-r from-[#7c090c] to-[#520509] text-white"
                                    : "border border-[#d8b6ac] bg-[#f1dbd098] text-[#6b3030]"
                                }`}
                                >
                                {option}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                            {filteredItems.length === 0 && (
                                <p className="text-[#6b3030] text-lg">
                                    No hay productos para esta categoría.
                                </p>
                            )}
                            {filteredItems.map((item) => {
                            const quantity = getQuantity(item.id);
                            const isReserved = cart.some((cartItem) => cartItem.id === item.id);

                            return (
                                <article
                                key={item.id}
                                className="rounded-2xl border border-[#e5cfc5] bg-[#f1dbd098]  p-4 shadow-sm"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[190px_1fr]">
                                        <div className="overflow-hidden rounded-xl">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="h-48 w-full object-cover md:h-full"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-serif leading-tight text-[#6d1e1e]">
                                            {item.name}
                                            </h3>

                                            <div className="my-3 h-px w-full bg-[#e3c8bf]" />

                                            <p className="text-sm leading-8 text-[#5e4a45]">
                                            {item.ingredientes.join(", ")}
                                            </p>
                                            <h3 className="text-xl font-semibold leading-tight text-[#6d1e1e] flex items-center justify-center">
                                            ${item.price}
                                            </h3>
                                        </div>

                                        <div className="mt-3 flex flex-col gap-2 relative overflow-hidden bg-gradient-to-r  text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
                                            <button
                                                onClick={() => agregarAlCarrito(item)}
                                                disabled={isReserved}
                                                className={`rounded-xl px-3 py-3 text-s font-semibold shadow-md transition
                                                ${
                                                    isReserved
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-gradient-to-r from-[#7c090c] to-[#520509] text-white hover:brightness-110"
                                                }`}
                                                >
                                                    <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                                                {isReserved
                                                    ? "Ya reservado"
                                                    : activeTab === "platos"
                                                    ? "Reservar plato"
                                                    : "Reservar bebida"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </article>
                            );
                            })}
                        </div>
                    </div>          
        
                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-[#e5cfc5] bg-[#f1dbd098] p-6 shadow-sm">
                            <h2 className="text-4xl font-serif text-[#6d1e1e] h-10">TU RESERVA</h2>
                            <h2 className="text-2xl font-serif text-[#6d1e1e] h-3">Platos</h2>
                        <div className="my-5 h-px bg-[#e3c8bf]" />

                        <div className="space-y-4">
                        {platosEnReserva.length === 0 ? (
                            <p className="text-lg text-[#7b6761]">
                            No agregaste platos todavía.
                            </p>
                        ) : (
                            platosEnReserva.map((item) => (
                            <div
                                key={`plato-${item.id}`}
                                className="flex items-center justify-between gap-4 text-lg"
                            >
                                <p className="text-[#4f2b2b]">
                                {item.name}
                                <span className="text-[#8c6a61] ml-1">x{item.quantity}</span>
                                </p>

                                <div className="flex items-center gap-3">
                                <p className="font-semibold text-[#4f2b2b]">
                                    ${item.price * item.quantity}
                                </p>

                                <button
                                    onClick={() => eliminarDelCarrito(item.id)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-700 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#e20b16] to-[#7e080d] text-white shadow-md hover:brightness-150 transition"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4h8v2" />
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 6l-1 14H6L5 6"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            ))
                        )}
                        </div>

                    
                        <h2 className="text-2xl font-serif text-[#6d1e1e] mt-8 h-3">Bebidas</h2>

                        <div className="my-5 h-px bg-[#e3c8bf]" />

                        <div className="space-y-4">
                        {bebidasEnReserva.length === 0 ? (
                            <p className="text-lg text-[#7b6761]">
                            No agregaste bebidas todavía.
                            </p>
                        ) : (
                            bebidasEnReserva.map((item) => (
                            <div
                                key={`bebida-${item.id}`}
                                className="flex items-center justify-between gap-4 text-lg"
                            >
                                <p className="text-[#4f2b2b]">
                                {item.name}
                                <span className="text-[#8c6a61] ml-1">x{item.quantity}</span>
                                </p>

                                <div className="flex items-center gap-3">
                                <p className="font-semibold text-[#4f2b2b]">
                                    ${item.price * item.quantity}
                                </p>

                                <button
                                    onClick={() => eliminarDelCarrito(item.id)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-700 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#e20b16] to-[#7e080d] text-white shadow-md hover:brightness-150 transition"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4h8v2" />
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 6l-1 14H6L5 6"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            ))
                        )}

                        <textarea
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                        placeholder="Alergias / comentarios"
                        className="mt-1 h-15 w-full rounded-xl border border-[#e1c8be] bg-white px-4 py-3 text-lg text-[#5b4741] outline-none placeholder:text-[#9a8178] focus:border-[#a24545]"
                        />
                        
                        <div className="flex items-center justify-between text-s h-2">
                            <p className="text-[#5c2c2c]">Subtotal de platos</p>
                            <p className="font-bold text-[#5c0f14]">${subtotalPlatos}</p>

                            <p className="text-[#5c2c2c]">Subtotal de bebidas</p>
                            <p className="font-bold text-[#5c0f14]">${subtotalBebidas}</p>
                        </div>

                        <div className="rounded-2xl border border-[#e5cfc5] bg-[#f8ece6] p-6 shadow-sm">
                            <div className="flex items-center justify-between text-2xl">
                                <p className="text-[#5c2c2c]">Total general</p>
                                <p className="font-bold text-[#5c0f14]">${totalGeneral}</p>
                            </div>
                        </div>

                        </div>
                            <button className="mt-6 relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
                                Confirmar reserva
                                <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                            </button> 
                        </div>
                    </div> 

                    {activeTab === "platos" && totalPages > 1 && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="rounded-lg border border-[#d8b6ac] bg-[#f8ece6] px-4 py-2 text-[#6b3030] disabled:opacity-50"
                            >
                            Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-4 py-2 ${
                                    currentPage === page
                                    ? "bg-[#7c090c] text-white"
                                    : "border border-[#d8b6ac] bg-[#f1dbd098] text-[#6b3030]"
                                }`}
                                >
                                {page}
                                </button>
                            )
                            )}

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
                </div>
            </section>
        </div> 
        </Protected>
    );
}