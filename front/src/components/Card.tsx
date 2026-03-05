import { IProduct } from "@/types/types";

const Card: React.FC<IProduct> = ({ name, price, image, id }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="bg-slate-50 p-4">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-white flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="h-36 w-36 object-contain md:h-40 md:w-40 "
          />
        </div>
      </div>

      <div className="p-5 ">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-2 flex items-center justify-center ">
          {name}
        </h3>

        <p className="text-lg font-bold text-slate-900 flex items-center justify-center">
          {" "}
          ${price}
        </p>
      </div>

      <button className="btn-primary mt-4 w-full rounded-xl py-2 text-sm font-semibold">
        Reservar
      </button>
    </article>
  );
};

export default Card;
