import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Product } from '@/lib/api/services/pc_configuration/type';
// Product Card Component
export const ProductCard = ({
  product,
  onRemove,
}: {
  product: Product;
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
      </div>
    </div>
    {/* <div className="text-center">${product.price}</div> */}
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
