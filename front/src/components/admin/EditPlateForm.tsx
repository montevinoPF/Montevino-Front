"use client";
import { dishValidation } from "@/lib/validations";
import { editPlato } from "@/services/platosService";
import { ICategory, IProduct } from "@/types/types";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditPlateForm = ({ plato }: any) => {
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [categoriasLoaded, setCategoriasLoaded] = useState(false);
  const tipos = [
    { id: "platos", name: "Platos" },
    { id: "bebidas", name: "Bebidas" },
  ];
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    fetch(`${BACKURL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setCategoriasLoaded(true);
      })
      .catch(() => {
        setCategorias([]);
        setCategoriasLoaded(true);
      });
  }, [BACKURL]);

  if (!categoriasLoaded) {
    return <p className="py-10 text-center">Cargando...</p>;
  }

  return (
    <Formik
      initialValues={{
        name: plato.name || "",
        description: plato.description || "",
        price: plato.price || 0,
        ingredientes: Array.isArray(plato.ingredientes)
          ? plato.ingredientes.join(", ")
          : plato.ingredientes || "",
        imageUrl: plato.imageUrl || "",
        stock: plato.stock || 0,
        categoryId: plato.category?.id || "",
        type: plato.type || "platos",
      }}
      validate={dishValidation}
      onSubmit={async (values) => {
        await editPlato(plato.id, values, router);
        router.push("/admin/platos-y-categorias");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center justify-center w-full max-w-lg gap-3 py-10 shadow-[0_0_15px_rgba(0,0,0,0.20)] px-7 bg-white rounded-2xl mb-20 mt-30">
          <h1 className="text-3xl text-[#56070C] mb-4">Editar Plato</h1>

          {/* Nombre */}
          <label htmlFor="name" className="self-start font-medium">
            Nombre
          </label>
          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Pasta al Pesto"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C]"
          />

          {/* Descripción */}
          <label htmlFor="description" className="self-start font-medium">
            Descripción
          </label>
          <Field
            id="description"
            name="description"
            as="textarea"
            placeholder="Descripción del plato"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C] resize-none"
          />

          {/* Precio */}
          <label htmlFor="price" className="self-start font-medium">
            Precio
          </label>
          <Field
            id="price"
            name="price"
            type="number"
            min={0}
            placeholder="15.50"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C]"
          />

          {/* Ingredientes */}
          <label htmlFor="ingredientes" className="self-start font-medium">
            Ingredientes
          </label>
          <Field
            id="ingredientes"
            name="ingredientes"
            type="text"
            placeholder="Tomate, albahaca, ajo..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C]"
          />

          {/* Imagen */}
          <label htmlFor="imageUrl" className="self-start font-medium">
            URL de la imagen
          </label>
          <Field
            id="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C]"
          />

          {/* Stock */}
          <label htmlFor="stock" className="self-start font-medium">
            Stock
          </label>
          <Field
            id="stock"
            name="stock"
            type="number"
            min={0}
            placeholder="50"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#56070C]"
          />

          {/* Categoría */}
          <label htmlFor="categoryId" className="self-start font-medium">
            Categoría
          </label>
          <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
            <Field
              id="categoryId"
              name="categoryId"
              as="select"
              className="w-full p-2 outline-none"
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Field>
          </div>

          <label htmlFor="type" className="self-start font-medium">
            Tipo de producto
          </label>
          <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
            <Field
              id="type"
              name="type"
              as="select"
              className="w-full p-2 outline-none"
            >
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.name}
                </option>
              ))}
            </Field>
          </div>

          {/* Botones */}
          <div className="flex w-full gap-4 mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-2 border border-[#56070C] text-[#56070C] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden w-full py-2 bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-lg shadow-lg transition duration-300 group cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditPlateForm;
