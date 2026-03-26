import PagosView from "@/ui/PagosView";
import { Suspense } from "react";

const PagosPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7efea] flex items-center justify-center">
          <p className="text-[#6d1e1e] text-xl">Cargando...</p>
        </div>
      }
    >
      <PagosView />
    </Suspense>
  );
};

export default PagosPage;
