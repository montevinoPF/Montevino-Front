import { Suspense } from "react";
import ReservarPlatosView from "@/ui/ReservarPlatosView";

export default function ReservarPlatosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7efea] flex items-center justify-center text-xl text-[#6b3030]">
          Cargando...
        </div>
      }
    >
      <ReservarPlatosView />
    </Suspense>
  );
}
