"use client";
import GestionMesas from "@/components/admin/GestionDeMesas";
import ReservasAdmin from "@/components/admin/ReservasAdmin";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { getReservations } from "@/services/reservationsService";
import { IReserva } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReservasYMesasView = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [reservas, setReservas] = useState<IReserva[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData, isAuthReady, checkAdmin } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthReady) return;
    if (!userData) {
      Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: "No tienes permisos para acceder a esta página.",
        confirmButtonColor: "#000",
      });
      router.push("/login");
      return;
    }
    checkAdmin();
  }, [userData, isAuthReady, router, checkAdmin]);

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

  const fechasUnicas = Array.from(
    new Set(reservas.map((r) => r.reservationDate)),
  );

  return (
    <div className="h-full mt-20 w-full mb-10 bg-[#F6E3D9] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1">
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
      </div>
    </div>
  );
};

export default ReservasYMesasView;
