import { getPlatoById } from "@/services/platosService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const plato = await getPlatoById(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-2 lg:gap-10 lg:p-10">

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white flex items-center justify-center">
              <img
                src={plato.imageUrl}
                alt={`Imagen del producto ${plato.name}`}
                className="h-80 w-80 object-contain p-6"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
              {plato.name}
            </p>

            <p className="mt-4 text-4xl font-extrabold text-red-700">
              ${plato.price}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">
                Ingredientes
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {plato.ingredients}
              </p>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};

export default ProductPage;