import { SetupCategoryWithProducts } from '@/lib/api/services/setup_configuration/type';
import ProductBanner from './ProductBanner';

export default function ProductCarousel(
  productSectionsData: SetupCategoryWithProducts,
) {
  // Destructure the relevant fields from productSectionsData
  const { title = '', description = '' } = productSectionsData || {};

  return (
    <div className="relative rounded-lg border bg-white p-6 shadow-sm">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h3>{title}</h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {description}
          </p>
        </div>
        <ProductBanner {...productSectionsData} />
      </div>
    </div>
  );
}
