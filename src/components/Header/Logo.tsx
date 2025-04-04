import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image
                src="/logo.png"
                alt="PC builder"
                width={60}
                height={60}
                className="rounded-full"
            />
        </Link>
    )
}

export default Logo