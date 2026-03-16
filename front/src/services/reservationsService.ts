const BACKURL = process.env.NEXT_PUBLIC_BACKURL || "http://localhost:3000";

export const getReservas = async () => {
  const res = await fetch(`${BACKURL}/reservations`);

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  return res.json();
};
