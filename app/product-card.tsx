import Link from "next/link";
import type { Product } from "./products";

export function ProductCard({ product }: { product: Product }) {
  return <article className="shop-card"><Link className="shop-card-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} /><span>{product.code}</span></Link><div className="shop-card-copy"><p className="category">{product.category}</p><h3><Link href={`/products/${product.slug}`}>{product.shortName}</Link></h3><p>{product.shortDescription}</p><div><span>From <strong>{product.startingPrice}</strong></span><Link className="text-link" href={`/products/${product.slug}`}>View product <span aria-hidden="true">→</span></Link></div></div></article>;
}
