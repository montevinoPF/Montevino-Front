import Link from "next/link";
import { IProduct } from "@/types/types";

const Card: React.FC<IProduct> = ({
  name,
  price,
  imageUrl,
  id,
  ingredientes,  
}) => {
  return (
    <div className="rounded-2xl shadow-md  bg-[#fdeadf]  shadow-2xs transition hover:shadow-2xl flex  flex-col h-full mx-auto max-w-xs ">
      <div className="flex overflow-hidden aspect-square rounded-2xl">
        <img src={imageUrl} />
      </div>
      <div className="flex flex-col flex-1 p-8 px-3 md:text-base ">
        <h3 className="flex items-center justify-center font-serif text-2xl text-red-800 ">
          {name}
        </h3>

        <h3 className="flex items-center justify-center p-3 font-serif text-lg text-slate-900 min-h-10 ">
          {ingredientes}
        </h3>

        <div className="mt-auto">
          <p className="flex flex-col items-center justify-center py-3 mt-auto text-lg font-bold text-slate-900 ">
            ${price}
          </p>

          <Link href={`/menu/${id}`}>
            <button className="relative overflow-hidden py-2 w-full bg-gradient-to-r from-[#7c090c] to-[#520509] text-white font-semibold rounded-md shadow-lg transition duration-300 group cursor-pointer">
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
