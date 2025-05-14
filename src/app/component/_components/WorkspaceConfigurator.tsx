'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { URLS } from '@/utils/urls';
import { SupportModal } from './support-modal';
import { QrCodeModal } from './qr-code-modal';
import { usePCBuilder } from '@/hooks/usePCBuilder';

export default function WorkspaceConfigurator() {
  const { selectedProducts, total } = usePCBuilder();

  console.log('selectedProducts =>', selectedProducts);
  // const calculateTotal = () => {
  //   return Object.values(selectedProducts).reduce(
  //     (sum, product) => sum + product.price,
  //     0,
  //   );
  // };

  return (
    <div className="sticky top-20 lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-6 text-xl font-bold">Configuration Summary</h2>
        <div className="space-y-4">
          {Object.entries(selectedProducts).map(([key, product]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-bold">${product.price}</span>
            </div>
          ))}

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold">${total}</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button asChild className="group w-full">
            <Link href={URLS.checkout}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <SupportModal />

          <QrCodeModal />
        </div>
      </motion.div>
    </div>
  );
}
