
# Systeme de comptes utilisateurs pour Spacio

## Objectif
Ajouter l'authentification (inscription + connexion) avec Supabase Auth. Le site reste accessible a tous, mais certaines actions (cliquer sur une salle, valider un diagnostic) necessitent d'etre connecte.

## Ce qui va changer

### 1. Base de donnees
- Creer une table `profiles` (id, user_id, full_name, organization, city, created_at) avec RLS pour que chaque utilisateur ne puisse lire/modifier que son propre profil
- Creer un trigger pour auto-creer un profil a l'inscription

### 2. Nouvelles pages
- **`/connexion`** : page de connexion (email + mot de passe)
- **`/inscription`** : page d'inscription (email, mot de passe, nom, organisation, ville)
- **`/reset-password`** : page de reinitialisation du mot de passe

### 3. Header mis a jour
- Ajouter 2 boutons a cote de "Commencer" : **Creer un compte** et **Connexion**
- Quand l'utilisateur est connecte : remplacer ces boutons par un avatar/menu avec "Mon compte" et "Deconnexion"

### 4. Hook d'authentification
- Creer un hook `useAuth` qui expose l'utilisateur courant, les fonctions signIn/signUp/signOut, et un booleen `loading`
- Utilise `onAuthStateChange` + `getSession` selon les bonnes pratiques Supabase

### 5. Garde d'authentification (modale)
- Creer un composant `AuthRequiredDialog` : une modale qui s'affiche quand un utilisateur non connecte tente une action protegee
- La modale propose "Se connecter" ou "Creer un compte" avec des liens vers les pages correspondantes

### 6. Integration dans les pages existantes
- **Explorer** (`SpaceDetailDialog`) : quand un utilisateur non connecte clique sur "Reserver cet espace", afficher la modale `AuthRequiredDialog` au lieu de naviguer
- **Diagnostic** : quand un utilisateur non connecte clique sur "Enregistrer mon diagnostic", afficher la modale `AuthRequiredDialog` au lieu de sauvegarder

### 7. Routes
- Ajouter les routes `/connexion`, `/inscription` et `/reset-password` dans `App.tsx`

---

## Details techniques

### Migration SQL
```sql
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text,
  organization text,
  city text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

### Fichiers crees/modifies
| Fichier | Action |
|---------|--------|
| `src/hooks/useAuth.ts` | Creer - hook d'authentification |
| `src/components/AuthRequiredDialog.tsx` | Creer - modale "connexion requise" |
| `src/pages/Connexion.tsx` | Creer - page de connexion |
| `src/pages/Inscription.tsx` | Creer - page d'inscription |
| `src/pages/ResetPassword.tsx` | Creer - page reset mot de passe |
| `src/components/Header.tsx` | Modifier - ajouter boutons auth + menu connecte |
| `src/components/SpaceDetailDialog.tsx` | Modifier - verifier auth avant reservation |
| `src/pages/Diagnostic.tsx` | Modifier - verifier auth avant sauvegarde |
| `src/App.tsx` | Modifier - ajouter les nouvelles routes |

### Flux utilisateur
1. Visiteur navigue librement sur le site (Explorer, Blog, FAQ, etc.)
2. Il clique sur une salle ou sur "Enregistrer mon diagnostic"
3. Une modale apparait : "Connectez-vous pour continuer"
4. Il choisit "Creer un compte" ou "Se connecter"
5. Apres authentification, il est redirige vers la page ou il etait
