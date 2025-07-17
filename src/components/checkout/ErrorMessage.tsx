import { Card, CardContent } from '@/components/ui/card';

export function ErrorMessage() {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6 text-center">
        <p className="text-red-600">
          Could not load order details. Please contact support.
        </p>
      </CardContent>
    </Card>
  );
}
