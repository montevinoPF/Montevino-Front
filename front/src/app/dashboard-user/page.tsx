"use client";

import ProfileInfo from "@/components/dashboard/ProfileInfo";
import ReservationsSection from "@/components/dashboard/ReservationsSection";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";

export default function DashboardUser() {
  const { userData } = useAuth();

  const name = userData?.user.name ?? "Sin nombre";
  const email = userData?.user.email ?? "Sin email";

  return (
    <section className="min-h-screen bg-[#f8f5f2] px-6 py-10">
      <Protected>
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-[#7c090c]">Mi perfil</h1>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProfileInfo
                name={name}
                email={email}
              />
            </div>
          </div>
          <div className="mt-8">
            <ReservationsSection reservations={[]} />
          </div>
        </div>
      </Protected>
    </section>
  );
}