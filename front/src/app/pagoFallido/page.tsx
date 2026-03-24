"use client";

import Link from "next/link";

export default function PagoFallidoPage() {
  return (
    <section className="mt-18 min-h-screen bg-[#f7efea] px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#e5cfc5] bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          ✕
        </div>

        <h1 className="mt-6 text-center font-serif text-4xl text-[#6d1e1e]">
          Pago fallido
        </h1>

        <p className="mt-4 text-center text-lg text-[#5c2c2c]">
          No se pudo procesar el pago.
        </p>

        <p className="mt-2 text-center text-[#7b6761]">
          Podés volver a intentarlo desde la página de pago.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pagos"
            className="w-full rounded-2xl bg-[#7c090c] px-5 py-3 text-center font-medium text-white"
          >
            Intentar de nuevo
          </Link>

          <Link
            href="/mis-reservas"
            className="w-full rounded-2xl border border-[#e5cfc5] px-5 py-3 text-center font-medium text-[#6d1e1e]"
          >
            Ir a mis reservas
          </Link>
        </div>
      </div>
    </section>
  );
}