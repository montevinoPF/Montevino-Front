export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  ingredientes: string[] | string;
  price: number;
  imageUrl: string;
  stock: number;
  description: string;
  category?: {
    id: string;
    name: string;
  };
  type?: string;
}

export interface IProductErrors {
  name?: string;
  ingredientes?: string;
  price?: string;
  imageUrl?: string;
  description?: string;
  categoryId?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface IRegister {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterErrors {
  email?: string;
  password?: string;
  name?: string;
}

export interface IUserSession {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IReservation {
  reservationDate: string;
  startTime: string;
  peopleCount: number;
  notes: string;
  pedidos: Array<{
    platoId: string;
    quantity: number;
  }>;
}
export interface IPlate {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  categoryId: string;
  stock: number;
}

export interface IPlateErrors {
  name?: string;
  description?: string;
  price?: string;
  imgUrl?: string;
  categoryId?: string;
  stock?: string;
}

export interface ITable {
  number: number;
  zone: string;
  capacity: number;
  state: string;
}
