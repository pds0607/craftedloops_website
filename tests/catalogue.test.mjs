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
});
