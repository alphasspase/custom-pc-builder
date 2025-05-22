import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getBaseUrl } from '@/utils/env';
import { Product } from '@/services/pc_configuration/type';
import { Check } from 'lucide-react';

interface BuildPCProductoptionCardProps {
  option: Product;
  isSelected: boolean;
  onSelect: (option: Product) => void;
}

export function BuildPCProductoptionCard({
  option,
  isSelected,
  onSelect,
}: BuildPCProductoptionCardProps) {
  return (
    <motion.div
      key={option.id}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(option)}
      className={cn(
        'relative flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all',
        isSelected
          ? 'bg-primary/10 border-primary border-2 shadow-[0_0_10px_rgba(79,70,229,0.2)]'
          : 'border-2 border-gray-200 bg-white hover:border-gray-300',
      )}
    >
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-md bg-white">
        <Image
          src={
            option.image ? `${getBaseUrl()}${option.image}` : '/placeholder.svg'
          }
          alt={option.name}
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
      <p className="text-center text-sm font-medium">{option.name}</p>
      <p className="text-sm font-bold">{option.price} €</p>
      {isSelected && (
        <motion.div
          className="bg-primary absolute top-2 left-2 rounded-full p-1 text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          <Check size={14} />
        </motion.div>
      )}
    </motion.div>
  );
}
