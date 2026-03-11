

## Scroll-to-Top automatique sur toute l'application

### Problème
Quand l'utilisateur navigue entre les pages (Blog, Devenir hôte, etc.), la page reste à la position de scroll actuelle au lieu de remonter en haut.

### Solution
Ajouter un composant `ScrollToTop` dans le `BrowserRouter` qui écoute les changements de route et scroll automatiquement en haut. C'est le pattern standard React Router.

### Implémentation

**1. Créer `src/components/ScrollToTop.tsx`**
```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
```

**2. Modifier `src/App.tsx`**
- Importer `ScrollToTop`
- L'ajouter juste après `<BrowserRouter>`, avant `<Routes>`

### Résultat
Chaque changement de page (clic sur un lien du header, footer, ou n'importe quel bouton de navigation) remontera automatiquement en haut de page avec un scroll fluide.

