export type ColorSlot = { id: string; label: string };
export type CustomizerItem = { id: string; label: string; slots: ColorSlot[] };

export type ProductCustomizer = {
  items: CustomizerItem[];
  fixed: string[];
  note: string;
  copyAllLabel?: string;
  copyPrevious?: boolean;
};

const coasterSlots: ColorSlot[] = [
  { id: "center", label: "Center color" },
  { id: "flower1", label: "Flower color 1" },
  { id: "flower2", label: "Flower color 2" },
];

const flowerSlot: ColorSlot[] = [{ id: "flower", label: "Flower / bud color" }];

function repeatedItems(prefix: string, count: number, slots: ColorSlot[]): CustomizerItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    label: `${prefix} ${index + 1}`,
    slots,
  }));
}

export function getProductCustomizer(slug: string, option: string): ProductCustomizer | null {
  switch (slug) {
    case "bloom-coaster": {
      const count = option === "Set of 4" ? 4 : 1;
      return {
        items: repeatedItems("Coaster", count, coasterSlots),
        fixed: ["Leaves and stems: Green"],
        note: "We’ll make your coaster with the yarn colors you choose. The photo will not update to show your selection.",
        copyAllLabel: count > 1 ? "Copy Coaster 1 colors to all" : undefined,
        copyPrevious: count > 1,
      };
    }
    case "navratri-mirror-jewelry-set":
      return option === "Earrings only"
        ? {
            items: [{ id: "earrings", label: "Earrings", slots: [{ id: "earring", label: "Earring color" }] }],
            fixed: ["Mirrors, silver bells and jump rings"],
            note: "Choose the yarn color for the matching pair of earrings.",
          }
        : {
            items: [{ id: "set", label: "Full set", slots: [
              { id: "center", label: "Center + earrings color" },
              { id: "accent1", label: "Accent color 1" },
              { id: "accent2", label: "Accent color 2" },
            ] }],
            fixed: ["Mirrors, silver bells and jump rings"],
            note: "The earrings automatically match the necklace center. Accent colors will be arranged symmetrically.",
          };
    case "crochet-cowrie-shell-necklace-set":
      return option === "Earrings only"
        ? {
            items: [{ id: "earrings", label: "Earrings", slots: [{ id: "earring", label: "Earring color" }] }],
            fixed: ["Cowrie shells, mirrors and decorative components"],
            note: "Choose the main yarn color for the matching pair of earrings.",
          }
        : {
            items: [{ id: "set", label: "Full set", slots: [{ id: "main", label: "Necklace + earrings color" }] }],
            fixed: ["Cowrie shells, mirrors and decorative components"],
            note: "The earrings automatically match the necklace's main crochet color.",
          };
    case "pearl-chime-necklace-set":
      return {
        items: [{ id: "set", label: option === "Earrings only" ? "Earrings" : "Full set", slots: [
          { id: "circle", label: "Necklace circles + earring scallops color" },
          { id: "scallop", label: "Necklace scallops + earring centers color" },
          ...(option === "Earrings only" ? [] : [{ id: "cord", label: "Cord color" }]),
        ] }],
        fixed: ["White pearl centers, silver bells and metal hardware"],
        note: "The two yarn colors are reversed in the matching earrings, as shown in the photo. The photo will not update to show your selection.",
      };
    case "crochet-bell-anklet-pair":
      return {
        items: [{ id: "pair", label: "Anklet pair", slots: [
          { id: "circle1", label: "Alternating circle color 1" },
          { id: "circle2", label: "Alternating circle color 2" },
        ] }],
        fixed: ["Silver bells and metal hardware"],
        note: "Choose two alternating yarn colors for the pair. Both anklets will use the same colors. The photo will not update to show your selection.",
      };
    case "chime-anklet-pair":
      return {
        items: [{ id: "pair", label: "Anklet pair", slots: [{ id: "main", label: "Yarn color" }] }],
        fixed: ["Bells, clasps and extension chains"],
        note: "Choose one yarn color for the matching pair. Both anklets will use the same color. The photo will not update to show your selection.",
      };
    case "lace-chime-anklet-pair":
      return {
        items: [{ id: "pair", label: "Anklet pair", slots: [{ id: "main", label: "Yarn color" }] }],
        fixed: ["Colorful bells, clasps and extension chains"],
        note: "Choose one yarn color for the matching pair. Both anklets will use the same color. The photo will not update to show your selection.",
      };
    case "mirror-chime-hair-clip":
      return {
        items: [{ id: "clip", label: "Hair clip", slots: [
          { id: "body", label: "Main/body color" },
          { id: "ring", label: "Accent ring color" },
        ] }],
        fixed: ["Center mirror and metal clip hardware"],
        note: "Choose the main and accent yarn colors for your hair clip. Bell colors will be coordinated with your selection. The photo will not update to show your colors.",
      };
    case "festive-square-bracelet-bajubandh":
      return {
        items: [{ id: "bracelet", label: "Bracelet / bajubandh", slots: [
          { id: "center", label: "Color 1 (center)" },
          { id: "band2", label: "Color 2" },
          { id: "band3", label: "Color 3" },
          { id: "band4", label: "Color 4" },
          { id: "outer", label: "Color 5 (outer)" },
          { id: "border", label: "Border + ties color" },
        ] }],
        fixed: ["Center mirror, cowrie-style beads and silver bells", "Square pattern and adjustable ties"],
        note: "Your five selected colors will form the square from the center outward; the final color will be used for the border and ties. The photo will not update to show your selection.",
      };
    case "crochet-gajara-scrunchie": {
      const count = option === "Set of 2" ? 2 : 1;
      return {
        items: repeatedItems("Scrunchie", count, flowerSlot),
        fixed: ["Center and base: Green"],
        note: "Choose the flower color for each scrunchie. The green center and base remain fixed.",
        copyAllLabel: count > 1 ? "Copy Scrunchie 1 color to Scrunchie 2" : undefined,
        copyPrevious: count > 1,
      };
    }
    case "crochet-mandala-table-mat":
      return {
        items: [{ id: "mat", label: "Table mat", slots: [
          { id: "primary", label: "Primary color" },
          { id: "secondary", label: "Secondary color" },
        ] }],
        fixed: ["Scallop pattern and construction"],
        note: "The two selected colors will alternate according to the photographed mandala pattern.",
      };
    case "spiral-crochet-hanging":
      return {
        items: [{ id: "hanging", label: "Spiral hanging", slots: [
          { id: "body", label: "Spiral/body + tassel color" },
          { id: "border", label: "Border + hanging loop color" },
        ] }],
        fixed: ["Spiral pattern and construction"],
        note: "The tassel matches the spiral body; the hanging loop matches the border.",
      };
    case "crochet-rose-hoop-wall-hanging":
      return {
        items: [{ id: "hoop", label: "Rose hoop", slots: [
          { id: "inner", label: "Inner rose color" },
          { id: "outer", label: "Outer rose color" },
        ] }],
        fixed: ["Green leaves, strands and hoop", "12-inch hoop and floral arrangement"],
        note: "The selected inner and outer colors will be used for every rose. Choose the same color twice for solid-color roses.",
      };
    default:
      return null;
  }
}
