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
    description: "A casual 5k run in Salthill, followed by pints and craic.",
    imageUrl: "/images/singles-run.png",
    imageAlt: "Singles Run Club Salthill event",
    slug: "singles-run-club-salthill",
    county: "Galway",
    longDescription:
      "Join us for a morning run along the beautiful Salthill promenade. All fitness levels welcome.",
    ticketUrl: "https://tickets.example.com/singles-run-salthill",
  },
  // {
  //   title: "Singles Run Club Dún Laoghaire",
  //   company: "Your Friend My Friend",
  //   date: "2025-03-09",
  //   displayDate: "9 Mar 2025",
  //   time: "09:30 - 11:00",
  //   description: "Singles Run Club",
  //   imageUrl: "/images/singles-run.png",
  //   imageAlt: "Singles Run Club Dún Laoghaire event",
  //   slug: "singles-run-club-dun-laoghaire",
  //   county: "Dublin",
  //   longDescription:
  //     "Start your Sunday with a refreshing run along Dún Laoghaire pier.",
  //   ticketUrl: "https://tickets.example.com/singles-run-dun-laoghaire",
  // },
  {
    title: "Singles Run Club, Rathmines",
    company: "Your Friend My Friend",
    date: "2025-03-09",
    displayDate: "9 Mar 2025",
    time: "09:00 - 11:00",
    description: "A casual 5k run in Rathmines, followed by pints and craic.",
    imageUrl: "/images/singles-run.png",
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
    description:
      "A casual 5k run in St Anne's Park, followed by pints and craic.",
    imageUrl: "/images/singles-run.png",
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
    time: "19:30 - 22:00",
    description: "18-dates, 5-minutes each, great craic!",
    imageUrl: "/images/wicklow-speed.png",
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
    date: "2025-02-23",
    displayDate: "23 Feb 2025",
    description:
      "Pitch your friend with a 3-minute presentation and get them a date!",
    imageUrl: "/images/pitch-card.jpeg",
    imageAlt: "Backend Beats card background",
    slug: "pitch-a-friend-dublin",
    county: "Dublin",
    longDescription:
      "Pitch a Friend is a viral new dating craze that has taken has come from America to Ireland. At these events, friends prepare and present a 3 minute pitch about a single person they know, and gets them dates from the audience.",
    ticketUrl:
      "https://www.eventbrite.ie/e/pitch-a-friend-dublin-2-tickets-1115903751159?aff=erelexpmlt",
  },
  {
    title: "Singles Aran Island Weekend Experience",
    company: "Korina Duffy EcoFitness",
    date: "2025-03-28",
    displayDate: "28 Mar 2025",
    description: "Escape to Inishmore for a weekend retreat",
    imageUrl: "/images/aran.jpeg",
    imageAlt: "Aran Island Weekend Experience card background",
    slug: "singles-aran-island-weekend-experience",
    county: "Galway",
    longDescription:
      "Treat yourself to a weekend of relaxation and adventure on Inishmore, the largest of the Aran Islands. This package includes accommodation, meals, and activities to keep you entertained.",
    ticketUrl: "https://tickets.example.com/pitch-a-friend-dublin",
  },
  {
    title: "Speed Dating Cork",
    company: "2Connect.ie",
    date: "2025-03-28",
    displayDate: "28 Mar 2025",
    description: "Ages 30-45",
    imageUrl: "/images/cork.jpeg",
    imageAlt: "cork dating",
    slug: "speed-dating-cork",
    county: "Cork",
    longDescription:
      "How about a New Year's Romance ? This is a perfect event to connect with like-minded people in your age group. Enjoy 8+ face to face dates in a lovely amibiance. Speed Dating is the world's most popular way to meet real people face-to-face.",
    ticketUrl:
      "https://www.eventbrite.ie/e/speed-dating-cork-2-tickets-1115903751159?aff=erelexpmlt",
  },
  // Add more cards as needed
];
