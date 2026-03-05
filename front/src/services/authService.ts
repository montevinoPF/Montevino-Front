import { ILogin, IRegister } from "@/types/types";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILogin) {
  try {
    const response = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const parsedResponse = await response.json();
    if (!parsedResponse.token) {
      throw new Error(parsedResponse.message);
    }
    await Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Inicio de sesión exitoso",
      timer: 1000,
      showConfirmButton: false,
    });
    return parsedResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await Swal.fire({
      icon: "error",
      title: "Error al iniciar sesión",
      text: "Contraseña o email incorrecto",
      confirmButtonColor: "black",
    });
    throw new Error(error);
  }
}

export async function register(userData: IRegister) {
  try {
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const parsedResponse = await response.json();
    if (!parsedResponse.name) {
      throw new Error(parsedResponse.message);
    }
    await Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Usuario registrado con éxito",
      confirmButtonText: "Continuar",
      confirmButtonColor: "black",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al registrarse.",
      confirmButtonColor: "black",
    });
    throw new Error(error);
  }
}
