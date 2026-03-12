"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, isAuthReady } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !userData) {
      router.push("/login");
    }
  }, [isAuthReady, userData, router]);

  if (!isAuthReady) {
    return <p>Cargando...</p>;
  }

  if (!userData) {
    return null;
  }

  return <>{children}</>;
}