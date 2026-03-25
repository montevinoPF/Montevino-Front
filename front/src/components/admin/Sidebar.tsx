"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // O cualquier icono que prefieras

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/stats", label: "Estadísticas" },
  { href: "/admin/reservas-y-mesas", label: "Reservas y Mesas" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
];

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  return (
    <>
      <aside
        className={`
          ${open ? "block" : "hidden"}
          w-64 min-h-[80vh] bg-[#350A06] text-[#FED0BB] flex flex-col py-8 px-4 mr-3
          transition-all duration-300
        `}
      >
        <nav className="sticky flex flex-col gap-4 top-30">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 px-4 rounded-lg hover:bg-[#56070C] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
