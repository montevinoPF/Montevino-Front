import { ILogin, IRegister } from "@/types/types";
import Swal from "sweetalert2";
import { getMyUser } from "./usersService";

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

const decodeJWT = (token: string) => {
  const base64Payload = token
    .split(".")[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const decoded = atob(base64Payload);
  return JSON.parse(decoded);
};

export async function login(userData: ILogin) {
  try {
    const responseLogin = await fetch(`${BACKURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await responseLogin.json();

    const responseProfile = await fetch(`${BACKURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const user = await responseProfile.json();

    const decodedIdToken = decodeJWT(data.id_token);

    const decodedData = {
      token: data.access_token,
      user: {
        id: decodedIdToken.sub,
        email: decodedIdToken.email,
        name: decodedIdToken.name,
        role: user.role,
      },
    };

    await Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Inicio de sesión exitoso",
      timer: 1000,
      showConfirmButton: false,
    });
    return decodedData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message.includes("Token inválido")) {
      await Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "La cuenta no existe. ¿Quieres registrarte?",
        confirmButtonText: "Registrarse",
        denyButtonText: "Cancelar",
        confirmButtonColor: "black",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Contraseña o email incorrecto",
        confirmButtonColor: "black",
      });
    }
    throw new Error(error);
  }
}

export async function register(userData: IRegister) {
  try {
    const response = await fetch(`${BACKURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);

    const data = await response.json();
    if (!data.name) {
      throw new Error(data.message);
    }
    await Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Usuario registrado con éxito",
      confirmButtonText: "Continuar",
      confirmButtonColor: "black",
    });
    return data.role;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message.includes("correo")) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo electrónico ya está en uso.",
        confirmButtonColor: "black",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrarse.",
        confirmButtonColor: "black",
      });
    }
    throw new Error(error);
  }
}

export async function googleLogin() {
  window.location.href = `${BACKURL}/auth/google`;
}
