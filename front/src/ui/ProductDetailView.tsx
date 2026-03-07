import { getPlatoById } from "@/services/platosService";

interface PageProps {
  params: {
    id: string;
  };
}

const PlatoDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const plato = await getPlatoById(params.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-2 lg:gap-10 lg:p-10">
          
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white flex items-center justify-center">
              <img
                src={plato.imageUrl}
                alt={plato.name}
                className="h-80 w-80 object-contain p-6"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-serif text-red-900 lg:text-5xl">
              {plato.name}
            </h1>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              ${plato.price}
            </p>

            <div className="mt-6">
              <p className="text-lg font-semibold text-slate-900">
                Ingredientes
              </p>
              <p className="mt-2 text-base text-slate-600">
                {plato.ingredients}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold text-slate-900">
                Descripción
              </p>
              <p className="mt-2 text-base leading-7 text-slate-600">
                {plato.description}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold text-slate-900">
                Categoría
              </p>
              <p className="mt-2 text-base text-slate-600">
                {plato.category?.name}
              </p>
            </div>

            <div className="mt-8">
              <button className="btn-primary w-full">
                Reservar / Pedir
              </button>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};

export default PlatoDetailPage;