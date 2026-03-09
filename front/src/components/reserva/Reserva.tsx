

export default function Reserva() {
  return (
    
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Restaurante MonteVino"
          className="h-full w-full object-cover scale-105" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#1a0505]" />
      </div>

      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <h1 className="text-3xl md:text-5xl font-serif tracking-widest text-white/90 uppercase mb-2">
          Próximamente
        </h1>

        
        <div className="h-px w-24 bg-[#c9a96a] mb-6 shadow-[0_0_8px_rgba(201,169,106,0.6)]" />

        <div className="max-w-lg">
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed italic">
            Estamos preparando esta sección. Muy pronto podrás gestionar tus reservas 
            y disfrutar de nuestra experiencia completa.
          </p>
        </div>

        
        <div className="mt-12 animate-bounce opacity-40">
           <div className="w-px h-10 bg-[#c9a96a]" />
        </div>
      </div>
    </section>
  );
}

