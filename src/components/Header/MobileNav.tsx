'use client'
import React from 'react'
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Logo from './Logo'
import NavLink from './NavLink'

const MobileNav = () => {
    return (
        <div className="md:hidden">
            <Sheet >
                <SheetTrigger>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <div>
                                <Logo />
                                <NavLink className="grid mt-8" />
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default MobileNav