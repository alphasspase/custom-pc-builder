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
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Cpu, Search, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/lib/api/services/pc_configuration/type';

interface PcComponentModalProps {
  products: Product[];
  componentName: string;
  componentDescription: string;
  children: JSX.Element;
  onProductSelect?: (product: Product) => void;
}

function PcComponentModal({
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
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Apply filters and sorting to products
  const filteredProducts = products
    .filter((product) => {
      // Search query filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
      const maxPriceValue = maxPrice ? parseFloat(maxPrice) : Infinity;
      const productPrice = parseFloat(product.price);
      const matchesPrice =
        productPrice >= minPriceValue && productPrice <= maxPriceValue;

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      // Sort products based on selected option
      switch (sortOption) {
        case 'priceAsc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'priceDesc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        default:
          return 0; // Featured/default sorting
      }
    });

  const handleToggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const hasActiveFilters = !!(
    minPrice ||
    maxPrice ||
    selectedCategories.length
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 px-4 pt-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-input bg-background focus-visible:ring-ring placeholder:text-muted-foreground w-full rounded-md border py-2 pr-4 pl-10 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterVisible(!filterVisible)}
            className="flex items-center gap-1"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground ml-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                !
              </span>
            )}
          </Button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border-input bg-background focus-visible:ring-ring h-9 rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {filterVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-card/95 sticky top-0 z-10 border-t border-b px-4 py-4 shadow-md backdrop-blur-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Price Range</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-background rounded border px-2 py-1 text-xs font-medium">
                    ${minPrice || '0'}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className="bg-background rounded border px-2 py-1 text-xs font-medium">
                    ${maxPrice || 'Max'}
                  </span>
                </div>
              </div>
              <Slider
                defaultValue={[0, 100]}
                min={0}
                max={5000}
                step={50}
                value={[
                  minPrice ? parseInt(minPrice) : 0,
                  maxPrice ? parseInt(maxPrice) : 5000,
                ]}
                onValueChange={(values) => {
                  setMinPrice(values[0].toString());
                  setMaxPrice(values[1].toString());
                }}
                className="mt-6"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Categories</h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleToggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setMinPrice('');
                setMaxPrice('');
                setSelectedCategories([]);
                setSortOption('featured');
              }}
            >
              Reset All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setFilterVisible(false)}
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      <div className="px-4">
        <p className="text-muted-foreground text-sm">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'result' : 'results'} found
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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
