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
    className={`cursor-pointer transition-all ${deliverySpeed === option ? 'ring-2 ring-primary' : ''}`}
    onClick={() => setDeliverySpeed(option)}
  >
    <CardContent className="p-4 flex items-start">
      <div
        className={`rounded-full w-5 h-5 mr-3 mt-0.5 flex items-center justify-center border ${deliverySpeed === option ? 'bg-primary border-primary' : 'border-input'}`}
      >
        {deliverySpeed === option && (
          <Check className="h-3 w-3 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">${price}</p>
        <p className="font-medium">{description}</p>
        <p className="text-sm text-muted-foreground">Est. arrival: {arrival}</p>
      </div>
    </CardContent>
  </Card>
);
