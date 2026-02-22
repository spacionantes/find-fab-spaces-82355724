
## Diagnostic d'intensite d'usage - Intensi'Score

### Resume
Creation d'une page dediee `/diagnostic` avec un formulaire interactif permettant a l'utilisateur de renseigner l'occupation de son espace pour chaque creneau de la semaine, puis calcul et affichage d'un score d'intensite d'usage avec des conseils personnalises.

### Fonctionnement utilisateur
1. L'utilisateur arrive sur `/diagnostic`
2. Il voit un tableau avec 7 jours (Lundi a Dimanche) x 5 periodes (Matin, Midi, Apres-midi, Soir, Nuit)
3. Pour chaque case, il choisit parmi : **Inoccupe** (0), **Usage partiel** (0.5), **Usage intensif** (1)
4. Le score se calcule en temps reel : `Intensi'Score = (somme des valeurs / 35) ^ 0.25 * 100`
5. Une jauge animee de 0 a 100 affiche le resultat
6. Une section "Conseils Spacio" apparait sous la jauge :
   - Score < 30 : suggestion de mutualisation d'espaces
   - Score 30-60 : suggestion d'hybridation d'usages
   - Score > 60 : message positif sur l'utilisation optimale

### Fichiers a creer / modifier

**1. `src/pages/Diagnostic.tsx`** (nouveau)
- Page principale avec le Layout existant
- Grille interactive 7 jours x 5 periodes
- Chaque cellule : un groupe de 3 boutons radio stylises (Inoccupe / Partiel / Intensif) avec des couleurs distinctes (gris, orange, vert)
- Calcul reactif du score via `useMemo`
- Jauge circulaire ou barre de progression animee (utilisant le composant Progress existant ou un arc SVG custom)
- Section conseils conditionnelle avec des Cards stylisees
- Animations Framer Motion pour l'apparition des elements

**2. `src/App.tsx`** (modification)
- Ajout de la route `/diagnostic`

**3. `src/components/Header.tsx`** (modification)
- Ajout du lien "Diagnostic" dans la navigation

### Details techniques

**Calcul du score :**
- 7 jours x 5 periodes = 35 creneaux maximum
- Valeurs : Inoccupe = 0, Usage partiel = 0.5, Usage intensif = 1
- Occupation maximale theorique = 35
- Ratio = somme des valeurs / 35
- Intensi'Score = ratio^0.25 * 100 (arrondi)

**Interface de la grille :**
- Sur desktop : tableau complet visible
- Sur mobile : scroll horizontal ou affichage en accordeon par jour
- Couleurs des etats : gris clair (Inoccupe), orange/ambre (Partiel), vert (Intensif)
- Transition fluide entre les etats au clic

**Jauge de resultat :**
- Barre de progression horizontale avec gradient de couleur (rouge -> orange -> vert)
- Affichage du score numerique au centre
- Animation de remplissage avec Framer Motion

**Conseils Spacio :**
- Card avec icone et texte
- Score < 30 : icone Users, fond pastel-blue, texte sur la mutualisation
- Score 30-60 : icone Zap, fond pastel-orange, texte sur l'hybridation d'usages
- Score > 60 : icone Star, fond pastel-green, message positif
