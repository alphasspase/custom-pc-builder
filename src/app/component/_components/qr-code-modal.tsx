'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { FaQrcode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

export function QrCodeModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const TriggerButton = (
    <Button variant="secondary" className="group w-full">
      <Save className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      Save Configuration
    </Button>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="shadow-2xl sm:max-w-[500px]">
        <Header />
        <ModalBody setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="border-t-primary-200">
        <DrawerHeader className="text-left">
          <Header />
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ScrollArea className="h-[calc(100dvh-300px)] rounded-md border">
            <ModalBody setOpen={setOpen} drawer />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Header() {
  return (
    <>
      <DialogTitle className="text-primary flex items-center gap-2">
        <FaQrcode size={30} className="text-primary" />
        <span className="text-2xl font-semibold md:text-3xl">
          Configuration Saved
        </span>
      </DialogTitle>
      <DialogDescription>
        Easy and delicious cooking instructions right here. Start exploring now!
      </DialogDescription>
    </>
  );
}

interface ModalContentProps {
  setOpen: (open: boolean) => void;
  drawer?: boolean;
}

function ModalBody({ drawer = false }: ModalContentProps) {
  const Close = drawer ? DrawerClose : DialogClose;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-muted grid grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2"
      >
        <AspectRatio
          ratio={1 / 1}
          className="border-primary flex flex-col items-center justify-center rounded-md border border-dashed bg-white shadow-inner"
        >
          <span className="text-muted-foreground text-sm">QR Code</span>
          <h6 className="text-lg font-semibold">MRCE-934912</h6>
        </AspectRatio>
        <AspectRatio
          ratio={1 / 1}
          className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-white"
        >
          <Image
            src={'/trash/qr-code.png'}
            alt="QR Code"
            fill
            className="h-full w-full rounded-md object-cover p-5"
          />
          <span className="text-muted-foreground text-sm">Preview</span>
        </AspectRatio>
      </motion.div>

      <div className="flex items-center justify-center gap-2 overflow-hidden">
        <Separator className="w-1/5" />
        <span className="text-muted-foreground text-sm">OR</span>
        <Separator className="w-1/5" />
      </div>

      <div className="flex justify-center">
        <Button size="sm">Copy Link</Button>
      </div>

      <div className="flex justify-end">
        <Close asChild>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            Close
          </Button>
        </Close>
      </div>
    </div>
  );
}
