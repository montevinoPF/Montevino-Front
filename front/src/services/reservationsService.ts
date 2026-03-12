const BACKURL = process.env.NEXT_PUBLIC_BACKURL || "http://localhost:3000";

export const getReservations = async () => {
  try {
    const res = await fetch(`${BACKURL}/reservations`);

    if (!res.ok) {
      throw new Error("Error al traer las reservas");
    }

    const data = await res.json();

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getTables = async () => {
  try {
    const res = await fetch(`${BACKURL}/tables`);

    if (!res.ok) {
      throw new Error("Error al traer las mesas");
    }

    const data = await res.json();

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getTablesAvailability = async (fecha: string, hora: string) => {
  try {
    const res = await fetch(
      `${BACKURL}/tables/availability?date=${fecha}&time=${hora}`,
    );

    if (!res.ok) {
      throw new Error("Error al traer la disponibilidad de mesas");
    }

    const data = await res.json();

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
