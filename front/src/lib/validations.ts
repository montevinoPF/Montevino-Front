import {
  IDish,
  IDishErrors,
  ILogin,
  ILoginErrors,
  IPlate,
  IPlateErrors,
  IProduct,
  IProductErrors,
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

export const dishValidation = (values: IPlate) => {
  const errors: IPlateErrors = {};

  if (!values.name.trim()) {
    errors.name = "El nombre del plato es obligatorio";
  }

  if (!values.price) {
    errors.price = "El precio del plato es obligatorio";
  } else if (values.price <= 0) {
    errors.price = "El precio del plato debe ser mayor a 0";
  }

  if (!values.description.trim()) {
    errors.description = "La descripción del plato es obligatoria";
  }

  if (!values.imgUrl.trim()) {
    errors.imgUrl = "La URL de la imagen es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.imgUrl)) {
    errors.imgUrl = "La URL de la imagen no es válida";
  }

  if (!values.categoryId.trim()) {
    errors.categoryId = "La categoría es obligatoria";
  }

  if (values.stock < 0) {
    errors.stock = "El stock no puede ser negativo";
  }

  return errors;
};
