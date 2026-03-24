"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // Importamos el contexto
import dynamic from "next/dynamic";
 const MapaFooter = dynamic(() => import("../app/mapa/page"), { ssr: false });


export default function Footer() {
  const { userData, setUserData } = useAuth();
 

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUserData(null);
  };

  return (
    <footer className="bg-linear-to-r from-[#350A06] to-[#56070C] text-[#FED0BB] py-2 px-2">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Información */}
        <div>
          <Image 
            src="/logo.png" 
            alt="Logo Montevino" 
            width={120} 
            height={70} 
            className="object-contain max-h-14 scale-[2.5]" 
            priority 
          />
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
            {userData && (
              <>
                <li><Link href="/reservar" className="hover:text-[#FFD580] transition">Reservar</Link></li>
                <li><Link href="/mis-reservas" className="hover:text-[#FFD580] transition">Mis Reservas</Link></li>
              </>
            )}
            {!userData ? (
              <li><Link href="/login" className="hover:text-[#FFD580] transition">Iniciar sesión</Link></li>
            ) : (
              <li>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-[#FFD580] transition"
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Ubicación ficticia */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
          <p className="text-sm mb-2">Juana Manso 1450, C1107 Cdad. Autónoma de Buenos Aires, Argentina</p>
          <div className="rounded overflow-hidden shadow-md">
            <MapaFooter />
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


