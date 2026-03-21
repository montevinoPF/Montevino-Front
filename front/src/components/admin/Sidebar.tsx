import Link from "next/link";

const adminLinks = [
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/stats", label: "Estadísticas" },
  { href: "/admin/reservas-y-mesas", label: "Reservas y Mesas" },
  { href: "/admin/platos-y-categorias", label: "Platos y Categorías" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-[80vh] bg-[#350A06] text-[#FED0BB] flex flex-col py-8 px-4 mr-8">
      <nav className="flex flex-col gap-4">
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
  );
};

export default Sidebar;
