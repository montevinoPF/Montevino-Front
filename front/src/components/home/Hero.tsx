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
          <Link
            href="/reservar"
            className="flex-1 py-2 text-center bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md transition-all duration-500 ease-in-out hover:bg-linear-to-l hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer"
          >
            Reservar mesa
          </Link>

          <Link
            href="/menu"
            className="flex-1 py-2 text-center bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md transition-all duration-500 ease-in-out hover:bg-linear-to-l hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer"
          >
            Ver menú
          </Link>
        </div>
      </div>
    </section>
  );
}
