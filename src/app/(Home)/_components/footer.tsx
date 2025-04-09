import Logo from '@/components/Header/Logo';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold text-lg">{title}</h3>
    {links.map(({ label, href }, index) => (
      <Link key={index} href={href} className="opacity-60 hover:opacity-100">
        {label}
      </Link>
    ))}
  </div>
);

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
            <p className="mt-4 text-xl font-semibold">
              Custom PC configuration made easy
            </p>
          </div>

          <FooterLinkSection
            title="Quick Links"
            links={[
              { label: 'Home', href: '#' },
              { label: 'Configure PC', href: '#' },
              { label: 'Components', href: '#' },
              { label: 'Support', href: '#' },
            ]}
          />

          <FooterLinkSection
            title="Contact"
            links={[
              { label: 'support@pcbuilder.com1-800-PC-BUILD', href: '#' },
            ]}
          />

          <FooterLinkSection
            title="Follow Us"
            links={[
              { label: 'Twitch', href: '#' },
              { label: 'Discord', href: '#' },
              { label: 'Dribbble', href: '#' },
            ]}
          />
        </div>

        <Separator className="my-6" />

        <section>
          <h3>
            &copy; 2024 Designed and developed by
            <Link
              target="_blank"
              href="https://github.com/leoMirandaa"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Leo Miranda
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
export default FooterSection;
