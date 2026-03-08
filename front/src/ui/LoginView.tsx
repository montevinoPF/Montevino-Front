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
    <div className="flex flex-col items-center justify-center mt-35 mb-15">
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
          <Form className="flex flex-col items-center justify-center w-full max-w-sm gap-3 py-10 shadow-2xl px-7 rounded-2xl">
            <h1 className="text-3xl text-[#56070C]">Iniciar Sesion</h1>
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="self-start text-red-500"
            />
            <label htmlFor="password" className="self-start">
              Contraseña
            </label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="•••••••"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="self-start text-red-500"
            />
            <span className="self-end text-sm hover:cursor-pointer">
              Olvidaste tu contraseña?
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group"
            >
              Entrar
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
            </button>
            <span>o</span>
            <button className="w-full p-2 border border-gray-300 rounded-md hover:cursor-pointer">
              <div className="flex items-center justify-center gap-2">
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
