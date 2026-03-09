"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { getPlatos } from "@/services/platosService";

const MenuView = () => {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const data = await getPlatos();
        setPlatos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatos();
  }, []);

  return (
    <div>
      <section className="bg-white">
        <div className="w-full py-24">
          <p className="font-serif text-center text-8xl text-red-950 m-7">
            Menú
          </p>

          <p className="text-2xl text-center text-amber-900 m-7">
            Descubrí nuestros platillos destacados con ingredientes frescos y de
            calidad.
          </p>
        </div>

        <p className="font-serif text-6xl text-center text-red-950 -m-9">
          Platillos
        </p>

        <div className="flex-grow w-full px-6 py-8 m-6 mx-auto">
          {loading && <p className="text-xl text-center">Cargando platos...</p>}

          {!loading && (
            <div className="grid items-stretch grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
              {platos.map((p: any) => (
                <Card
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={Number(p.price)}
                  imageUrl={p.imageUrl}
                  ingredientes={p.ingredientes}
                  description=""
                />
              ))}
            </div>
          )}
        </div>

        <p className="font-serif text-6xl text-center text-red-950 m-7">
          Bebidas
        </p>

        <div className="w-full px-6 py-8 m-6 mx-auto">
          <p className="text-xl text-center text-slate-600">
            Todavía no hay bebidas.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MenuView;
