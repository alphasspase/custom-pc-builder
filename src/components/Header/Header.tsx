'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../ui/navigation-menu';
import Link from 'next/link';
import Logo from './Logo';
import StartBidingButton from './StartBidingButton';
import { routeList } from '@/app/(Home)';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const renderDesktopLinks = () => (
    <NavigationMenuItem className="flex gap-5">
      {routeList.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-base font-semibold px-2 relative ${pathname === href ? 'font-extrabold' : 'font-semibold'} hover:text-gray-600 transition-colors`}
        >
          {label}
          {/* Underline animation */}
          <span
            className={`absolute  left-0 -bottom-1 w-full h-1 bg-primary transition-all duration-300 ease-in-out ${pathname === href ? 'scale-x-80' : 'scale-x-0'}`}
          ></span>
        </Link>
      ))}
    </NavigationMenuItem>
  );

  return (
    <header className="border-b bg-background sticky top-0 z-40 flex h-16 items-center justify-between px-4 md:px-6">
      <Logo />
      {/* <!-- Mobile --> */}
      <MobileNav />

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>{renderDesktopLinks()}</NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <StartBidingButton />
      </div>
    </header>
  );
};

export default Header;
