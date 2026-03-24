import { ILogin, IRegister } from "@/types/types";
import Swal from "sweetalert2";

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILogin) {
  try {
    const response = await fetch(`${BACKURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!data.access_token) {
      throw new Error(data.message);
    }

    const decodedToken = JSON.parse(atob(data.id_token.split(".")[1]));

const decodedData = {
  token: data.access_token,
  user: {
    id: decodedToken.sub,
    email: decodedToken.email,
    name: decodedToken.name,
  },

  
};

    await Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Inicio de sesión exitoso",
      timer: 1000,
      showConfirmButton: false,
    });



    console.log("decodedData login:", decodedData);
localStorage.setItem("userSession", JSON.stringify(decodedData));
console.log("guardado en localStorage:", localStorage.getItem("userSession"));
    return decodedData;
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
    const response = await fetch(`${BACKURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);

    const data = await response.json();
    console.log(data);
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
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al registrarse.",
      confirmButtonColor: "black",
    });
    throw new Error(error);
  }
}
