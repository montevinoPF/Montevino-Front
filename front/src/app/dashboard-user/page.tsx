"use client";

import { useEffect, useState } from "react";
import ProfileImage from "@/components/dashboard/ProfileImage";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import ReservationsSection from "@/components/dashboard/ReservationsSection";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { getMyReservations } from "@/services/reservationsService";
import type { Reservation } from "@/components/dashboard/ReservationsSection";

export default function DashboardUser() {
  const { userData } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const name = userData?.user.name ?? "Sin nombre";
  const email = userData?.user.email ?? "Sin email";

  useEffect(() => {
    if (!userData) return;
    getMyReservations()
      .then((data: Reservation[]) => {
        setReservations(data);
      })
      .catch((err) => console.error("Error al traer reservas:", err));
  }, [userData]);

  return (
    <section className="min-h-screen mt-20 bg-[#f8f5f2] px-6 py-10">
      <Protected>
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-[#7c090c]">Mi perfil</h1>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ProfileImage />
            </div>
            <div className="lg:col-span-2">
              <ProfileInfo name={name} email={email} />
            </div>
          </div>
          <div className="mt-8">
            <ReservationsSection reservations={reservations} />
          </div>
        </div>
      </Protected>
    </section>
  );
}