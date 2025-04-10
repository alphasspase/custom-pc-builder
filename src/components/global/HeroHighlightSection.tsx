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
    <section className="p-10 py-20 flex items-center justify-center bg-primary-gray-600">
      <div className="text-center space-y-8">
        <div className="text-4xl md:text-6xl font-bold text-center">
          <h1 className="max-[565px]:flex max-sm:flex-col">
            {
              parts.length > 0
                ? parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                      <span
                        key={index}
                        className="text-transparent px-2 bg-gradient-to-r from-yellow-300 to-primary bg-clip-text"
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

        <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
