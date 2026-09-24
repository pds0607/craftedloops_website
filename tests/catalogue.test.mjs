import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);

test("catalogue includes all seven product routes", async () => {
  const source = await readFile(new URL("app/products.ts", root), "utf8");
  assert.equal([...source.matchAll(/code: "[A-Z][0-9]{2}"/g)].length, 7);
  assert.match(source, /crochet-cowrie-shell-necklace-set/);
  assert.match(source, /crochet-rose-hoop-wall-hanging/);
});

test("home page rotates three featured products", async () => {
  const source = await readFile(new URL("app/hero-carousel.tsx", root), "utf8");
  assert.match(source, /5000/);
  assert.match(source, /navratri-mirror-jewelry-set/);
  assert.match(source, /crochet-rose-hoop-wall-hanging/);
});

test("production output includes the inquiry handler", async () => {
  await access(new URL("dist/client/send-inquiry.php", root));
  const handler = await readFile(new URL("public/send-inquiry.php", root), "utf8");
  assert.match(handler, /inquiry@craftedloops\.art/);
  assert.match(handler, /FILTER_VALIDATE_EMAIL/);
  assert.match(handler, /custom_color_details/);
});

test("all products include the Y01-Y15 custom color builder", async () => {
  const detail = await readFile(new URL("app/products/[slug]/product-detail.tsx", root), "utf8");
  const palette = await readFile(new URL("app/yarn-colors.ts", root), "utf8");
  const customizers = await readFile(new URL("app/product-customizers.ts", root), "utf8");
  assert.match(detail, /Additional Color options/);
  assert.match(detail, /className="yarn-overview"/);
  assert.match(customizers, /Copy Coaster 1 colors to all/);
  assert.match(detail, /custom_color_details/);
  assert.equal([...palette.matchAll(/code: "Y\d{2}"/g)].length, 15);
  assert.equal([...customizers.matchAll(/case "/g)].length, 7);
  assert.match(customizers, /Center \+ earrings color/);
  assert.match(customizers, /Spiral\/body \+ tassel color/);
  assert.match(customizers, /Inner rose color/);

  const productSlugs = [
    "bloom-coaster",
    "navratri-mirror-jewelry-set",
    "crochet-cowrie-shell-necklace-set",
    "crochet-gajara-scrunchie",
    "crochet-mandala-table-mat",
    "spiral-crochet-hanging",
    "crochet-rose-hoop-wall-hanging",
  ];
  for (const slug of productSlugs) {
    const html = await readFile(new URL(`dist/client/products/${slug}/index.html`, root), "utf8");
    assert.match(html, /Additional Color options/, `${slug} should render the custom color builder`);
    assert.match(html, /class="yarn-overview"/, `${slug} should include the 15-color palette`);
  }
});
