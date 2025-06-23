'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { URLS } from '@/utils/urls';
import { SupportModal } from './support-modal';
import { QrCodeModal } from './qr-code-modal';
import { usePCBuilder } from '@/hooks/usePCBuilder';

export default function WorkspaceConfigurator() {
  const { selectedProducts, selectedSetupProducts, total } = usePCBuilder();
  const noProductsSelected =
    selectedProducts.length === 0 && selectedSetupProducts.length === 0;

  return (
    <div className="sticky top-20 lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-3 text-xl font-bold">Configuration Summary</h2>

        {noProductsSelected ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <ShoppingBasket className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No items selected</h3>
            <p className="mb-6 text-sm text-gray-500">
              Select PC components and setup items to build your custom
              workspace
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Display PC Components */}
            {selectedProducts.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-700">
                  PC Components
                </h3>
                {selectedProducts.map((product) => (
                  <div
                    key={`pc-${product.id}`}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="font-bold">${product.price}</span>
                  </div>
                ))}
              </>
            )}

            {/* Display Setup Products */}
            {selectedSetupProducts.length > 0 && (
              <>
                <Separator className="my-4" />
                <h3 className="text-md font-semibold text-gray-700">
                  Setup Products
                </h3>
                {selectedSetupProducts.map((product) => (
                  <div
                    key={`setup-${product.id}`}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="font-bold">${product.price}</span>
                  </div>
                ))}
              </>
            )}

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {noProductsSelected ? (
            <Button className="group w-full" disabled={noProductsSelected}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              asChild
              className="group w-full"
              disabled={noProductsSelected}
            >
              <Link href={noProductsSelected ? '#' : URLS.checkout}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}

          <SupportModal />

          <QrCodeModal />
        </div>
      </motion.div>
    </div>
  );
}
