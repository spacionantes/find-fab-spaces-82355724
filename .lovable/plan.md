

## Creer la table `blog` sur Supabase et connecter le front-end

### 1. Migration : creer la table `blog`

Creer une table Supabase avec les colonnes suivantes :

```text
blog
  id            uuid        PK, default gen_random_uuid()
  title         text        NOT NULL
  slug          text        NOT NULL, UNIQUE
  excerpt       text        NOT NULL
  content       text        NOT NULL
  category      text        NOT NULL
  image_url     text
  author        text        NOT NULL
  read_time_min integer     NOT NULL, default 5
  published_at  timestamptz NOT NULL, default now()
  created_at    timestamptz NOT NULL, default now()
  updated_at    timestamptz NOT NULL, default now()
```

Politiques RLS :
- SELECT : lecture publique (`true`) pour que tout le monde puisse lire les articles
- INSERT / UPDATE / DELETE : reserves au service role (`false`) pour que seul l'admin puisse gerer le contenu

Trigger `updated_at` pour mettre a jour automatiquement la colonne lors des modifications.

### 2. Inserer les articles existants

Migrer les 6 articles mock actuels dans la nouvelle table via un INSERT SQL, en remplissant le champ `content` avec le texte fictif existant.

### 3. Creer un hook `useArticles`

Nouveau fichier `src/hooks/useArticles.ts` utilisant `@tanstack/react-query` et le client Supabase pour :
- `useArticles()` : recuperer tous les articles tries par `published_at` DESC
- `useArticle(slug)` : recuperer un article par son slug

### 4. Mettre a jour les pages Blog et BlogArticle

- **`Blog.tsx`** : remplacer `mockArticles` par `useArticles()`, ajouter un etat de chargement (skeleton)
- **`BlogArticle.tsx`** : remplacer `mockArticles.find()` par `useArticle(slug)`, afficher le vrai `content` au lieu du Lorem ipsum, ajouter un etat de chargement

### 5. Nettoyer le code mock

Supprimer l'interface `BlogArticle` et le tableau `mockArticles` de `src/data/mockData.ts`.

### Details techniques

- La table utilise un slug unique pour les URLs propres (`/blog/:slug`)
- Le contenu est stocke en texte brut (colonne `content`). Si tu veux du contenu riche (Markdown, HTML) plus tard, cette colonne pourra etre interpretee cote front
- Les politiques RLS bloquent toute ecriture cote client (anon), la gestion des articles se fera via le dashboard Supabase ou un futur back-office admin
