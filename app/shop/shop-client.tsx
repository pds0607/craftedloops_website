"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "../product-card";
import { categories, products } from "../products";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") ?? "all";
  const [selected, setSelected] = useState(categories.some((item) => item.slug === initial) ? initial : "all");
  const visible = selected === "all" ? products : products.filter((product) => product.categorySlug === selected);
  return <><div className="category-filter" role="group" aria-label="Filter products by category">{categories.map((category) => <button key={category.slug} className={selected === category.slug ? "active" : ""} onClick={() => setSelected(category.slug)}>{category.label}</button>)}</div><div className="shop-results"><p>{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "product" : "products"}</p><div className="shop-grid">{visible.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></>;
}
