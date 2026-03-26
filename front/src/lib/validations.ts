import {
  ILogin,
  ILoginErrors,
  IPlate,
  IPlateErrors,
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

export const dishValidation = (values: {
  name: string;
  description: string;
  ingredientes: string;
  price: number;
  file: File | null;
  categoryId: string;
  stock: number;
  type: string;
}) => {
  const errors: Partial<Record<keyof typeof values, string>> = {};

  if (!values.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (values.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (values.name.trim().length > 50) {
    errors.name = "El nombre no puede superar los 50 caracteres";
  }

  if (!values.description.trim()) {
    errors.description = "La descripción es requerida";
  } else if (values.description.trim().length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  } else if (values.description.trim().length > 500) {
    errors.description = "La descripción no puede superar los 500 caracteres";
  }

  if (!values.ingredientes.trim()) {
    errors.ingredientes = "Los ingredientes son requeridos";
  } else if (values.ingredientes.trim().length < 3) {
    errors.ingredientes = "Ingresá al menos un ingrediente";
  }

  if (values.price === undefined || values.price === null) {
    errors.price = "El precio es requerido";
  } else if (isNaN(values.price)) {
    errors.price = "El precio debe ser un número";
  } else if (values.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  } else if (values.price > 1000000) {
    errors.price = "El precio no puede superar $1.000.000";
  }

  if (values.file) {
    if (!(values.file instanceof File)) {
      errors.file = "El archivo no es válido";
    } else if (values.file.size > 5 * 1024 * 1024) {
      errors.file = "La imagen no puede superar los 5 MB";
    } else if (
      !["image/jpeg", "image/png", "image/webp"].includes(values.file.type)
    ) {
      errors.file = "Solo se permiten imágenes JPG, PNG o WEBP";
    }
  }

  if (values.stock === undefined || values.stock === null) {
    errors.stock = "El stock es requerido";
  } else if (isNaN(values.stock)) {
    errors.stock = "El stock debe ser un número";
  } else if (values.stock < 0) {
    errors.stock = "El stock no puede ser negativo";
  } else if (!Number.isInteger(values.stock)) {
    errors.stock = "El stock debe ser un número entero";
  }

  if (!values.categoryId) {
    errors.categoryId = "Seleccioná una categoría";
  }

  if (!values.type || values.type === "Selecciona un tipo") {
    errors.type = "Seleccioná un tipo de producto";
  }

  return errors;
};

export const categoryValidation = (name: string): string => {
  if (!name.trim()) return "El nombre de la categoría es requerido";
  if (name.trim().length < 3)
    return "El nombre debe tener al menos 3 caracteres";
  if (name.trim().length > 30)
    return "El nombre no puede superar los 30 caracteres";
  if (/\s{2,}/.test(name))
    return "No se permiten espacios dobles entre palabras";
  if (/\s$/.test(name)) return "El nombre no puede terminar con un espacio";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim()))
    return "El nombre solo puede contener letras";
  return "";
};
