import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "../../product-card";
import { getProduct, products } from "../../products";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import ProductDetail from "./product-detail";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = getProduct(slug); return product ? { title: `${product.name} | Crafted Loops by Purvi`, description: product.shortDescription } : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = getProduct(slug); if (!product) notFound(); const related = products.filter((item) => item.slug !== product.slug).slice(0, 2);
  return <main><SiteHeader /><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/shop">Shop</Link><span>/</span><span>{product.name}</span></nav><ProductDetail key={product.slug} product={product} /><section className="related-products"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>You may also like</h2></div><Link className="text-link" href="/shop">See all products →</Link></div><div className="shop-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></section><SiteFooter /></main>;
}
