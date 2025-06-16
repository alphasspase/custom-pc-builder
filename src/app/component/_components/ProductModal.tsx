// filepath: /Users/avialdosolutions/Desktop/custom-pc-builder/src/app/component/_components/ProductModal.tsx
'use client';

import { JSX, useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SetupConfiguration } from '@/lib/api/services/setup_configuration/setup_configuration';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePCBuilder } from '@/hooks/usePCBuilder';
import {
  Search,
  Cpu,
  ArrowUpCircle,
  ArrowDownCircle,
  AlignStartVertical,
  AlignEndVertical,
  Check,
} from 'lucide-react';
import { ProductCard } from './ProductCard';

import {
  Setup_Product,
  SetupCategoryWithProducts,
} from '@/lib/api/services/setup_configuration/type';

function ProductSkeleton() {
  return <div className="h-[300px] animate-pulse rounded-lg bg-gray-200 p-4" />;
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
  products: initialProducts,
  category,
  setOpen,
}: {
  products: Setup_Product[];
  category?: number;
  setOpen: (open: boolean) => void;
}) {
  const PAGE_SIZE = 9; // Define a constant for page size
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>('featured');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Setup_Product[]>(initialProducts);
  const [totalCount, setTotalCount] = useState(initialProducts.length);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { addProduct } = usePCBuilder();

  // Remove useCallback for fetchFilteredProducts
  // Define fetchFilteredProducts as a regular function with correct formatting
  async function fetchFilteredProducts(
    pageNumber: number,
    isNewSearch = false,
  ) {
    setLoading(true);
    try {
      const response = await SetupConfiguration.getSetupProductByFilters({
        category: category,
        search: searchQuery,
        sort_by: sortOption,
        min_price: minPrice,
        max_price: maxPrice,
        page: pageNumber,
        page_size: PAGE_SIZE, // Use the constant instead of hardcoded value
      });
      console.log('API response:', response);

      if (isNewSearch) {
        setFilteredProducts(response.results);
      } else {
        setFilteredProducts((prev) => [...prev, ...response.results]);
      }

      setTotalCount(response.count);
      setHasMore(!!response.next);

      return response;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      if (isNewSearch) {
        setFilteredProducts(initialProducts);
        setTotalCount(initialProducts.length);
        setHasMore(false);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Define loadMore as a regular function
  function loadMore() {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFilteredProducts(nextPage, false).finally(() => {
      setLoading(false);
    });
  }

  // Fix useEffect dependencies to avoid double call
  useEffect(() => {
    setPage(1);
    fetchFilteredProducts(1, true).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, minPrice, maxPrice, sortOption, category]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 px-4 pt-4 md:flex-row md:items-center md:justify-between">
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
              value={minPrice ?? ''}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : undefined)
              }
              min={0}
              max={maxPrice}
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
              value={maxPrice ?? ''}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
              }
              min={minPrice}
            />
          </div>
        </div>

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
                <span>Price: Low to High</span>
              </span>
            </SelectItem>
            <SelectItem value="-price">
              <span className="flex items-center gap-2">
                <ArrowDownCircle className="h-4 w-4 text-red-500" />
                <span>Price: High to Low</span>
              </span>
            </SelectItem>
            <SelectItem value="name">
              <span className="flex items-center gap-2">
                <AlignStartVertical className="h-4 w-4 text-blue-500" />
                <span>Name: A to Z</span>
              </span>
            </SelectItem>
            <SelectItem value="-name">
              <span className="flex items-center gap-2">
                <AlignEndVertical className="h-4 w-4 text-orange-500" />
                <span>Name: Z to A</span>
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end justify-between px-4">
        <p className="text-muted-foreground text-sm">
          {totalCount} {totalCount === 1 ? 'result' : 'results'} found
        </p>
        <motion.div
          animate={
            selectedProduct
              ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 rgba(34, 197, 94, 0)',
                    '0 0 10px rgba(34, 197, 94, 0.7)',
                    '0 0 0 rgba(34, 197, 94, 0)',
                  ],
                }
              : {}
          }
          transition={{
            repeat: selectedProduct ? Infinity : 0,
            duration: 1.5,
            repeatDelay: 0.5,
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-6 text-base ${
              selectedProduct ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
            size="lg"
          >
            {selectedProduct ? (
              <>
                Done
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              </>
            ) : (
              'Done'
            )}
          </Button>
        </motion.div>
      </div>

      <ScrollArea
        className="rounded-md border sm:h-[calc(100dvh-270px)]"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={filteredProducts.length}
          next={loadMore}
          hasMore={hasMore}
          height="calc(100dvh - 270px)"
          loader={
            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={`loading-${index}`} />
              ))}
            </div>
          }
          scrollThreshold={0.7}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-muted-foreground mt-4 mb-2 text-center">
              {filteredProducts.length > 0 && "You've seen all products"}
            </p>
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {loading && page === 1 ? (
              Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id.toString()}
                  onSelect={(id) => {
                    setSelectedProduct(id);
                    // Find the selected product and add it to the configuration
                    const productToAdd = filteredProducts.find(
                      (p) => p.id.toString() === id,
                    );
                    if (productToAdd) {
                      // Convert Setup_Product to Product type required by usePCBuilder
                      addProduct({
                        id: productToAdd.id,
                        name: productToAdd.name,
                        description: productToAdd.description,
                        price: productToAdd.price,
                        category: productToAdd.category_name || 'component',
                        stock: productToAdd.stock || 1,
                        image: productToAdd.image,
                      });
                    }
                  }}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Search className="text-muted-foreground h-8 w-8" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
          </motion.div>
        </InfiniteScroll>
      </ScrollArea>
    </div>
  );
}

function DesktopModal({
  open,
  setOpen,
  title,
  description,
  products,
  category,
  TriggerButton,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Setup_Product[];
  category?: number;
  TriggerButton: JSX.Element;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="w-full shadow-2xl sm:max-w-[90vw]">
        <Header title={title} description={description} />
        <ModalBody products={products} category={category} setOpen={setOpen} />
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
  category,
  TriggerButton,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Setup_Product[];
  category?: number;
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
          <ScrollArea
            className="h-[calc(100dvh-300px)] rounded-md border"
            id="mobileScrollableDiv"
          >
            <ModalBody
              products={products}
              category={category}
              setOpen={setOpen}
            />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function ProductModal({
  products,
  title,
  description,
  id,
}: SetupCategoryWithProducts) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const TriggerButton = <Button size="lg">Explore More</Button>;

  return (
    <>
      {isDesktop ? (
        <DesktopModal
          open={open}
          setOpen={setOpen}
          title={title}
          description={description}
          products={products}
          category={id}
          TriggerButton={TriggerButton}
        />
      ) : (
        <MobileDrawer
          open={open}
          setOpen={setOpen}
          title={title}
          description={description}
          products={products}
          category={id}
          TriggerButton={TriggerButton}
        />
      )}
    </>
  );
}
