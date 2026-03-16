"use client";
import GestionMesas from "@/components/admin/GestionDeMesas";
import ReservasAdmin from "@/components/admin/ReservasAdmin";
import { preloadReservation } from "@/lib/preloadReserva";
import Link from "next/link";
import { useState } from "react";

const fechasUnicas = Array.from(
  new Set(preloadReservation.map((r) => r.fecha)),
);

const AdminView = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechasUnicas[0]);
  return (
    <div className="h-full mt-20 mb-10 bg-[#F6E3D9]">
      <h1 className="pt-10 mb-10 text-5xl text-center text-red-950">
        Panel de Administración
      </h1>
      <div className="flex justify-center gap-5">
        {/* Lado izquierdo */}
        <div className="mb-5">
          <ReservasAdmin
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada={setFechaSeleccionada}
          />
        </div>

        {/* Lado derecho */}
        <div className="mb-5">
          <GestionMesas fechaSeleccionada={fechaSeleccionada} />
        </div>
      </div>
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
  );
};

export default AdminView;
