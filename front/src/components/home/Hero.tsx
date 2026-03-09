
export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Imagen de fondo de restaurante */}

      <img
        src="/images/hero.png"
        alt="Restaurante MonteVino"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/ to-black/25" />

      {/* Contenido en la image */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center text-center justify-center px-6 text-white">
        <img
          src="/logo-montevino.png"
          alt="Logo MonteVino"
          className="relative h-[200] w-[8000] object-cover translate-x-9.5"
        />

        <p className="mt-4 text-lg text-white/85 md:text-2xl">
          Experiencia gastronómica & vinos de autor
        </p>

        <div className="mt-8 flex flex-row gap-4 w-3xl">
          <a
            href="/reserva"
            className="flex-1 py-2 text-center bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md transition-all duration-500 ease-in-out hover:bg-linear-to-l hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer">
            Reservar mesa
          </a>

          <a
            href="/menu"
            className="flex-1 py-2 text-center bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md transition-all duration-500 ease-in-out hover:bg-linear-to-l hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer">
            Ver menú
          </a>
        </div>
      </div>
    </section>
  );
}