<<<<<<< HEAD
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
=======
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
>>>>>>> 27951df8a6629c72a5a76b227d20275576ed20b0

import { IReservation } from "@/types/types";

export async function createReservation(data: IReservation): Promise<IReservation> {
  const session = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userSession") ?? "null")
    : null;
  const token = session?.token;

  console.log("token usado en reserva:", token);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

console.log("DATOOOS", data); 


  if (!res.ok) {
    const errText = await res.text(); 
    console.error("RESERVATION ERROR BODY:", errText);
    throw new Error(`Error creating reservation: ${res.status} ${errText}`);
  }



  return (await res.json()) as IReservation;
}

export async function getReservation(id: string): Promise<IReservation> {
  const session = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userSession") ?? "null")
    : null;
  const token = session?.token;

  console.log("token usado en reserva:", token);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const errText = await res.text(); 
    console.error("RESERVATION ERROR BODY:", errText);
    throw new Error(`Error getting reservation: ${res.status} ${errText}`);
  }

  return (await res.json()) as IReservation;
}

export async function getReservationWithDetails(id: string): Promise<IReservation> {
  const session = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userSession") ?? "null")
    : null;
  const token = session?.token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("RESERVATION ERROR BODY:", errText);
    throw new Error(`Error getting reservation: ${res.status} ${errText}`);
  }

  return res.json() as Promise<IReservation>;
}