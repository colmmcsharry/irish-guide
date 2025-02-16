interface CardData {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
  county: string;
  longDescription?: string;
  ticketUrl?: string;
}

export const cards: CardData[] = [
  {
    title: "Frontend Radio",
    date: "14 Feb 2025",
    description: "Daily Mix",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Frontend Radio card background",
    slug: "frontend-radio",
    county: "Longford",
    longDescription:
      "Join us for an evening of amazing frontend development discussion...",
    ticketUrl: "https://tickets.example.com/frontend-radio",
  },
  {
    title: "Pitch a Friend - Dublin",
    date: "17 Feb 2025",
    description: "Weekly Mix",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Backend Beats card background",
    slug: "pitch-a-friend-dublin",
    county: "Dublin",
    longDescription:
      "Join us for an evening of amazing backend development discussion...",
    ticketUrl: "https://tickets.example.com/pitch-a-friend-dublin",
  },
  {
    title: "Random Fun Event",
    date: "14 Feb 2025",
    description: "Daily Mix",
    imageUrl: "https://heroui.com/images/hero-card-complete.jpeg",
    imageAlt: "Frontend Radio card background",
    slug: "random-fun-event",
    county: "Galway",
    longDescription:
      "Join us for an evening of amazing frontend development discussion...",
    ticketUrl: "https://tickets.example.com/random-fun-event",
  },
  {
    title: "Pitch a Friend - Dublin",
    date: "17 Feb 2025",
    description: "Weekly Mix",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Backend Beats card background",
    slug: "pitch-a-friend-dublin",
    county: "Cork",
    longDescription:
      "Join us for an evening of amazing backend development discussion...",
    ticketUrl: "https://tickets.example.com/pitch-a-friend-dublin",
  },
  // Add more cards as needed
];
