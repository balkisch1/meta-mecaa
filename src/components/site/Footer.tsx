export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-10 relative overflow-hidden">

      {/* decorative glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-copper opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 relative">

        <div className="grid md:grid-cols-4 gap-14 mb-16">

          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="
                w-12 h-12 rounded-sm
                bg-gradient-gold
                flex items-center justify-center
                font-display font-bold text-gold-foreground text-xl
                shadow-gold
              ">
                M
              </div>

              <div>
                <div className="font-display text-xl font-semibold tracking-tight">
                  Meta Meca
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/60">
                  Industries
                </div>
              </div>
            </div>

            <p className="text-white/60 max-w-md leading-relaxed">
              Meta Meca Industries — Spécialiste de la menuiserie sur mesure,
              de la fabrication métallique et du design intérieur en Tunisie.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">
              Navigation
            </h4>

            <ul className="space-y-3 text-white/70 text-sm">
              {[
                ["Accueil", "#accueil"],
                ["Services", "#services"],
                ["Process", "#process"],
                ["Projets", "#projets"],
                ["Contact", "#contact"],
              ].map(([label, link]) => (
                <li key={label}>
                  <a
                    href={link}
                    className="
                      hover:text-gold
                      transition-colors
                      inline-block
                    "
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">
              Contact
            </h4>

            <ul className="space-y-3 text-white/70 text-sm">
              <li>
                Tél :{" "}
                <a href="tel:94703066" className="hover:text-gold transition">
                  94 703 066
                </a>
              </li>

              <li className="hover:text-gold transition">
                WhatsApp : +216 94 703 066
              </li>

              <li className="hover:text-gold transition">
                contact@metameca.tn
              </li>

              <li className="hover:text-gold transition">
                Tunis, Tunisie
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="
          pt-8 border-t border-white/10
          flex flex-col md:flex-row
          justify-between items-center
          gap-4 text-xs text-white/50
        ">
          <p>
            © {new Date().getFullYear()} Meta Meca Industries. Tous droits réservés.
          </p>

          <p className="tracking-[0.25em] uppercase text-white/40">
            Design • Qualité • Sur mesure
          </p>
        </div>

      </div>
    </footer>
  );
}