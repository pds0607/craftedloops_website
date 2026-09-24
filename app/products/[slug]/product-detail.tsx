"use client";

import { AtSign, Check, Mail, MessageCircle, Palette, Ruler, Send, Share2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { getProductCustomizer } from "../../product-customizers";
import type { Product } from "../../products";
import { getYarnColor, yarnColors, type YarnCode } from "../../yarn-colors";

export default function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [option, setOption] = useState(product.options[0]);
  const [photo, setPhoto] = useState(product.gallery?.[0].image ?? product.colors[0].image);
  const [notice, setNotice] = useState("");
  const [selectionMode, setSelectionMode] = useState<"inspiration" | "custom">("inspiration");
  const [customSelections, setCustomSelections] = useState<Record<string, YarnCode>>({});
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const selectedColor = product.colors.find((item) => item.name === color) ?? product.colors[0];
  const customizer = getProductCustomizer(product.slug, option.label);

  function selectionKey(itemId: string, slotId: string) {
    return `${option.label}:${itemId}:${slotId}`;
  }

  const customColorsComplete = Boolean(customizer?.items.every((item) =>
    item.slots.every((slot) => customSelections[selectionKey(item.id, slot.id)])
  ));

  function formatYarn(code: YarnCode | "") {
    const yarn = getYarnColor(code);
    return yarn ? `${yarn.code} ${yarn.name}` : "Not selected";
  }

  const customColorLines = customizer?.items.map((item) => {
    const selections = item.slots.map((slot) => `${slot.label}: ${formatYarn(customSelections[selectionKey(item.id, slot.id)] ?? "")}`);
    return `${item.label}: ${selections.join(" · ")}`;
  }) ?? [];
  const customColorDetails = selectionMode === "custom" && customizer
    ? [...customColorLines, ...customizer.fixed.map((detail) => `Fixed: ${detail}`)].join("\n")
    : "";
  const inquiryColor = selectionMode === "custom" ? "Custom combination" : color;
  const inquiryColorText = customColorDetails ? `${inquiryColor}\n${customColorDetails}` : inquiryColor;

  function chooseCustomColor(key: string, code: YarnCode) {
    setCustomSelections((current) => ({ ...current, [key]: code }));
  }

  function copyCustomizerItem(sourceIndex: number, targetIndexes: number[]) {
    if (!customizer) return;
    const source = customizer.items[sourceIndex];
    setCustomSelections((current) => {
      const next = { ...current };
      for (const targetIndex of targetIndexes) {
        const target = customizer.items[targetIndex];
        target.slots.forEach((slot, slotIndex) => {
          const sourceSlot = source.slots[slotIndex];
          const value = sourceSlot ? current[selectionKey(source.id, sourceSlot.id)] : undefined;
          const targetKey = selectionKey(target.id, slot.id);
          if (value) next[targetKey] = value;
          else delete next[targetKey];
        });
      }
      return next;
    });
  }

  function resetCustomizerItem(index: number) {
    if (!customizer) return;
    const item = customizer.items[index];
    setCustomSelections((current) => {
      const next = { ...current };
      item.slots.forEach((slot) => delete next[selectionKey(item.id, slot.id)]);
      return next;
    });
    if (activePicker?.startsWith(`${option.label}:${item.id}:`)) setActivePicker(null);
  }

  async function shareProduct() {
    const data = { title: `${product.name} | Crafted Loops by Purvi`, text: `Take a look at this ${product.name} by Crafted Loops.`, url: window.location.href };
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(window.location.href);
    setNotice("Product link copied!");
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function copyInstagramInquiry() {
    const text = `Hi Purvi, I'm interested in product ${product.code} — ${product.name}.\nColor/design: ${inquiryColorText}\nPurchase option: ${option.label} · ${option.price}\nProduct link: ${window.location.href}`;
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
            if (matching) { setColor(matching.name); setSelectionMode("inspiration"); }
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
            <button key={item.name} className={selectionMode === "inspiration" && color === item.name ? "combo active" : "combo"} onClick={() => { setColor(item.name); setPhoto(item.image); setSelectionMode("inspiration"); }} aria-pressed={selectionMode === "inspiration" && color === item.name}>
              <span className="swatches">{item.colors.map((value) => <i key={value} style={{ background: value }} />)}</span><span>{item.name}</span>{selectionMode === "inspiration" && color === item.name && <Check size={17} />}
            </button>
          ))}</div>
        </div>}
        <div className="purchase-options" aria-label="Choose purchase option">{product.options.map((item) => (
          <button key={item.label} className={option.label === item.label ? "purchase-option active" : "purchase-option"} onClick={() => setOption(item)} aria-pressed={option.label === item.label}>
            {option.label === item.label && <Check size={16} />}<span>{item.label}</span><strong>{item.price}</strong>
          </button>
        ))}</div>
        {customizer && <div className={selectionMode === "custom" ? "custom-color-builder active" : "custom-color-builder"}>
          <button className="custom-color-toggle" type="button" onClick={() => setSelectionMode("custom")} aria-pressed={selectionMode === "custom"}>
            <span><Palette size={19} /><b>Additional Color options</b></span>
            {selectionMode === "custom" && <Check size={18} />}
          </button>
          <div className="yarn-overview" role="group" aria-label="Available yarn colors" hidden={selectionMode !== "custom"}>{yarnColors.map((yarn) => (
            <span key={yarn.code} style={{ background: yarn.hex }} role="img" aria-label={`${yarn.code}: ${yarn.name}`} />
          ))}</div>
          {selectionMode === "custom" && <>
            <p className="custom-color-note">{customizer.note}</p>
            {customizer.copyAllLabel && <button className="copy-all-button" type="button" disabled={!customizer.items[0].slots.every((slot) => customSelections[selectionKey(customizer.items[0].id, slot.id)])} onClick={() => copyCustomizerItem(0, customizer.items.slice(1).map((_, index) => index + 1))}>{customizer.copyAllLabel}</button>}
            <div className="customizer-items">{customizer.items.map((item, itemIndex) => <section className="customizer-item" key={item.id}>
              <div className="customizer-item-heading"><h3>{item.label}</h3><div>{customizer.copyPrevious && itemIndex > 0 && <button type="button" onClick={() => copyCustomizerItem(itemIndex - 1, [itemIndex])}>Copy previous</button>}<button type="button" onClick={() => resetCustomizerItem(itemIndex)}>Reset</button></div></div>
              <div className="custom-color-fields">{item.slots.map((slot) => {
                const key = selectionKey(item.id, slot.id);
                const selected = getYarnColor(customSelections[key] ?? "");
                const pickerOpen = activePicker === key;
                return <div className="custom-color-field" key={slot.id}>
                  <button type="button" className={pickerOpen ? "color-field-button active" : "color-field-button"} onClick={() => setActivePicker(pickerOpen ? null : key)} aria-expanded={pickerOpen}>
                    <span>{slot.label}</span><strong>{selected ? <><i style={{ background: selected.hex }} />{selected.code} · {selected.name}</> : "Choose a color"}</strong>
                  </button>
                  {pickerOpen && <div className="yarn-palette" aria-label={`${slot.label} for ${item.label}`}>{yarnColors.map((yarn) => <button key={yarn.code} type="button" className={customSelections[key] === yarn.code ? "yarn-swatch selected" : "yarn-swatch"} onClick={() => { chooseCustomColor(key, yarn.code); setActivePicker(null); }} aria-pressed={customSelections[key] === yarn.code}>
                    <i style={{ background: yarn.hex }} /><span><b>{yarn.code}</b><small>{yarn.name}</small></span>{customSelections[key] === yarn.code && <Check size={16} />}
                  </button>)}</div>}
                </div>;
              })}</div>
              {customizer.fixed.map((detail) => <p className="fixed-color" key={detail}><i />{detail} (fixed)</p>)}
            </section>)}</div>
          </>}
        </div>}
        <div className="price-row">
          <div><small>Selected</small><strong>{option.label} · {option.price}</strong></div>
          <Dialog>
            <DialogTrigger asChild><button className="inquiry-button" disabled={selectionMode === "custom" && !customColorsComplete}><MessageCircle size={20} />Send inquiry</button></DialogTrigger>
            <DialogContent className="inquiry-dialog">
              <DialogHeader><span className="inquiry-icon"><Mail size={20} /></span><DialogTitle>Ask Purvi about this piece</DialogTitle><DialogDescription>Send your inquiry directly to Crafted Loops. Purvi will reply to the email you enter.</DialogDescription></DialogHeader>
              <div className="inquiry-summary"><span>{product.code} · {product.name}</span><strong>{inquiryColor}</strong>{customColorDetails && <small className="custom-inquiry-details">{customColorDetails}</small>}<small>{option.label} · {option.price}</small></div>
              <form className="inquiry-form" action="/send-inquiry.php" method="post">
                <input type="hidden" name="product_code" value={product.code} /><input type="hidden" name="product_name" value={product.name} /><input type="hidden" name="selected_color" value={inquiryColor} /><input type="hidden" name="custom_color_details" value={customColorDetails} /><input type="hidden" name="purchase_option" value={option.label} /><input type="hidden" name="price" value={option.price} /><input type="hidden" name="product_path" value={`/products/${product.slug}/`} />
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
        <p className="microcopy">{selectionMode === "custom" && !customColorsComplete ? "Choose a color for every customizable part to send your custom inquiry." : "Your inquiry goes directly to Purvi with the product, color, and purchase option included."}</p>
        {notice && <div className="toast" role="status"><Sparkles size={16} />{notice}</div>}
      </div>
    </section>
  );
}
