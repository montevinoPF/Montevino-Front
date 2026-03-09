export default function Features() {
  return (
    <div className="w-full flex justify-center py-10 bg-[#F6E3D9]">
      <nav
        className="
          flex items-center gap-4
          px-10 py-3
          
          bg-[#F3DCD0] 
          border border-[#E8CFC3]
          shadow-[0_1px_0_rgba(255,255,255,0.55),0_8px_20px_rgba(0,0,0,0.06)]
        "
        aria-label="Accesos"
      >
        <a
          href="/login"
          className="text-sm font-medium text-[#85675E] hover:text-[#6F564E] transition-colors"
        >
          Reservas
        </a>

        <span className="text-[#85675E]/80">·</span>

        <a
          href="/menu"
          className="text-sm font-medium text-[#85675E] hover:text-[#6F564E] transition-colors"
        >
          Menú con fotos
        </a>

        <span className="text-[#85675E]/80">·</span>

        <a
          href="/login"
          className="text-sm font-medium text-[#85675E] hover:text-[#6F564E] transition-colors"
        >
          Seña online
        </a>
      </nav>
    </div>
  );
}
