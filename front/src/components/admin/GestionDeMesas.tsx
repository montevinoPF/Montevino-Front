"use client";
import { preloadTables } from "@/lib/preloadTables";

export default function GestionMesas() {
  const estadoColor = (estado) => {
    switch (estado) {
      case "ocupada":
        return "bg-[#56070C] text-white";
      case "reservada":
        return "bg-[#EFA788] text-white";
      case "libre":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="h-full w-200 p-6 bg-[#FED0BB] rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)]">
      <h2 className="mb-6 text-3xl text-center text-red-950">
        Gestión de Mesas
      </h2>

      {/* filtros */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-1 text-black bg-gray-100 rounded-lg cursor-pointer">
          Disponibles
        </button>

        <button className="px-4 py-1 text-white bg-[#EFA788] rounded-lg cursor-pointer">
          Reservadas
        </button>

        <button className="px-4 py-1 text-white bg-[#56070C] rounded-lg cursor-pointer">
          Ocupadas
        </button>
      </div>

      <Zona
        titulo="Interior"
        mesas={preloadTables.filter((mesa) => mesa.zone === "interior")}
        estadoColor={estadoColor}
      />
      <Zona
        titulo="Exterior"
        mesas={preloadTables.filter((mesa) => mesa.zone === "exterior")}
        estadoColor={estadoColor}
      />
      <Zona
        titulo="Terraza"
        mesas={preloadTables.filter((mesa) => mesa.zone === "terraza")}
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
            <span className="text-sm font-semibold">Mesa {mesa.number}</span>

            <span className="text-xs">{mesa.capacity} 👤</span>
          </div>
        ))}
      </div>
    </div>
  );
}
