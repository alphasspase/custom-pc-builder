'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ProductModal } from './ProductModal';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import {
  Setup_Product,
  SetupCategoryWithProducts,
} from '@/lib/api/services/setup_configuration/type';

// Constants
const AUTO_PLAY_INTERVAL = 5000;

interface ProductItemProps {
  product: Setup_Product;
  title: string;
  description: string;
  products: Setup_Product[];
  categoryId: number;
}

// Components

function ProductBanner({
  id,
  products,
  title,
  description,
}: SetupCategoryWithProducts) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play management
  const startAutoPlay = useCallback(() => {
    if (!api || !isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      api.scrollNext();
      // The loop option will automatically handle wrapping to the first slide when at the end
    }, AUTO_PLAY_INTERVAL);
  }, [api, isAutoPlaying]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start/stop autoplay effect
  useEffect(() => {
    startAutoPlay();

    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // Event handlers
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!products?.length) {
    return <div>No products available</div>;
  }

  return (
    <Card className="mx-auto w-full p-0 shadow-lg">
      <CardContent className="p-0">
        <Carousel
          setApi={setApi}
          className="w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          opts={{
            loop: true,
            dragFree: false,
          }}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <div className="grid h-full md:grid-cols-2">
                  <ProductImage
                    src={product.image || '/noData.jpg'}
                    alt={product.name}
                  />
                  <ProductDetails
                    product={product}
                    title={title}
                    description={description}
                    products={products}
                    categoryId={id}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-0 h-10 w-10 -translate-y-1/2 rounded-full border bg-white/80 shadow-md hover:text-white" />
          <CarouselNext className="hover:bg-primary absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 rounded-full border bg-white/80 shadow-md hover:text-white" />
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default ProductBanner;

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <AspectRatio className="p-5">
      <Image
        src={src || '/noData.jpg'}
        alt={alt}
        width={600}
        height={400}
        className="max-h-full w-full rounded-md object-contain shadow-sm"
        priority
      />
    </AspectRatio>
  );
}

function ProductDetails({
  product,
  title,
  description,
  products,
  categoryId,
}: ProductItemProps) {
  return (
    <div className="flex flex-col justify-center p-6 md:p-8">
      <h2 className="mb-3 text-2xl font-bold md:text-3xl">{product.name}</h2>
      <p className="mb-4 text-gray-600">{product.description}</p>

      <div className="mb-6 flex items-baseline">
        <span className="text-3xl font-bold">${product.price}</span>
        {Boolean(Number(product.discount)) && (
          <span className="text-muted-foreground ml-2 text-lg line-through">
            ${Number(product.price) + Number(product.discount)}
          </span>
        )}
      </div>

      <ProductModal
        products={products}
        title={title}
        description={description}
        id={categoryId}
        name={title}
      />
    </div>
  );
}
