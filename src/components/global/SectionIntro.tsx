import { cn } from '@/lib/utils';

const SectionIntro = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h2 className="mb-4">{title}</h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionIntro;
