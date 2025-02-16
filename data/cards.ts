interface CardData {
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
  county: string;
  date: string; // YYYY-MM-DD format
  displayDate: string; // Formatted for display
  time?: string;
  longDescription?: string;
  ticketUrl?: string;
}

export const cards: CardData[] = [
  {
    title: "Singles Run Club, Salthill",
    company: "Your Friend My Friend",
    date: "2025-03-02",
    displayDate: "2 Mar 2025",
    time: "09:30 - 11:30",
    description: "Singles Run Club",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Singles Run Club Salthill event",
    slug: "singles-run-club-salthill",
    county: "Galway",
    longDescription:
      "Join us for a morning run along the beautiful Salthill promenade. All fitness levels welcome.",
    ticketUrl: "https://tickets.example.com/singles-run-salthill",
  },
  {
    title: "Singles Run Club Dún Laoghaire",
    company: "Your Friend My Friend",
    date: "2025-03-09",
    displayDate: "9 Mar 2025",
    time: "09:30 - 11:00",
    description: "Singles Run Club",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Singles Run Club Dún Laoghaire event",
    slug: "singles-run-club-dun-laoghaire",
    county: "Dublin",
    longDescription:
      "Start your Sunday with a refreshing run along Dún Laoghaire pier.",
    ticketUrl: "https://tickets.example.com/singles-run-dun-laoghaire",
  },
  {
    title: "Singles Run Club, South Dublin",
    company: "Your Friend My Friend",
    date: "2025-03-09",
    displayDate: "9 Mar 2025",
    time: "09:00 - 11:00",
    description: "Singles Run Club",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Singles Run Club South Dublin event",
    slug: "singles-run-club-south-dublin",
    county: "Dublin",
    longDescription: "Join our friendly running group in South Dublin.",
    ticketUrl: "https://tickets.example.com/singles-run-south-dublin",
  },
  {
    title: "Singles Run Club, St Anne's Park",
    company: "Your Friend My Friend",
    date: "2025-03-09",
    displayDate: "9 Mar 2025",
    time: "09:30 - 11:30",
    description: "Singles Run Club",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Singles Run Club St Anne's Park event",
    slug: "singles-run-club-st-annes",
    county: "Dublin",
    longDescription:
      "Explore the beautiful trails of St Anne's Park with fellow singles.",
    ticketUrl: "https://tickets.example.com/singles-run-st-annes",
  },
  {
    title: "Wicklow Speed Dating",
    company: "Your Friend My Friend",
    date: "2025-03-13",
    displayDate: "13 Mar 2025",
    description: "Pitch your friend and get them a date!",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Frontend Radio card background",
    slug: "frontend-radio",
    county: "Wicklow",
    longDescription:
      "Join us for an evening of amazing frontend development discussion...",
    ticketUrl: "https://tickets.example.com/frontend-radio",
  },
  {
    title: "Pitch a Friend - Dublin",
    company: "Pitch a Friend: Ireland",
    date: "2025-02-17",
    displayDate: "17 Feb 2025",
    description: "Pitch your friend and get them a date!",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Backend Beats card background",
    slug: "pitch-a-friend-dublin",
    county: "Dublin",
    longDescription:
      "Join us for an evening of amazing backend development discussion...",
    ticketUrl: "https://tickets.example.com/pitch-a-friend-dublin",
  },
  // Add more cards as needed
];
