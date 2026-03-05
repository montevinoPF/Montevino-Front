'use client'
import Card from "@/components/Card";
import { IProduct } from "../types/types";

const sampleProducts: IProduct[] = [
  { id: 1, name: "Carne a la parrilla", ingredients: "carne, papas, lechuga, tomate.", price: 8999, image: "https://c.pxhere.com/photos/97/5d/pork_yummy_delicious_dinner_tasty_cuisine_grilled_meat-1386775.jpg!d", categoryId: 1 },
  { id: 2, name: "Hamburguesa", ingredients: "Carne, Pan, Lechuga, Tomate.", price: 3999, image: "https://c.pxhere.com/photos/f8/cf/beef_burger_fries_yummy_delicious_dinner_tasty_cuisine-1386769.jpg!d", categoryId: 1 },
  { id: 3, name: "Mariscos", ingredients: "Mariscos, Limon, Lechuga.", price: 15999, image: "https://centrosantafe.com.mx/cdn/shop/articles/restaurantes-de-mariscos-y-otras-opciones-para-comer-en-cuaresma.jpg?v=1552671997", categoryId: 1 }
];

const MenuView = () => {
  return (
    <div>
      <section>
        <div className="w-full py-24">
          <p className="text-center text-7xl font-black ">Menu</p>
        </div>
        <div>
       
            <section> 
                <div className="w-full py-24">
                    <p className="text-center text-7xl font-serif text-red-950 ">
                        Menu 
                    </p>
                    <p className="text-center text-2xl text-amber-900">
                        Descubri nuestros platillos destacados con ingredientes frescos y de calidad.
                    </p>
                </div>
                <div className="flex-grow:1 mx-auto w-full px-6 py-8">
                <div  className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4" > 
                 {sampleProducts.map(p => (
                    <Card key={p.id} {...p} />
                ))}
                </div>
                </div>
                
            </section>  
        </div>
      </section>
    </div>
  );
};

export default MenuView;
