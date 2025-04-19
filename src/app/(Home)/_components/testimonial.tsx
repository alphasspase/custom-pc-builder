'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    userName: 'UI/UX Designer',
    comment:
      'Absolutely love the design and flexibility of this tool. Highly recommended!',
    rating: 4.9,
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Mike Brown',
    userName: 'Software Developer',
    comment:
      'Great experience so far. Setup was easy and documentation is clear.',
    rating: 4.7,
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Emily Davis',
    userName: 'Product Owner',
    comment: 'Streamlined our workflow significantly. Definitely a must-have!',
    rating: 5.0,
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'David Wilson',
    userName: 'Backend Engineer',
    comment: 'The integration options are awesome. Super smooth and powerful.',
    rating: 4.8,
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Laura Martinez',
    userName: 'QA Specialist',
    comment: 'Clean UI and really responsive. Found it very user-friendly.',
    rating: 4.9,
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Tom Harris',
    userName: 'Cloud Architect',
    comment: 'Reliable performance and great support. Loving it so far!',
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mb-8 text-center">
        <h2 className="text-primary mb-2 text-center text-lg tracking-wider">
          Testimonials
        </h2>

        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Hear What Our 1000+ Clients Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="fill-primary text-primary size-4" />
                    <Star className="fill-primary text-primary size-4" />
                    <Star className="fill-primary text-primary size-4" />
                    <Star className="fill-primary text-primary size-4" />
                    <Star className="fill-primary text-primary size-4" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                        alt="radix"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
