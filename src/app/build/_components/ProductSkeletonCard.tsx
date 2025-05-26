import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl border p-4 shadow-sm">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col">
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  );
}
