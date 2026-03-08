"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Callback() {
  const router = useRouter();
  const { setUserData } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    fetch(`http://localhost:3001/auth/callback?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({ token: data.access_token, user: data.user });

        router.push("/");
      });
  }, [setUserData, router]);

  return <p>Iniciando sesión...</p>;
}
