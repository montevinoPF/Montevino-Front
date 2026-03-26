"use client";
import { useAuth } from "@/context/AuthContext";
import { loginValidations } from "@/lib/validations";
import { login } from "@/services/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginView = () => {
  const router = useRouter();
  const BACKURL = process.env.NEXT_PUBLIC_API_URL;
  const { setUserData, showPassword, setShowPassword } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-35 mb-15">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={loginValidations}
        onSubmit={async (values) => {
          const response = await login(values);
          if (!response) return;
          const { token, user } = response;
          setUserData({ token, user });
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center w-full max-w-sm gap-3 py-10 shadow-[0_0_15px_rgba(0,0,0,0.20)] px-7 rounded-2xl">
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
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-[#FED0BB]"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="self-start text-red-500"
            />
            <label htmlFor="password" className="self-start">
              Contraseña
            </label>
            <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#FED0BB]">
              <Field
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="•••••••"
                className="w-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-2 cursor-pointer"
              >
                {" "}
                {!showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.77 21.77 0 0 1 5.06-6.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-4.35 5.65" />
                    <path d="M1 1l22 22" />
                  </svg>
                )}
              </button>
            </div>

            <ErrorMessage
              name="password"
              component="div"
              className="self-start text-red-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer"
            >
              {isSubmitting ? "Ingresando..." : "Entrar"}
              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
            </button>
            <span>o</span>
            <Link
              href={`${BACKURL}/auth/google`}
              className="w-full p-2 border border-gray-300 rounded-md hover:cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png"
                  alt="Google logo"
                  className="w-5"
                />
                <span>Continuar con Google</span>
              </div>
            </Link>
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
