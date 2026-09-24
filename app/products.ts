export type ProductOption = { label: string; price: string };
export type ProductColor = { name: string; colors: string[]; image: string };
export type ProductImage = { image: string; alt: string };

export type Product = {
  slug: string; code: string; name: string; shortName: string; category: string; categorySlug: string;
  description: string; shortDescription: string; image: string; startingPrice: string;
  detailLabel: string; detailValue: string; colorLabel: string; colors: ProductColor[]; gallery?: ProductImage[]; options: ProductOption[];
};

export const products: Product[] = [
  {
    slug: "bloom-coaster", code: "C01", name: "Bloom Coaster", shortName: "Bloom Coaster", category: "Coasters", categorySlug: "coasters",
    description: "A cheerful round coaster with a soft crochet center, leafy green edging, and raised flower petals. Choose a favorite flower pairing or ask for your own combination.",
    shortDescription: "Raised flower petals, leafy edging, and colors made to feel like yours.", image: "/floral-coaster-actual.png", startingPrice: "$15",
    detailLabel: "Size", detailValue: "Approx. 6 in", colorLabel: "Custom colors",
    colors: [
      { name: "Yellow · White center", colors: ["#f4b62c", "#f4f3ed"], image: "/floral-coaster-actual.png" },
      { name: "Yellow · Brown center", colors: ["#f4b62c", "#6a4938"], image: "/coaster-brown-yellow.png" },
      { name: "Yellow + Peach", colors: ["#f4b62c", "#f0a482"], image: "/coaster-brown-yellow-peach.png" },
      { name: "Light + Dark Blue", colors: ["#a9c8f2", "#1761cf"], image: "/coaster-brown-blue.png" },
      { name: "Light + Dark Pink", colors: ["#f6bfd2", "#ef5a9a"], image: "/coaster-brown-pink.png" },
      { name: "Purple", colors: ["#b44ac5", "#6a4938"], image: "/coaster-brown-purple.png" },
    ], options: [{ label: "One coaster", price: "$15" }, { label: "Set of 4", price: "$40" }],
  },
  {
    slug: "navratri-mirror-jewelry-set", code: "J01", name: "Navratri Mirror Jewelry Set", shortName: "Mirror Jewelry Set", category: "Crochet jewelry", categorySlug: "jewelry",
    description: "A colorful crochet necklace with mirror accents and silver ghungroo-style bells, paired with matching earrings. Choose a festive color mix, or select the earrings on their own.",
    shortDescription: "A festive mirror necklace and matching earrings in joyful color mixes.", image: "/navratri-red-set.png", startingPrice: "$8",
    detailLabel: "Includes", detailValue: "Necklace + earrings", colorLabel: "Festive colors",
    colors: [
      { name: "Red festive mix", colors: ["#d51524", "#008c73", "#f3b51b"], image: "/navratri-red-set.png" },
      { name: "Orange festive mix", colors: ["#fb6713", "#f15397", "#16905f"], image: "/navratri-orange-set.png" },
      { name: "Green festive mix", colors: ["#7ebc31", "#079fc7", "#174bc6"], image: "/navratri-green-set.png" },
    ], options: [{ label: "Full set", price: "$20" }, { label: "Earrings only", price: "$8" }],
  },
  {
    slug: "crochet-cowrie-shell-necklace-set", code: "J02", name: "Crochet Cowrie Shell Necklace Set", shortName: "Cowrie Shell Necklace Set", category: "Crochet jewelry", categorySlug: "jewelry",
    description: "A graceful hand-crocheted necklace finished with reflective mirror accents and a row of dangling cowrie shells, paired with matching round earrings. Choose from seven bright yarn colors for a festive or everyday statement.",
    shortDescription: "A mirror-accented crochet necklace with cowrie shells and matching earrings.", image: "/cowrie-necklace-y06.webp", startingPrice: "$8",
    detailLabel: "Includes", detailValue: "Necklace + earrings", colorLabel: "Seven colors shown",
    colors: [
      { name: "Y06 Emerald green", colors: ["#07834f"], image: "/cowrie-necklace-y06.webp" },
      { name: "Y01 Vivid orange", colors: ["#f47a18"], image: "/cowrie-necklace-y01.webp" },
      { name: "Y05 Golden yellow", colors: ["#f5aa22"], image: "/cowrie-necklace-y05.webp" },
      { name: "Y10 Bright turquoise", colors: ["#059bc2"], image: "/cowrie-necklace-y10.webp" },
      { name: "Y11 Bright red", colors: ["#e4142e"], image: "/cowrie-necklace-y11.webp" },
      { name: "Y13 Bright blue", colors: ["#287cdb"], image: "/cowrie-necklace-y13.webp" },
      { name: "Y14 Orchid", colors: ["#c66bc7"], image: "/cowrie-necklace-y14.webp" },
    ],
    gallery: [
      { image: "/cowrie-necklace-y06.webp", alt: "Emerald green crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y01.webp", alt: "Vivid orange crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y05.webp", alt: "Golden yellow crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y10.webp", alt: "Bright turquoise crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y11.webp", alt: "Bright red crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y13.webp", alt: "Bright blue crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y14.webp", alt: "Orchid crochet cowrie shell necklace and earrings" },
      { image: "/cowrie-necklace-y06-mannequin.webp", alt: "Emerald crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y01-mannequin.webp", alt: "Vivid orange crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y05-mannequin.webp", alt: "Golden yellow crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y10-mannequin.webp", alt: "Bright turquoise crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y11-mannequin.webp", alt: "Bright red crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y13-mannequin.webp", alt: "Bright blue crochet cowrie shell necklace displayed on a black mannequin" },
      { image: "/cowrie-necklace-y14-mannequin.webp", alt: "Orchid crochet cowrie shell necklace displayed on a black mannequin" },
    ],
    options: [{ label: "Full set", price: "$20" }, { label: "Earrings only", price: "$8" }],
  },
  {
    slug: "crochet-bell-anklet-pair", code: "J03", name: "Crochet Bell Anklet Pair", shortName: "Bell Anklet Pair", category: "Crochet jewelry", categorySlug: "jewelry",
    description: "A pair of hand-crocheted anklets with alternating colorful circles and little silver bells. Choose two yarn colors for a matching pair.",
    shortDescription: "Colorful crochet circles and silver bells in a matching anklet pair.", image: "/anklet-pink-pair.webp", startingPrice: "$20",
    detailLabel: "Includes", detailValue: "Pair of anklets", colorLabel: "Custom colors",
    colors: [
      { name: "Pink + ivory", colors: ["#ec4e9a", "#f2ead8"], image: "/anklet-pink-pair.webp" },
      { name: "Orange + yellow", colors: ["#f47a18", "#f5aa22"], image: "/anklet-orange-yellow-pair.webp" },
      { name: "Royal blue + ivory", colors: ["#174bbf", "#f2ead8"], image: "/anklet-blue-detail.webp" },
    ],
    gallery: [
      { image: "/anklet-pink-pair.webp", alt: "Pink and ivory crochet bell anklet pair worn on both ankles" },
      { image: "/anklet-orange-yellow-pair.webp", alt: "Orange and yellow crochet bell anklet pair worn on both ankles" },
      { image: "/anklet-blue-detail.webp", alt: "Royal blue and ivory crochet bell anklet on an ankle" },
      { image: "/anklet-pink-detail.webp", alt: "Close view of a pink and ivory crochet bell anklet" },
    ],
    options: [{ label: "Pair of anklets", price: "$20" }],
  },
  {
    slug: "crochet-gajara-scrunchie", code: "G01", name: "Crochet Gajara Scrunchie", shortName: "Gajara Scrunchie", category: "Hair accessories", categorySlug: "hair-accessories",
    description: "A floral crochet gajara made around a comfortable hair scrunchie. Choose classic white buds or a bold red version, both finished with a fresh green center.",
    shortDescription: "A comfortable floral scrunchie inspired by the traditional gajara.", image: "/gajara-white.png", startingPrice: "$15",
    detailLabel: "Style", detailValue: "Full floral look", colorLabel: "Two colors",
    colors: [
      { name: "White buds · Green center", colors: ["#f7f1d5", "#9bd52a"], image: "/gajara-white.png" },
      { name: "Red buds · Green center", colors: ["#d8102f", "#9bd52a"], image: "/gajara-red.png" },
    ], options: [{ label: "One scrunchie", price: "$15" }, { label: "Set of 2", price: "$28" }],
  },
  {
    slug: "crochet-mandala-table-mat", code: "M01", name: "Crochet Mandala Table Mat", shortName: "Mandala Table Mat", category: "Home décor", categorySlug: "home-decor",
    description: "A round crochet table mat with layered scallops in bright blue and soft cream. Use it beneath a plant, serving bowl, or centerpiece to add a handmade accent to a side table or dining space.",
    shortDescription: "A layered scallop mat for plants, serving pieces, and table centerpieces.", image: "/mandala-table-mat.jpg", startingPrice: "$15",
    detailLabel: "Use", detailValue: "Tabletop accent", colorLabel: "Two colors shown",
    colors: [
      { name: "Y10 turquoise + cream", colors: ["#059bc2", "#f5f0df"], image: "/mandala-table-mat.jpg" },
      { name: "Y14 orchid + cream", colors: ["#c66bc7", "#f5f0df"], image: "/mandala-table-mat-y14.png" },
    ],
    gallery: [
      { image: "/mandala-table-mat.jpg", alt: "Blue and cream crochet mandala table mat" },
      { image: "/mandala-table-mat-y14.png", alt: "Orchid and cream crochet mandala table mat" },
      { image: "/mandala-table-mat-styled.jpg", alt: "Crochet mandala table mat styled beneath a plant" },
      { image: "/mandala-table-mat-bowl.jpg", alt: "Crochet mandala table mat styled beneath a serving bowl" },
    ],
    options: [{ label: "One table mat", price: "$15" }],
  },
  {
    slug: "spiral-crochet-hanging", code: "H01", name: "Spiral Crochet Hanging", shortName: "Spiral Hanging", category: "Hanging décor", categorySlug: "hanging-decor",
    description: "A playful crochet spiral that twists gently from a hanging loop and ends in a soft tassel. A lightweight handmade accent for a window, wall, doorway, or cozy corner.",
    shortDescription: "A playful twisting decoration finished with a soft yarn tassel.", image: "/spiral-hanging-blue-green.jpg", startingPrice: "$15",
    detailLabel: "Style", detailValue: "Spiral + tassel", colorLabel: "Two designs shown",
    colors: [
      { name: "Blue and green", colors: ["#087ca7", "#7aa33d"], image: "/spiral-hanging-blue-green.jpg" },
      { name: "Red and cream", colors: ["#c41f2c", "#f3e1c6"], image: "/spiral-hanging-red-cream.jpg" },
    ],
    options: [{ label: "One hanging", price: "$15" }],
  },
  {
    slug: "crochet-rose-hoop-wall-hanging", code: "W01", name: "Crochet Rose Hoop Wall Hanging", shortName: "Rose Hoop Wall Hanging", category: "Hanging décor", categorySlug: "hanging-decor",
    description: "A graceful crochet hoop arranged with dimensional pink roses, green leaves, and cascading leafy strands. A statement wall piece for a bedroom, nursery, entryway, or thoughtful handmade gift.",
    shortDescription: "Dimensional crochet roses and cascading leaves arranged on a yarn-wrapped hoop.", image: "/rose-hoop-wall-hanging.jpg", startingPrice: "$40",
    detailLabel: "Style", detailValue: "Floral hoop", colorLabel: "Four colorways shown",
    colors: [
      { name: "Y04 + Y03 pink roses", colors: ["#ec4e9a", "#f6bfd2"], image: "/rose-hoop-wall-hanging.jpg" },
      { name: "Y13 + Y15 blue roses", colors: ["#287cdb", "#c9e6f5"], image: "/rose-hoop-y13-y15.png" },
      { name: "Y01 + Y02 orange roses", colors: ["#f47a18", "#f5dcc0"], image: "/rose-hoop-y01-y02.png" },
      {
        name: "Six-color roses",
        colors: ["#e4142e", "#f5aa22", "#174bbf", "#f2ead8", "#c66bc7", "#f47a18"],
        image: "/rose-hoop-six-color.png",
      },
    ],
    options: [{ label: "One wall hanging", price: "$40" }],
  },
];

export const categories = [
  { slug: "all", label: "All products" }, { slug: "coasters", label: "Coasters" },
  { slug: "jewelry", label: "Jewelry" }, { slug: "hair-accessories", label: "Hair accessories" },
  { slug: "home-decor", label: "Home décor" }, { slug: "hanging-decor", label: "Hanging décor" },
];

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
