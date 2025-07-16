import { Card, CardContent } from '@/components/ui/card';

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-slate-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-1/3 rounded bg-slate-200"></div>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-20 rounded bg-slate-200"></div>
                <div className="h-20 rounded bg-slate-200"></div>
                <div className="h-20 rounded bg-slate-200"></div>
                <div className="h-20 rounded bg-slate-200"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
