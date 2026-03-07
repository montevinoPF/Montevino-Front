import Link from "next/link";
import { IProduct } from "@/types/types";

const Card: React.FC<IProduct> = ({ name, price, imageUrl, id, ingredientes, description, category }) => {
  return (
    <div className= "rounded-2xl border bg-[#ffad8779] shadow-2xs transition hover:shadow-2xl flex  flex-col h-full ">
        <div className="aspect-square overflow-hidden flex rounded-2xl">
          <img
            src={imageUrl}
          />
        </div>
        <div className= "md:text-base p-8 px-3 flex flex-col flex-1">
            <h3 className="text-3xl font-serif  text-red-800 min-h-20 flex items-start justify-start ">
            {name}
            </h3>

            <h3 className="text-xl font-serif text-slate-900 min-h-10 p-3">
            {ingredientes}
            </h3>

            <p className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2 py-6 px-8  p-3">
            ${price}
            </p>
            <div className="mt-auto">
              <Link href={`/menu/${id}`} >
                  <button className="btn-primary w-full font-bold flex flex-col gap-8 md:flex-row p-">
                  VER MAS
                  </button>
              </Link>
            </div>
        </div>
    </div>
  );
};

export default Card;