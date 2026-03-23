"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import Protected from "@/components/Protected";
import { createReservation } from "@/services/reservations.service";
import PersonSelector from "./PersonSelector";
import CalendarCustom from "./CalendarCuston";
import TimeGrid from "./Time.Grid";

export default function BookingForm() {
  const submitReservation = async () => {
    try {
      const reservationDate = date ? format(date, "yyyy-MM-dd") : "";
      const startTime = time.replace(/hs$/i, "").trim();
      const peopleCount = guests;

      await createReservation({
        reservationDate,
        startTime,
        peopleCount,
        notes: "",
        pedidos: [],
      });

      alert("Reserva creada");
    } catch (error: unknown) {
      console.error(error);
      alert("No se pudo crear la reserva");
    }
  };
  const router = useRouter();

  // Estados
  const [guests, setGuests] = useState(3);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("11:45hs");
  const [showOptions, setShowOptions] = useState(false);

  const formatDate = (d: Date | undefined) => {
    if (!d) return "";
    return d.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const irAPlatillos = () => {
    const fechaString = date ? format(date, "yyyy-MM-dd") : "";
    const horaString = time.replace("hs", "");
    router.push(
      `/reservar/platos?fecha=${fechaString}&hora=${horaString}&personas=${guests}`,
    );
  };

  const reservarDirecto = () => {
    submitReservation();
  };

  return (
    <Protected>
      <div className="max-w-xl mx-auto p-8 bg-[#f1dbd098] rounded-[2rem] border border-slate-950 shadow-sm mt-10">
        <h1 className="mb-8 text-2xl font-bold text-slate-800">
          Configura tu reserva
        </h1>

        <PersonSelector selected={guests} onSelect={setGuests} />

        <CalendarCustom selectedDate={date} onSelect={setDate} />

        <TimeGrid selectedTime={time} onSelect={setTime} />

        {/* Barra Inferior */}
        <div className="flex flex-col gap-4 p-5 mt-10 bg-white border shadow-md border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-lg font-bold capitalize text-slate-800">
                {formatDate(date)} - {time}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {guests} personas
              </span>
            </div>

            {!showOptions ? (
              <button
                onClick={() => setShowOptions(true)}
                className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
              >
                Continuar
                <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={irAPlatillos}
                  className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
                >
                  Elegir Platillos
                  <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
                </button>
                <button
                  onClick={reservarDirecto}
                  className="text-[15px] text-black underline text-center cursor-pointer"
                >
                  Omitir y reservar mesa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Protected>
  );
}
