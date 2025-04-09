import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { URLS } from '@/utils/urls';

const StartBidingButton = () => {
  return (
    <Button asChild size={'lg'} aria-label="Start Bidding">
      <Link aria-label="Start Bidding" href={URLS.build}>
        Start Bidding
      </Link>
    </Button>
  );
};

export default StartBidingButton;
