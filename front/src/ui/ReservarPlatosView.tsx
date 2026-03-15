"use client";

import { useEffect, useMemo, useState } from "react";
import { IProduct } from "@/types/types";
import Protected from "@/components/Protected";
import Swal from "sweetalert2";
import Link from "next/link";
import { getPlatos } from "@/services/platosService";


type CartItem = IProduct & {
    quantity: number;
};

export default function ReservarPlatosView() {
    const [activeTab, setActiveTab] = useState<"platos" | "bebidas">("platos");
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [cart, setCart] = useState<CartItem[]>([]);
    const [comentarios, setComentarios] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [categoryFilter, setCategoryFilter] = useState<string>("todos");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    
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

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const data = await getPlatos(1, 100);
            console.log("PRODUCTOS DEL BACK:", data);
            setProducts(data);
        } catch (error) {
            console.error("Error al traer productos:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
    }, []);

    const platos = useMemo(() => {
    return products.filter((item) => item.type?.toLowerCase() === "platos");
    }, [products]);

    const bebidas = useMemo(() => {
    return products.filter((item) => item.type?.toLowerCase() === "bebidas");
    }, [products]);

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

    const filteredItems = useMemo(() => {
    const visibleItems = activeTab === "platos" ? platosPaginados : bebidas;

    if (categoryFilter === "todos") return visibleItems;

    return visibleItems.filter(
        (item) =>
        item.category?.name?.toLowerCase() === categoryFilter.toLowerCase()
    );
    }, [activeTab, platosPaginados, bebidas, categoryFilter]);

    const getQuantity = (id: string) => quantities[id] ?? 1;

    const disminuirCantidad = (id: string) => {
        setQuantities((prev) => ({
        ...prev,
        [id]: Math.max(1, (prev[id] ?? 1) - 1),
        }));
    };

    const aumentarCantidad = (id: string) => {
        setQuantities((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 1) + 1,
        }));
    };

    const agregarAlCarrito = (item: IProduct) => {
        const quantity = quantities[item.id] ?? 1;

        setCart((prev) => {
            const existing = prev.find((cartItem) => cartItem.id === item.id);

            if (existing) {
                return prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            }

            return [...prev, { ...item, quantity }];
        });

        setQuantities((prev) => ({
            ...prev,
            [item.id]: 1,
        }));
    };

    const eliminarTodoDelCarrito = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const eliminarDelCarrito = (id: string) => {
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
    const seña = Number((totalGeneral * 0.15).toFixed(2));
    const restoRestaurante = Number((totalGeneral - seña).toFixed(2));

    const confirmarReserva = async () => {
    try {
        if (cart.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Reserva vacía",
                text: "Debes agregar al menos un plato o bebida",
            });
            return;
        }

        const session = localStorage.getItem("userSession");
        const token = session ? JSON.parse(session).token : null;

        const pedidos = cart.map((item) => ({
            platoId: item.id,
            quantity: item.quantity,
        }));






        const body = {
            //
            //
            //
            //DATOS QUE ESPERO DE DIEGO
            //
            //
            //
            reservationDate: "2026-03-20", 
            startTime: "21:00",
            peopleCount: 2,
            notes: comentarios,
            pedidos,
        };

        console.log("BODY RESERVA:", body);

        const res = await fetch("http://localhost:3000/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const text = await res.text();
        console.log("RESPUESTA DEL BACK:", text);

        let data;
        try {
        data = JSON.parse(text);
        } catch {
        throw new Error(text || "El servidor no devolvió un JSON válido");
        }

        if (!res.ok) {
            throw new Error(
                Array.isArray(data.message)
                ? data.message.join(", ")
                : data.message
            );
        }

        Swal.fire({
            icon: "success",
            title: "Reserva confirmada",
            text: "Tu reserva fue creada correctamente",
        });

    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "No se pudo crear la reserva",
        });
        
    }
};

    return (
        <Protected>
        <div className="max-w-8xl mx-auto mt-10">
            <section className="min-h-screen bg-[#f7efea]">
                <div className="bg-[radial-gradient(circle_at_top,#8b0d14_0%,#5d070b_45%,#3d0407_100%)] md:h-45">
                    <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
                    <h1 className="font-serif text-white md:text-4xl">
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

                    {loading && (
                        <p className="text-[#6b3030] text-lg">
                        Cargando productos...
                        </p>
                    )}

                    {!loading && (
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
                                    className="rounded-2xl border border-[#e5cfc5] bg-[#f1dbd098] p-4 shadow-sm"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[190px_1fr]">
                                        <div className="overflow-hidden rounded-xl h-80">
                                            <Link href={`/menu/${item.id}`}>
                                            <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="h-48 w-full object-cover md:h-full"
                                            /></Link>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold leading-7 text-[#6d1e1e] mt-auto">
                                                    {item.name}
                                                </h3>

                                                <div className="my-3 h-px w-full bg-[#e3c8bf]" />

                                                <p className="text-sm leading-6 text-[#5e4a45] ">
                                                    {Array.isArray(item.ingredientes)
                                                    ? item.ingredientes.join(", ")
                                                    : item.ingredientes}
                                                </p>

                                                <h3 className="text-xl font-semibold leading-tight text-[#6d1e1e] flex items-center justify-center">
                                                    ${item.price}
                                                </h3>
                                            </div>

                            

                                            <div className="mt-3 ">
                                                <div className="flex items-center overflow-hidden rounded-xl border border-[#e5cfc5] bg-[#fff7f2] shadow-sm w-fit">
                                                    <button
                                                    onClick={() => disminuirCantidad(item.id)}
                                                    className="flex h-10 w-10 items-center justify-center text-3xl text-[#7c090c] transition hover:bg-[#f6e2d9]"
                                                    >
                                                    -
                                                    </button>

                                                    <div className="flex h-10 min-w-[56px] items-center justify-center border-x border-[#e5cfc5] px-4 text-lg font-semibold text-[#6d1e1e]">
                                                        {quantity}
                                                    </div>

                                                    <button
                                                    onClick={() => aumentarCantidad(item.id)}
                                                    className="flex h-10 w-10 items-center justify-center bg-[#7c090c] text-3xl text-white transition hover:brightness-110"
                                                    >
                                                    +
                                                    </button>
                                                </div>

                                                <div className="mt-3 flex flex-col gap-2 relative overflow-hidden bg-gradient-to-r  text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
                                                    <button
                                                    onClick={() => agregarAlCarrito(item)}
                                                    className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                                                    > <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                                                    {isReserved
                                                    ? activeTab === "platos"
                                                        ? "Ya reservado"
                                                        : "Ya reservada"
                                                        : activeTab === "platos"
                                                        ? "Reservar plato"
                                                        : "Reservar bebida"}
                                                    </button>
                                                </div>
                                            </div>                                    
                                        </div>
                                    </div>                                
                                </article>
                            );
                        })}
                        </div>
                    )}

                        {!loading && activeTab === "platos" && totalPages > 1 && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <button
                                    onClick={() => {
                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                    }}
                                    disabled={currentPage === 1}
                                    className="rounded-lg border border-[#d8b6ac] bg-[#f8ece6] px-4 py-2 text-[#6b3030] disabled:opacity-50"
                                >
                                    Anterior
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                                ))}

                                <button
                                    onClick={() => {
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="rounded-lg border border-[#d8b6ac] bg-[#f8ece6] px-4 py-2 text-[#6b3030] disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-[#e5cfc5] bg-[#f1dbd098] p-6 shadow-sm">
                            <h2 className="text-4xl font-serif text-[#6d1e1e] h-10">
                            TU RESERVA
                            </h2>

                            <h2 className="text-2xl font-serif text-[#6d1e1e] h-3">
                            Platos
                            </h2>

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
                                    className="flex items-center justify-between gap-4 text-lg">
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
                                            >X
                                            </button>

                                            <button
                                            onClick={() => eliminarTodoDelCarrito(item.id)}
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

                            <h2 className="text-2xl font-serif text-[#6d1e1e] mt-8 h-3">
                            Bebidas
                            </h2>

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
                                            -
                                        </button>

                                        <button
                                            onClick={() => eliminarTodoDelCarrito(item.id)}
                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-700 transition"
                                        >
                                            x
                                        </button>
                                        </div>
                                    </div>
                                ))
                            )}
                            </div>

                            <textarea
                            value={comentarios}
                            onChange={(e) => setComentarios(e.target.value)}
                            placeholder="Comentarios adicionales..."
                            className="mt-6 w-full rounded-xl border border-[#e5cfc5] bg-white/80 p-3 outline-none"
                            />

                            <div className="mt-6 flex items-center justify-between text-s h-2">
                                <p className="text-[#5c2c2c]">Subtotal de platos</p>
                                <p className="font-bold text-[#5c0f14]">${subtotalPlatos}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-s h-2">
                                <p className="text-[#5c2c2c]">Subtotal de bebidas</p>
                                <p className="font-bold text-[#5c0f14]">${subtotalBebidas}</p>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex items-center justify-between text-lg">
                                    <p className="text-[#5c2c2c]">Total del pedido</p>
                                    <p className="font-semibold text-[#5c0f14]">${totalGeneral}</p>
                                </div>

                                <div className="rounded-2xl border border-[#e5cfc5] bg-[#f8ece6] p-6 shadow-sm">
                                    <div className="flex items-center justify-between text-2xl">
                                        <p className="text-[#5c2c2c]">Seña (15%)</p>
                                        <p className="font-bold text-[#7c090c]">${seña}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-lg font-bold">
                                    <p className="text-[#5c2c2c]">Resto a pagar en el restaurante</p>
                                    <p className="text-[#4f2b2b]">${restoRestaurante}</p>
                                </div>
                            </div>

                            <button
                            className="mt-6 relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                            onClick={confirmarReserva}
                            >
                            Confirmar reserva
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Protected>
    );
}  