"use client";
import { useEffect, useState } from "react";
import { ITable } from "@/types/types";
import { getTablesAvailability } from "@/services/reservationsService";
import { useAuth } from "@/context/AuthContext";

interface GestionMesasProps {
  fechaSeleccionada: string;
}

export default function GestionMesas({ fechaSeleccionada }: GestionMesasProps) {
  const horas = ["18:00", "20:00", "22:00", "00:00"];
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [mesas, setMesas] = useState<ITable[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthReady, userData, checkAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthReady || !userData) return;
    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
      try {
        const res = await getTablesAvailability(
          fechaSeleccionada,
          horaSeleccionada,
        );
        if (Array.isArray(res)) {
          setMesas(res);
        } else {
          setMesas([]);
        }
      } catch (error) {
        console.error(error);
        setMesas([]);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [fechaSeleccionada, horaSeleccionada, isAuthReady, userData]);

  return (
    <div className="h-full w-150 p-6 bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)]">
      <h2 className="mb-4 text-3xl text-red-950">Gestión de Mesas</h2>

      {/* Selector de hora */}
      <div className="mb-6">
        <label htmlFor="hora" className="mr-2 font-semibold">
          Hora:
        </label>
        <select
          id="hora"
          value={horaSeleccionada}
          onChange={(e) => setHoraSeleccionada(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg"
        >
          <option value="Seleccionar hora">Seleccionar hora</option>
          {horas.map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>
      </div>

      {/* filtros */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-1 text-black bg-gray-100 rounded-lg cursor-pointer">
          Disponibles
        </button>
        <button className="px-4 py-1 text-white bg-red-800 rounded-lg cursor-pointer">
          Reservadas
        </button>
      </div>

      <div className="mb-6 cursor-pointer">
        <div className="flex flex-wrap gap-3">
          {loading ? (
            <div>Cargando disponibilidad...</div>
          ) : (
            mesas.map((mesa, i) => (
              <div
                key={i}
                className={`w-28 h-20 rounded-lg flex flex-col justify-center items-center shadow ${mesa.status === "RESERVADA" ? "bg-red-800 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                <span className="text-sm font-semibold">
                  Mesa {mesa.tableNumber}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
