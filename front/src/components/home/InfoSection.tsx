export default function InfoSection() {
  return (
    <section className="bg-[#F6E3D9]">
      <div className="mx-auto max-w-6xl px-6 py-12" >

        <div className="grid md:grid-cols-3 rounded-2xl border border-[#F6E3D9] bg-[#F6E3D9] overflow-hidden">

          {/* Cuadro 1 */}
          <div className="px-8 py-10 text-center border-r border-[#E6CBBE]">  
            <IconCalendar />
            <h3 className="mt-5 font-serif text-2xl text-[#7E5E55]">
              Reservas
            </h3>
            <p className="mt-3 text-sm text-[#8B6B62] leading-6">
              Inicia sesión o registrate para ver horarios disponibles según fecha y personas.
            </p>
          </div>

          {/* Cuadro 2 */}
          <div className="px-8 py-10 text-center border-r border-[#E6CBBE]">
            <IconDish />
            <h3 className="mt-5 font-serif text-2xl text-[#7E5E55]">
              MonteVino
            </h3>
            <p className="mt-3 text-sm text-[#8B6B62] leading-6">
              Elegí platos al reservar para garantizar disponibilidad y mejorar la experiencia con nosotros.
            </p>
          </div>

          {/* Cuadro 3 */}
          <div className="px-8 py-10 text-center">
            <IconWallet />
            <h3 className="mt-5 font-serif text-2xl text-[#7E5E55]">
              Señas online
            </h3>
            <p className="mt-3 text-sm text-[#8B6B62] leading-6">
              Realiza el pago de tu reservas de forma online para asegurar tu experiencia
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


function IconCalendar() {
  return (
    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3v2M17 3v2M4.5 8.5h15"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.5 5h11A2.5 2.5 0 0 1 20 7.5v11A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-11A2.5 2.5 0 0 1 6.5 5Z"
          stroke="#8B6B62"
          strokeWidth="1.6"
        />
        <path
          d="M8 12h3M8 15h6"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function IconDish() {
  return (
    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 14c0 3.3 4 6 8 6s8-2.7 8-6"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7 11c1-2 3-3 5-3s4 1 5 3"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9.2 7.2c.8-1 1.8-1.6 2.8-1.6s2 .6 2.8 1.6"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function IconWallet() {
  return (
    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 7h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
          stroke="#8B6B62"
          strokeWidth="1.6"
        />
        <path
          d="M20 10h-5a2 2 0 0 0 0 4h5"
          stroke="#8B6B62"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16.5 12h.01"
          stroke="#8B6B62"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}