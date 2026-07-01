/**
 * Testimonials, transcribed verbatim from docs/content-inventory.md — five
 * real, named, public LinkedIn recommendations with full attribution.
 * Never trim a quote to the point of losing the source (PRD §3).
 */

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "manju-quadros",
    name: "Manju (Mishra) Quadros",
    title: "Customer Advocate, NxtGen Cloud Technologies",
    relationship: "Direct report, known 7+ years",
    date: "Apr 16, 2022",
    quote:
      "He is brilliant at shaping his team members and giving them direction. He is an out-of-box thinker, an amazing leader, and knows well to engage customers and help them grow by driving them towards technological innovations. He is a problem-solver, result-oriented professional, and a compassionate leader who goes out of his way to help his team achieve heights of excellence in their deliveries.",
  },
  {
    id: "saifuddin-kapasi",
    name: "Dr. Saifuddin Kapasi",
    title: "Author, Visiting Faculty",
    relationship: "Vodafone colleague",
    date: "Oct 28, 2020",
    quote:
      "Kapil Taneja and I were colleagues at Vodafone. He worked in collaborative partnership for methodical cross-functional goals. He stood out as a leader for his team displaying a sense of maturity and customer-centric behaviour for our clients whom he serviced as a leader. His business acumen to get winning deals was outstanding. Business services was his unmatched forte.",
  },
  {
    id: "ravi-kanth-emani",
    name: "Ravi Kanth Emani",
    title: "Head of Connectivity Services & CTO Infrastructure – India, HSBC",
    relationship: "Client",
    date: "Jul 23, 2020",
    quote:
      "Associated with Kapil for last few years and it's been an outstanding working relationship. Overcoming operational challenges, introducing new products and solutions etc. were some of the achievements, and I thank Kapil for fronting the engagement. His understanding of the core business and customer value proposition is excellent.",
  },
  {
    id: "chris-hayes",
    name: "Chris Hayes",
    title: "Consultant",
    relationship: "Teammate",
    date: "Jul 23, 2020",
    quote:
      "Kapil is a complete professional, handling a complex client and tackling significant obstacles to achieve major successes in fixed networks in India. He worked with our global team to develop a deep understanding of the client at C-level and was instrumental in us growing our business year on year. I would have no hesitation recommending him to any business looking to develop senior level relationships with large enterprise clients and motivate a team both nationally and globally.",
  },
  {
    id: "shilpi-kapoor",
    name: "Shilpi Kapoor",
    title: "Marketing Head, BharatPe; ex-CMO Airtel Payments Bank",
    relationship: "Teammate",
    date: "May 24, 2011",
    quote:
      "Kapil is like having a ready supply of positive energy by your side — always ready to jump on to new challenges, he gives his best in every situation, and makes sure that the objective is met. A finisher who enjoys every bit of the journey, he is resourceful, creative, meticulous and very hard working.",
  },
];
