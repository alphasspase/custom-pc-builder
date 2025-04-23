'use client';

import { useState, useEffect, useRef } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
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
import { ProductCarousalProps } from '../type';
import { ProductModal } from './ProductModal';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export default function ProductBanner({
  products,
  title,
  description,
}: ProductCarousalProps) {
  const [api, setApi] = useState<CarouselApi>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;

    const onChange = (emblaApi: EmblaCarouselType) => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    api.on('select', onChange);

    return () => {
      api.off('select', onChange);
    };
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || !isAutoPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    // Start auto-play
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [api, isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <Card className="gggggg mx-auto w-full p-0 shadow-lg">
      <CardContent className="p-0">
        <Carousel
          setApi={setApi}
          className="w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <div className="grid h-full md:grid-cols-2">
                  {/* Image section */}
                  <AspectRatio className="p-5">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.title}
                      width={600}
                      height={400}
                      className="max-h-full w-full rounded-md object-contain shadow-sm"
                    />
                  </AspectRatio>

                  {/* Content section */}
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <h2 className={`mb-3 text-2xl font-bold md:text-3xl`}>
                      {product.title}
                    </h2>
                    <p className="mb-4 text-gray-600">{product.description}</p>
                    {/* {product.discount && ( */}
                    <div className="mb-6 flex items-baseline">
                      <div className="text-3xl font-bold">
                        ${product.price - (product.discount || 0)}
                      </div>
                      {product.discount && (
                        <div className="text-muted-foreground ml-2 text-lg line-through">
                          ${product.price}
                        </div>
                      )}
                    </div>

                    <ProductModal
                      products={products}
                      title={title}
                      description={description}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom navigation arrows */}
          <div>
            <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-0 h-10 w-10 -translate-y-1/2 rounded-full border bg-white/80 shadow-md hover:text-white" />
            <CarouselNext className="hover:bg-primary absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 rounded-full border bg-white/80 shadow-md hover:text-white" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
}
