'use client';

import { JSX, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useDebounce } from '@/hooks/use-debounce';
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
import { Input } from '@/components/ui/input';
import {
  Cpu,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  AlignStartVertical,
  AlignEndVertical,
} from 'lucide-react';
import { Product } from '@/lib/api/services/pc_configuration/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PcConfiguration } from '@/lib/api/services/pc_configuration/pc_configuration';
import { ProductSkeletonCard } from './ProductSkeletonCard';

interface PcComponentModalProps {
  categoryName: string;
  componentDescription: string;
  children: JSX.Element;
  onProductSelect?: (product: Product) => void;
}

function PcComponentModal({
  categoryName,
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
          categoryName={categoryName}
          open={open}
          setOpen={setOpen}
          description={componentDescription}
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
          title={categoryName}
          description={componentDescription}
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

  description,

  TriggerButton,
  onProductSelect,
  categoryName,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;

  description: string;

  TriggerButton: JSX.Element;
  onProductSelect?: (product: Product) => void;
  categoryName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="w-full shadow-2xl sm:max-w-[90vw]">
        <Header title={categoryName} description={description} />
        <ModalBody
          categoryName={categoryName}
          onProductSelect={onProductSelect}
        />
      </DialogContent>
    </Dialog>
  );
}

function MobileDrawer({
  open,
  setOpen,
  title,
  description,

  TriggerButton,
  onProductSelect,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;

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
            <ModalBody categoryName={title} onProductSelect={onProductSelect} />
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
        <span className="text-2xl font-semibold capitalize md:text-3xl">
          {title}
        </span>
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </>
  );
}

function ModalBody({
  onProductSelect,
  categoryName,
}: {
  categoryName: string;

  onProductSelect?: (product: Product) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortOption, setSortOption] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  // Apply debouncing to the frequently changing filter values
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await PcConfiguration.getFilteredProducts({
          category: categoryName,
          search: debouncedSearchQuery,
          min_price: debouncedMinPrice,
          max_price: debouncedMaxPrice,
          sort_by: sortOption,
        });
        console.log('data', data);

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    categoryName,
    debouncedSearchQuery,
    debouncedMinPrice,
    debouncedMaxPrice,
    sortOption,
  ]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 px-4 pt-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-32 pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="group relative flex-1">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              $
            </div>
            <Input
              type="number"
              className="min-w-32 pl-8"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : undefined)
              }
              min="0"
              max={maxPrice || 5000}
            />
          </div>

          <span className="text-muted-foreground">to</span>

          <div className="group relative flex-1">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              $
            </div>
            <Input
              type="number"
              className="min-w-32 pl-8"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
              }
              min={minPrice || 0}
            />
          </div>
        </div>

        {/* Filter and Sort Controls */}

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Components" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">
              <span className="flex items-center gap-2">
                <Cpu className="text-primary h-4 w-4" />
                <span>Featured Components</span>
              </span>
            </SelectItem>
            <SelectItem value="price">
              <span className="flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-green-500" />
                <span>Sort by Price: Low to High</span>
              </span>
            </SelectItem>
            <SelectItem value="-price">
              <span className="flex items-center gap-2">
                <ArrowDownCircle className="h-4 w-4 text-red-500" />
                <span>Sort by Price: High to Low</span>
              </span>
            </SelectItem>
            <SelectItem value="name">
              <span className="flex items-center gap-2">
                <AlignStartVertical className="h-4 w-4 text-blue-500" />
                <span>Sort by Name: A to Z</span>
              </span>
            </SelectItem>
            <SelectItem value="-name">
              <span className="flex items-center gap-2">
                <AlignEndVertical className="h-4 w-4 text-orange-500" />
                <span>Sort by Name: Z to A</span>
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="px-4">
        <p className="text-muted-foreground text-sm">
          {products.length} {products.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {/* Product Grid */}
      <ScrollArea className="rounded-md border sm:h-[calc(100dvh-290px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading ? (
            // Skeleton loading grid
            Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeletonCard key={index} />
            ))
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <ProductItemCard
                key={product.id}
                product={product}
                index={index}
                onClick={() => onProductSelect && onProductSelect(product)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Search className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
            </div>
          )}
        </motion.div>
      </ScrollArea>
    </div>
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
