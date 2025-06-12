import { JSX } from 'react';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

export interface ProductSectionData {
  title: string;
  description: string;
  category?: number;
  products: Setup_Product[];
}

export interface ProductCarouselProps {
  title: string;
  description: string;
  products: Setup_Product[] | null;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  category?: number;
}

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  products: Setup_Product[];
  category?: number;
  TriggerButton: JSX.Element;
}

export interface ProductOption {
  id: number;
  name: string;
  title?: string; // For backwards compatibility
  description: string;
  price: string;
  image: string | null;
  category_name: string;
  discount: string;
  most_popular: boolean;
  stock: number;
  color?: string;
  features?: string[];
  rating?: number;
  created: string;
  updated: string;
}
