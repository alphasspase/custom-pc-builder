export interface ProductOption {
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
  //   icon: React.ReactNode;
}
