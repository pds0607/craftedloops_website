export const yarnColors = [
  { code: "Y01", name: "Vivid orange", hex: "#f47a18" },
  { code: "Y02", name: "Pale peach", hex: "#f5dcc0" },
  { code: "Y03", name: "Baby pink", hex: "#f6bfd2" },
  { code: "Y04", name: "Bright pink", hex: "#ec4e9a" },
  { code: "Y05", name: "Golden yellow", hex: "#f5aa22" },
  { code: "Y06", name: "Emerald green", hex: "#07834f" },
  { code: "Y07", name: "Leaf green", hex: "#7ebc31" },
  { code: "Y08", name: "Beige / taupe", hex: "#b9a080" },
  { code: "Y09", name: "Royal blue", hex: "#174bbf" },
  { code: "Y10", name: "Bright turquoise", hex: "#059bc2" },
  { code: "Y11", name: "Bright red", hex: "#e4142e" },
  { code: "Y12", name: "Ivory", hex: "#f2ead8" },
  { code: "Y13", name: "Bright blue", hex: "#287cdb" },
  { code: "Y14", name: "Orchid", hex: "#c66bc7" },
  { code: "Y15", name: "Powder blue", hex: "#c9e6f5" },
] as const;

export type YarnCode = (typeof yarnColors)[number]["code"];

export function getYarnColor(code: YarnCode | "") {
  return yarnColors.find((color) => color.code === code);
}
