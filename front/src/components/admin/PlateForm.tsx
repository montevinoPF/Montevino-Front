"use client";
import { dishValidation } from "@/lib/validations";
import { createPlato } from "@/services/platosService";
import { ErrorMessage, Field, Form, Formik } from "formik";

const PlateForm = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: 0,
          imgUrl: "",
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
          <Form className="flex flex-col items-center justify-center w-full max-w-lg gap-3 py-10 shadow-[0_0_15px_rgba(0,0,0,0.20)] px-7 bg-white rounded-2xl">
            <h1 className="text-3xl text-[#56070C]">Subir Plato</h1>
            <span className="text-center">
              Accede a tu cuenta para ver tus reservas y hacer nuevas
            </span>
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

            <label htmlFor="imgUrl" className="self-start">
              Imagen
            </label>
            <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
              <Field
                id="imgUrl"
                type="url"
                name="imgUrl"
                placeholder=""
                className="w-full p-2 outline-none"
              />
            </div>
            <ErrorMessage
              name="imgUrl"
              component="div"
              className="self-start text-red-500"
            />

            <label htmlFor="categoryId" className="self-start">
              ID de categoria
            </label>
            <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
              <Field
                id="categoryId"
                type="text"
                name="categoryId"
                className="w-full p-2 outline-none"
              />
            </div>
            <ErrorMessage
              name="categoryId"
              component="div"
              className="self-start text-red-500"
            />

            <label htmlFor="stock" className="self-start">
              Stock
            </label>
            <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
              <Field
                id="stock"
                type="text"
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
  );
};

export default PlateForm;
