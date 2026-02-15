"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Check, Loader2, ChevronLeft, ChevronRight, X, Flame, Droplets, Coffee, Thermometer, Send, Clock, MapPin, Menu, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, type Product } from "@/data/products";
import { MagicCard } from "@/components/magicui/magic-card";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Highlighter } from "@/components/magicui/highlighter";
import { Lens } from "@/components/magicui/lens";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SaveButton } from "@/components/ui/save-button";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ========== CART STATE ==========
type CartItem = { id: string; weight: string; qty: number };

// ========== ANIMATED CART BUTTON ==========
function AnimatedCartButton({ onClick }: { onClick: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => { setStatus("success"); onClick(); setTimeout(() => setStatus("idle"), 1500); }, 600);
  };
  return (
    <RippleButton
      rippleColor="#ADD8E6"
      onClick={handleClick}
      className={cn("w-full transition-all duration-300", status === "success" && "!bg-green-600 hover:!bg-green-700")}
    >
      {status === "idle" && <><ShoppingCart className="mr-2 h-4 w-4" /> В корзину</>}
      {status === "loading" && <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Добавление...</>}
      {status === "success" && <><Check className="mr-2 h-4 w-4" /> Добавлено!</>}
    </RippleButton>
  );
}

// ========== INTERACTIVE RATING ==========
function InteractiveRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">Оцените товар:</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="focus:outline-none transition-transform hover:scale-110">
            <Star className={cn("h-5 w-5 transition-all duration-200", (hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground hover:text-yellow-400")} />
          </button>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">{rating > 0 ? `${rating}/5 — Спасибо!` : ""}</p>
    </div>
  );
}

// ========== PRODUCT CARD ==========
function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: (w: string) => void; onOpen: () => void }) {
  const weights = Object.keys(product.prices);
  const [weight, setWeight] = useState(weights[0]);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <MagicCard gradientColor="#D9D9D955" className="overflow-hidden border bg-card group">
      {/* Image with gallery */}
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={onOpen}>
        <Image src={product.images[imgIdx] || product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
        {product.premium && (
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">Премиум</span>
        )}
        {/* Expand icon on hover */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          </div>
        </div>
        {product.images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + product.images.length) % product.images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % product.images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {product.images.slice(0, 5).map((_, i) => (
                <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === imgIdx ? "bg-white w-4" : "bg-white/40")} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors" onClick={onOpen}>{product.name}</h3>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">{product.nameZh}</p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Weights */}
        <div className="flex flex-wrap gap-1">
          {weights.map((w) => (
            <button key={w} onClick={() => setWeight(w)}
              className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all",
                w === weight ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
              )}>
              {w}
            </button>
          ))}
          {product.unit === "10г" && (
            <button onClick={() => onAdd("10г")} className="w-7 h-7 rounded-full border border-amber-500 text-amber-500 flex items-center justify-center text-sm hover:bg-amber-500 hover:text-white transition-all" title="+10г">+</button>
          )}
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-bold text-amber-700">{product.prices[weight]?.toLocaleString()} ₽</span>
          <InteractiveRating />
        </div>
        <AnimatedCartButton onClick={() => onAdd(weight)} />
      </div>
    </MagicCard>
  );
}

