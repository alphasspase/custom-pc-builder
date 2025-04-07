import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StartBidingButton = () => {
  return (
    <Button asChild size="sm" variant="outline" aria-label="View on GitHub">
      <Link
        aria-label="View on GitHub"
        href="https://github.com/nobruf/shadcn-landing-page.git"
        target="_blank"
      >
        Start Biding
      </Link>
    </Button>
  );
};

export default StartBidingButton;
