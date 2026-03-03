

## Fix : Liste déroulante cachée par la section suivante

Le dropdown est rendu à l'intérieur du conteneur hero qui a `overflow-hidden` sur la `<section>`. Cela coupe le menu déroulant.

### Correction (`src/pages/Index.tsx`)

Retirer `overflow-hidden` de la section hero (ligne ~63) :

```diff
- <section className="relative overflow-hidden">
+ <section className="relative">
```

Si le `BackgroundGradientAnimation` a aussi un overflow caché, ajouter un `z-index` élevé au conteneur du dropdown et s'assurer que le menu a `z-50`.

Changement minimal, un seul fichier.

