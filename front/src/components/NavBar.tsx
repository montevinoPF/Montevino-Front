"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext"; // importa tu hook

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { userData, setUserData } = useAuth(); // obtenemos sesión y setter

  // Links base
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/menu", label: "Menú" },
  ];

  // Solo agregamos estos si hay sesión
  if (userData) {
    links.push({ href: "/reservar", label: "Reservar" });
    links.push({ href: "/mis-reservas", label: "Mis Reservas" });
  }

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUserData(null);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-linear-to-r from-[#350A06] to-[#56070C] text-[#FED0BB] z-50 shadow-lg">
      <div className="w-[80%] mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo Montevino" 
            width={100} 
            height={70} 
            className="object-contain max-h-14 scale-[2.5]" 
            priority 
          /> 
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:text-[#FFD580] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón destacado → Iniciar sesión o Cerrar sesión */}
        {!userData ? (
          <Link 
            href="/login" 
            className=" relative overflow-hidden py-2 bg-gradient-to-r from-[#4a1414f7] to-[#56070C] text-FED0BB font-semibold rounded-md transition duration-300 group hover:text-[#FFD580] transition-colors"
          >
            Iniciar sesión
             <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
          </Link>
        ) : (
          <button 
            onClick={handleLogout} 
            className="relative overflow-hidden py-2 bg-gradient-to-r from-[#4a1414f7] to-[#56070C] text-FED0BB font-semibold rounded-md transition duration-300 group hover:text-[#FFD580] transition-colors"
          >
            Cerrar sesión
             <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
          </button>
        )}

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-2xl text-[#FED0BB] focus:outline-none"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#350A06]/95 px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="block text-lg text-[#FED0BB] hover:text-[#FFD580] transition"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!userData ? (
            <Link 
              href="/login" 
              className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#4a1414f7] to-[#56070C] text-white font-semibold rounded-md  transition duration-300 group"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
            </Link>
          ) : (
            <button 
              onClick={handleLogout} 
              className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#4a1414f7] to-[#56070C] text-white font-semibold rounded-md transition duration-300 group"
            >
              Cerrar sesión
               <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}





