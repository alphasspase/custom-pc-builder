import { ProductCarousalProps } from '../type';
import ProductBanner from './ProductBanner';

export default function ProductCarousel({
  products,
  title,
  description,
}: ProductCarousalProps) {
  return (
    <div className="relative rounded-lg border bg-white p-6 shadow-sm">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h3>{title}</h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {description}
          </p>
        </div>

        <ProductBanner
          title={title}
          description={description}
          products={products}
        />
      </div>
    </div>
  );
}
