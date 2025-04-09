import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StartBidingButton = () => {
  return (
    <Button asChild size={'lg'} aria-label="Start Bidding">
      <Link aria-label="Start Bidding" href="/build">
        Start Bidding
      </Link>
    </Button>
  );
};

export default StartBidingButton;
