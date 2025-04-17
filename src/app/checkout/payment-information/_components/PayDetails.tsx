import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const PayDetails = () => {
  return (
    <div className="lg:col-span-1 sticky top-20">
      <div className="bg-white rounded-lg border p-6 shadow-sm ">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden relative">
            <Image
              src="/desk/desk3.webp"
              alt="Room"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
              Hotel room in Grand
            </Badge>
            <h3 className="font-semibold text-lg">Superior Family Room</h3>
            <p className="text-sm text-muted-foreground mt-1">
              4 guests • 4 beds • private bath
            </p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">4.4</span>
                <span className="text-sm text-muted-foreground ml-1">
                  (324 reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-semibold mb-4">Price details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>$88 x 4 nights</span>
              <span>$348</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>New user discount</span>
              <span>-$87</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>Service fee</span>
                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                  <Info className="h-3 w-3" />
                </Button>
              </div>
              <span>$12</span>
            </div>

            <Separator className="my-3" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total (USD)</span>
              <span>$273</span>
            </div>

            <div className="text-sm text-muted-foreground flex items-center">
              <span>Free cancellation until 3:00 PM on July 15, 2022.</span>
              <Button variant="link" className="h-auto p-0 ml-1 text-primary">
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
