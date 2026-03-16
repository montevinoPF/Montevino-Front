"use client";
import { dishValidation } from "@/lib/validations";
import { createPlato } from "@/services/platosService";
import { ICategory } from "@/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

const PlateForm = () => {
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Reemplaza la URL por la de tu backend
    fetch(`${BACKURL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch(() => setCategorias([]));
  }, [BACKURL]);

  return (
    <div className="bg-[#F6E3D9]">
      <Link
        href="/admin"
        className="absolute left-6 top-6  mt-30 text-[#56070C] hover:text-[#3d0c07] transition-colors"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <Formik
          initialValues={{
            name: "",
            description: "",
            ingredientes: "",
            price: 0,
            imageUrl: "",
            categoryId: "",
            stock: 0,
          }}
          validate={dishValidation}
          onSubmit={async (values) => {
            const response = await createPlato(values);
            console.log(response);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center w-full max-w-lg gap-3 py-10 shadow-[0_0_15px_rgba(0,0,0,0.20)] px-7 bg-white rounded-2xl mb-20 mt-35">
              <h1 className="text-3xl text-[#56070C]">Crear Plato</h1>
              <label htmlFor="name" className="self-start">
                Nombre
              </label>
              <Field
                id="name"
                type="name"
                name="name"
                placeholder="Pasta al Pesto"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="self-start text-red-500"
              />

              <label htmlFor="description" className="self-start">
                Descripcion
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="description"
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Pasta al dente con salsa pesto de..."
                  className="w-full p-2 outline-none resize-none"
                />
              </div>
              <ErrorMessage
                name="description"
                component="div"
                className="self-start text-red-500"
              />

              <label htmlFor="ingredientes" className="self-start">
                Ingredientes
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="ingredientes"
                  as="textarea"
                  rows={3}
                  name="ingredientes"
                  placeholder="Pasta al dente con salsa pesto de..."
                  className="w-full p-2 outline-none resize-none"
                />
              </div>
              <ErrorMessage
                name="ingredientes"
                component="div"
                className="self-start text-red-500"
              />

              <label htmlFor="price" className="self-start">
                Precio
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="price"
                  type="number"
                  name="price"
                  placeholder="35.000"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage
                name="price"
                component="div"
                className="self-start text-red-500"
              />

              <label htmlFor="imageUrl" className="self-start">
                Imagen
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="imageUrl"
                  type="url"
                  name="imageUrl"
                  placeholder=""
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="self-start text-red-500"
              />

              <label htmlFor="categoryId" className="self-start">
                Categoria
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="categoryId"
                  name="categoryId"
                  as="select"
                  className="w-full p-2 outline-none"
                >
                  <option value="">Selecciona una categoría</option>
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
                className="self-start text-red-500"
              />

              <label htmlFor="stock" className="self-start">
                Stock
              </label>
              <div className="flex items-center w-full border mb-3 border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
                <Field
                  id="stock"
                  type="number"
                  name="stock"
                  placeholder="10"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage
                name="stock"
                component="div"
                className="self-start text-red-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
              >
                Subir
                <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PlateForm;
