import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

// Delivery Option Card
export const DeliveryOptionCard = ({
  deliverySpeed,
  setDeliverySpeed,
  option,
  price,
  description,
  arrival,
}: {
  deliverySpeed: string;
  setDeliverySpeed: (value: string) => void;
  option: string;
  price: number;
  description: string;
  arrival: string;
}) => (
  <Card
    className={`cursor-pointer transition-all ${deliverySpeed === option ? 'ring-primary ring-2' : ''}`}
    onClick={() => setDeliverySpeed(option)}
  >
    <CardContent className="flex items-start p-4">
      <div
        className={`mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${deliverySpeed === option ? 'bg-primary border-primary' : 'border-input'}`}
      >
        {deliverySpeed === option && (
          <Check className="text-primary-foreground h-3 w-3" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-lg font-bold">${price}</p>
        <p className="font-medium">{description}</p>
        <p className="text-muted-foreground text-sm">Est. arrival: {arrival}</p>
      </div>
    </CardContent>
  </Card>
);
