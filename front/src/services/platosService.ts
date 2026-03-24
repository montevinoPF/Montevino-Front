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

  if (!res.ok) {
    throw new Error("Error al traer el plato");
  }
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
  console.log("PRODUCTOS DEL BACK:", plato);
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

