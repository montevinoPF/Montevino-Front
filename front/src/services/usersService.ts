const BACKURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getUsers() {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

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

export async function getMyUser() {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;
  try {
    const response = await fetch("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();
    console.log(user.role);
  } catch (error) {
    throw new Error(error);
  }
}

export default async function promoteUserRole(id: string) {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

<<<<<<< HEAD
=======
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

>>>>>>> 4064a16 (Mejoras)
  try {
    const response = await fetch(`${BACKURL}/users/${id}/makeadmin`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
