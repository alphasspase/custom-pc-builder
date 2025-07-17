import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function ActionButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 pt-6 sm:flex-row">
      <Button
        onClick={() => router.push('/')}
        className="flex-1 bg-slate-900 hover:bg-slate-800"
        size="lg"
      >
        Return to Home
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push('/account/orders')}
        className="flex-1 border-slate-300 hover:bg-slate-50"
        size="lg"
      >
        View My Orders
      </Button>
    </div>
  );
}