// ========== PRODUCT MODAL ==========
function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (w: string) => void }) {
  const weights = Object.keys(product.prices);
  const [weight, setWeight] = useState(weights[0]);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 backdrop-blur-sm bg-zinc-900/30 animate-[fadeIn_0.3s_ease]" onClick={onClose}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border flex flex-col md:flex-row max-h-[85vh] md:h-[600px] animate-[scaleIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors hover:bg-background border border-border/50 shadow-sm">
          <X className="w-4 h-4" />
        </button>

        {/* Image Section (2/3) with Lens */}
        <div className="relative w-full md:w-2/3 bg-muted flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border">
          {product.images.length > 1 && (
            <>
              <button onClick={() => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/50 shadow-sm transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setImgIdx((i) => (i + 1) % product.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/50 shadow-sm transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <Lens zoomFactor={2} lensSize={150}>
            <Image src={product.images[imgIdx] || product.images[0]} alt={product.name} width={500} height={500} className="max-h-full max-w-full w-auto object-contain rounded-lg shadow-lg" />
          </Lens>
          {/* Gallery dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.slice(0,8).map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={cn("w-2 h-2 rounded-full transition-all", i === imgIdx ? "bg-primary w-5" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} />
              ))}
            </div>
          )}
        </div>

        {/* Info Section (1/3) */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-card overflow-y-auto">
          <div>
            <span className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
              {product.category === "set" ? "Набор" : product.premium ? "Премиум" : product.category}
            </span>
            <h2 className="text-xl font-semibold tracking-tight mb-1">{product.name}</h2>
            <p className="text-amber-600 text-xs mb-4">{product.nameZh}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.fullDescription}</p>
            
            {/* Brewing meta */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-muted p-2.5 rounded-lg"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Температура</p><p className="font-semibold text-xs">{product.brewing.temp}</p></div>
              <div className="bg-muted p-2.5 rounded-lg"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Проливов</p><p className="font-semibold text-xs">{product.brewing.steeps}</p></div>
            </div>

            {/* Weights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {weights.map((w) => (
                <button key={w} onClick={() => setWeight(w)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                    w === weight ? "border-primary bg-primary/5 text-primary" : "border-border"
                  )}>{w}</button>
              ))}
            </div>

            <div className="text-3xl font-bold text-amber-700 mb-2">{product.prices[weight]?.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">₽</span></div>
          </div>

          {/* Bottom actions - matching gallery pattern */}
          <div className="flex gap-3 pt-4 border-t border-border mt-auto">
            <SaveButton
              text={{ idle: "Заказать", saving: "Добавляем...", saved: "В корзине!" }}
              onSave={async () => {
                await new Promise(r => setTimeout(r, 600));
                onAdd(weight);
                setTimeout(onClose, 1200);
              }}
              className="flex-1 px-6 py-2.5"
            />
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96) translateY(10px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

// ========== TESTIMONIALS ==========
const testimonials = [
  { id: 1, name: "Алексей М.", city: "Алматы", text: "Императорский Гун Тин — это нечто. Ноты инжира и кедровой смолы. 15 проливов и каждый раз новые оттенки." },
  { id: 2, name: "Мария К.", city: "Астана", text: "Те Гуань Инь Ван — просто магия. Орхидея, сливки, мёд. Пью каждый день уже три месяца!" },
  { id: 3, name: "Ерлан Д.", city: "Караганда", text: "Набор «Путешествие по Пуэрам» — лучший подарок! Дикий Шен с лесной свежестью покорил." },
  { id: 4, name: "Динара А.", city: "Шымкент", text: "ГАБА медовая — ключ к вечернему спокойствию. Тёплый вкус, полное расслабление." },
  { id: 5, name: "Тимур Б.", city: "Алматы", text: "Да Хун Пао премиум — настоящее чайное опьянение. Ясность ума и глубокое расслабление одновременно." },
  { id: 6, name: "Айгуль С.", city: "Астана", text: "Шу Пуэр в мандарине — идеальный подарок. Удивляет видом, вкусом и ритуалом заваривания." },
];

const TelegramLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/></svg>
);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="min-w-96 max-w-sm rounded-xl bg-accent p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground font-medium text-xl">{t.name.charAt(0)}</AvatarFallback></Avatar>
          <div><p className="font-semibold">{t.name}</p><p className="text-sm text-muted-foreground">{t.city}</p></div>
        </div>
        <a href="https://t.me/Cha_hai_tea" target="_blank" className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground">
          <TelegramLogo className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-5 text-[17px]">«{t.text}»</p>
      <div className="flex gap-0.5 mt-3">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <section className="flex items-center justify-center py-24">
      <div className="h-full w-full">
        <h2 className="text-pretty px-6 text-center font-semibold text-5xl tracking-[-0.03em]">Отзывы клиентов</h2>
        <p className="mt-3 text-center text-muted-foreground text-xl">Реальные истории тех, кто пьёт наш чай каждый день</p>
        <div className="relative mt-14">
          <div className="absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-background to-transparent" />
          <Marquee className="[--duration:20s]" pauseOnHover>
            {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </Marquee>
          <Marquee className="mt-0 [--duration:20s]" pauseOnHover reverse>
            {testimonials.map((t) => <TestimonialCard key={t.id + 10} t={t} />)}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

// ========== API HELPER ==========
const API_BASE = process.env.NEXT_PUBLIC_BOT_API || "";

async function sendToBot(endpoint: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.ok === true;
  } catch {
    return false;
  }
}

// ========== ORDER FORM MODAL ==========
function OrderFormModal({
  cart,
  total,
  onClose,
  onSuccess,
}: {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [contactType, setContactType] = useState<"telegram" | "whatsapp">("telegram");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!contact.trim()) return;
    setStatus("sending");

    const items = cart.map((item) => {
      const p = products.find((x) => x.id === item.id);
      return {
        name: p?.name || item.id,
        weight: item.weight,
        qty: item.qty,
        price: p ? (p.prices[item.weight] || 0) * item.qty : 0,
      };
    });

    const ok = await sendToBot("/api/order", {
      name: name.trim() || "Не указано",
      contactType,
      contact: contact.trim(),
      items,
      total,
    });

    setStatus(ok ? "success" : "error");
    if (ok) setTimeout(onSuccess, 1800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 backdrop-blur-sm bg-zinc-900/40 animate-[fadeIn_0.3s_ease]" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl bg-card shadow-2xl ring-1 ring-border p-8 animate-[scaleIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
            <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-1">Оформление заказа</h3>
            <p className="text-sm text-muted-foreground mb-6">Укажите контакт, и мы напишем вам для подтверждения</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ваше имя</label>
                <Input placeholder="Как к вам обращаться?" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Куда написать?</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContactType("telegram")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                      contactType === "telegram"
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-border hover:border-blue-300"
                    )}
                  >
                    <TelegramLogo className="w-4 h-4" />
                    Telegram
                  </button>
                  <button
                    onClick={() => setContactType("whatsapp")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                      contactType === "whatsapp"
                        ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "border-border hover:border-green-300"
                    )}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {contactType === "telegram" ? "Ваш ник в Telegram" : "Номер WhatsApp"}
                </label>
                <Input
                  placeholder={contactType === "telegram" ? "@username" : "+7 (___) ___-__-__"}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Ваш заказ ({cart.reduce((s, i) => s + i.qty, 0)} поз.):</p>
                {cart.map((item, i) => {
                  const p = products.find((x) => x.id === item.id);
                  return <p key={i}>{p?.name} — {item.weight} x{item.qty}</p>;
                })}
                <p className="font-bold text-foreground mt-1">Итого: {total.toLocaleString()} ₽</p>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500 text-center">Не удалось отправить. Попробуйте ещё раз.</p>
              )}

              <ShimmerButton
                className="w-full shadow-lg"
                onClick={handleSubmit}
                disabled={!contact.trim() || status === "sending"}
              >
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  {status === "sending" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Отправляем...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Отправить заявку</>
                  )}
                </span>
              </ShimmerButton>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96) translateY(10px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

// ========== CONTACT FORM ==========
function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!contact.trim()) return;
    setStatus("sending");
    const ok = await sendToBot("/api/contact", {
      name: name.trim() || "Не указано",
      contact: contact.trim(),
      message: message.trim(),
    });
    setStatus(ok ? "success" : "error");
    if (ok) {
      setName("");
      setContact("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Ваше имя" className="bg-zinc-800 border-zinc-700 text-white" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Telegram или WhatsApp" className="bg-zinc-800 border-zinc-700 text-white" value={contact} onChange={(e) => setContact(e.target.value)} />
      <textarea
        placeholder="Сообщение"
        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-amber-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {status === "success" && <p className="text-green-400 text-sm">Сообщение отправлено!</p>}
      {status === "error" && <p className="text-red-400 text-sm">Ошибка. Попробуйте ещё раз.</p>}
      <RippleButton
        rippleColor="#C5943A"
        className="bg-amber-600 hover:bg-amber-700"
        onClick={handleSubmit}
        disabled={!contact.trim() || status === "sending"}
      >
        {status === "sending" ? "Отправляем..." : "Отправить"}
      </RippleButton>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const addToCart = (id: string, weight: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id && i.weight === weight);
      if (existing) return prev.map((i) => i.id === id && i.weight === weight ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, weight, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const p = products.find((x) => x.id === i.id);
    return s + (p?.prices[i.weight] || 0) * i.qty;
  }, 0);

  const filtered = filter === "all" ? products
    : filter === "premium" ? products.filter((p) => p.premium)
    : filter === "pressed" ? products.filter((p) => p.tags.includes("pressed"))
    : products.filter((p) => p.category === "set");

  const filters = [
    { key: "all", label: "Весь ассортимент" },
    { key: "premium", label: "Премиум" },
    { key: "pressed", label: "Прессованный" },
    { key: "set", label: "Наборы" },
  ];

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/images/logo-0.jpg" alt="Cha-hai" width={36} height={36} className="rounded-full border border-amber-500/50" />
            <div><span className="font-bold text-lg tracking-wide">茶海</span><span className="text-[10px] text-amber-600 block -mt-1 tracking-[3px]">CHA-HAI</span></div>
          </a>
          <nav className="hidden md:flex gap-8">
            {["Каталог", "Философия", "О нас", "Контакты"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="text-xs uppercase tracking-[2px] text-muted-foreground hover:text-foreground transition-colors">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button className="md:hidden" onClick={() => setMobileNav(!mobileNav)}><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* HERO - Full screen with logo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/images/logo-0.jpg" alt="Cha-hai" fill className="object-cover brightness-[0.3]" priority />
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <p className="text-amber-400 text-xs tracking-[6px] uppercase mb-6 animate-[fadeUp_0.8s_ease_0.2s_both]">茶海 · Чайное море</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-[fadeUp_0.8s_ease_0.4s_both]">В поисках <em className="text-amber-400 not-italic">истинного</em> чая</h1>
          <p className="text-white/50 text-lg md:text-xl max-w-lg mx-auto mb-10 animate-[fadeUp_0.8s_ease_0.6s_both]">Только чай, который заставляет остановиться и ощутить подлинность момента</p>
          <div className="animate-[fadeUp_0.8s_ease_0.8s_both] flex justify-center">
            <SaveButton
              text={{ idle: "ПЕРЕЙТИ В КАТАЛОГ", saving: "Переходим...", saved: "Добро пожаловать!" }}
              onSave={async () => {
                await new Promise(r => setTimeout(r, 800));
                document.getElementById("каталог")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-10 py-3 text-base"
            />
          </div>
        </div>
        <style jsx>{`@keyframes fadeUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:none } }`}</style>
      </section>

      {/* ADVANTAGES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-xs tracking-[4px] uppercase font-medium mb-3">Почему Cha-hai</p>
            <h2 className="text-4xl font-bold tracking-tight">Наши принципы</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Star className="w-7 h-7" />, title: "Только 1-й класс", desc: "Мы не продаём сырьё даже 2-го класса" },
              { icon: <Send className="w-7 h-7" />, title: "Прямые поставки", desc: "Лично выезжаем в Китай и дегустируем" },
              { icon: <Coffee className="w-7 h-7" />, title: "17 позиций", desc: "Каждая — сотни сравнённых образцов" },
              { icon: <Droplets className="w-7 h-7" />, title: "От 10 г", desc: "Попробуйте прежде чем покупать много" },
            ].map((a, i) => (
              <MagicCard key={i} gradientColor="#D9D9D955" className="p-8 text-center border">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">{a.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="каталог" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs tracking-[4px] uppercase font-medium mb-3">品味 · Коллекция</p>
            <h2 className="text-4xl font-bold tracking-tight">Наш ассортимент</h2>
          </div>
          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {filters.map((f) => (
              <RippleButton key={f.key} rippleColor={filter === f.key ? "#fff" : "#8B0000"}
                onClick={() => setFilter(f.key)}
                className={cn("text-xs tracking-wider uppercase px-5 py-2 rounded-full transition-all",
                  filter === f.key ? "bg-primary text-primary-foreground" : "bg-background text-foreground border border-border hover:border-primary/50 !shadow-none"
                )}>{f.label}</RippleButton>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={(w) => addToCart(p.id, w)} onOpen={() => setModalProduct(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="философия" className="py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image src="/images/dragon-tea.png" alt="Чайная церемония" fill className="object-cover" />
          </div>
          <div>
            <p className="text-amber-400 text-xs tracking-[4px] uppercase font-medium mb-3">茶海 · Философия</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Чайное море — <em className="text-amber-400 not-italic">Cha-hai</em></h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              茶海 (Cha-hai) — «чайное море». Китайское чайное наследие безбрежно, но его{" "}
              <Highlighter action="highlight" color="#C5943A">истинные жемчужины</Highlighter>{" "}
              теряются в шуме громких слов и красивых упаковок.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              За каждой из 17 позиций — сотни сравнённых образцов и простой принцип:{" "}
              <Highlighter action="underline" color="#C5943A">только чай, который заставляет остановиться</Highlighter>.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Это ваш проводник в море, где мы уже нашли острова, достойные вашего времени.
            </p>
          </div>
        </div>
      </section>

      {/* BREWING */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-xs tracking-[4px] uppercase font-medium mb-3">泡茶 · Заваривание</p>
            <h2 className="text-4xl font-bold tracking-tight">Гид по завариванию</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Flame className="w-8 h-8" />, title: "Нагрейте воду", desc: "80–95°C" },
              { icon: <Thermometer className="w-8 h-8" />, title: "Прогрейте посуду", desc: "Ополосните кипятком" },
              { icon: <Droplets className="w-8 h-8" />, title: "Промывка чая", desc: "Слейте через 5 сек" },
              { icon: <Coffee className="w-8 h-8" />, title: "Наслаждайтесь", desc: "15–60с, до 15 проливов" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-background border border-amber-200 shadow-md flex items-center justify-center mx-auto mb-5 text-amber-600 hover:-translate-y-1 transition-transform">{s.icon}</div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSection />

      {/* CONTACTS */}
      <section id="контакты" className="py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[4px] uppercase font-medium mb-3">联系我们</p>
            <h2 className="text-4xl font-bold tracking-tight">Свяжитесь с нами</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="flex gap-4 items-start"><Send className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" /><a href="https://t.me/Cha_hai_tea" className="text-zinc-400 hover:text-amber-400 transition">t.me/Cha_hai_tea</a></div>
              <div className="flex gap-4 items-start"><MapPin className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" /><p className="text-zinc-400">Казахстан — доставка по всей стране</p></div>
              <div className="flex gap-4 items-start"><Clock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" /><p className="text-zinc-400">Пн–Сб: 10:00–20:00, Вс: 12:00–18:00</p></div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-6 text-zinc-500">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg font-bold text-white mb-2">茶海 <span className="text-amber-400 text-xs tracking-[3px]">CHA-HAI</span></p>
          <p className="text-sm">В поисках истинного чая в море названий</p>
          <p className="text-xs mt-6">© 2026 Cha-hai 茶海. Все права защищены.</p>
        </div>
      </footer>

      {/* MODALS */}
      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={(w) => addToCart(modalProduct.id, w)} />}
      {showOrderModal && (
        <OrderFormModal
          cart={cart}
          total={cartTotal}
          onClose={() => setShowOrderModal(false)}
          onSuccess={() => {
            setShowOrderModal(false);
            setShowCart(false);
            setCart([]);
          }}
        />
      )}

      {/* CART PANEL */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="bg-black/50 absolute inset-0" />
          <div className="relative bg-card w-full max-w-md h-full shadow-2xl flex flex-col animate-[slideIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Корзина</h3>
              <button onClick={() => setShowCart(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-muted-foreground py-16">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Корзина пуста</p>
                  <p className="text-xs mt-1">Минимум 5 позиций</p>
                </div>
              ) : cart.map((item, i) => {
                const p = products.find((x) => x.id === item.id);
                if (!p) return null;
                return (
                  <div key={i} className="flex gap-3 py-3 border-b items-center">
                    <Image src={p.images[0]} alt="" width={50} height={50} className="rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{item.weight} × {item.qty}</p>
                    </div>
                    <p className="font-bold text-amber-700 text-sm">{((p.prices[item.weight] || 0) * item.qty).toLocaleString()}₽</p>
                    <button onClick={() => setCart((prev) => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between mb-4"><span className="text-muted-foreground">Итого</span><span className="text-2xl font-bold text-amber-700">{cartTotal.toLocaleString()} ₽</span></div>
                <ShimmerButton className="w-full shadow-lg" onClick={() => setShowOrderModal(true)}>
                  <span className="text-sm font-medium text-white">Оформить заказ</span>
                </ShimmerButton>
              </div>
            )}
          </div>
          <style jsx>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: none } }`}</style>
        </div>
      )}
    </div>
  );
}
