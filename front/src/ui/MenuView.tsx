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
        const data = await getPlatos(1, 100);
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
      <section className="min-h-screen bg-gradient-to-b from-[#fcf7f3] to-[#f7efea] py-10 mt-auto">
        <div className="w-full py-24">
          <p className=" text-center text-5xl text-red-950 m-4">
            Menú
          </p>

          <p className="text-xl text-center text-amber-900">
            Descubrí nuestros platillos destacados con ingredientes frescos y de
            calidad.
          </p>
        </div>

        <p className=" text-3xl text-center text-red-950 -m-9">
          Platos
        </p>

        <div className="flex-grow w-full px-6 py-8 m-6 mx-auto">
          {loading && <p className="text-xl text-center">Cargando platos...</p>}

          {!loading && (
            <div className="grid items-stretch grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 mx-auto max-w-300">
              {platos.map((p: any) => (
                <Card
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={Number(p.price)}
                  imageUrl={p.imageUrl}
                  ingredientes={p.ingredientes}
                  stock={p.stock}
                  description=""
                />
              ))}
            </div>
          )}
        </div>

        <p className=" text-3xl text-center text-red-950 m-9">
          Bebidas
        </p>

        <div className="w-full px-6 py-10 m-6 mx-auto">
          <p className="text-xl text-center text-amber-900">
            Todavía no hay bebidas.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MenuView;
