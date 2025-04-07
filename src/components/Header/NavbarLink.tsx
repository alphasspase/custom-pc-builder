'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface NavbarLinkProps {
    href: string;
    label: string;
    onClick?: () => void;
}

const NavbarLink = ({ href, label, onClick }: NavbarLinkProps) => {
    return (
        <Button
            key={href}
            onClick={onClick}
            asChild
            variant="ghost"
            className="justify-start text-base"
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
};

export default NavbarLink