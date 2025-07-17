import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function OrderSummary() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <h3 className="text-xl font-semibold text-slate-900">Order Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Order Date</h4>
              <p className="text-sm text-slate-600">Saturday, February 20</p>
              <p className="text-xs text-slate-500">Placed at 08:00 PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Delivery Time</h4>
              <p className="text-sm text-slate-600">3-5 business days</p>
              <p className="text-xs text-slate-500">Build & ship time</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Build Location</h4>
              <p className="text-sm text-slate-600">Custom PC Builder</p>
              <p className="text-xs text-slate-500">Workshop, NY, USA</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <div className="h-5 w-5 text-emerald-600">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Custom PC Build</h4>
              <p className="text-sm text-slate-600">1 Unit ordered</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                Email confirmation sent
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
