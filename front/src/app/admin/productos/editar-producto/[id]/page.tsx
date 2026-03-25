import EditPlateForm from "@/components/admin/EditPlateForm";
import { getBebidaById, getPlatoById } from "@/services/platosService";

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

const EditPlatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Primero trae el producto sin saber el tipo
  // Intenta con platos primero, si falla prueba bebidas
  let plato;
  try {
    plato = await getPlatoById(id);
  } catch {
    plato = await getBebidaById(id);
  }

  const categorias = await fetch(`${BACKURL}/categories`).then((res) =>
    res.json(),
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F6E3D9]">
      <EditPlateForm plato={plato} categorias={categorias} />
    </div>
  );
};

export default EditPlatePage;
