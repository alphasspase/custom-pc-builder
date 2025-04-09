import { icons } from 'lucide-react';

// The props of Lucide icons are inferred to be SVG props (SVGProps<SVGSVGElement>)
export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: string;
  color: string;
  size: number;
  className?: string;
}) => {
  // Access the icon component dynamically from the `icons` object
  // eslint-disable-next-line import/namespace
  const LucideIcon = icons[name as keyof typeof icons];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' does not exist`);

    return <></>;
  }

  // Return the icon with the appropriate props
  return <LucideIcon color={color} size={size} className={className} />;
};
