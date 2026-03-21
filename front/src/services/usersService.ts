const BACKURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getUsers() {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  try {
    const response = await fetch(`${BACKURL}/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUsersById(id: string) {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  try {
    const response = await fetch(`${BACKURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
