'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';

// interface ProductOption {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   popular?: boolean;
//   discount?: number;
//   rating?: number;
//   category: string;
// }

export default function WorkspaceConfigurator() {
  //   const [selectedProducts, setSelectedProducts] = useState<
  //     Record<string, ProductOption>
  //   >({
  //     desk: {
  //       id: 'premium-standing-desk',
  //       title: 'Premium Standing Desk',
  //       price: 599,
  //       image: '/placeholder.svg?height=400&width=600',
  //       popular: true,
  //       category: 'desk',
  //     },
  //     chair: {
  //       id: 'ergonomic-chair',
  //       title: 'Ergonomic Chair',
  //       price: 399,
  //       image: '/placeholder.svg?height=400&width=600',
  //       category: 'chair',
  //     },
  //     keyboard: {
  //       id: 'mechanical-keyboard',
  //       title: 'Mechanical Keyboard',
  //       price: 149,
  //       image: '/placeholder.svg?height=400&width=600',
  //       category: 'accessory',
  //     },
  //     mouse: {
  //       id: 'gaming-mouse',
  //       title: 'Gaming Mouse',
  //       price: 79,
  //       image: '/placeholder.svg?height=400&width=600',
  //       category: 'accessory',
  //     },
  //   });

  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   const products = {
  //     desks: [
  //       {
  //         id: 'premium-standing-desk',
  //         title: 'Premium Standing Desk',
  //         price: 599,
  //         image: '/placeholder.svg?height=400&width=600',
  //         popular: true,
  //         rating: 4.9,
  //         category: 'desk',
  //       },
  //       {
  //         id: 'classic-work-desk',
  //         title: 'Classic Work Desk',
  //         price: 299,
  //         image: '/placeholder.svg?height=400&width=600',
  //         rating: 4.7,
  //         category: 'desk',
  //       },
  //       {
  //         id: 'corner-desk',
  //         title: 'L-Shaped Corner Desk',
  //         price: 449,
  //         discount: 50,
  //         image: '/placeholder.svg?height=400&width=600',
  //         rating: 4.6,
  //         category: 'desk',
  //       },
  //     ],
  //     chairs: [
  //       {
  //         id: 'ergonomic-chair',
  //         title: 'Ergonomic Chair',
  //         price: 399,
  //         image: '/placeholder.svg?height=400&width=600',
  //         popular: true,
  //         rating: 4.8,
  //         category: 'chair',
  //       },
  //       {
  //         id: 'gaming-chair',
  //         title: 'Gaming Chair',
  //         price: 299,
  //         image: '/placeholder.svg?height=400&width=600',
  //         rating: 4.6,
  //         category: 'chair',
  //       },
  //       {
  //         id: 'executive-chair',
  //         title: 'Executive Chair',
  //         price: 499,
  //         discount: 100,
  //         image: '/placeholder.svg?height=400&width=600',
  //         rating: 4.7,
  //         category: 'chair',
  //       },
  //     ],
  //   };

  //   const handleSelectProduct = (product: ProductOption) => {
  //     setSelectedProducts((prev) => ({
  //       ...prev,
  //       [product.category === 'desk' ? 'desk' : 'chair']: product,
  //     }));
  //   };

  //   const calculateTotal = () => {
  //     return Object.values(selectedProducts).reduce(
  //       (sum, product) => sum + product.price,
  //       0,
  //     );
  //   };

  //   const renderStars = (rating: number) => {
  //     return Array(5)
  //       .fill(0)
  //       .map((_, i) => (
  //         <Star
  //           key={i}
  //           className={cn(
  //             'h-3 w-3',
  //             i < Math.floor(rating)
  //               ? 'text-yellow-400 fill-yellow-400'
  //               : 'text-gray-300',
  //           )}
  //         />
  //       ));
  //   };

  //   const renderProductCarousel = (
  //     categoryProducts: ProductOption[],
  //     categoryName: string,
  //   ) => {
  //     return (
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5 }}
  //         className="mb-8"
  //       >
  //         <h2 className="text-xl font-bold mb-4">{categoryName} Selection</h2>
  //         <Carousel
  //           opts={{
  //             align: 'start',
  //           }}
  //           className="w-full"
  //         >
  //           <CarouselContent className="-ml-2 md:-ml-4">
  //             {categoryProducts.map((product) => {
  //               const isSelected =
  //                 selectedProducts[product.category === 'desk' ? 'desk' : 'chair']
  //                   ?.id === product.id;

  //               return (
  //                 <CarouselItem
  //                   key={product.id}
  //                   className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
  //                 >
  //                   <motion.div
  //                     whileHover={{ y: -5 }}
  //                     transition={{ type: 'spring', stiffness: 300 }}
  //                   >
  //                     <Card
  //                       className={cn(
  //                         'overflow-hidden transition-all duration-300 cursor-pointer border-2 group',
  //                         isSelected
  //                           ? 'border-primary shadow-lg shadow-primary/20'
  //                           : 'border-border hover:border-primary/50',
  //                       )}
  //                       onClick={() => handleSelectProduct(product)}
  //                     >
  //                       <div className="relative">
  //                         <div className="aspect-video overflow-hidden bg-muted">
  //                           <div
  //                             className={`absolute inset-0 bg-gradient-to-br ${
  //                               product.category === 'desk'
  //                                 ? 'from-violet-500/70 to-purple-700/70'
  //                                 : 'from-emerald-500/70 to-teal-700/70'
  //                             } opacity-80 z-10 transition-opacity group-hover:opacity-60`}
  //                           ></div>
  //                           <Image
  //                             fill
  //                             src={product.image || '/placeholder.svg'}
  //                             alt={product.title}
  //                             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-0"
  //                           />
  //                           <div className="absolute inset-0 bg-black/10 z-20"></div>
  //                           <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-30">
  //                             <div className="flex items-center gap-1 mb-1">
  //                               {mounted &&
  //                                 product.rating &&
  //                                 renderStars(product.rating)}
  //                             </div>
  //                             <h3 className="text-lg font-bold">
  //                               {product.title}
  //                             </h3>
  //                           </div>
  //                         </div>

  //                         {product.popular && (
  //                           <Badge className="absolute top-2 right-2 bg-white text-black font-medium z-30 shadow-lg">
  //                             <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
  //                             Popular
  //                           </Badge>
  //                         )}

  //                         {product.discount && (
  //                           <Badge className="absolute top-2 left-2 bg-red-500 text-white font-medium z-30">
  //                             Save ${product.discount}
  //                           </Badge>
  //                         )}

  //                         {isSelected && (
  //                           <motion.div
  //                             initial={{ scale: 0 }}
  //                             animate={{ scale: 1 }}
  //                             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-primary rounded-full p-2 z-30 shadow-xl"
  //                           >
  //                             <Check className="h-5 w-5" />
  //                           </motion.div>
  //                         )}
  //                       </div>

  //                       <CardContent className="p-3">
  //                         <div className="flex items-center justify-between">
  //                           <div className="text-xl font-bold">
  //                             ${product.price}
  //                           </div>
  //                           <Button
  //                             size="sm"
  //                             variant={isSelected ? 'default' : 'outline'}
  //                             className="group-hover:bg-primary group-hover:text-white transition-colors"
  //                           >
  //                             {isSelected ? 'Selected' : 'Select'}
  //                             <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
  //                           </Button>
  //                         </div>
  //                       </CardContent>
  //                     </Card>
  //                   </motion.div>
  //                 </CarouselItem>
  //               );
  //             })}
  //           </CarouselContent>
  //           <div className="flex items-center justify-end mt-2 gap-2">
  //             <CarouselPrevious className="relative static" />
  //             <CarouselNext className="relative static" />
  //           </div>
  //         </Carousel>
  //       </motion.div>
  //     );
  //   };

  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg border p-6 shadow-sm sticky top-6"
      >
        <h2 className="text-xl font-bold mb-6">Configuration Summary</h2>

        <div className="space-y-4">
          {Object.entries(selectedProducts).map(([key, product]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="font-medium">{product.title}</span>
              <span className="font-bold">${product.price}</span>
            </div>
          ))}

          <Separator className="my-4" />

          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold">${calculateTotal()}</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 group">
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="w-full">
            Request for Assistance
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-slate-600 text-white hover:bg-slate-700"
          >
            Save Configuration
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
