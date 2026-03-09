import {
  ILogin,
  ILoginErrors,
  IRegister,
  IRegisterErrors,
} from "@/types/types";

export const loginValidations = (values: ILogin) => {
  const errors: ILoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "El correo electrónico es obligatorio";
  }

  if (!values.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  }

  return errors;
};

export const registerValidations = (values: IRegister) => {
  const errors: IRegisterErrors = {};

  if (!values.email.trim()) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  if (!values.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos una letra minúscula";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  } else if (!/[^A-Za-z0-9]/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos un carácter especial";
  }

  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (
    !/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+( [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/.test(values.name)
  ) {
    errors.name =
      "El nombre solo puede contener letras y un espacio entre palabras";
  }

  return errors;
};
