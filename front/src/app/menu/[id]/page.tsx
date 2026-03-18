import { getPlatoById } from "@/services/platosService";
import PlatosDetailView from "@/ui/PlatosDetailView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const plato = await getPlatoById(id);

  return (
    <PlatosDetailView plato={plato} />
  );
};

export default ProductPage;