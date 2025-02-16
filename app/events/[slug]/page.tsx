import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { cards } from "@/data/cards";

interface EventPageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function EventPage({ params }: EventPageProps) {
  const event = cards.find((card) => card.slug === params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Image
          alt={event.imageAlt}
          className="w-full h-[300px] object-cover rounded-lg"
          src={event.imageUrl}
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-xl mb-2">{event.date}</p>
      <p className="text-gray-600 mb-8">{event.description}</p>

      <div className="prose max-w-none mb-8">
        <p>{event.longDescription}</p>
      </div>

      {event.ticketUrl && (
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={event.ticketUrl}
        >
          Get Tickets
        </Link>
      )}
    </div>
  );
}
