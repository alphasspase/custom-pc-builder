import Logo from '@/components/Header/Logo';
import { Separator } from '@/components/ui/separator';
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import FooterLinkSection from './FooterLinkSection';

export const FooterSection = () => {
  return (
    <footer id="footer">
      <div className="bg-card border-secondary rounded-2xl border p-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
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
              {
                label: 'support@pcbuilder.com 1-800-PC-BUILD',
                href: '#',
              },
            ]}
          />

          <FooterLinkSection
            title="Follow Us"
            links={[
              { label: 'Twitter', href: '#', icon: <FaXTwitter size={25} /> },
              { label: 'Discord', href: '#', icon: <FaDiscord size={25} /> },
              {
                label: 'Instagram',
                href: '#',
                icon: <FaInstagram size={25} />,
              },
            ]}
          />
        </div>
        <Separator className="my-6" />

        <section>
          <h3 className="flex items-center justify-center">
            &copy;
            <p className="text-primary border-primary ml-1 transition-all hover:border-b-2">
              2025 PC Builder. All rights reserved.
            </p>
          </h3>
        </section>
      </div>
    </footer>
  );
};

export default FooterSection;
