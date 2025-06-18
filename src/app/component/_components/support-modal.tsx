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
import { AssistanceService } from '@/lib/api/services/assistance/assistance';
import { AssistanceRequestPayload } from '@/lib/api/services/assistance/type';

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
          </Button>
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
          Request for Assistance
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-t-primary-200">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-primary flex items-center">
            <RiUserVoiceFill size={25} />
            <h4>Need Professional Assistance</h4>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    subject: 'PC Builder Assistance Request',
    description: '',
    lack_of_clarity: false,
    this_is_not_helpful: false,
    this_is_not_safe: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const feedbackOptions = [
    { id: 'lack_of_clarity', label: 'Lack of clarity' },
    { id: 'this_is_not_helpful', label: 'This is not helpful' },
    { id: 'this_is_not_safe', label: 'This is not safe' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({});

    try {
      const payload: AssistanceRequestPayload = {
        email: formData.email,
        message: formData.message,
        subject: formData.subject,
        description: formData.description || formData.message,
        lack_of_clarity: formData.lack_of_clarity,
        this_is_not_helpful: formData.this_is_not_helpful,
        this_is_not_safe: formData.this_is_not_safe,
      };

      const response = await AssistanceService.submitRequest(payload);
      setSubmissionStatus({
        success: true,
        message:
          response.message || 'Your request has been submitted successfully.',
      });

      // Close modal after successful submission with a short delay
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to submit assistance request:', error);
      setSubmissionStatus({
        success: false,
        message: 'Failed to submit your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
          <Label htmlFor="message">How can we assist you?</Label>
          <Textarea
            id="message"
            placeholder="Please describe what you're looking for..."
            className="min-h-24"
            value={formData.message}
            onChange={handleInputChange}
            required
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
              <Checkbox
                id={option.id}
                checked={
                  formData[option.id as keyof typeof formData] as boolean
                }
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.id, checked === true)
                }
              />
              <Label htmlFor={option.id} className="text-sm text-gray-600">
                {option.label}
              </Label>
            </motion.div>
          ))}
        </motion.div>

        {submissionStatus.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded p-2 text-sm ${
              submissionStatus.success
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {submissionStatus.message}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-end space-x-2 pt-2"
        >
          <CloseButton asChild>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancel
            </Button>
          </CloseButton>
          <Button type="submit" className="group" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
            {!isSubmitting && (
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Button>
        </motion.div>
      </form>
    </>
  );
}
