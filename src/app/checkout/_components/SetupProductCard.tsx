import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

// SetupProductCard Component - Similar to ProductCard but for setup products
export const SetupProductCard = ({
  product,
  onRemove,
}: {
  product: Setup_Product;
  onRemove: (id: number) => void;
}) => (
  <div className="grid grid-cols-3 items-center gap-4 border-b py-3">
    <div className="col-span-2 flex items-center gap-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-muted-foreground text-xs">{product.category_name}</p>
      </div>
    </div>
    <div className="flex items-center justify-end">
      <span className="font-medium">${product.price}</span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 h-8 w-8"
        onClick={() => onRemove(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
