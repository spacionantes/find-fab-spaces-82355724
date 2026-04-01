

## Filtrer les créneaux et dates selon la disponibilité du listing

### Problème
Le formulaire de réservation propose tous les horaires (8h-00h) et toutes les dates futures, sans tenir compte des colonnes `available_from`, `available_to`, `available_days`, `available_start_date`, `available_end_date` du listing.

### Plan

**1. Étendre le type `Space` avec les champs de disponibilité**

Dans `src/data/mockData.ts`, ajouter au type `Space` :
- `available_from?: string` (format "HH:mm")
- `available_to?: string`
- `available_days?: string[]`
- `available_start_date?: string`
- `available_end_date?: string`

**2. Mapper ces colonnes dans `useListings.ts`**

Ajouter les 5 champs dans le `return data.map(...)` pour qu'ils soient disponibles côté front.

**3. Adapter le formulaire `SpaceBookingForm` dans `GetStarted.tsx`**

- **Horaires** : Filtrer `timeOptions` selon `space.available_from` / `available_to`. Si `null` → tout disponible (comportement actuel). Sinon, seuls les créneaux dans la plage sont sélectionnables (les autres sont exclus ou grisés).

- **Jours** : Dans le `Calendar`, désactiver les jours de la semaine non listés dans `space.available_days`. Si `null` ou vide → tous les jours disponibles.

- **Plage de dates** : Désactiver les dates avant `available_start_date` et après `available_end_date` dans le Calendar. Si `null` → pas de restriction (seulement le passé est grisé, comme actuellement).

### Détails techniques

```text
Calendar disabled logic:
  date < today
  OR date < available_start_date
  OR date > available_end_date
  OR dayOfWeek NOT IN available_days

Time selects:
  filter timeOptions where value >= available_from AND value <= available_to
  (null = no filter)
```

Les fichiers modifiés :
- `src/data/mockData.ts` — type Space
- `src/hooks/useListings.ts` — mapping des colonnes
- `src/pages/GetStarted.tsx` — logique de filtrage dans SpaceBookingForm

