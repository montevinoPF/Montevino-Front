"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/menu", label: "Menú" },
    { href: "/reservar", label: "Reservar" },
    { href: "/mis-reservas", label: "Mis Reservas" },    
  ];

  return (
    <nav className="fixed top-0 w-full bg-linear-to-r from-[#350A06] to-[#56070C] text-[#FED0BB] z-50 shadow-lg">
      <div className="w-[80%] mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
            <Image src="/logo.png" alt="Logo Montevino" width={100} height={70} className="object-contain max-h-14 scale-[2.5]" priority /> 
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

        {/* Botón destacado → Iniciar sesión */}
        <Link 
          href="/login" 
          className="hidden md:inline-block ml-4 bg-[#FED0BB] text-[#350A06] px-4 py-2 rounded-lg font-semibold hover:bg-[#56070C] hover:text-[#FED0BB] transition"
        >
          Iniciar sesión
        </Link>

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
          <Link 
            href="/login" 
            className="block bg-[#FED0BB] text-[#350A06] px-4 py-2 rounded-lg font-semibold hover:bg-[#56070C] hover:text-[#FED0BB] transition"
            onClick={() => setOpen(false)}
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </nav>
  );
}





