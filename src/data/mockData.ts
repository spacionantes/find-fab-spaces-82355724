export interface Space {
  id: string;
  title: string;
  address: string;
  city: string;
  price_per_hour: number;
  surface_m2: number;
  capacity: number;
  image_url: string;
  type: string;
  amenities: string[];
  rating: number;
  reviews_count: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  author: string;
  read_time_min: number;
  published_at: string;
  slug: string;
}

export const mockSpaces: Space[] = [
  {
    id: "1",
    title: "Salle Lumière - Espace de réunion",
    address: "12 rue de la Paix",
    city: "Paris",
    price_per_hour: 25,
    surface_m2: 45,
    capacity: 20,
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    type: "Salle de réunion",
    amenities: ["WiFi", "Vidéoprojecteur", "Tableau blanc"],
    rating: 4.8,
    reviews_count: 24,
  },
  {
    id: "2",
    title: "Atelier Créatif du Marais",
    address: "8 rue des Archives",
    city: "Paris",
    price_per_hour: 35,
    surface_m2: 80,
    capacity: 40,
    image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
    type: "Atelier",
    amenities: ["WiFi", "Cuisine", "Parking"],
    rating: 4.6,
    reviews_count: 18,
  },
  {
    id: "3",
    title: "Grand Hall Bastille",
    address: "45 boulevard Voltaire",
    city: "Paris",
    price_per_hour: 60,
    surface_m2: 200,
    capacity: 150,
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    type: "Salle événementielle",
    amenities: ["WiFi", "Sono", "Scène", "Vestiaire"],
    rating: 4.9,
    reviews_count: 42,
  },
  {
    id: "4",
    title: "Espace Coworking Nation",
    address: "22 avenue Daumesnil",
    city: "Paris",
    price_per_hour: 15,
    surface_m2: 30,
    capacity: 10,
    image_url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    type: "Coworking",
    amenities: ["WiFi", "Imprimante", "Café"],
    rating: 4.5,
    reviews_count: 31,
  },
  {
    id: "5",
    title: "Studio Danse République",
    address: "5 place de la République",
    city: "Paris",
    price_per_hour: 40,
    surface_m2: 120,
    capacity: 30,
    image_url: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop",
    type: "Studio",
    amenities: ["Miroirs", "Sono", "Vestiaire"],
    rating: 4.7,
    reviews_count: 15,
  },
  {
    id: "6",
    title: "Salle Polyvalente Montmartre",
    address: "18 rue Lepic",
    city: "Paris",
    price_per_hour: 30,
    surface_m2: 90,
    capacity: 60,
    image_url: "https://images.unsplash.com/photo-1517502884422-41eae6c63f6e?w=600&h=400&fit=crop",
    type: "Salle polyvalente",
    amenities: ["WiFi", "Cuisine", "Tables", "Chaises"],
    rating: 4.4,
    reviews_count: 28,
  },
];

export const mockArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Comment trouver le lieu idéal pour votre assemblée générale",
    excerpt: "Guide complet pour choisir un espace adapté aux besoins de votre association lors de vos événements annuels.",
    category: "Conseils",
    image_url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
    author: "Marie Dupont",
    read_time_min: 5,
    published_at: "2025-12-15",
    slug: "trouver-lieu-ideal-assemblee-generale",
  },
  {
    id: "2",
    title: "Les 10 erreurs à éviter quand on loue un espace associatif",
    excerpt: "De la vérification des assurances au contrat de location, découvrez les pièges courants.",
    category: "Guide",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    author: "Pierre Martin",
    read_time_min: 7,
    published_at: "2025-11-28",
    slug: "erreurs-location-espace-associatif",
  },
  {
    id: "3",
    title: "Rentabilisez vos espaces inutilisés : le guide du propriétaire",
    excerpt: "Transformez vos salles vides en source de revenus tout en aidant les associations locales.",
    category: "Propriétaires",
    image_url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop",
    author: "Sophie Leroux",
    read_time_min: 6,
    published_at: "2025-11-10",
    slug: "rentabiliser-espaces-inutilises",
  },
  {
    id: "4",
    title: "L'impact des espaces partagés sur la vie associative locale",
    excerpt: "Étude de cas : comment le partage d'espaces renforce le tissu associatif dans les quartiers.",
    category: "Actualités",
    image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
    author: "Lucas Bernard",
    read_time_min: 4,
    published_at: "2025-10-22",
    slug: "impact-espaces-partages-vie-associative",
  },
  {
    id: "5",
    title: "Organiser un événement caritatif : checklist complète",
    excerpt: "Tous les éléments à prévoir pour réussir votre prochain événement de collecte de fonds.",
    category: "Événements",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
    author: "Emma Girard",
    read_time_min: 8,
    published_at: "2025-10-05",
    slug: "organiser-evenement-caritatif-checklist",
  },
  {
    id: "6",
    title: "Spacio lance son programme de fidélité pour les associations",
    excerpt: "Découvrez les avantages exclusifs réservés aux associations qui utilisent régulièrement notre plateforme.",
    category: "Actualités",
    image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    author: "Équipe Spacio",
    read_time_min: 3,
    published_at: "2025-09-18",
    slug: "programme-fidelite-associations",
  },
];

export const howItWorksSteps = [
  { icon: "Search", title: "Recherchez", description: "Trouvez l'espace idéal par lieu, taille ou type", color: "pastel-blue" },
  { icon: "CalendarCheck", title: "Réservez", description: "Choisissez vos créneaux en quelques clics", color: "pastel-green" },
  { icon: "Star", title: "Évaluez", description: "Partagez votre expérience avec la communauté", color: "pastel-purple" },
  { icon: "Users", title: "Communauté", description: "Rejoignez un réseau d'associations engagées", color: "pastel-teal" },
  { icon: "MessageCircle", title: "Échangez", description: "Communiquez directement avec les propriétaires", color: "pastel-red" },
  { icon: "Zap", title: "Rapide", description: "Réponse garantie sous 24 heures", color: "pastel-indigo" },
];
