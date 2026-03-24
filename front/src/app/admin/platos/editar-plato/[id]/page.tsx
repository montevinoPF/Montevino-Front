import EditPlateForm from "@/components/admin/EditPlateForm";
import { getPlatoById } from "@/services/platosService";

const BACKURL = process.env.NEXT_PUBLIC_API_URL;

const EditPlatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Trae el plato y las categorías en paralelo
  const [plato, categorias] = await Promise.all([
    getPlatoById(id),
    fetch(`${BACKURL}/categories`).then((res) => res.json()),
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F6E3D9]">
      <EditPlateForm plato={plato} categorias={categorias} />
    </div>
  );
};

export default EditPlatePage;
