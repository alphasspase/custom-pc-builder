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
import { Cpu } from 'lucide-react';
import { Product } from '@/lib/api/services/pc_configuration/type';

interface PcComponentModalProps {
  products: Product[];
  componentName: string;
  componentDescription: string;
  children: JSX.Element;
  onProductSelect?: (product: Product) => void;
}

export function PcComponentModal({
  products,
  componentName,
  componentDescription,
  children,
  onProductSelect,
}: PcComponentModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <DesktopModal
          open={open}
          setOpen={setOpen}
          title={componentName}
          description={componentDescription}
          products={products}
          TriggerButton={children}
          onProductSelect={(product) => {
            if (onProductSelect) {
              onProductSelect(product);
            }
            setOpen(false);
          }}
        />
      ) : (
        <MobileDrawer
          open={open}
          setOpen={setOpen}
          title={componentName}
          description={componentDescription}
          products={products}
          TriggerButton={children}
          onProductSelect={(product) => {
            if (onProductSelect) {
              onProductSelect(product);
            }
            setOpen(false);
          }}
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
  onProductSelect,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Product[];
  TriggerButton: JSX.Element;
  onProductSelect?: (product: Product) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="w-full shadow-2xl sm:max-w-[90vw]">
        <Header title={title} description={description} />
        <ModalBody products={products} onProductSelect={onProductSelect} />
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
  onProductSelect,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Product[];
  TriggerButton: JSX.Element;
  onProductSelect?: (product: Product) => void;
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
            <ModalBody products={products} onProductSelect={onProductSelect} />
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
        <Cpu size={30} className="text-primary" />
        <span className="text-2xl font-semibold md:text-3xl">{title}</span>
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </>
  );
}

function ModalBody({
  products,
  onProductSelect,
}: {
  products: Product[];
  onProductSelect?: (product: Product) => void;
}) {
  return (
    <ScrollArea className="rounded-md border sm:h-[calc(100dvh-170px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="grid grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, index) => (
          <ProductItemCard
            key={product.id}
            product={product}
            index={index}
            onClick={() => onProductSelect && onProductSelect(product)}
          />
        ))}
      </motion.div>
    </ScrollArea>
  );
}

function ProductItemCard({
  product,
  index,
  onClick,
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.05 + 0.1 },
      }}
      whileHover={{
        y: -4,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      className="bg-card text-card-foreground flex cursor-pointer flex-col rounded-xl border p-4 shadow-sm transition-all"
      onClick={onClick}
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {product.image ? (
          <div className="h-full w-full">
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat transition-all hover:scale-105"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <Cpu className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-semibold">{product.name}</h3>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {product.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Select
        </Button>
      </div>
    </motion.div>
  );
}

export default PcComponentModal;
