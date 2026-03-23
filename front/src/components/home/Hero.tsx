import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Imagen de fondo de restaurante */}

      <img
        src="/images/hero.png"
        alt="Restaurante MonteVino"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/ to-black/25" />

      {/* Contenido en la image */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-6xl px-6 mx-auto text-center text-white">
        <img
          src="/logo-montevino.png"
          alt="Logo MonteVino"
          className="relative h-[200] w-[8000] object-cover translate-x-9.5"
        />

        <p className="mt-4 text-lg text-white/85 md:text-2xl">
          Experiencia gastronómica & vinos de autor
        </p>

        <div className="flex flex-row gap-4 mt-8 w-3xl">
          <Link href="/reserva" className="flex-1">
            <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
              Reservar mesa
              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-[1500ms]"></span>
            </button>
          </Link>

          <Link href="/menu" className="flex-1">
            <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
              Ver menú
              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-[1500ms]"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
