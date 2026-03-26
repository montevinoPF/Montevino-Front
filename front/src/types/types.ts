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
  price?: string;
  ingredientes?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  type?: string;
}

export interface ICategory {
  id: number;
  name: string;
  platos: IProduct[];
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
    role: string;
    isActive: boolean;
    image?: string;
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
  price: number;
  ingredientes: string;
  description: string;
  file: File | null;
  stock: number;
  categoryId: string;
}

export interface IPlateErrors {
  name?: string;
  price?: string;
  ingredientes?: string;
  description?: string;
  file?: File | null;
  stock?: string;
  categoryId?: string;
}

export interface ITable {
  id: string;
  tableNumber: number;
  status: string;
  reservations: string[];
}

export interface IReserva {
  id: string;
  reservationDate: string;
  startTime: string;
  peopleCount: number;
  totalPrice: number;
  depositAmount: number;
  status: string;
  user: {
    id: string;
    auth0Id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    reservations: string[];
  };
  table: ITable;
  pedidos: {
    id: string;
    quantity: number;
    price: number;
    menuItem: IProduct;
    reservations: string[];
  };
  notes: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  reservations: IReserva[];
}
