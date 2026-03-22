import { IProduct } from "@/types/types";
import Swal from "sweetalert2";

export interface IPlatoFromBack {
  id: string;
  name: string;
  price: string;
  ingredientes: string;
  description: string;
  imageUrl: string;
  stock: number;
  category: {
    id: string;
    name: string;
  };
}

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

export const getPlatoById = async (id: string) => {
  const res = await fetch(`${BACKURL}/platos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener el plato");

  const data = await res.json();

  return adaptPlato(data);
};

export const getPlatos = async (page: number, limit: number) => {
  const res = await fetch(`${BACKURL}/platos?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  const data = await res.json();

  return data.map(adaptPlato);
};

export const createPlato = async (plato: any, router?: any) => {
  try {
    const res = await fetch(`${BACKURL}/platos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plato),
    });

    if (!res.ok) {
      throw new Error("Error al crear el plato");
    }

    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Plato creado",
      text: "El plato se ha creado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver plato",
      cancelButtonText: "Reservar otro",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu/${data.id}`);
      }
      // Si elige "Reservar otro", simplemente se queda en el formulario
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// ...existing code...

export const adaptPlato = (plato: any): IProduct => {
  return {
    id: plato.id,
    name: plato.name,
    price: Number(plato.price),
    ingredientes: plato.ingredientes,
    imageUrl: plato.imageUrl,
    description: plato.description,
    stock: plato.stock,
    type: "platos",
    category: plato.category
      ? {
          id: plato.category.id,
          name: plato.category.name,
        }
      : undefined,
  };
};

export const getBebidas = async (page: number, limit: number) => {
  const res = await fetch(`${BACKURL}/bebidas?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Error al traer las bebidas");
  }

  const data = await res.json();

  return data.map(adaptBebida);
};

export const adaptBebida = (bebida: any): IProduct => ({
  id: bebida.id,
  name: bebida.name,
  price: Number(bebida.price),
  ingredientes: bebida.ingredients,
  imageUrl: bebida.imageUrl,
  description: bebida.description,
  stock: bebida.stock,
  type: "bebidas",
  category: bebida.category
    ? {
        id: bebida.category.id,
        name: bebida.category.name,
      }
    : undefined,
});

// ...existing code...
export const editPlato = async (id: string, plato: any, router: any) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  // Asegúrate de que categoryId esté en el body
  const body = {
    name: plato.name,
    description: plato.description,
    price: Number(plato.price),
    ingredientes: plato.ingredientes,
    imageUrl: plato.imageUrl,
    stock: Number(plato.stock),
    categoryId: plato.categoryId,
    type: plato.type,
  };

  console.log("IMAGE URL:", plato.imageUrl); // Verifica la URL
  console.log("BODY:", JSON.stringify(body, null, 2)); // Verifica todo el body

  try {
    const res = await fetch(`${BACKURL}/platos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al editar el plato");
    }
    // ...existing code...

    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Plato editado",
      text: "El plato se ha editado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver plato",
      cancelButtonText: "Editar otro",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu/${data.id}`);
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePlato = async (id: string, router: any) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  try {
    const res = await fetch(`${BACKURL}/platos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al eliminar el plato");
    }

    Swal.fire({
      icon: "success",
      title: "Plato eliminado",
      text: "El plato se ha eliminado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver menú",
      cancelButtonText: "Eliminar otro",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu`);
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
