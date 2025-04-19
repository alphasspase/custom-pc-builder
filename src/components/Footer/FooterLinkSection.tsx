import Link from 'next/link';
import React from 'react';

const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; icon?: React.ReactNode }[];
}) => (
  <div className="flex flex-col gap-5">
    <h3 className="text-lg font-bold">{title}</h3>
    <div className={`flex ${!links[0].icon && 'flex-col'} gap-5`}>
      {links.map(({ label, href, icon }, index) => (
        <Link
          key={index}
          href={href}
          className="flex items-center gap-2 font-medium opacity-60 transition-opacity hover:opacity-100"
        >
          {icon}
          {!icon && label}
        </Link>
      ))}
    </div>
  </div>
);

export default FooterLinkSection;
