'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavbarLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavbarLink = ({ href, label, onClick }: NavbarLinkProps) => {
  const pathname = usePathname();

  return (
    <Button
      key={href}
      onClick={onClick}
      asChild
      variant="ghost"
      className={cn(
        'justify-start text-base',
        pathname === href ? 'font-extrabold text-primary' : 'font-semibold',
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavbarLink;
