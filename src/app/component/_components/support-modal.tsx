'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RiUserVoiceFill } from 'react-icons/ri';
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
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function SupportModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <HelpCircle className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Request for Assistance
        </DialogTrigger>

        <DialogContent className="shadow-lg sm:max-w-[425px]">
          <DialogTitle className="text-primary flex items-center gap-2">
            <RiUserVoiceFill size={25} />
            <h4>Need Professional Assistance</h4>
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to get help from our team.
          </DialogDescription>
          <ModalContent setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <HelpCircle className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Request for Assistancee
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-t-primary-200">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-primary flex items-center">
            <RiUserVoiceFill size={25} />
            <h4>Need Proffesional Assistance</h4>
          </DrawerTitle>
          <DrawerDescription>
            Fill out the form below to get help from our team.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ModalContent setOpen={setOpen} drawer />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ModalContentProps {
  setOpen: (open: boolean) => void;
  drawer?: boolean;
}

function ModalContent({ setOpen, drawer = false }: ModalContentProps) {
  const CloseButton = drawer ? DrawerClose : DialogClose;

  const feedbackOptions = [
    { id: 'clarity', label: 'Lack of clarity' },
    { id: 'helpful', label: 'This is not helpful' },
    { id: 'unsafe', label: 'This is not safe' },
  ];

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="email">Your Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
          <Label htmlFor="feedback">
            What would the ideal answer have been?
          </Label>
          <Textarea
            id="feedback"
            placeholder="Please describe what you're looking for..."
            className="min-h-24"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-3"
        >
          {feedbackOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <Checkbox id={option.id} />
              <Label htmlFor={option.id} className="text-sm text-gray-600">
                {option.label}
              </Label>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-end space-x-2 pt-2"
        >
          <CloseButton asChild>
            <Button
              variant="outline"
              // className="text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              Cancel
            </Button>
          </CloseButton>
          <Button
            type="submit"
            className="group"
            // className="group from-primary-600 hover:from-primary-700 relative overflow-hidden bg-gradient-to-r to-violet-600 transition-all duration-300 hover:to-violet-700"
            onClick={() => setOpen(false)}
          >
            Create
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </form>
    </>
  );
}
