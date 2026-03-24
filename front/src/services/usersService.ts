const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface IReservation {
  id: string;
  reservationDate: string;
  startTime: string;
  peopleCount: number;
  totalPrice: number | string;
  depositAmount?: number | string;
  status: string;
  notes?: string;
  pedidos?: Array<{
    id: string;
    quantity: number;
    price?: number | string;
    platoId?: string;
    bebidaId?: string;
    menuItem?: {
      name?: string;
      imageUrl?: string;
      type?: string;
    };
  }>;
}

export interface IUserWithReservations {
  id: string;
  name: string;
  email: string;
  role: string;
  reservations: IReservation[];
}

export async function getCurrentUserWithReservations(): Promise<IUserWithReservations> {
  const sessionRaw =
    typeof window !== "undefined" ? localStorage.getItem("userSession") : null;

  if (!sessionRaw) {
    throw new Error("No hay sesión iniciada");
  }

  const session = JSON.parse(sessionRaw);
  const token = session?.token;
  const userId = session?.user?.id;

  if (!token || !userId) {
    throw new Error("Sesión inválida");
  }

  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "No se pudieron obtener las reservas");
  }

  return data;
}