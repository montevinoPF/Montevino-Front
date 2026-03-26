"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Callback() {
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const { setUserData } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    fetch(`${APIURL}/auth/callback?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({ token: data.access_token, user: { ...data.user, image: data.user.imgUrl } });

        router.push("/");
      });
  }, [setUserData, router, APIURL]);

  return (
    <>
      <p className="flex self-center justify-center mt-75 text-2xl text-[#56070C]">
        Iniciando sesión...
      </p>
    </>
  );
}
