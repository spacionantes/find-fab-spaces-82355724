import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Users, ArrowRight, Search, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: MapPin,
    title: "Nantes et périphérie",
    description:
      "Retrouvez des salles disponibles dans le centre-ville de Nantes, à Saint-Herblain, Rezé, Orvault et sur toute la métropole nantaise.",
  },
  {
    icon: Clock,
    title: "Réservation flexible",
    description:
      "Louez une salle de réunion à l'heure, à la demi-journée ou à la journée selon vos besoins, sans engagement de longue durée.",
  },
  {
    icon: Shield,
    title: "Tarifs transparents",
    description:
      "Les prix sont affichés clairement pour chaque espace : pas de surprise, pas de frais cachés, réservation en quelques clics.",
  },
];

const features = [
  "Salle de réunion 4 personnes",
  "Salle de réunion 8 personnes",
  "Salle de réunion 12 personnes",
  "Salle de réunion 20 personnes",
  "Salle de séminaire",
  "Salle de formation",
  "Salle avec visioconférence",
  "Salle accessible PMR",
];

const neighborhoods = [
  "Centre-ville (Graslin, Tour Bretagne)",
  "Saint-Herblain",
  "Rezé",
  "Orvault",
  "Nantes Erdre",
  "Île de Nantes",
];

const LocationSalleReunionNantes = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Seo
        title="Location salle de réunion Nantes – Réservez en ligne | Spacio"
        description="Location de salles de réunion à Nantes et en métropole. Réservez à l'heure, demi-journée ou journée. Espaces équipés, tarifs transparents."
        path="/location-salle-reunion-nantes"
      />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Location salle de réunion à Nantes
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground text-justify">
            Vous cherchez une salle de réunion à louer à Nantes ? Spacio met à votre disposition une
            sélection d'espaces adaptés à vos réunions, séminaires et formations dans la métropole
            nantaise. Que vous soyez une association, une entreprise de l'ESS ou un collectif, trouvez
            facilement une salle équipée à louer à l'heure, à la demi-journée ou à la journée. Tous
            nos espaces sont situés à Nantes et dans les communes avoisinantes, avec des tarifs
            transparents et une réservation simple en ligne.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 text-base font-semibold"
              onClick={() => navigate("/explorer")}
            >
              <Search className="mr-2 h-5 w-5" />
              Voir les salles disponibles
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 py-6 text-base font-semibold"
              onClick={() => navigate("/commencer")}
            >
              Décrire mon besoin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Types de salles */}
      <section className="bg-surface-alt py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Quelle salle de réunion louer à Nantes ?
            </h2>
            <p className="text-muted-foreground">
              Toutes les capacités et configurations pour vos réunions
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((type, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">{type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quartiers */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Où louer une salle de réunion à Nantes ?
            </h2>
            <p className="text-muted-foreground">
              Des espaces dans tous les quartiers stratégiques de la métropole
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pastel-purple">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-semibold">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-surface-alt py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Pourquoi louer via Spacio ?
            </h2>
            <p className="text-muted-foreground">
              La location de salle de réunion à Nantes simplifiée
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {advantages.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-purple">
                  <r.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                  {r.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO texte */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl space-y-6 text-muted-foreground text-justify"
          >
            <h2 className="text-center text-2xl font-bold text-foreground">
              Tout savoir sur la location de salle de réunion à Nantes
            </h2>
            <p>
              Louer une salle de réunion à Nantes devient indispensable pour les associations,
              start-ups de l'économie sociale et solidaire (ESS) et entreprises qui ne disposent pas
              d'espace dédié en interne. La métropole nantaise offre un écosystème riche en espaces
              collaboratifs, salles de formation et lieux de séminaire. Spacio centralise ces
              ressources pour vous permettre de réserver rapidement et à des tarifs adaptés.
            </p>
            <p>
              Que vous organisiez un conseil d'administration, une formation interne, un atelier de
              sensibilisation ou une réunion de projet, vous trouverez sur Spacio une salle de
              réunion à Nantes correspondant à votre capacité, votre budget et votre localisation
              préférée. Les espaces référencés sont situés à proximité des transports en commun
              (tramway, busway, gare SNCF) pour faciliter l'accès de vos participants.
            </p>
            <p>
              La location de salle de réunion à l'heure est particulièrement prisée par les
              associations nantaises qui n'ont pas besoin d'un bureau permanent mais souhaitent
              disposer d'un cadre professionnel ponctuellement. Spacio négocie des tarifs
              préférentiels auprès des propriétaires pour rendre ces espaces accessibles au plus
              grand nombre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-surface-alt py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12"
          >
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Réservez votre salle de réunion à Nantes
            </h2>
            <p className="mb-8 text-muted-foreground text-justify">
              Parcourez les salles de réunion disponibles à Nantes et en métropole. Envoyez une
              demande de réservation en quelques clics et recevez une confirmation sous 24h.
            </p>
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 text-base font-semibold"
              onClick={() => navigate("/explorer")}
            >
              <Search className="mr-2 h-5 w-5" />
              Explorer les salles
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationSalleReunionNantes;
