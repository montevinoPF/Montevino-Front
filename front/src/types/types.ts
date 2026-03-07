export interface IProduct {
  id: number;
  name: string;
  ingredientes: string;
  price: number;
  imageUrl: string;
  description: string;
  category?: {
    id: number;
    name: string;
  };
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
    id: number;
    name: string;
    email: string;
  };
}
