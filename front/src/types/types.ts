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
  }
  type?: string;
};


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

<<<<<<< HEAD
=======

>>>>>>> 27951df8a6629c72a5a76b227d20275576ed20b0
export interface IReservation {
  reservationDate: string;
  startTime: string;
  peopleCount: number;
  notes: string;
  pedidos: Array<{
    platoId: string;
    quantity: number;
  }>;
<<<<<<< HEAD
}
=======
}
>>>>>>> 27951df8a6629c72a5a76b227d20275576ed20b0
