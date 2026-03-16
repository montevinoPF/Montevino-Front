import { IPlate, IProduct } from "@/types/types";

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
