import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

interface ProductCardProps {
  product: Setup_Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelect,
  index,
}) => {
  return (
    // <CarouselItem className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/2">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full overflow-hidden"
    >
      <Card
        className={cn(
          'group h-full cursor-pointer gap-4 overflow-hidden border-2 p-0 pb-6 transition-all duration-300',
          isSelected
            ? 'border-primary shadow-primary/20 shadow-lg'
            : 'border-border hover:border-primary/50',
        )}
        onClick={() => onSelect(product.id.toString())}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-3/2 overflow-hidden">
            <Image
              fill
              src={product.image || '/noData.jpg'}
              alt={product.name}
              className="relative z-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 z-20 bg-black/20"></div>
            <div className="absolute right-0 bottom-0 left-0 z-30 p-4 text-white">
              {/* <div className="mb-1 flex items-center gap-1">
                {mounted && product.rating && renderStars(product.rating)}
                {product.rating && (
                  <span className="ml-1 text-sm">({product.rating})</span>
                )}
              </div> */}
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
          </div>

          {product.most_popular && (
            <Badge className="absolute top-3 right-3 z-30 bg-white font-medium text-black shadow-lg">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-yellow-500" />
              Most Popular
            </Badge>
          )}

          {Number(product.discount) && (
            <Badge className="absolute top-3 left-3 z-30 bg-red-500 font-medium text-white">
              Save ${product.discount}
            </Badge>
          )}

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-primary absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-xl"
            >
              <Check className="h-6 w-6" />
            </motion.div>
          )}
        </div>

        <CardContent>
          <div className="mb-1 flex items-baseline">
            <div className="text-3xl font-bold">
              $
              {(Number(product.price) - Number(product.discount || 0)).toFixed(
                2,
              )}
            </div>
            {product.discount && (
              <div className="text-muted-foreground ml-2 text-lg line-through">
                ${product.price}
              </div>
            )}
          </div>
          {/* <ul className="space-y-1">
            {product.features.slice(0, 3).map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className="flex items-start"
              >
                <Check className="text-primary mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul> */}
        </CardContent>

        <CardFooter>
          <Button
            className="group relative w-full overflow-hidden"
            size="lg"
            variant={isSelected ? 'default' : 'outline'}
          >
            <span className="relative z-10">
              {isSelected ? 'Selected' : 'Select'}
            </span>
            <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
    // </CarouselItem>
  );
};
