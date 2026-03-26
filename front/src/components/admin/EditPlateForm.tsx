"use client";
import { useAuth } from "@/context/AuthContext";
import { dishValidation } from "@/lib/validations";
import { editPlato } from "@/services/platosService";
import { ICategory, IProduct } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditPlateForm = ({ plato }: any) => {
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [categoriasLoaded, setCategoriasLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(plato.imageUrl || ""); // <-- Preview
  const { checkAdmin, isAuthReady, userData } = useAuth();
  const tipos = [
    { id: "platos", name: "Platos" },
    { id: "bebidas", name: "Bebidas" },
  ];
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthReady || !userData) return;
    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
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
    };
    init();
  }, [BACKURL, userData, isAuthReady]);

  if (!isAuthReady || !userData) return null;
  if (!categoriasLoaded)
    return <p className="py-10 text-center">Cargando...</p>; // <-- Espera a que carguen

  return (
    <div className="bg-[#F6E3D9]">
      <div className="flex flex-col items-center justify-center">
        <Formik
          initialValues={{
            name: plato.name || "",
            description: plato.description || "",
            price: Number(plato.price) || 0,
            ingredientes: Array.isArray(plato.ingredientes)
              ? plato.ingredientes.join(", ")
              : plato.ingredientes || "",
            file: null as File | null, // <-- Tipado correcto
            stock: Number(plato.stock) || 0,
            categoryId: plato.category?.id || plato.categoryId || "",
            type: plato.type || "platos",
          }}
          validate={(values) => {
            const errors = dishValidation(values);
            delete errors.file; // La imagen no es obligatoria al editar
            return errors;
          }}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", String(values.price));
            formData.append("stock", String(values.stock));
            formData.append("ingredientes", values.ingredientes);
            formData.append("categoryId", values.categoryId);
            formData.append("type", values.type);
            if (values.file instanceof File) {
              formData.append("file", values.file);
            }
            await editPlato(plato.id, formData, router);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col items-center justify-center w-[510px] gap-3 py-10 shadow-[0_0_15px_rgba(0,0,0,0.20)] px-7 bg-white rounded-2xl mb-20 mt-35">
              <h1 className="text-3xl text-[#56070C]">Editar Plato</h1>

              {/* Nombre */}
              <label htmlFor="name" className="self-start">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Pasta al Pesto"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Descripción */}
              <label htmlFor="description" className="self-start">
                Descripción
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                placeholder="Descripción del plato"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Precio */}
              <label htmlFor="price" className="self-start">
                Precio
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                min={0}
                placeholder="15.50"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Ingredientes */}
              <label htmlFor="ingredientes" className="self-start">
                Ingredientes
              </label>
              <Field
                id="ingredientes"
                name="ingredientes"
                type="text"
                placeholder="Tomate, albahaca, ajo..."
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="ingredientes"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Imagen */}
              <label htmlFor="file" className="self-start">
                Imagen del plato
              </label>
              <div className="w-full">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB] cursor-pointer"
                  onChange={(e) => {
                    const selectedFile = e.currentTarget.files?.[0];
                    if (selectedFile) {
                      setFieldValue("file", selectedFile);
                      setPreviewUrl(URL.createObjectURL(selectedFile));
                    }
                  }}
                />
                {/* Preview de la imagen */}
                {previewUrl && (
                  <div className="flex justify-center w-full mt-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="object-cover h-32 border border-gray-200 rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Stock */}
              <label htmlFor="stock" className="self-start">
                Stock
              </label>
              <Field
                id="stock"
                name="stock"
                type="number"
                min={0}
                placeholder="50"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Categoría */}
              <label htmlFor="categoryId" className="self-start">
                Categoría
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="categoryId"
                  name="categoryId"
                  as="select"
                  className="w-full p-2 outline-none"
                >
                  <option value="">Seleccionar categoría</option>{" "}
                  {/* <-- Opción vacía */}
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="categoryId"
                component="div"
                className="self-start text-sm text-red-500"
              />

              <label htmlFor="type" className="self-start">
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
              <ErrorMessage
                name="type"
                component="div"
                className="self-start text-sm text-red-500"
              />

              {/* Botones */}
              <div className="flex w-full gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full py-2 border border-[#56070C] text-[#56070C] font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
      </div>
    </div>
  );
};

export default EditPlateForm;
