import { useState } from "react";
import { z } from "zod";
import { Phone, MapPin, Mail, Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  message: z.string().trim().min(5, "Message trop court").max(1000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const text = `Bonjour, je suis ${r.data.name} (${r.data.phone}). ${r.data.message}`;
    window.open(`https://wa.me/21694703066?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="py-28 lg:py-36 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
                Contact
              </span>
              <span className="h-px w-10 bg-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Démarrons votre <span className="italic text-gradient-gold">projet</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Devis gratuit, étude personnalisée. Notre équipe vous répond sous 24h.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10">
      <Reveal className="lg:col-span-2">
  <div className="
    bg-gradient-dark text-primary-foreground
    p-10 rounded-sm shadow-elegant h-full
    relative overflow-hidden
  ">

    {/* glow effect */}
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-copper opacity-20 blur-3xl" />

    <h3 className="font-display text-2xl font-semibold mb-8 relative">
      Restons en contact
    </h3>
              <div className="space-y-6">
               <a href="tel:94703066" className="flex items-start gap-4 group">
  <div className="w-12 h-12 rounded-sm bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
    <Phone className="w-5 h-5 text-gold-foreground" />
  </div>
  <div>
    <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1">
      Téléphone
    </div>
    <div className="text-lg font-medium group-hover:text-gold transition-colors">
      94 703 066
    </div>
  </div>
</a>  
                <a
                  href="https://wa.me/21694703066"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-sm bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                    <MessageCircle className="w-5 h-5 text-gold-foreground" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1">WhatsApp</div>
                    <div className="text-lg font-medium group-hover:text-gold transition-colors">+216 94 703 066</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                    <Mail className="w-5 h-5 text-gold-foreground" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1">Email</div>
                    <div className="text-lg font-medium">contact@metameca.tn</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                    <MapPin className="w-5 h-5 text-gold-foreground" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1">Atelier</div>
                    <div className="text-lg font-medium">Tunis, Tunisie</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 rounded-sm overflow-hidden">
               <iframe
  title="Localisation Meta Meca Industries"
  src="https://www.google.com/maps?q=Tunis,Tunisia&output=embed"
  className="
    w-full h-48 rounded-sm border-0
    grayscale hover:grayscale-0 transition
  "
  loading="lazy"
/>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={150}>
          <form
  onSubmit={submit}
  className="
    bg-card p-10 rounded-sm shadow-card h-full
    flex flex-col relative overflow-hidden
  "
>
  {/* glow */}
  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-gold opacity-10 blur-3xl" />

  <h3 className="font-display text-2xl font-semibold mb-8 relative">
    Demande de devis
  </h3>

  <div className="space-y-6 flex-1 relative">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Nom complet
                  </label>
                 <input
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
  maxLength={80}
  className="
    w-full bg-transparent
    border-b border-black/10
    focus:border-gold
    outline-none py-3
    text-foreground
    transition
  "
  placeholder="Votre nom"
/>
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Téléphone
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={30}
                    className="w-full bg-transparent border-0 border-b border-border focus:border-gold focus:outline-none py-3 text-foreground transition-colors"
                    placeholder="+216 ..."
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Votre projet
                  </label>
           <textarea
  value={form.message}
  onChange={(e) => setForm({ ...form, message: e.target.value })}
  maxLength={1000}
  rows={5}
  className="
    w-full bg-transparent
    border-b border-black/10
    focus:border-gold
    outline-none py-3
    text-foreground
    resize-none
    transition
  "
  placeholder="Décrivez votre projet..."
/>
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
              </div>
            <button
  type="submit"
  className="
    mt-8 group inline-flex items-center justify-center gap-3
    px-8 py-4
    bg-black text-white
    rounded-sm font-semibold
    hover:bg-gradient-gold hover:text-black
    transition-all
  "
>
             {sent ? (
  <>
    <CheckCircle2 className="w-5 h-5" />
    Envoyé via WhatsApp
  </>
) : (
  <>
    Envoyer la demande
    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </>
)}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}