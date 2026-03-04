import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#350A06] to-[#56070C] text-[#FED0BB] py-2 px-2 mt-20">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Información */}
        <div>
          <Image src="/logo.png" alt="Logo Montevino" width={120} height={70} className="object-contain max-h-14 scale-[2.5]" priority />
          <p className="text-sm">
            Restaurante y bodega de excelencia.  
            Experiencia gastronómica cálida y sofisticada.
          </p>

          {/* Íconos sociales */}
          <div className="flex space-x-4 mt-4 text-2xl">
            <Link href="https://instagram.com" target="_blank" className="hover:text-[#FFD580] transition">
              <FaInstagram />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="hover:text-[#FFD580] transition">
              <FaFacebook />
            </Link>
            <Link href="https://wa.me/5491112345678" target="_blank" className="hover:text-[#FFD580] transition">
              <FaWhatsapp />
            </Link>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#FFD580] transition">Inicio</Link></li>
            <li><Link href="/menu" className="hover:text-[#FFD580] transition">Menú</Link></li>
            <li><Link href="/reservar" className="hover:text-[#FFD580] transition">Reservar</Link></li>
            <li><Link href="/mis-reservas" className="hover:text-[#FFD580] transition">Mis Reservas</Link></li>
          </ul>
        </div>

        {/* Ubicación ficticia */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
          <p className="text-sm mb-2">Av. Montevino 1234, Buenos Aires</p>
          <div className="rounded overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.847870598135!2d-58.56312368477017!3d-34.63450958045237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9e5f9f9f9f9%3A0x123456789abcdef!2sUbicación%20Ficticia!5e0!3m2!1ses!2sar!4v1234567890"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="mt-10 text-center text-xs text-[#FED0BB]/70">
        &copy; {new Date().getFullYear()} MONTEVINO. Todos los derechos reservados.
      </div>
    </footer>
  );
}

