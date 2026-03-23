

export default function ChangePassword() {
  return (
    <div className="rounded-3xl border border-[#e7d8d1] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Cambiar contraseña
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contraseña actual
          </label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña actual"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#7c090c]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nueva contraseña
          </label>
          <input
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#7c090c]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            placeholder="Confirma tu nueva contraseña"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#7c090c]"
          />
        </div>
      </div>

      <button className="mt-6 rounded-xl bg-[#7c090c] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 cursor-pointer">
        Actualizar contraseña
      </button>
    </div>
  )
}

