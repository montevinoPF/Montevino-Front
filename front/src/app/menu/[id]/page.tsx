import { getBebidaById } from "@/services/bebidasService";
import { getPlatoById } from "@/services/platosService";
import PlatosDetailView from "@/ui/PlatosDetailView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: PageProps) => {
  const { id } = await params;

  let product;
  try {
    product = await getPlatoById(id);
  } catch (error) {
    product = await getBebidaById(id);

  }

  return (
    <PlatosDetailView plato={product} />
  );
};

export default ProductPage;