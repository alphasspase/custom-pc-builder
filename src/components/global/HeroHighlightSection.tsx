interface HeroHighlightSectionProps {
  title: string;
  highlight: string;
  description: string;
}

export default function HeroHighlightSection({
  title = '',
  highlight = '',
  description = '',
}: HeroHighlightSectionProps) {
  const parts = title ? title.split(new RegExp(`(${highlight})`, 'gi')) : [];

  return (
    <section className="bg-primary-gray-600 flex items-center justify-center p-10 py-20">
      <div className="space-y-8 text-center">
        <div className="text-center text-4xl font-bold md:text-5xl">
          <h1 className="max-[565px]:flex max-sm:flex-col">
            {
              parts.length > 0
                ? parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                      <span
                        key={index}
                        className="to-primary bg-gradient-to-r from-yellow-300 bg-clip-text px-2 text-transparent"
                      >
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    ),
                  )
                : title // fallback if something goes wrong
            }
          </h1>
        </div>

        <p className="text-muted-foreground mx-auto max-w-screen-sm text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
