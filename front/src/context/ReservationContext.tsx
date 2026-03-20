"use client";

import { createContext, useEffect, useState } from "react";
import { IProduct } from "@/types/types";

type CartItem = IProduct & {
  quantity: number;
};

interface IReservationContext {
  cart: CartItem[];
  comentarios: string;
  setComentarios: React.Dispatch<React.SetStateAction<string>>;
  agregarAlCarrito: (item: IProduct, quantity?: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarReserva: () => void;
}

export const ReservationContext = createContext<IReservationContext>({
  cart: [],
  comentarios: "",
  setComentarios: () => {},
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
  vaciarReserva: () => {},
});

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [comentarios, setComentarios] = useState("");

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

  const agregarAlCarrito = (item: IProduct, quantity: number = 1) => {

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

  };
  const eliminarDelCarrito = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const vaciarReserva = () => {
    setCart([]);
    setComentarios("");
    localStorage.removeItem("montevino_reserva_cart");
    localStorage.removeItem("montevino_reserva_comentarios");
  };

  return (
    <ReservationContext.Provider
      value={{
        cart,
        comentarios,
        setComentarios,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarReserva,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};