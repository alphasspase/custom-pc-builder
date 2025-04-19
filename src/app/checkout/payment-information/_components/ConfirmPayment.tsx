'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  ShoppingCartIcon as PaypalIcon,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export default function ConfirmPayment() {
  const [setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className=" ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // className="w-full max-w-4xl"
      >
        <Card className="relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm">
          <CardHeader>
            <Button variant="link" size="icon">
              <ChevronLeft className="h-5 w-5" />
              Back
            </Button>

            <CardTitle>
              <h2 className="text-primary">Confirm and Pay</h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="col-span-2 space-y-8 p-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Your trip</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-slate-50 p-4"
                  >
                    <Label className="text-muted-foreground text-sm">
                      Dates
                    </Label>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-medium">July 17 - 21</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-slate-50 p-4"
                  >
                    <Label className="text-muted-foreground text-sm">
                      Guests
                    </Label>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-medium">2 guests</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Pay with</h3>
                <Tabs
                  defaultValue="card"
                  onValueChange={setPaymentMethod}
                  className="w-full"
                >
                  <TabsList className="mb-6 grid grid-cols-3">
                    <TabsTrigger
                      value="card"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit card
                    </TabsTrigger>
                    <TabsTrigger
                      value="paypal"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <PaypalIcon className="mr-2 h-4 w-4" />
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger
                      value="google"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Google Pay
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="mt-0 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card number</Label>
                        <div className="relative">
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                          />
                          <CreditCard className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-holder">Card holder</Label>
                        <Input id="card-holder" placeholder="Name on card" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiration">Expiration date</Label>
                          <Input id="expiration" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="save-card" />
                        <Label htmlFor="save-card" className="text-sm">
                          Save my card for future reservations
                        </Label>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="paypal">
                    <div className="flex flex-col items-center justify-center py-8">
                      <Image
                        src="/placeholder.svg?height=60&width=120"
                        alt="PayPal"
                        width={120}
                        height={60}
                        className="mb-4"
                      />
                      <p className="text-muted-foreground text-center">
                        You will be redirected to PayPal to complete your
                        payment.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="google">
                    <div className="flex flex-col items-center justify-center py-8">
                      <Image
                        src="/placeholder.svg?height=60&width=120"
                        alt="Google Pay"
                        width={120}
                        height={60}
                        className="mb-4"
                      />
                      <p className="text-muted-foreground text-center">
                        You will be redirected to Google Pay to complete your
                        payment.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-slate-200 p-6">
            <div className="text-muted-foreground text-xs">
              By selecting the button below, I agree to the Property Rules,
              Terms and Conditions, Privacy Policy and COVID-19 Safety
              Requirements.
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            >
              {isSubmitting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Confirm and pay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
