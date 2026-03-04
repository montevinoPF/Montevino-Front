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
    <div>
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
          <Form>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder=" tuemail@mail.com"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              id="password"
              type="password"
              name="password"
              placeholder=" contraseña"
            />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Entrar
            </button>
            <span className="text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link href={"/register"} className="text-black underline">
                REGISTRATE
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginView;
