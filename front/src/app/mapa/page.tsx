"use client";

import dynamic from "next/dynamic";

const MapaComponent = dynamic(() => import("@/components/Mapa"), {
  ssr: false, // <-- Evita el error de window
  loading: () => (
    <div
      style={{ height: "250px", width: "100%" }}
      className="bg-gray-200 rounded-lg animate-pulse"
    />
  ),
});

export default function MapaFooter() {
  return <MapaComponent />;
}
