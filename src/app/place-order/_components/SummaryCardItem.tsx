import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItemType } from '../type';

const SummaryCardItem = ({
  item,
  onQuantityChange,
}: {
  item: CartItemType;
  onQuantityChange: (id: number, change: number) => void;
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 border-b last:border-0">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h4>{item.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(item.id, -1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(item.id, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="min-w-[100px] text-right">
            <div className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              ${item.price.toFixed(2)} each
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCardItem;
