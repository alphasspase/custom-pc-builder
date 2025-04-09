import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StartBidingButton = () => {
  return (
    <Button asChild size="sm" variant="outline" aria-label="Start Bidding">
      <Link
        aria-label="Start Bidding"
        href="https://github.com/nobruf/shadcn-landing-page.git"
        target="_blank"
      >
        Start Bidding
      </Link>
    </Button>
  );
};

export default StartBidingButton;
