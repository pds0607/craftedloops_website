import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/" aria-label="Crafted Loops by Purvi home"><img src="/crafted-loops-logo.jpeg" alt="Crafted Loops logo" width="58" height="58" /><span><strong>Crafted Loops</strong><small>by Purvi</small></span></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/shop">Shop</Link></nav></header>;
}

export function SiteFooter() {
  return <footer><img src="/crafted-loops-logo.jpeg" alt="" width="72" height="72" /><div><strong>Crafted Loops by Purvi</strong><span>Crochet · Create · Inspire</span></div><p>Personalised crochet pieces, handmade with patience and care.</p></footer>;
}
