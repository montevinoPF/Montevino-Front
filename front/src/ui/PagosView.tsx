const PagosView = () => {
  return (
    <section className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Restaurante MonteVino"
          className="object-cover w-full h-full scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#1a0505]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 mx-auto sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif tracking-[0.2em] text-white/90 uppercase mb-3">
            Próximamente
          </h1>

          <div className="h-px w-20 sm:w-24 md:w-28 bg-[#c9a96a] mb-6 shadow-[0_0_8px_rgba(201,169,106,0.6)]" />

          <div className="max-w-xs sm:max-w-lg md:max-w-2xl">
            <p className="text-sm italic font-light leading-relaxed sm:text-base md:text-xl text-white/70">
              Estamos preparando esta sección. Muy pronto podrás gestionar tus
              reservas y disfrutar de nuestra experiencia completa.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 opacity-40">
            <div className="w-px h-8 sm:h-10 bg-[#c9a96a]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PagosView;
