"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProfileImage() {
    const { userData, setUserData } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(
        userData?.user?.image ?? null
    );

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;


        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${userData?.user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${userData?.token}`,
                    },
                    body: formData,
                }
            );
           

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Error al actualizar la imagen");

            const imageUrl = data.user?.imgUrl;
            if (!imageUrl) throw new Error("No se devolvió imgUrl validamente");

            if (userData) {
                const updated = {
                    ...userData,
                    user: { ...userData.user, image: imageUrl},
                };
                setUserData(updated);
                localStorage.setItem("userSession", JSON.stringify(updated));
            }

            setPreview(imageUrl);
        } catch (error) {
            console.error("Error actualizando imagen:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow">
            <div className="relative w-28 h-28">
                {preview ? (
                    <img
                        src={preview}
                        alt="Foto de perfil"
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#7c090c]"
                    />
                ) : (
                    <div className="w-28 h-28 rounded-full bg-[#f8d7d8] border-4 border-[#7c090c] flex items-center justify-center">
                        <span className="text-4xl font-bold text-[#7c090c]">
                            {userData?.user.name?.charAt(0).toUpperCase() ?? "?"}
                        </span>
                    </div>
                )}

                <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-[#7c090c] text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#56070C] transition"
                >
                    {uploading ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    )}
                </label>
                <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>

            <div className="text-center">
                <p className="text-lg font-semibold text-[#7c090c]">{userData?.user.name}</p>
                <p className="text-sm text-gray-500">{userData?.user.email}</p>
            </div>
        </div>
    );
}