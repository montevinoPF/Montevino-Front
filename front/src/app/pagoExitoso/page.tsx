"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReservation } from "@/context/ReservationContext";
import { useRouter } from "next/navigation";

export default function PagoExitosoPage() {
  const { clearReservationData } = useReservation();
  const router = useRouter();
  const cleared = useRef(false); // ✅ evita que se ejecute más de una vez

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;

    localStorage.removeItem("montevino_reserva_cart");
    localStorage.removeItem("montevino_reserva_comentarios");
    clearReservationData();

    const timer = setTimeout(() => {
      router.push("/mis-reservas");
    }, 2500);

    return () => clearTimeout(timer);
  }, []); // ✅ array vacío, solo corre una vez

  return (
    <section className="mt-18 min-h-screen bg-[#f7efea] px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#e5cfc5] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl bg-green-100 rounded-full">
          ✓
        </div>

        <h1 className="mt-6 text-center font-serif text-4xl text-[#6d1e1e]">
          Pago exitoso
        </h1>

        <p className="mt-4 text-center text-lg text-[#5c2c2c]">
          Tu seña fue abonada correctamente.
        </p>

        <p className="mt-2 text-center text-[#7b6761]">
          En breve podrás ver el estado de tu reserva en Mis reservas.
        </p>

        <div className="flex flex-col gap-3 mt-8 sm:flex-row">
          <Link
            href="/mis-reservas"
            className="w-full rounded-2xl bg-[#7c090c] px-5 py-3 text-center font-medium text-white"
          >
            Ir a mis reservas
          </Link>

          <Link
            href="/menu"
            className="w-full rounded-2xl border border-[#e5cfc5] px-5 py-3 text-center font-medium text-[#6d1e1e]"
          >
            Volver al menú
          </Link>
        </div>
      </div>
    </section>
  );
}
