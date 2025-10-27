# 🐙 OctoPrompt - Documentation Technique

## Structure du Projet

```
octoprompt/
├── app/                      # Pages et routes Next.js App Router
│   ├── api/                  # API Routes
│   │   └── analyze/         # Endpoint d'analyse de prompts
│   │       └── route.ts     # POST /api/analyze
│   ├── layout.tsx           # Layout racine avec métadonnées
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
├── components/              # Composants React
│   └── PromptAnalyzer.tsx   # Composant principal de l'analyseur
├── lib/                     # Logique métier
│   ├── analyzer.ts          # Moteur d'analyse des prompts
│   └── rules.ts             # Définition des règles de scoring
├── types/                   # Types TypeScript
│   └── index.ts             # Interfaces et types partagés
└── public/                  # Assets statiques

## Architecture Technique

### Frontend (Next.js 16 + React)
- **Framework**: Next.js 16 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **État**: React Hooks (useState)
- **Thème**: Dark mode avec palette cyberpunk néon

### Backend (Next.js API Routes)
- **Type**: Serverless Functions
- **Endpoint**: POST /api/analyze
- **Logique**: Moteur de règles sans appel LLM externe

### Moteur de Règles

Le cœur d'OctoPrompt est un système de scoring basé sur 7 règles pondérées :

1. **Rôle Spécifique** (20 points)
   - Détecte: "agis en tant que", "tu es un", "rôle :", etc.
   - Importance: Contextualise la demande

2. **Mots-clés de Style** (20 points)
   - Détecte: photoréaliste, minimaliste, professionnel, etc.
   - Importance: Définit le ton de la réponse

3. **Longueur Optimale** (15 points)
   - Vérifie: entre 10 et 200 mots
   - Importance: Équilibre clarté et concision

4. **Format de Sortie** (15 points)
   - Détecte: "liste", "json", "tableau", "paragraphes"
   - Importance: Structure la réponse attendue

5. **Verbes d'Action** (15 points)
   - Détecte: génère, crée, analyse, synthétise, etc.
   - Importance: Clarifie l'action attendue

6. **Audience Cible** (10 points)
   - Détecte: "pour", "débutant", "expert", etc.
   - Importance: Adapte le niveau de réponse

7. **Contraintes Spécifiques** (5 points)
   - Détecte: "maximum", "minimum", "environ", etc.
   - Importance: Précise les limitations

### Calcul du Score

```typescript
score = (somme_poids_règles_réussies / somme_totale_poids) * 100
```

## Flux de Données

1. L'utilisateur entre un prompt dans le textarea
2. Clic sur "Analyser le Prompt"
3. Requête POST vers `/api/analyze` avec le prompt
4. Le serveur exécute `analyzePrompt(prompt)`
5. Chaque règle est testée via sa fonction `check()`
6. Calcul du score et génération des suggestions
7. Retour JSON avec l'analyse complète
8. Affichage des résultats avec animations

## Personnalisation

### Ajouter une Nouvelle Règle

Modifier `lib/rules.ts` :

```typescript
{
  name: 'Nom de la Règle',
  category: 'Catégorie',
  weight: 10, // Points sur 100
  check: (prompt: string) => {
    // Logique de vérification
    return true/false;
  },
  suggestion: 'Message d\'amélioration'
}
```

### Modifier les Couleurs

Éditer `components/PromptAnalyzer.tsx` :
- Gradients de score: `getScoreColor()`
- Couleurs principales: classes Tailwind `from-cyan-400`, `via-purple-500`, etc.

### Changer les Seuils de Score

Modifier la fonction `getScoreColor()` :
```typescript
if (score >= 80) return 'from-green-400 to-emerald-600'; // Excellent
if (score >= 60) return 'from-yellow-400 to-orange-600'; // Bon
return 'from-red-400 to-pink-600'; // À améliorer
```

## Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Tests Suggérés

### Exemple de Prompts à Tester

**Mauvais Prompt** (Score: ~20)
```
un chien
```

**Prompt Moyen** (Score: ~50)
```
génère une image d'un chien mignon qui fait du sport
```

**Bon Prompt** (Score: ~85)
```
Agis en tant que expert en design graphique. Génère une description détaillée 
pour créer une image photoréaliste d'un chien golden retriever jouant au 
frisbee dans un parc, style cinématique moderne, pour une campagne marketing 
destinée aux familles. Format : 3 paragraphes maximum.
```

## Performance

- **Temps d'analyse**: < 50ms (aucun appel API externe)
- **Taille du bundle**: ~150kb (optimisé avec Turbopack)
- **Score Lighthouse**: 95+ (Performance, Accessibilité, SEO)

## Roadmap

### Phase 1 (MVP - 2 semaines) ✅
- [x] Moteur de règles de base
- [x] Interface avec score et suggestions
- [x] Design cyberpunk néon

### Phase 2 (Améliorations)
- [ ] Historique des prompts (localStorage)
- [ ] Export des résultats (PDF/JSON)
- [ ] Règles personnalisables par utilisateur
- [ ] Mode comparaison (avant/après)
- [ ] Exemples de prompts par catégorie

### Phase 3 (Fonctionnalités Avancées)
- [ ] Authentification utilisateur
- [ ] Sauvegarde cloud des analyses
- [ ] API publique
- [ ] Plugin pour IDE (VS Code)
- [ ] Extension navigateur

## Support

Pour toute question ou contribution :
- GitHub Issues: https://github.com/sana-bouchal/octoprompt/issues
- Email: contact@octoprompt.com

## Licence

MIT - Libre d'utilisation et de modification
