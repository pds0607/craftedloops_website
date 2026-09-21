import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { ProductCard } from "./product-card";
import { products } from "./products";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { HeroCarousel } from "./hero-carousel";

export default function Home() {
  return <main>
    <SiteHeader />
    <section className="home-hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={16} /> Handmade, one loop at a time</p><h1>Crochet pieces made to feel personal.</h1><p>Explore Purvi’s handmade designs, choose the colors you love, and send an inquiry for a piece made especially for you.</p><Link className="primary-link" href="/shop">Browse all products <ArrowRight size={18} /></Link></div><HeroCarousel /></section>
    <section className="home-products"><div className="section-heading"><div><p className="eyebrow">Made by Purvi</p><h2>Featured designs</h2></div><Link className="text-link" href="/shop">View the full shop →</Link></div><div className="shop-grid">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>
    <section className="category-band"><div><p className="eyebrow">Find your piece</p><h2>Browse by collection</h2></div><div className="category-links"><Link href="/shop?category=coasters"><span>01</span>Coasters <ArrowRight size={18} /></Link><Link href="/shop?category=jewelry"><span>02</span>Crochet jewelry <ArrowRight size={18} /></Link><Link href="/shop?category=hair-accessories"><span>03</span>Hair accessories <ArrowRight size={18} /></Link><Link href="/shop?category=home-decor"><span>04</span>Home décor <ArrowRight size={18} /></Link><Link href="/shop?category=hanging-decor"><span>05</span>Hanging décor <ArrowRight size={18} /></Link></div></section>
    <section className="how-it-works"><p className="eyebrow">Simple & personal</p><h2>From your idea to a personalised piece.</h2><div className="steps"><span><b>01</b>Choose a design</span><ChevronDown size={18} /><span><b>02</b>Pick your colors</span><ChevronDown size={18} /><span><b>03</b>Message Purvi</span></div></section>
    <SiteFooter />
  </main>;
}
