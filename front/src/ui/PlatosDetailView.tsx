"use client"
import Protected from "@/components/Protected";
import { IProduct } from "@/types/types";
import Link from "next/link";
import Swal from "sweetalert2";

interface Props {
  plato: IProduct
}

const handleReserva = async () =>
  await Swal.fire({
      icon: "info",
      title: "Debes iniciar sesión.",
      text: "Para reservar debes iniciar sesión.",
      confirmButtonText: "OK",
      confirmButtonColor: "#56070C",
  });
  


const PlatosDetailView =  ({ plato }: Props) => {

  return (

 <div className="mx-auto max-w-5xl px-2 py-30">
      <div className="rounded-2xl border bg-[#ffad8779] shadow-2xs overflow-hidden">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div className="h-260px md:h-420px  overflow-hidden rounded-2xl bg-white/60">
            <img
              src={plato.imageUrl}
              alt={plato.name}
              className="aspect-square overflow-hidden flex h-full rounded-2xl"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2x1 md:text-4xl font-serif text-red-800">
                {plato.name}
              </p>

              <p className="text-2x1 md:text-2xl font-bold text-slate-900 p-3">
                ${plato.price}
              </p>

              <div className="text-2x1 md:text-xl  p-3">
                <p className=" font-semibold text-red-800 ">
                  Ingredientes
                </p>
                <p className="mt-2  leading-7 text-slate-900">
                  {plato.ingredientes}
                </p>
              </div>

              <div className="text-2x1 md:text-xl  p-3">
                <p className=" font-semibold text-red-800">
                  Descripción
                </p>
                <p className="leading-7 text-slate-900">
                  {plato.description}
                </p>
              </div>

              {plato.category?.name && (
                <div className="text-x1 md:text-xl p-3">
                  <p className="text-lg font-semibold text-red-800">
                    Categoría
                  </p>
                  <p className="mt-2 text-base font-serif text-slate-900">
                    {plato.category.name}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 md:flex-row p-3">
              <Link href="/menu" className="w-full">
                <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group">
                  VOLVER AL MENÚ
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
                </button>
              </Link>
              
             <Protected>
              <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group">
                RESERVAR
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
              </button>
              </Protected>

              <Link href="/login" className="w-full">
                <button
                  onClick={handleReserva}
                  className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group">
                  RESERVAR
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1500"></span>
                </button>
              </Link>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default PlatosDetailView;