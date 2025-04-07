"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import NavbarLink from "./NavbarLink";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { label: "Home", href: "/" },
  { label: "Computer", href: "/computer" },
  { label: "Build", href: "/build" },
  { label: "Component", href: "/component" },
  { label: "Support", href: "/support" }
];





const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const renderDesktopLinks = () => (
    <NavigationMenuItem className="flex gap-5">
      {routeList.map(({ href, label }) => (
        <NavigationMenuLink key={href} asChild>
          <Link
            href={href}
            className={`text-base font-semibold px-2 ${pathname === href ? "font-extrabold" : "font-semibold"} hover:text-primary transition-colors`}
          >
            {label}
          </Link>
        </NavigationMenuLink>
      ))}
    </NavigationMenuItem>
  );

  const renderMobileLinks = () => (
    <div className="flex flex-col gap-2">
      {routeList.map(({ href, label }) => (
        <NavbarLink key={href} href={href} label={label} onClick={() => setIsOpen(false)} />
      ))}
    </div>
  );

  return (
    <header className="border-b bg-background sticky top-0 z-40 flex h-16 items-center justify-between px-4 md:px-6">
      <Logo />
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              {renderMobileLinks()}
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <Button asChild size="sm" variant="outline" aria-label="View on GitHub">
                <Link
                  aria-label="View on GitHub"
                  href="https://github.com/nobruf/shadcn-landing-page.git"
                  target="_blank"
                >
                  Start Biding
                </Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>{renderDesktopLinks()}</NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <Button asChild size="sm" variant="outline" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/nobruf/shadcn-landing-page.git"
            target="_blank"
          >
            Start Biding
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;