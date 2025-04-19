import React from 'react';
import ConfirmPayment from './_components/ConfirmPayment';
import PayDetails from './_components/PayDetails';

const paymentInformationPage = () => {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 lg:gap-8">
        {/* sub grid */}
        <div className="col-span-2 space-y-5">
          <ConfirmPayment />
        </div>
        {/* sub grid */}
        <div>
          <PayDetails />
        </div>
      </div>
    </div>
  );
};

export default paymentInformationPage;
