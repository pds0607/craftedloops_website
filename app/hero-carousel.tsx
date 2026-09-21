"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "./products";

const featuredProducts = [
  "bloom-coaster",
  "navratri-mirror-jewelry-set",
  "crochet-rose-hoop-wall-hanging",
]
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const swiping = useRef(false);
  const product = featuredProducts[current];

  useEffect(() => {
    const timer = window.setInterval(
      () => setCurrent((index) => (index + 1) % featuredProducts.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="hero-carousel"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance =
          (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        touchStart.current = null;
        if (Math.abs(distance) < 45) return;
        swiping.current = true;
        setCurrent((index) =>
          distance < 0
            ? (index + 1) % featuredProducts.length
            : (index - 1 + featuredProducts.length) % featuredProducts.length,
        );
        window.setTimeout(() => {
          swiping.current = false;
        }, 250);
      }}
      aria-label="Featured products"
    >
      <Link
        key={product.slug}
        className="hero-feature hero-slide"
        href={`/products/${product.slug}`}
        onClick={(event) => {
          if (swiping.current) event.preventDefault();
        }}
      >
        <img src={product.image} alt={product.name} />
        <span>
          <small>Featured piece</small>
          <strong>{product.shortName}</strong>
          <em>From {product.startingPrice} · View product →</em>
        </span>
      </Link>
      <div className="hero-dots" aria-label="Choose a featured product">
        {featuredProducts.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            className={index === current ? "active" : ""}
            onClick={() => setCurrent(index)}
            aria-label={`Show ${item.name}`}
            aria-pressed={index === current}
          />
        ))}
      </div>
    </div>
  );
}
