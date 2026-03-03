import Card from "@/component/Card";
import { IProduct } from "../types";

const sampleProducts: IProduct[] = [
  { id: 1, name: "Carne a la parrilla", ingredients: "…", price: 8999, image: "/…", categoryId: 1 },
  { id: 2, name: "Hamburguesa", ingredients: "…", price: 3999, image: "/…", categoryId: 1 },
  { id: 3, name: "Mariscos", ingredients: "…", price: 15999, image: "/…", categoryId: 1 }
];


const MenuView = () => {
     return (
        <div>
       
            <section> 
                <div className="w-full py-24">
                    <p className="text-center text-7xl font-black ">
                        Menu 
                    </p>
                </div>
                <div> 
                 {sampleProducts.map(p => (
                    <Card key={p.id} {...p} />
                ))}
                </div>
                
            </section>  
        </div>
        
  );
};

export default MenuView;