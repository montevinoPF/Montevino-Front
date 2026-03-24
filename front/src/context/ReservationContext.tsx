"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "@/types/types";

type CartItem = IProduct & {
  quantity: number;
};

type ReservationData = {
  reservationDate: string;
  startTime: string;
  peopleCount: number;
};

interface IReservationContext {
  cart: CartItem[];
  comentarios: string;
  setComentarios: React.Dispatch<React.SetStateAction<string>>;
  agregarAlCarrito: (item: IProduct, quantity?: number) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarReserva: () => void;

  reservationData: ReservationData;
  setReservationData: (data: ReservationData) => void;
  clearReservationData: () => void;
}

export const ReservationContext = createContext<
  IReservationContext | undefined
>(undefined);

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [comentarios, setComentarios] = useState("");
  const [reservationData, setReservationDataState] = useState<ReservationData>({
    reservationDate: "",
    startTime: "",
    peopleCount: 1,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("montevino_reserva_cart");
    const savedComentarios = localStorage.getItem(
      "montevino_reserva_comentarios",
    );

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
            : cartItem,
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };
  const eliminarDelCarrito = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
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
        reservationData,
        setReservationData: setReservationDataState,
        clearReservationData: () =>
          setReservationDataState({
            reservationDate: "",
            startTime: "",
            peopleCount: 1,
          }),

        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarReserva,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation debe usarse dentro de ReservationProvider");
  }

  return context;
};
