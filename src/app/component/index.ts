// The product list is defined here so you can later swap it with API data without a fuss.
export const products: ProductOption[] = [
  {
    id: 'standing-desk',
    title: 'Premium Standing Desk',
    description: 'Adjustable height with memory settings and premium materials',
    price: 599,
    discount: 100,
    rating: 4.9,
    image: '/desk/desk.webp',
    popular: true,
    color: '',
    features: [
      'Electric height adjustment',
      'Memory settings for quick adjustments',
      'Premium wood finish options',
      'Cable management system',
      '10-year warranty',
    ],
  },
  {
    id: 'classic-desk',
    title: 'Classic Work Desk',
    description: 'Sturdy construction with elegant design for your workspace',
    price: 299,
    rating: 4.7,
    image: '/desk/desk1.webp',
    color: 'from-emerald-500 to-teal-700',
    features: [
      'Solid wood construction',
      'Spacious work surface',
      'Built-in drawer storage',
      'Easy assembly',
      '5-year warranty',
    ],
  },
  {
    id: 'corner-desk',
    title: 'L-Shaped Corner Desk',
    description: 'Maximize your space with this ergonomic corner design',
    price: 449,
    rating: 4.6,
    image: '/desk/desk2.webp',
    color: 'from-amber-500 to-orange-700',
    // icon: <Star className="h-5 w-5" />,
    features: [
      'L-shaped design for corner spaces',
      'Dual work surfaces',
      'Integrated bookshelf',
      'Modular configuration',
      '7-year warranty',
    ],
  },
  {
    id: 'gaming-desk',
    title: 'Pro Gaming Desk',
    description: 'Designed for gamers with RGB lighting and cable management',
    price: 499,
    discount: 50,
    rating: 4.8,
    image: '/desk/desk3.webp',
    color: 'from-cyan-500 to-blue-700',
    features: [
      'RGB lighting system',
      'Headphone hooks',
      'Cup holder',
      'Cable management grommets',
      'Controller stands',
    ],
  },
  {
    id: 'minimalist-desk',
    title: 'Minimalist Desk',
    description: 'Clean, simple design for a distraction-free workspace',
    price: 249,
    rating: 4.5,
    image: '/desk/desk4.webp',
    color: 'from-rose-500 to-pink-700',
    features: [
      'Sleek, minimal design',
      'Hidden cable management',
      'Compact footprint',
      'Eco-friendly materials',
      'Easy to clean surface',
    ],
  },
];

export const chair_products: ProductOption[] = [
  {
    id: 'ergonomic-chair',
    title: 'Ergonomic Chair',
    description:
      'A supportive office chair engineered to reduce back pain and enhance posture.',
    price: 399,
    image: '/chairs/chair.jpg',
    popular: true,
    discount: 10,
    rating: 4.7,
    features: [
      'Adjustable lumbar support',
      'Breathable mesh backrest',
      '360-degree swivel',
    ],
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'gaming-chair',
    title: 'Gaming Chair',
    description:
      'Amp up your play sessions with an ultra-comfortable, fully adjustable gaming chair.',
    price: 299,
    image: '/chairs/chair4.jpg',
    popular: false,
    discount: 20,
    rating: 4.5,
    features: [
      'Reclining backrest',
      'Padded armrests',
      'Built-in lumbar cushion',
    ],
    color: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'executive-chair',
    title: 'Executive Chair',
    description:
      'Luxurious design ideal for boardrooms and home offices that demand a premium look.',
    price: 549,
    image: '/chairs/chair1.jpg',
    popular: true,
    discount: 50,
    rating: 4.8,
    features: [
      'Top-grain leather',
      'Synchro-tilt mechanism',
      'Heavy-duty casters',
    ],
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'mesh-chair',
    title: 'Mesh Office Chair',
    description:
      'Cool and comfortable seating thanks to breathable mesh and flexible support.',
    price: 199,
    image: '/chairs/chair2.jpg',
    popular: false,
    discount: 30,
    rating: 4.3,
    features: [
      'Fully ventilated back',
      'Height-adjustable seat',
      'Simple assembly',
    ],
    color: 'from-amber-500 to-orange-700',
  },
  {
    id: 'task-chair',
    title: 'Task Chair',
    description:
      'Streamlined design perfect for daily office tasks and tight workspaces.',
    price: 149,
    image: '/chairs/chair3.jpg',
    popular: false,
    discount: 30,
    rating: 4.0,
    features: [
      'Pneumatic seat-height adjustment',
      '360-degree swivel',
      'Sturdy nylon base',
    ],
    color: 'from-rose-500 to-pink-700',
  },
  {
    id: 'lounge-chair',
    title: 'Lounge Chair',
    description:
      'A cozy lounge chair that doubles as stylish accent seating for your office.',
    price: 279,
    image: '/chairs/chair5.jpg',
    popular: true,
    discount: 30,
    rating: 4.6,
    features: [
      'Wide, padded seat',
      'Ergonomic armrests',
      'Modern, minimalist silhouette',
    ],
    color: 'from-indigo-500 to-purple-700',
  },
];

