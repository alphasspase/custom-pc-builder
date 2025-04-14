import { CartItemType } from './type';

export const cardsData: CartItemType[] = [
  {
    id: 1,
    name: 'AMD Ryzen 9 5950X',
    description: '16-Core, 32-Thread Processor',
    price: 699.99,
    quantity: 1,
    image: '/graphic-card/graphic-card.jpg',
  },
  {
    id: 2,
    name: 'NVIDIA RTX 4080',
    description: '16GB GDDR6X Graphics Card',
    price: 1199.99,
    quantity: 1,
    image: '/graphic-card/graphic-card2.jpg',
  },
];

export const cardsPcConfigData: CartItemType[] = [
  {
    id: 1,
    name: 'ErgoPro Gaming Desk',
    description: 'Adjustable height, ergonomic desk for gaming or office use',
    price: 299.99,
    quantity: 1,
    image: '/desk/desk.webp',
  },
  {
    id: 2,
    name: 'Mesh Office Chair',
    description:
      'Ergonomic chair with adjustable lumbar support and breathable mesh',
    price: 199.99,
    quantity: 1,
    image: '/chairs/chair.jpg',
  },
  {
    id: 3,
    name: 'LED Monitor Stand',
    description:
      'Adjustable stand with built-in USB ports for monitors up to 32 inches',
    price: 59.99,
    quantity: 1,
    image: '/desk/desk4.webp',
  },
  {
    id: 4,
    name: 'Wireless Keyboard and Mouse Combo',
    description:
      'Compact wireless keyboard and mouse with quiet mechanical keys',
    price: 79.99,
    quantity: 1,
    image: '/peripherals/keyboard.jpg',
  },
  {
    id: 5,
    name: 'Gaming Mouse Pad',
    description:
      'Large, non-slip mouse pad designed for precise gaming movements',
    price: 24.99,
    quantity: 1,
    image: '/peripherals/remote.jpg',
  },
];
