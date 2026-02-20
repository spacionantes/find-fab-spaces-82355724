import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const footerLinks = {
  Plateforme: [
    { label: "Trouver un espace", href: "/explorer" },
    { label: "Proposer un espace", href: "/proposer" },
    { label: "Tarifs", href: "#" },
    { label: "Blog", href: "/blog" },
  ],
  Entreprise: [
    { label: "À propos", href: "#" },
    { label: "Équipe", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Ressources: [
    { label: "Centre d'aide", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Partenaires", href: "#" },
  ],
  Légal: [
    { label: "CGU", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const Footer = () => (
  <footer className="bg-navy text-[hsl(var(--navy-foreground))]">
    <div className="container py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-extrabold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold text-primary-foreground">Spacio</span>
          </div>
          <p className="text-sm leading-relaxed opacity-70">
            La marketplace d'espaces pour les associations. Trouvez ou proposez des lieux adaptés.
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-primary/20"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 text-sm font-semibold text-primary-foreground">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-60 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Spacio. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
