
export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Imagen de fondo */}
      
      <img
        src="/images/hero.png"
        alt="Restaurante MonteVino"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/ to-black/25" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center text-center justify-center px-6 text-white">
        <h1 className="text-4xl font-semibold tracking-wide md:text-6xl">
          MONTEVINO
        </h1>

        <p className="mt-4 text-lg text-white/85 md:text-2xl">
          Experiencia gastronómica & vinos de autor
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="cursor-pointer rounded-lg bg-[#c27a4a] px-7 py-3 text-sm font-semibold text-black transition hover:opacity-90">
            Reservar mesa
          </button>

          <button className="cursor-pointer rounded-lg border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
            Ver menú
          </button>
        </div>
      </div>
    </section>
  );
}