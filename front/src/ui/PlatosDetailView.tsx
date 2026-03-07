import { IProduct } from "@/types/types";
import Link from "next/link";

interface Props {
  plato: IProduct
}

const PlatosDetailView =  ({ plato }: Props) => {


  return (

 <div className="mx-auto max-w-5xl px-4 py-30">
      <div className="rounded-2xl border bg-[#ffad8779] shadow-2xs overflow-hidden">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div className="h-260px md:h-420px  overflow-hidden rounded-2xl bg-white/60">
            <img
              src={plato.imageUrl}
              alt={plato.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2x1 md:text-4xl font-serif text-red-800">
                {plato.name}
              </p>

              <p className="text-2x1 md:text-2xl font-bold text-slate-900">
                ${plato.price}
              </p>

              <div className="text-lg md:text-xl">
                <p className=" font-semibold text-red-800">
                  Ingredientes
                </p>
                <p className="mt-2  leading-7 text-slate-900">
                  {plato.ingredientes}
                </p>
              </div>

              <div className="text-lg md:text-base">
                <p className=" font-semibold text-red-800">
                  Descripción
                </p>
                <p className="leading-7 text-slate-900">
                  {plato.description}
                </p>
              </div>

              {plato.category?.name && (
                <div className="text-x1 md:text-xl">
                  <p className="text-lg font-semibold text-red-800">
                    Categoría
                  </p>
                  <p className="mt-2 text-base font-serif text-slate-900">
                    {plato.category.name}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Link href="/menu" className="w-full">
                <button className="btn-primary w-full ">
                  VOLVER AL MENÚ
                </button>
              </Link>

              <button className=" btn-primary w-full">
                RESERVAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default PlatosDetailView;