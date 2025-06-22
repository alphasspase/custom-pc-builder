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
import { Loader2, Save, Check, AlertCircle, Copy } from 'lucide-react';
import { FaQrcode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePCBuilderStore } from '@/lib/store/checkout';
import { PcConfiguration } from '@/lib/api/services/pc_configuration/pc_configuration';
import { SavePcConfigurationResponse } from '@/lib/api/services/pc_configuration/type';
import { toast } from 'sonner';

export function QrCodeModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configName, setConfigName] = useState('');
  const [configDescription, setConfigDescription] = useState('');
  const [savedConfig, setSavedConfig] =
    useState<SavePcConfigurationResponse | null>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Get selected products from store
  const { selectedProducts, selectedSetupProducts, total } =
    usePCBuilderStore();

  const handleSaveConfiguration = async () => {
    try {
      // Check if there are any selected components
      const componentIds = selectedProducts.map((product) => product.id);
      const setupProductIds = selectedSetupProducts.map(
        (product) => product.id,
      );

      if (componentIds.length === 0 && setupProductIds.length === 0) {
        toast.error('No components selected', {
          description: 'Please select at least one component before saving.',
          icon: <AlertCircle size={18} />,
        });

        return;
      }

      // Check if configuration name is provided
      if (!configName.trim()) {
        toast.error('Configuration name required', {
          description: 'Please provide a name for your configuration.',
          icon: <AlertCircle size={18} />,
        });

        return;
      }

      setLoading(true);

      const response = await PcConfiguration.savePcConfiguration({
        name: configName,
        description: configDescription || 'Custom PC Configuration',
        total_price: total.toString(),
        is_preset: false,
        component_ids: componentIds,
        setup_product_ids: setupProductIds,
      });

      setSavedConfig(response);

      toast.success('Configuration Saved', {
        description:
          response.message || 'Your configuration has been saved successfully!',
        icon: <Check size={18} />,
      });
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast.error('Save Failed', {
        description: 'Failed to save your configuration. Please try again.',
        icon: <AlertCircle size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (savedConfig?.url) {
      navigator.clipboard.writeText(savedConfig.url);
      toast.success('Link Copied', {
        description: 'Configuration link copied to clipboard!',
        icon: <Copy size={18} />,
      });
    }
  };

  const TriggerButton = (
    <Button
      variant="secondary"
      className="group w-full"
      onClick={() => {
        setConfigName('');
        setConfigDescription('');
        setSavedConfig(null);
      }}
    >
      <Save className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      Save Configuration
    </Button>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="shadow-2xl sm:max-w-[500px]">
        <Header savedConfig={savedConfig} />
        <ModalBody
          setOpen={setOpen}
          loading={loading}
          configName={configName}
          configDescription={configDescription}
          setConfigName={setConfigName}
          setConfigDescription={setConfigDescription}
          handleSaveConfiguration={handleSaveConfiguration}
          handleCopyLink={handleCopyLink}
          savedConfig={savedConfig}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="border-t-primary-200">
        <DrawerHeader className="text-left">
          <Header savedConfig={savedConfig} />
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ScrollArea className="h-[calc(100dvh-300px)] rounded-md border">
            <ModalBody
              setOpen={setOpen}
              drawer
              loading={loading}
              configName={configName}
              configDescription={configDescription}
              setConfigName={setConfigName}
              setConfigDescription={setConfigDescription}
              handleSaveConfiguration={handleSaveConfiguration}
              handleCopyLink={handleCopyLink}
              savedConfig={savedConfig}
            />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Header({
  savedConfig,
}: {
  savedConfig?: SavePcConfigurationResponse | null;
}) {
  return (
    <>
      <DialogTitle className="text-primary flex items-center gap-2">
        <FaQrcode size={30} className="text-primary" />
        <span className="text-2xl font-semibold md:text-3xl">
          {savedConfig ? 'Configuration Saved' : 'Save Configuration'}
        </span>
      </DialogTitle>
      <DialogDescription>
        {savedConfig
          ? 'Your PC configuration has been saved. Share it using the QR code or link below.'
          : 'Save your custom PC configuration to share with others or access it later.'}
      </DialogDescription>
    </>
  );
}

interface ModalContentProps {
  setOpen: (open: boolean) => void;
  drawer?: boolean;
  loading?: boolean;
  configName: string;
  configDescription: string;
  setConfigName: (name: string) => void;
  setConfigDescription: (desc: string) => void;
  handleSaveConfiguration: () => Promise<void>;
  handleCopyLink: () => void;
  savedConfig: SavePcConfigurationResponse | null;
}

function ModalBody({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpen,
  drawer = false,
  loading = false,
  configName,
  configDescription,
  setConfigName,
  setConfigDescription,
  handleSaveConfiguration,
  handleCopyLink,
  savedConfig,
}: ModalContentProps) {
  const Close = drawer ? DrawerClose : DialogClose;

  return (
    <div className="space-y-6">
      {savedConfig ? (
        <>
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
              <span className="text-muted-foreground text-sm">Config ID</span>
              <h6 className="text-lg font-semibold">#{savedConfig.id}</h6>
            </AspectRatio>
            <AspectRatio
              ratio={1 / 1}
              className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-white"
            >
              {savedConfig.qr_code ? (
                <Image
                  src={savedConfig.qr_code}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="h-full w-full rounded-md object-contain p-2"
                />
              ) : (
                <span className="text-muted-foreground text-sm">
                  QR Code not available
                </span>
              )}
            </AspectRatio>
          </motion.div>

          <div className="flex items-center justify-center gap-2 overflow-hidden">
            <Separator className="w-1/5" />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator className="w-1/5" />
          </div>

          <div className="flex justify-center">
            <Button size="sm" onClick={handleCopyLink} className="gap-2">
              <Copy size={16} />
              Copy Link
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="config-name">Configuration Name *</Label>
            <Input
              id="config-name"
              placeholder="My Dream PC"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="config-description">Description (Optional)</Label>
            <Input
              id="config-description"
              placeholder="A brief description of your configuration"
              value={configDescription}
              onChange={(e) => setConfigDescription(e.target.value)}
            />
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleSaveConfiguration}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save and Generate QR Code
          </Button>
        </div>
      )}

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
