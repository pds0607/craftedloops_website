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
