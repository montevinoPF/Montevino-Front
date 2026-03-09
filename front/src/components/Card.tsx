import Link from "next/link";
import { IProduct } from "@/types/types";

const Card: React.FC<IProduct> = ({
  name,
  price,
  imageUrl,
  id,
  ingredientes,
  description,
  category,
}) => {
  return (
    <div className="rounded-2xl bg-[#ffad8779] shadow-2xs transition hover:shadow-2xl flex  flex-col h-full mx-auto max-w-sm ">
      <div className="flex overflow-hidden aspect-square rounded-2xl">
        <img src={imageUrl} />
      </div>
      <div className="flex flex-col flex-1 p-8 px-3 md:text-base">
        <h3 className="flex items-start justify-start font-serif text-3xl text-red-800 min-h-20 ">
          {name}
        </h3>

        <h3 className="p-3 font-serif text-xl text-slate-900 min-h-10">
          {ingredientes}
        </h3>

        <p className="flex items-center justify-center gap-2 p-3 px-8 py-6 text-lg font-bold text-slate-900">
          ${price}
        </p>
        <div className="mt-auto">
          <Link href={`/menu/${id}`}>
            <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#3d0c07] to-[#56070C] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
              VER MAS
              <span className="absolute inset-0 transition-transform -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full duration-1500"></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
