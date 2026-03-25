export interface Reservation {
  id: string;
  user?: {
    id: string;
  };
  reservationDate: string;
  startTime: string;
  peopleCount: number;
  status: string;
  totalPrice: number;
  depositAmount: number;
  notes: string;
}

interface Props {
    reservations: Reservation[];
}

export default function ReservationsSection({ reservations }: Props) {

    const current = reservations.find((r) => r.status === "Confirmada");
    const history = reservations.filter((r) => r.status !== "Confirmada");

  return (
    <div className="rounded-3xl border border-[#e7d8d1] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Mis reservas
      </h2>

      {/* Reserva actual */}
      {current ? (
        <div className="mb-8 rounded-2xl border border-[#7c090c]/20 bg-[#fff8f6] p-5">
          <h3 className="text-lg font-semibold text-[#7c090c]">Reserva actual</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Fecha</p>
              <p className="font-medium text-slate-800">{current.reservationDate}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Personas</p>
              <p className="font-medium text-slate-800">{current.peopleCount}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Estado</p>
              <p className="font-medium text-green-700">{current.status}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mb-8 text-slate-500">No tenés reservas activas.</p>
      )}

      {/* Historial */}
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Historial de reservas
      </h3>
      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-800">{r.reservationDate}</p>
                  <p className="text-sm text-slate-500">{r.peopleCount} personas</p>
                </div>
                <span className="text-sm font-medium text-slate-600">{r.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-500">Sin historial todavía.</p>
        )}
      </div>
    </div>
  )
}

