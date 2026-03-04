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
  address: string;
  phone: string;
}

export interface IRegisterErrors {
  email?: string;
  password?: string;
  name?: string;
  address?: string;
  phone?: string;
}

export interface IUserSession {
  token: string;
  user: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    orders: [];
  };
}
