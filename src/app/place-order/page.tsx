import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import CheckoutDetails from './_components/CheckoutDetails';
import OrderSummary from './_components/OrderSummary';
import { cardsData, cardsPcConfigData } from '.';

const checkoutPage = () => {
  return (
    <div>
      <HeroHighlightSection
        title="Checkout Configuration"
        highlight="Configuration"
        description="Finalize your order with ease! Customize your ideal PC by selecting the components you need, and let us help guide you through the process to create the perfect setup tailored to your preferences."
      />
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 lg:gap-8">
        {/* sub grid */}
        <div className="col-span-2 space-y-5">
          <CheckoutDetails title="PC Components" cartData={cardsData} />
          <CheckoutDetails
            title="Setup Configuration"
            cartData={cardsPcConfigData}
          />
        </div>
        {/* sub grid */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default checkoutPage;
