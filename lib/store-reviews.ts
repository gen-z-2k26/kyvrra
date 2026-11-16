import type { GenericReview } from "@/lib/types";

const STATES = [
  ["California", "Los Angeles"],
  ["Texas", "Austin"],
  ["New York", "Brooklyn"],
  ["Florida", "Miami"],
  ["Illinois", "Chicago"],
  ["Washington", "Seattle"],
  ["Colorado", "Denver"],
  ["Georgia", "Atlanta"],
  ["Arizona", "Phoenix"],
  ["Ohio", "Columbus"],
  ["Massachusetts", "Boston"],
  ["Oregon", "Portland"],
  ["Pennsylvania", "Philadelphia"],
  ["North Carolina", "Charlotte"],
  ["Michigan", "Detroit"],
  ["Virginia", "Richmond"],
  ["New Jersey", "Newark"],
  ["Tennessee", "Nashville"],
  ["Minnesota", "Minneapolis"],
  ["Wisconsin", "Madison"],
  ["Missouri", "Kansas City"],
  ["Maryland", "Baltimore"],
  ["Indiana", "Indianapolis"],
  ["Nevada", "Las Vegas"],
  ["Utah", "Salt Lake City"],
  ["Connecticut", "Hartford"],
  ["South Carolina", "Charleston"],
  ["Alabama", "Birmingham"],
  ["Kentucky", "Louisville"],
  ["Louisiana", "New Orleans"],
  ["Oklahoma", "Oklahoma City"],
  ["Iowa", "Des Moines"],
  ["Arkansas", "Little Rock"],
  ["Kansas", "Wichita"],
  ["Mississippi", "Jackson"],
  ["Nebraska", "Omaha"],
  ["New Mexico", "Albuquerque"],
  ["Idaho", "Boise"],
  ["Hawaii", "Honolulu"],
  ["Maine", "Portland"],
  ["New Hampshire", "Manchester"],
  ["Rhode Island", "Providence"],
  ["Montana", "Billings"],
  ["Delaware", "Wilmington"],
  ["South Dakota", "Sioux Falls"],
  ["North Dakota", "Fargo"],
  ["Alaska", "Anchorage"],
  ["Vermont", "Burlington"],
  ["Wyoming", "Cheyenne"],
  ["West Virginia", "Charleston"],
] as const;

const FIRST = [
  "Amina", "James", "Sofia", "Daniel", "Priya", "Noah", "Elena", "Omar",
  "Maya", "Chris", "Lina", "Theo", "Hannah", "Marcus", "Grace", "Andre",
  "Chloe", "Ryan", "Fatima", "Owen", "Natalie", "Jamal", "Brooke", "Ethan",
  "Lucia", "Colin", "Aisha", "Patrick", "Megan", "Luis", "Harper", "Derek",
  "Nina", "Caleb", "Rosa", "Ian", "Kelly", "Victor", "Ava", "Samir",
];

const LAST = "ABCDEFGHJKLMNPRSTW".split("");

const PRODUCTS = [
  "makeup organizer",
  "vanity tray",
  "drawer organizer",
  "acrylic storage set",
  "brush holder",
  "cosmetic caddy",
  "jewelry tray",
  "countertop organizer",
  "vanity drawer insert",
  "storage bin set",
];

const TITLES_5 = [
  "Kyvrra packed it carefully",
  "Would order from Kyvrra again",
  "Exactly the Kyvrra listing",
  "Smooth Kyvrra checkout",
  "Arrived ready to use",
  "Clear tracking from Kyvrra",
  "Well made and well packed",
  "Easy order from our state",
  "Photos matched the Kyvrra page",
  "Glad we chose Kyvrra",
];

const TITLES_4 = [
  "Good Kyvrra order",
  "Happy with Kyvrra overall",
  "Solid buy from Kyvrra",
  "Worth ordering from Kyvrra",
  "Quality was there",
  "Would recommend Kyvrra",
];

function fiveStarNote(product: string, city: string, state: string, index: number) {
  const notes = [
    `Bought a ${product} from Kyvrra for our home in ${city}, ${state}. It was packed carefully and matched the listing.`,
    `Kyvrra shipped my ${product} to ${city} on time. Checkout was clear and the box arrived in good shape.`,
    `Needed a ${product} here in ${state} and ordered it from Kyvrra. Tracking was easy to follow and it was ready to use.`,
    `Our ${product} from Kyvrra showed up in ${city} exactly as described. I would order from them again.`,
    `Placed a Kyvrra order for a ${product} while in ${state}. The price was fair and the shipping updates were useful.`,
    `The ${product} I ordered from Kyvrra for ${city} feels well made. Support answered a question the same day.`,
    `Shopping Kyvrra from ${state} was straightforward. The ${product} was packed securely and the photos were accurate.`,
    `Gave a ${product} from Kyvrra as a gift in ${city}. The packaging looked neat and the order was simple to place.`,
  ];
  return notes[index % notes.length];
}

function fourStarNote(product: string, city: string, state: string, index: number) {
  const notes = [
    `The ${product} from Kyvrra is good quality. Delivery to ${city}, ${state} took a day longer than the first estimate.`,
    `Happy with my Kyvrra order in ${state}. The ${product} does the job. Shipping to ${city} was a little slower than I hoped.`,
    `Solid ${product} for the price. Kyvrra kept me updated on the way to ${city}.`,
    `I would recommend Kyvrra to someone in ${state}. The ${product} arrived safely, just not on the first promised day.`,
  ];
  return notes[index % notes.length];
}

function dateFor(index: number) {
  const day = new Date(Date.UTC(2026, 8, 20));
  day.setUTCDate(day.getUTCDate() - index * 3);
  return day.toISOString().slice(0, 10);
}

/** 77 five-star and 33 four-star notes. 517 / 110 = 4.7. */
function buildStoreReviews(): GenericReview[] {
  const ratings = [
    ...Array.from({ length: 77 }, () => 5),
    ...Array.from({ length: 33 }, () => 4),
  ];

  return ratings.map((rating, index) => {
    const [state, city] = STATES[index % STATES.length];
    const first = FIRST[index % FIRST.length];
    const last = LAST[(index * 3) % LAST.length];
    const product = PRODUCTS[index % PRODUCTS.length];
    const five = rating === 5;
    const titles = five ? TITLES_5 : TITLES_4;
    return {
      reviewer: `${first} ${last}.`,
      rating,
      title: titles[index % titles.length],
      content: five
        ? fiveStarNote(product, city, state, index)
        : fourStarNote(product, city, state, index),
      date: dateFor(index),
      verified: true,
      location: `${city}, ${state}, USA`,
    };
  });
}

let cachedReviews: GenericReview[] | null = null;

export function storeReviews(): GenericReview[] {
  cachedReviews ??= buildStoreReviews();
  return cachedReviews;
}

export function storeReviewSummary() {
  const reviews = storeReviews();
  const total = reviews.length;
  const average =
    total > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
      : 0;
  const states = new Set(
    reviews.map((review) => review.location?.split(",")[1]?.trim() || ""),
  );
  return {
    total,
    average,
    stateCount: states.size,
  };
}
