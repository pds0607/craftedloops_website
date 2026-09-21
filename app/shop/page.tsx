import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../site-chrome";
import ShopClient from "./shop-client";

export default function ShopPage() {
  return <main><SiteHeader /><section className="page-intro"><p className="eyebrow">The catalogue</p><h1>Find something made for you.</h1><p>Browse every available design, then open a product to explore its colors, pricing, and inquiry options.</p></section><section className="shop-page"><Suspense fallback={null}><ShopClient /></Suspense></section><SiteFooter /></main>;
}
