import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS_OF_WEEK = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const yearAvailability: Record<string, string> = {
  "2026-3-4": "full",
  "2026-3-7": "available",
  "2026-3-12": "waitlist",
  "2026-3-18": "full",
  "2026-3-19": "available",
  "2026-3-25": "waitlist",
  "2026-3-26": "available",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

type CalendarCustomProps = {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
};

export default function CalendarCustom({
  selectedDate,
  onSelect,
}: CalendarCustomProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const selectedDay = selectedDate ? selectedDate.getDate() : null;

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    const isCurrentMonth =
      viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const availKey = (day: number) => `${viewYear}-${viewMonth + 1}-${day}`;

  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  // const dotColor: Record<string, string> = {
  //   available: "#22c55e",
  //   full: "#ef4444",
  //   // waitlist: "#f97316",
  // };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
          padding: "28px 32px 24px",
          minWidth: 340,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            color: "#222",
            marginBottom: 20,
          }}
        >
          ¿Qué día?
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            padding: "0 4px",
          }}
        >
          <button
            onClick={prevMonth}
            style={{
              background: "none",
              border: "none",
              cursor: isCurrentMonth ? "default" : "pointer",
              color: isCurrentMonth ? "#ccc" : "#2563eb",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <span style={{ fontWeight: 600, fontSize: 16, color: "#222" }}>
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2563eb",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 4,
          }}
        >
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#888",
                fontWeight: 500,
                padding: "4px 0",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px 0",
          }}
        >
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;

            const past = isPast(day);
            const avail = yearAvailability[availKey(day)];
            const isSelected = selectedDay === day;
            const isTod = isToday(day);

            return (
              <div
                key={day}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3px 0",
                }}
              >
                <button
                  onClick={() => {
                    if (past) return;
                    onSelect(new Date(viewYear, viewMonth, day));
                  }}
                  disabled={past}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: isSelected
                      ? "2.5px solid #1e3a8a"
                      : "2px solid transparent",
                    background:
                      isTod && !isSelected ? "#f1f5f9" : "transparent",
                    color: past ? "#ccc" : isSelected ? "#1e3a8a" : "#222",
                    fontWeight: isSelected ? 700 : 400,
                    fontSize: 15,
                    cursor: past ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                    outline: "none",
                    textDecoration: past ? "line-through" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!past && !isSelected)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    if (!past && !isSelected)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        isTod ? "#f1f5f9" : "transparent";
                  }}
                >
                  {day}
                </button>
                {avail && !past && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      marginTop: 1,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginTop: 20,
            fontSize: 12,
            color: "#555",
          }}
        >
          {[
            // { color: "#22c55e", label: "Hay lugar" },
            // { color: "#ef4444", label: "Lleno" },
            // { color: "#f97316", label: "Lista de espera" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: color,
                }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
