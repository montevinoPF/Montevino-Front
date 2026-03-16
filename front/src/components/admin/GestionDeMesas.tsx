"use client";
import { useState } from "react";
import { preloadTables } from "@/lib/preloadTables";
import { preloadReservation } from "@/lib/preloadReserva";

export default function GestionMesas({ fechaSeleccionada }) {
  const horas = ["19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];
  const [horaSeleccionada, setHoraSeleccionada] = useState(horas[0]);

  const estadoColor = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return "bg-red-800 text-white";
      case "libre":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100";
    }
  };

  const reservasFiltradas = preloadReservation.filter(
    (r) => r.fecha === fechaSeleccionada && r.hora === horaSeleccionada,
  );
  // Filtrar mesas ocupadas en la hora seleccionada
  const mesasOcupadas = reservasFiltradas
    .filter((r) => r.hora === horaSeleccionada)
    .map((r) => r.mesa);

  // Agregar estado a cada mesa según si está ocupada en esa hora
  const mesasConEstado = preloadTables.map((mesa) => ({
    ...mesa,
    state: mesasOcupadas.some((m) => m.tableNumber === mesa.tableNumber)
      ? "ocupada"
      : "libre",
  }));

  return (
    <div className="h-full w-200 p-6 bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)]">
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

      <Zona
        titulo="Interior"
        mesas={mesasConEstado.filter((mesa) => mesa.zone === "interior")}
        estadoColor={estadoColor}
      />
      <Zona
        titulo="Exterior"
        mesas={mesasConEstado.filter((mesa) => mesa.zone === "exterior")}
        estadoColor={estadoColor}
      />
      <Zona
        titulo="Terraza"
        mesas={mesasConEstado.filter((mesa) => mesa.zone === "terraza")}
        estadoColor={estadoColor}
      />
    </div>
  );
}

function Zona({ titulo, mesas, estadoColor }) {
  return (
    <div className="mb-6 cursor-pointer">
      <h3 className="mb-3 text-sm text-gray-500 uppercase">{titulo}</h3>
      <div className="flex flex-wrap gap-3">
        {mesas.map((mesa, i) => (
          <div
            key={i}
            className={`w-28 h-20 rounded-lg flex flex-col justify-center items-center shadow ${estadoColor(
              mesa.state,
            )}`}
          >
            <span className="text-sm font-semibold">
              Mesa {mesa.tableNumber}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
