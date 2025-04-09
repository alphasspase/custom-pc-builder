'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import StartBidingButton from './StartBidingButton';
import { Separator } from '../ui/separator';
import NavbarLink from './NavbarLink';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import { routeList } from '@/app/(Home)';

const MobileNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center ">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Menu
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer lg:hidden"
          />
        </SheetTrigger>

        <SheetContent className="flex flex-col justify-between rounded-tl-2xl rounded-bl-2xl bg-card border-secondary">
          <div>
            <SheetHeader className="mb-4 ml-4">
              <SheetTitle className="flex items-center">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-2">
              {routeList.map(({ href, label }) => (
                <NavbarLink
                  key={href}
                  href={href}
                  label={label}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </div>

          <SheetFooter className="flex-col sm:flex-col justify-start items-start">
            <Separator className="mb-2" />
            <StartBidingButton />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
