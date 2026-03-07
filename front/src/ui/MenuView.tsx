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
          <p className="text-center text-8xl font-serif text-red-950 m-7">
            Menu
          </p>

          <p className="text-center text-2xl text-amber-900 m-7">
            Descubri nuestros platillos destacados con ingredientes frescos y de calidad.
          </p>
        </div>

        <p className="text-center text-6xl font-serif text-red-950 -m-9">
          Platillos
        </p>

        <div className="flex-grow mx-auto w-full px-6 py-8 m-6">

          {loading && (
            <p className="text-center text-xl">Cargando platos...</p>
          )}

          {!loading && (
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-3">
              {platos.map((p: any) => (
                <Card
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={Number(p.price)}
                  image={p.imageUrl}
                  ingredients={p.ingredients}
                />
              ))}
            </div>
          )}

        </div>

        <p className="text-center text-6xl font-serif text-red-950 m-7">
          Bebidas
        </p>

        <div className="mx-auto w-full px-6 py-8 m-6">
          <p className="text-center text-xl text-slate-600">
            Todavía no hay bebidas cargadas desde el backend.
          </p>
        </div>

      </section>
    </div>
  );
};

export default MenuView;