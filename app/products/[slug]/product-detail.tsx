"use client";

import { AtSign, Check, Mail, MessageCircle, Palette, Ruler, Send, Share2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import type { Product } from "../../products";

export default function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [option, setOption] = useState(product.options[0]);
  const [photo, setPhoto] = useState(product.gallery?.[0].image ?? product.colors[0].image);
  const [notice, setNotice] = useState("");
  const selectedColor = product.colors.find((item) => item.name === color) ?? product.colors[0];

  async function shareProduct() {
    const data = { title: `${product.name} | Crafted Loops by Purvi`, text: `Take a look at this ${product.name} by Crafted Loops.`, url: window.location.href };
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(window.location.href);
    setNotice("Product link copied!");
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function copyInstagramInquiry() {
    const text = `Hi Purvi, I'm interested in product ${product.code} — ${product.name}, in ${color} (${option.label} · ${option.price}). Product link: ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setNotice("Inquiry copied — paste it into your Instagram message.");
    window.setTimeout(() => setNotice(""), 5000);
  }

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("inquiry");
    if (!status) return;
    const message = status === "sent"
      ? "Your inquiry was sent to Purvi!"
      : "Your inquiry could not be sent. Please try Instagram.";
    window.history.replaceState({}, "", window.location.pathname);
    const showTimer = window.setTimeout(() => setNotice(message), 0);
    const hideTimer = window.setTimeout(() => setNotice(""), 5000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const gallery = product.gallery ?? product.colors.map((item) => ({ image: item.image, alt: `${product.name} in ${item.name}` }));
  const mainImage = product.gallery ? photo : selectedColor.image;

  return (
    <section className="product-detail">
      <div className="detail-gallery">
        <div className="detail-main-image"><img src={mainImage} alt={`${product.name} in ${color}`} /><span className="product-code">{product.code}</span></div>
        {gallery.length > 1 && <div className="thumbnail-row" aria-label="Product photos">{gallery.map((item) => (
          <button key={item.image} className={mainImage === item.image ? "active" : ""} onClick={() => {
            setPhoto(item.image);
            const matching = product.colors.find((value) => value.image === item.image || value.image.replace(/\.(png|webp)$/, "") === item.image.replace("-mannequin", "").replace(/\.(png|webp)$/, ""));
            if (matching) setColor(matching.name);
          }} aria-label={`Show ${item.alt}`} aria-pressed={mainImage === item.image}><img src={item.image} alt="" /></button>
        ))}</div>}
      </div>
      <div className="detail-copy">
        <div className="detail-heading"><div><p className="category">{product.category}</p><h1>{product.name}</h1></div><button className="share-button" onClick={shareProduct}><Share2 size={18} /> Share</button></div>
        <p className="description">{product.description}</p>
        <div className="details-row"><span><Ruler size={18} /><b>{product.detailValue}</b><small>{product.detailLabel}</small></span><span><Palette size={18} /><b>{product.colorLabel}</b><small>handmade</small></span></div>
        {product.colors.length > 1 && <div className="selection">
          <div className="selection-title"><span>Choose your color inspiration</span><span>{color}</span></div>
          <div className="combination-grid">{product.colors.map((item) => (
            <button key={item.name} className={color === item.name ? "combo active" : "combo"} onClick={() => { setColor(item.name); setPhoto(item.image); }} aria-pressed={color === item.name}>
              <span className="swatches">{item.colors.map((value) => <i key={value} style={{ background: value }} />)}</span><span>{item.name}</span>{color === item.name && <Check size={17} />}
            </button>
          ))}</div>
        </div>}
        <div className="purchase-options" aria-label="Choose purchase option">{product.options.map((item) => (
          <button key={item.label} className={option.label === item.label ? "purchase-option active" : "purchase-option"} onClick={() => setOption(item)} aria-pressed={option.label === item.label}>
            {option.label === item.label && <Check size={16} />}<span>{item.label}</span><strong>{item.price}</strong>
          </button>
        ))}</div>
        <div className="price-row">
          <div><small>Selected</small><strong>{option.label} · {option.price}</strong></div>
          <Dialog>
            <DialogTrigger asChild><button className="inquiry-button"><MessageCircle size={20} />Send inquiry</button></DialogTrigger>
            <DialogContent className="inquiry-dialog">
              <DialogHeader><span className="inquiry-icon"><Mail size={20} /></span><DialogTitle>Ask Purvi about this piece</DialogTitle><DialogDescription>Send your inquiry directly to Crafted Loops. Purvi will reply to the email you enter.</DialogDescription></DialogHeader>
              <div className="inquiry-summary"><span>{product.code} · {product.name}</span><strong>{color}</strong><small>{option.label} · {option.price}</small></div>
              <form className="inquiry-form" action="/send-inquiry.php" method="post">
                <input type="hidden" name="product_code" value={product.code} /><input type="hidden" name="product_name" value={product.name} /><input type="hidden" name="selected_color" value={color} /><input type="hidden" name="purchase_option" value={option.label} /><input type="hidden" name="price" value={option.price} /><input type="hidden" name="product_path" value={`/products/${product.slug}/`} />
                <label className="form-honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
                <label>Your name<input name="customer_name" type="text" autoComplete="name" required maxLength={80} /></label>
                <label>Your email<input name="customer_email" type="email" autoComplete="email" required maxLength={160} /></label>
                <label>Instagram handle <span>(optional)</span><input name="instagram_handle" type="text" autoComplete="off" placeholder="@yourhandle" maxLength={80} /></label>
                <label>Message <span>(optional)</span><textarea name="message" rows={3} maxLength={1200} placeholder="Questions, preferred colors, or timing" /></label>
                <button className="inquiry-submit" type="submit"><Send size={18} />Send to Purvi</button><p>Your contact details are used only to reply to this inquiry.</p>
              </form>
              <div className="instagram-option"><div><span>Prefer Instagram?</span><small>Instagram cannot prefill a message, so we’ll copy the inquiry for you to paste.</small></div><a href="https://ig.me/m/craftedloops26" target="_blank" rel="noreferrer" onClick={copyInstagramInquiry}><AtSign size={17} />Copy inquiry &amp; open Instagram</a></div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="microcopy">Your inquiry goes directly to Purvi with the product, color, and purchase option included.</p>
        {notice && <div className="toast" role="status"><Sparkles size={16} />{notice}</div>}
      </div>
    </section>
  );
}
