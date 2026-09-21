import assert from "node:assert/strict";
import test from "node:test";

async function fetchPage(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Crafted Loops home page", async () => {
  const response = await fetchPage("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Crafted Loops/);
  assert.match(html, /Crochet pieces made to feel personal/);
});

test("renders a product page with inquiry controls", async () => {
  const response = await fetchPage("/products/bloom-coaster/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Bloom Coaster/);
  assert.match(html, /Send inquiry/);
});
