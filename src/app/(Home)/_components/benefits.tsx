import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from './Icon';
// import { Icon } from "@/components/ui/icon";
// import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Blocks',
    title: 'Build Brand Trust',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.',
  },
  {
    icon: 'LineChart',
    title: 'More Leads',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, natus consectetur.',
  },
  {
    icon: 'Wallet',
    title: 'Higher Conversions',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur. A odio velit cum aliquam',
  },
  {
    icon: 'Sparkle',
    title: 'Test Marketing Ideas',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="text-primary mb-2 text-lg tracking-wider">Benefits</h2>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Your Shortcut to Success
          </h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
            ducimus reprehenderit architecto rerum similique facere odit
            deleniti necessitatibus quo quae.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background group/number transition-all delay-75"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon}
                    size={32}
                    color="hsl(var(--primary))"
                    className="text-primary mb-6"
                  />
                  <span className="text-muted-foreground/15 group-hover/number:text-muted-foreground/30 text-5xl font-medium transition-all delay-75">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
