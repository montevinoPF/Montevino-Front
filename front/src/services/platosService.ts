import { IProduct } from "@/types/types";
import Swal from "sweetalert2";

export interface IPlatoFromBack {
  id: string;
  name: string;
  price: string;
  ingredientes: string;
  description: string;
  imageUrl: string;
  stock: number;
  category: {
    id: string;
    name: string;
  };
}

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

export const getPlatoById = async (id: string) => {
  const res = await fetch(`${BACKURL}/platos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener el plato");

  const data = await res.json();

  return adaptProduct(data);
};

export const getBebidaById = async (id: string) => {
  const res = await fetch(`${BACKURL}/bebidas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener la bebida");

  const data = await res.json();

  return adaptProduct(data);
};

export const getTodosLosPlatos = async () => {
  // Trae todos los platos de una sola vez con un limit alto
  const res = await fetch(`${BACKURL}/platos?page=1&limit=1000`);

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  const data = await res.json();

  return data.filter((plato: any) => plato.type === "platos").map(adaptProduct);
};

export const getPlatos = async (page: number, limit: number) => {
  // Pedimos más items para compensar el filtrado por type
  const res = await fetch(`${BACKURL}/platos?page=${page}&limit=${limit * 3}`);

  if (!res.ok) {
    throw new Error("Error al traer los platos");
  }

  const data = await res.json();

  return data.filter((plato: any) => plato.type === "platos").map(adaptProduct);
};

export const getBebidas = async () => {
  const res = await fetch(`${BACKURL}/bebidas`);

  if (!res.ok) {
    throw new Error("Error al traer las bebidas");
  }

  const data = await res.json();

  return data.map(adaptProduct);
};

const compressImage = (file: File, maxSizeKB = 500): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Reducir dimensiones si es muy grande
      const MAX_DIM = 1200;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      // Comprimir reduciendo calidad hasta que entre en 500 KB
      let quality = 0.9;
      const compress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Error al comprimir imagen"));
            if (blob.size / 1024 > maxSizeKB && quality > 0.1) {
              quality -= 0.1;
              compress();
            } else {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              URL.revokeObjectURL(url);
              resolve(compressedFile);
            }
          },
          "image/jpeg",
          quality,
        );
      };
      compress();
    };

    img.onerror = reject;
  });
};

export const createPlato = async (formData: FormData, router?: any) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  try {
    // Comprimir imagen si existe
    const file = formData.get("file");
    if (file instanceof File) {
      const compressed = await compressImage(file);
      formData.set("file", compressed);
      console.log(
        `Imagen comprimida: ${(compressed.size / 1024).toFixed(1)} KB`,
      );
    }

    const res = await fetch(`${BACKURL}/platos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al crear el plato");
    }

    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Plato creado",
      text: "El plato se ha creado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver plato",
      cancelButtonText: "Crear otro",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu/${data.id}`);
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const adaptProduct = (product: any): IProduct => {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    ingredientes: product.ingredientes,
    imageUrl: product.imageUrl,
    description: product.description,
    stock: product.stock,
    type: product.type,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
        }
      : undefined,
  };
};

export const editPlato = async (
  id: string,
  formData: FormData,
  router: any,
) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  try {
    console.log("CAMPOS ENVIADOS:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const file = formData.get("file");
    if (file instanceof File) {
      const compressed = await compressImage(file);
      formData.set("file", compressed);
      console.log(
        `Imagen comprimida: ${(compressed.size / 1024).toFixed(1)} KB`,
      );
    }

    const res = await fetch(`${BACKURL}/platos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al editar el plato");
    }
    // ...existing code...

    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Plato editado",
      text: "El plato se ha editado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver plato",
      cancelButtonText: "Editar otro",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu/${data.id}`);
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePlato = async (id: string, router: any) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  try {
    const res = await fetch(`${BACKURL}/platos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al eliminar el plato");
    }

    Swal.fire({
      icon: "success",
      title: "Plato eliminado",
      text: "El plato se ha eliminado correctamente.",
      confirmButtonColor: "#000",
      showCancelButton: true,
      confirmButtonText: "Ver menú",
      cancelButtonText: "Seguir administrando",
    }).then((result) => {
      if (result.isConfirmed && router) {
        router.push(`/menu`);
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearCategoria = async (name: string) => {
  const session = JSON.parse(localStorage.getItem("userSession") ?? "null");
  const token = session?.token;

  try {
    const res = await fetch(`${BACKURL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR DEL BACK:", error);
      throw new Error("Error al crear la categoria");
    }

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Categoria creada",
      text: "La categoria se ha creado correctamente.",
      confirmButtonColor: "#000",
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
