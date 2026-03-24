import { IProduct } from "@/types/types";

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



export const getBebidaById = async (id: string) => {
  const res = await fetch(`${BACKURL}/bebidas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al traer la bebida");
  }

  const text = await res.text();

  if (!text) {
    throw new Error("La bebida vino vacía");
  }

  const data = JSON.parse(text);

  return adaptBebida(data);
};

export const getBebidas = async (page: number = 1, limit: number = 100) => {
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
  ingredientes: bebida.ingredientes,
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