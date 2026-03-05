import { IProduct } from "@/types/types";

export const preloadProduct: IProduct[] = [
  {
    id: 1,
    name: "Carne a la parrilla",
    price: 8999,
    ingredients: "carne, papas, lechuga, tomate.",
    image:
      "https://c.pxhere.com/photos/97/5d/pork_yummy_delicious_dinner_tasty_cuisine_grilled_meat-1386775.jpg!d",
    categoryId: 1,
  },

  {
    id: 2,
    name: "Hamburguesa",
    price: 3999,
    ingredients: "Carne, Pan, Lechuga, Tomate.",
    image:
      "https://c.pxhere.com/photos/f8/cf/beef_burger_fries_yummy_delicious_dinner_tasty_cuisine-1386769.jpg!d",
    categoryId: 1,
  },

  {
    id: 3,
    name: "Mariscos",
    price: 15999,
    ingredients: "Mariscos, Limon, Lechuga.",
    image:
      "https://centrosantafe.com.mx/cdn/shop/articles/restaurantes-de-mariscos-y-otras-opciones-para-comer-en-cuaresma.jpg?v=1552671997",
    categoryId: 1,
  },
];
