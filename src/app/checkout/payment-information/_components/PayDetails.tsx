import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const PayDetails = () => {
  return (
    <div className="sticky top-20 lg:col-span-1">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start space-x-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-slate-100">
            <Image
              src="/desk/desk3.webp"
              alt="Room"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary mb-2">
              Hotel room in Grand
            </Badge>
            <h3 className="text-lg font-semibold">Superior Family Room</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              4 guests • 4 beds • private bath
            </p>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium">4.4</span>
                <span className="text-muted-foreground ml-1 text-sm">
                  (324 reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 text-lg font-semibold">Price details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>$88 x 4 nights</span>
              <span>$348</span>
            </div>
            <div className="text-primary flex justify-between">
              <span>New user discount</span>
              <span>-$87</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Service fee</span>
                <Button variant="ghost" size="icon" className="ml-1 h-4 w-4">
                  <Info className="h-3 w-3" />
                </Button>
              </div>
              <span>$12</span>
            </div>

            <Separator className="my-3" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total (USD)</span>
              <span>$273</span>
            </div>

            <div className="text-muted-foreground flex items-center text-sm">
              <span>Free cancellation until 3:00 PM on July 15, 2022.</span>
              <Button variant="link" className="text-primary ml-1 h-auto p-0">
                More info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayDetails;
