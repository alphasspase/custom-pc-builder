import {
  Check,
  MapPin,
  Truck,
  User,
  Phone,
  Package,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export default function OrderTracking() {
  const trackingSteps = [
    {
      date: '04 Mar',
      title: 'Packed',
      description:
        'Your order has been carefully packed and is ready for shipment. All items have been quality checked.',
      icon: Package,
      status: 'completed',
    },
    {
      date: '05 Mar',
      title: 'At the transit center',
      description:
        'Package is currently at our distribution center and will be shipped soon.',
      icon: MapPin,
      status: 'completed',
    },
    {
      date: '05 Mar',
      title: 'Being delivered',
      description:
        'Your package is out for delivery and will reach you within the estimated time.',
      icon: Truck,
      status: 'current',
    },
    {
      date: '06 Mar',
      title: 'Deliver to you',
      description:
        'Package will be delivered to your specified address. Please be available to receive it.',
      icon: Sparkles,
      status: 'pending',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Gaming Graphics Card RTX 4080',
      quantity: 1,
      price: 1173,
      image: '/graphic-card/graphic-card1.jpg',
    },
    {
      id: 2,
      name: 'Intel Core i7 Processor',
      quantity: 1,
      price: 423,
      image: '/processor/processor1.jpg',
    },
    {
      id: 3,
      name: 'Corsair 32GB DDR5 RAM',
      quantity: 2,
      price: 273,
      image: '/ram/ram1.jpg',
    },
  ];

  return (
    <div className="from-primary-gray-200 to-primary-100/30 min-h-screen bg-gradient-to-br via-white">
      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <div className="mb-6 flex items-center gap-4">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
              <Package className="text-primary h-9 w-9" />
            </div>
            <h1 className="text-5xl font-black drop-shadow-sm md:text-6xl">
              Order Tracking
            </h1>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div className="border-primary bg-primary/5 rounded-lg border p-4">
              <p className="text-primary flex items-center justify-center gap-3 text-lg font-medium">
                <span className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                  <Package className="text-primary h-4 w-4" />
                </span>
                <span>Order number:</span>
                <span className="text-primary font-bold">#586789963</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Products */}
            <div className="border-primary-200 rounded-xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Package className="text-primary-500 h-6 w-6" />
                Products
              </h2>
              <div className="space-y-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="from-primary-50 border-primary-100 hover:border-primary-300 group flex items-center gap-4 rounded-lg border bg-gradient-to-r to-white p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br transition-all duration-300">
                      <div className="bg-primary-400 flex h-12 w-12 items-center justify-center rounded shadow-lg">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="group-hover:text-primary-700 mb-1 font-medium text-gray-900 transition-colors">
                        {product.name}
                      </h3>
                      <p className="flex items-center gap-1 text-gray-600">
                        <span className="text-primary-500 font-medium">
                          Quantity:
                        </span>{' '}
                        {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="from-primary-600 to-primary-500 bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-primary-200 mt-6 border-t pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount:
                  </span>
                  <span className="from-primary-600 to-primary-500 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                    $
                    {products.reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0,
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Deliver to */}
            <div className="border-primary-200 rounded-xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <MapPin className="text-primary-500 h-6 w-6" />
                Deliver to
              </h2>
              <div className="space-y-4">
                <div className="from-primary-50 border-primary-100 flex items-center gap-3 rounded-lg border bg-gradient-to-r to-white p-3">
                  <div className="from-primary-400 to-primary-500 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    Austin Foley
                  </span>
                </div>
                <div className="hover:bg-primary-50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                  <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
                    <Phone className="text-primary-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-900">(458) 632-8404</span>
                </div>
                <div className="hover:bg-primary-50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                  <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
                    <MapPin className="text-primary-600 h-4 w-4" />
                  </div>
                  <span className="text-gray-900">
                    27 Mongolia, Phoenix, AZ
                  </span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="border-primary-200 rounded-xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <CreditCard className="text-primary-500 h-6 w-6" />
                Payment method
              </h2>
              <div className="from-primary-50 border-primary-100 flex items-center gap-4 rounded-lg border bg-gradient-to-r to-white p-4">
                <div className="from-primary-400 to-primary-500 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-primary-600 text-lg font-bold">VISA</div>
                  <span className="text-gray-700">Visa ****64</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tracking Timeline */}
          <div className="border-primary-200 rounded-xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <Truck className="text-primary-500 h-6 w-6" />
              Track your package
            </h2>
            <div className="relative">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';

                return (
                  <div key={index} className="relative pb-12 last:pb-0">
                    {/* Vertical line */}
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute top-14 left-7 h-16 w-1 rounded-full transition-all duration-500 ${
                          isCompleted
                            ? 'from-primary-500 to-primary-400 bg-gradient-to-b shadow-lg'
                            : isCurrent
                              ? 'from-primary-400 to-primary-200 bg-gradient-to-b'
                              : 'from-primary-200 to-primary-100 bg-gradient-to-b'
                        }`}
                      />
                    )}

                    {/* Timeline item */}
                    <div
                      className={`flex gap-6 transition-all duration-500 hover:scale-[1.02] hover:transform ${
                        isCurrent ? 'animate-pulse' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all duration-500 ${
                          isCompleted
                            ? 'from-primary-500 to-primary-600 shadow-primary-200 ring-primary-100 bg-gradient-to-br text-white ring-4'
                            : isCurrent
                              ? 'from-primary-400 to-primary-500 shadow-primary-200 ring-primary-200 animate-pulse bg-gradient-to-br text-white ring-4'
                              : 'from-primary-100 to-primary-200 text-primary-400 shadow-primary-100 bg-gradient-to-br'
                        }`}
                      >
                        <Icon
                          className={`transition-all duration-300 ${
                            isCompleted || isCurrent ? 'h-7 w-7' : 'h-6 w-6'
                          }`}
                        />
                        {isCompleted && (
                          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 shadow-lg">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 pt-3 transition-all duration-300 ${
                          isCurrent ? 'translate-x-1 transform' : ''
                        }`}
                      >
                        <div
                          className={`mb-3 rounded-lg p-4 transition-all duration-300 ${
                            isCompleted || isCurrent
                              ? 'from-primary-50 border-primary-200 border bg-gradient-to-r to-white'
                              : 'border border-gray-200 bg-gradient-to-r from-gray-50 to-white'
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                                  : isCurrent
                                    ? 'bg-primary-200 text-primary-800 animate-pulse shadow-md'
                                    : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {step.date}
                            </span>
                            <h3
                              className={`text-lg font-semibold transition-all duration-300 ${
                                isCompleted
                                  ? 'text-primary-700'
                                  : isCurrent
                                    ? 'text-primary-800'
                                    : 'text-gray-500'
                              }`}
                            >
                              {step.title}
                            </h3>
                            {isCurrent && (
                              <div className="flex items-center gap-1">
                                <div className="bg-primary-500 h-2 w-2 animate-ping rounded-full"></div>
                                <div className="bg-primary-400 h-2 w-2 animate-pulse rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <p
                            className={`text-sm leading-relaxed transition-all duration-300 ${
                              isCompleted || isCurrent
                                ? 'text-gray-700'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
