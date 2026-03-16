import { IReservation } from "@/types/types";

type ReservasAdminProps = {
  reservas: IReservation[];
  fechaSeleccionada: string;
  setFechaSeleccionada: (fecha: string) => void;
  fechasUnicas: string[];
};

export default function ReservasAdmin({
  reservas,
  fechaSeleccionada,
  setFechaSeleccionada,
  fechasUnicas,
}: ReservasAdminProps) {
  const estadoColor = (estado: string) => {
    if (estado === "confirmada") return "bg-green-100 text-green-700";
    if (estado === "pendiente") return "bg-orange-100 text-orange-700";
  };

  const reservasFiltradas = reservas.filter(
    (r) => r.reservationDate === fechaSeleccionada,
  );

  return (
    <div className="w-200 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
      <h2 className="mb-4 text-3xl text-red-950">Reservas</h2>

      <div className="mb-6">
        <label htmlFor="fecha" className="mr-2 font-semibold">
          Fecha:
        </label>
        <select
          id="fecha"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg"
        >
          <option value="Seleccionar fecha">Seleccionar fecha</option>
          {fechasUnicas.map((fecha) => (
            <option key={fecha} value={fecha}>
              {fecha}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-fixed">
        <thead className="text-sm text-black bg-gray-100">
          <tr>
            <th className="w-1/6 px-3 py-3 text-center">Fecha</th>
            <th className="w-1/6 px-3 py-3 text-center">Hora</th>
            <th className="w-1/6 px-3 py-3 text-center">Nombre</th>
            <th className="w-1/6 px-3 py-3 text-center">Personas</th>
            <th className="w-1/6 px-3 py-3 text-center">Mesa</th>
            <th className="w-1/6 px-3 py-3 text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {reservasFiltradas.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-center">
                <h2>No hay reservas para mostrar.</h2>
              </td>
            </tr>
          ) : (
            reservasFiltradas.map((r, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-50">
                <td className="w-1/6 px-3 py-3 text-center">
                  {r.reservationDate}
                </td>
                <td className="w-1/6 px-3 py-3 text-center">{r.startTime}</td>
                <td className="w-1/6 px-3 py-3 text-center">{r.user.name}</td>
                <td className="w-1/6 px-3 py-3 text-center">{r.peopleCount}</td>
                <td className="w-1/6 px-3 py-3 text-center">
                  {r.table && r.table.tableNumber ? (
                    r.table.tableNumber
                  ) : (
                    <span className="text-gray-500">Sin mesa</span>
                  )}
                </td>
                <td className="w-1/6 px-3 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor(
                      r.status.toLowerCase(),
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
