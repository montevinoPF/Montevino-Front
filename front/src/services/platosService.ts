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

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getPlatoById = async (id: string) => {
  const res = await fetch(`${APIURL}/platos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al traer el plato");
  }

  return res.json();
};

export const getPlatos = async () => {
  const res = await fetch(`${APIURL}/platos`);

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  return res.json();
};

export const adaptPlato = (plato: any): IProduct => ({
  id: Number(plato.id),
  name: plato.name,
  price: Number(plato.price),
  ingredientes: plato.ingredients,
  imageUrl: plato.imageUrl,
  description: plato.description,
  category: plato.category
    ? {
        id: Number(plato.category.id),
        name: plato.category.name,
      }
    : undefined,
});
