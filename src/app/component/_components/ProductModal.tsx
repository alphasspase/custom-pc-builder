'use client';

import { JSX, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaWhiskeyGlass } from 'react-icons/fa6';
import { ProductCard } from './ProductCard';
import { ProductCarouselProps } from '../types';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

export function ProductModal({
  products,
  title,
  description,
}: ProductCarouselProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const TriggerButton = <Button size="lg">Explore More</Button>;

  // Provide empty array as fallback when products is null
  const safeProducts = products || [];

  return (
    <>
      {isDesktop ? (
        <DesktopModal
          open={open}
          setOpen={setOpen}
          title={title}
          description={description}
          products={safeProducts}
          TriggerButton={TriggerButton}
        />
      ) : (
        <MobileDrawer
          open={open}
          setOpen={setOpen}
          title={title}
          description={description}
          products={safeProducts}
          TriggerButton={TriggerButton}
        />
      )}
    </>
  );
}

function DesktopModal({
  open,
  setOpen,
  title,
  description,
  products,
  TriggerButton,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Setup_Product[];
  TriggerButton: JSX.Element;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="w-full shadow-2xl sm:max-w-[90vw]">
        <Header title={title} description={description} />
        <ModalBody products={products} />
      </DialogContent>
    </Dialog>
  );
}

function MobileDrawer({
  open,
  setOpen,
  title,
  description,
  products,
  TriggerButton,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Setup_Product[];
  TriggerButton: JSX.Element;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="border-t-primary-200">
        <DrawerHeader className="text-left">
          <Header title={title} description={description} />
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ScrollArea className="h-[calc(100dvh-300px)] rounded-md border">
            <ModalBody products={products} />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <DialogTitle className="text-primary flex items-center gap-2">
        <FaWhiskeyGlass size={30} className="text-primary" />
        <span className="text-2xl font-semibold md:text-3xl">{title}</span>
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </>
  );
}

function ModalBody({ products }: { products: Setup_Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <ScrollArea className="rounded-md border sm:h-[calc(100dvh-170px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="grid grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProduct === product.id}
            onSelect={setSelectedProduct}
            mounted={true}
            index={index}
          />
        ))}
      </motion.div>
    </ScrollArea>
  );
}
