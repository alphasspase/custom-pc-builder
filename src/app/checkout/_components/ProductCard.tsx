import { Button } from '@/components/ui/button';
import { Product } from '../type';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
// Product Card Component
export const ProductCard = ({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: (id: string) => void;
}) => (
  <div className="grid grid-cols-4 items-center gap-4 border-b py-3">
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
        <p className="text-muted-foreground text-sm">
          Quantity: {product.quantity}
        </p>
      </div>
    </div>
    <div className="text-center">${product.price}</div>
    <div className="flex items-center justify-end">
      <span className="font-medium">${product.price * product.quantity}</span>
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
