'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navigationLinks = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Computer",
        href: "/computer"
    },
    {
        name: "Build",
        href: "/build"
    },
    {
        name: "Component",
        href: "/component"
    },
    {
        name: "Support",
        href: "/support"
    }
]

const NavLink = ({ className }: { className?: string }) => {
    const pathname = usePathname()

    const isActiveLink = (path: string) => {
        return pathname === path && "font-bold"
    }
    return (
        <nav className={cn("hidden md:flex items-center gap-6", className)}>
            {navigationLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${isActiveLink(link.href)} hover:text-foreground transition-colors`}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}

export default NavLink