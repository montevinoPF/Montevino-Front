"use client";
import { registerValidations } from "@/lib/validations";
import { register } from "@/services/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterView = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center mt-35">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={registerValidations}
        onSubmit={async (values) => {
          await register(values);
          router.push("/login");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-full max-w-sm items-center justify-center px-7 py-10 shadow-2xl rounded-2xl">
            <h1 className="text-3xl text-[#56070C]">Crear Cuenta</h1>
            <span className="text-center">
              Registrate para gestionar tus reservas y hacer nuevas
            </span>
            <label htmlFor="name" className="self-start">
              Nombre y Apellido
            </label>
            <Field
              id="name"
              type="name"
              name="name"
              placeholder="Kyara Rojas"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 self-start"
            />
            <label htmlFor="email" className="self-start">
              Email
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="tuemail@mail.com"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 self-start"
            />
            <label htmlFor="password" className="self-start">
              Contraseña
            </label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="•••••••"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 self-start"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 w-full bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md hover:cursor-pointer"
            >
              Registrarse
            </button>
            <span>o</span>
            <button className="border border-gray-300 p-2 rounded-md w-full hover:cursor-pointer">
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png"
                  alt="Google logo"
                  className="w-5"
                />
                <span>Continuar con Google</span>
              </div>
            </button>
            <span className="text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link href={"/login"} className="text-[#56070C] font-semibold">
                Iniciar sesion
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterView;
