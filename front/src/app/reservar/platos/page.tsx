"use client";
import ReservarPlatosView from "@/ui/ReservarPlatosView";
import { Suspense } from "react";


const ReservarPlatosPage = () => {
  return (
    <Suspense fallback={<div>Cargando reserva...</div>}>
      <ReservarPlatosView />
    </Suspense>
  )
}

export default ReservarPlatosPage