interface ProductOption {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  discount?: number;
  rating?: number;
  features: string[];
  color: string;
}

export const peripheralProducts: ProductOption[] = [
  {
    id: 'mechanical-keyboard',
    title: 'Mechanical Keyboard',
    description:
      'Tactile and responsive keys designed for faster typing and enhanced gaming.',
    price: 149,
    image: '/peripherals/keyboard.jpg',
    popular: true,
    discount: 10,
    rating: 4.8,
    features: [
      'Hot-swappable switches',
      'RGB backlighting',
      'Programmable macro keys',
    ],
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'gaming-mouse',
    title: 'Gaming Mouse',
    description:
      'Precision tracking and high DPI for a competitive edge in intense gaming sessions.',
    price: 79,
    image: '/peripherals/mouse.jpg',
    popular: false,
    discount: 40,
    rating: 4.5,
    features: [
      'Adjustable DPI settings',
      'Ergonomic grip',
      'Customizable side buttons',
    ],
    color: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'wireless-headphones',
    title: 'Wireless Headphones',
    description:
      'Block out distractions with noise-canceling tech and crisp audio for both work and gaming.',
    price: 199,
    image: '/peripherals/headset.jpg',
    popular: true,
    discount: 20,
    rating: 4.7,
    features: [
      'Active noise cancellation',
      'Up to 20-hour battery life',
      'Foldable design',
    ],
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 'usb-hub',
    title: 'USB Hub',
    description:
      'Expand your workstation with extra USB ports for seamless charging and data transfer.',
    price: 29,
    image: '/peripherals/usb.jpg',
    popular: false,

    rating: 4.2,
    features: [
      '4 USB 3.0 ports',
      'LED status indicator',
      'Over-voltage protection',
    ],
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'gaming-headset',
    title: 'Gaming Headset',
    description:
      'Immerse yourself in surround sound and communicate clearly with a noise-canceling mic.',
    price: 99,
    image: '/peripherals/mouse1.jpg',
    popular: false,
    discount: 10,
    rating: 4.4,
    features: [
      '7.1 surround sound',
      'Noise-cancelling microphone',
      'Comfortable ear cushions',
    ],
    color: 'from-purple-500 to-violet-700',
  },
  {
    id: 'extended-mousepad',
    title: 'Extended Mouse Pad',
    description:
      'A smooth, low-friction surface offering ample space for fluid mouse movements.',
    price: 29,
    image: '/peripherals/mousepad.jpg',
    popular: false,
    discount: 20,
    rating: 4.2,
    features: [
      'Water-resistant surface',
      'Anti-fray stitching',
      'Full desk coverage',
    ],
    color: 'from-pink-500 to-rose-700',
  },
  {
    id: 'laptop-cooling-stand',
    title: 'Laptop Cooling Stand',
    description:
      'Reduce overheating with dual high-speed fans and adjustable angles for ergonomic comfort.',
    price: 49,
    image: '/peripherals/keyboard1.jpg',
    popular: false,
    discount: 60,
    rating: 4.3,
    features: ['Dual cooling fans', '4-level height adjustment', 'USB-powered'],
    color: 'from-indigo-500 to-blue-700',
  },
];
