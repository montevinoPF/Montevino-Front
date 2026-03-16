import { preloadReservation } from "@/lib/preloadReserva";

export default function ReservasAdmin() {
  const estadoColor = (estado) => {
    if (estado === "confirmada") return "bg-green-100 text-green-700";
    if (estado === "pendiente") return "bg-orange-100 text-orange-700";
  };
  return (
    <div className="w-200 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
      <h2 className="mb-4 text-3xl text-red-950">Reservas</h2>

      <table className="w-full">
        <thead className="text-sm text-black bg-gray-100">
          <tr>
            <th className="p-3 text-center">Fecha</th>
            <th className="py-3 text-center">Hora</th>
            <th className="py-3 pr-3 text-center">Personas</th>
            <th className="p-3 text-center">Mesa</th>
            <th className="p-3 text-center">Estado</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {preloadReservation.map((r, i) => (
            <tr key={i} className="cursor-pointer hover:bg-gray-50">
              <td className="p-3 text-center">{r.fecha}</td>

              <td className="py-3 text-center">{r.hora}</td>

              <td className="py-3 pr-3 text-center">{r.personas}</td>

              <td className="p-3 text-center">
                {r.mesa.tableNumber || (
                  <span className="text-gray-500">Sin mesa</span>
                )}
              </td>

              <td className="p-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor(
                    r.estado,
                  )}`}
                >
                  {r.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
