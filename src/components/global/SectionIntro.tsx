import { cn } from '@/lib/utils';

const SectionIntro = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <h2 className="mb-4">{title}</h2>
      <div className="bg-primary mx-auto h-1 w-24 rounded-full"></div>
    </div>
  );
};

export default SectionIntro;
