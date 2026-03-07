export interface IPlatoFromBack {
  id: string;
  name: string;
  price: string;
  ingredients: string;
  description: string;
  imageUrl: string;
  stock: number;
  category: {
    id: string;
    name: string;
  };
}

export const getPlatoById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/platos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al traer el plato");
  }

  return res.json();
};

export const getPlatos = async () => {
  const res = await fetch("http://localhost:3001/platos", 

  );

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  return res.json();
};