"use client";
import { useAuth } from "@/context/AuthContext";
import { loginValidations } from "@/lib/validations";
import { login } from "@/services/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginView = () => {
  const router = useRouter();
  const { setUserData } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-35">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={loginValidations}
        onSubmit={async (values) => {
          const response = await login(values);
          const { token, user } = response;
          setUserData({ token, user });
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-full max-w-sm items-center justify-center px-7 py-10 shadow-2xl rounded-2xl">
            <h1 className="text-3xl">Iniciar Sesion</h1>
            <span className="text-center">
              Accede a tu cuenta para ver tus reservas y hacer nuevas
            </span>
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
            <span className="text-sm self-end hover:cursor-pointer">
              Olvidaste tu contraseña?
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 w-full bg-linear-to-r from-[#350A06] to-[#56070C] text-white font-semibold rounded-md shadow-md hover:cursor-pointer"
            >
              Entrar
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
              ¿No tienes cuenta?{" "}
              <Link href={"/register"} className="text-[#56070C] font-semibold">
                Registrate
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginView;
