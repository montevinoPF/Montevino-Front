
const WINE = "#7B1D2E";
const WINE2 = "#5A1020";
const GOLD = "#C9A84C";


interface NavItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

interface SidebarProps {
  seccion: string;
  setSeccion: (seccion: string) => void;
}

function NavItem({ label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "rgba(255,255,255,0.15)" : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.7)",
        borderLeft: active ? `3px solid ${GOLD}` : "3px solid transparent",
      }}
      className="flex items-center w-full gap-3 px-5 py-3 text-sm font-medium transition-all hover:bg-white/10"
    >
      {label}
    </button>
  );
}

export default function Sidebar({ seccion, setSeccion }: SidebarProps) {
  const nav = [
    { key: "reservas", label: "Reservas" },
    { key: "mesas", label: "Mesas" },
    { key: "clientes", label: "Platos" },
  ];

  return (
    <aside
      className="flex flex-col flex-shrink-0 h-screen w-44"
      style={{
        background: `linear-gradient(180deg, #350A06 0%, #56070C 100%)`,
      }}
    >
      {/* Nav links */}
      <nav className="flex-1 pt-4 mt-16">
        {nav.map((n) => (
          <NavItem
            {...n}
            key={n.key}
            active={seccion === n.key}
            onClick={() => setSeccion(n.key)}
          />
        ))}
      </nav>
    </aside>
  );
}
