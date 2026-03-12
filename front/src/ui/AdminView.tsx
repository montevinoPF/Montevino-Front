"use client";
import GestionMesas from "@/components/admin/GestionDeMesas";
import ReservasAdmin from "@/components/admin/ReservasAdmin";
import { useAuth } from "@/context/AuthContext";
import { preloadReservation } from "@/lib/preloadReserva";
import { getReservations } from "@/services/reservationsService";
import { Reserva } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminView = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "admin") {
      router.push("/");
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para acceder a esta página.",
        confirmButtonColor: "#000",
      });
    }
  }, [role, router]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getReservations();
        setReservas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const fechasUnicas = Array.from(new Set(reservas.map((r) => r.fecha)));

  return (
    <div className="h-full mt-20 mb-10 bg-[#F6E3D9]">
      <h1 className="pt-10 mb-10 text-5xl text-center text-red-950">
        Panel de Administración
      </h1>
      <div className="flex justify-center gap-5">
        {/* Lado izquierdo */}
        <div className="mb-5">
          <ReservasAdmin
            reservas={reservas}
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada={setFechaSeleccionada}
            fechasUnicas={fechasUnicas}
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
