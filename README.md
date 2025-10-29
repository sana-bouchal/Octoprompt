# 🐙 OctoPrompt

**Votre coach personnel pour des prompts IA parfaits**

*Donnez des bras à vos idées*

## 📋 Description

OctoPrompt est disponible en **deux versions** :
- 🌐 **Application Web** : Outil web standalone pour analyser vos prompts
- 🔌 **Extension Navigateur** : Analyse en temps réel sur ChatGPT, Claude, Gemini et autres plateformes IA

L'outil analyse vos prompts en temps réel et fournit un score accompagné de suggestions concrètes pour obtenir des résultats IA spectaculaires.

## 🎯 Fonctionnalités

### Application Web
- **Analyseur de Prompt** : Moteur d'analyse basé sur 7 règles de vérification
- **Score en temps réel** : Évaluation sur 100 points avec pondération
- **Suggestions ciblées** : Conseils concrets pour améliorer votre prompt
- **Interface Cyberpunk** : Design néon/glassmorphism inspiré de l'univers marin bioluminescent
- **Analyse instantanée** : Résultats en temps réel sans appel à un LLM externe

### Extension Navigateur 🆕
- **Intégration native** : Fonctionne directement sur ChatGPT, Claude, Gemini, etc.
- **Analyse automatique** : Détection et analyse en temps réel pendant que vous écrivez
- **Tooltip intelligent** : Interface discrète qui n'interfère pas avec votre workflow
- **Prompt amélioré** : Génération automatique d'une version optimisée
- **Copie en un clic** : Utilisez instantanément le prompt amélioré
- **100% local** : Aucune donnée envoyée à des serveurs externes

## 🛠️ Stack Technique

### Application Web
- **Frontend** : Next.js 16 avec TypeScript
- **Styling** : Tailwind CSS avec effets glassmorphism et néon
- **Backend** : API Routes Next.js (serverless)
- **Moteur de Règles** : Algorithme de scoring basé sur 7 catégories

### Extension Navigateur
- **Manifest** : V3 (Chrome/Firefox)
- **JavaScript** : Vanilla JS (aucune dépendance)
- **Storage** : Chrome Storage API
- **CSS** : Modern CSS3 avec backdrop-filter
- **Icônes** : PNG générées avec Python/Pillow

## 📊 Règles d'Analyse

1. **Rôle Spécifique** (20%) - Présence d'un contexte de rôle
2. **Mots-clés de Style** (20%) - Spécification du style souhaité
3. **Longueur Optimale** (15%) - Entre 10 et 200 mots
4. **Format de Sortie** (15%) - Format de réponse défini
5. **Verbes d'Action** (15%) - Utilisation de verbes clairs
6. **Audience Cible** (10%) - Public visé précisé
7. **Contraintes Spécifiques** (5%) - Limitations définies

## 🚀 Installation

### Application Web

```bash
# Cloner le repository
git clone https://github.com/sana-bouchal/octoprompt.git

# Installer les dépendances
cd octoprompt
npm install

# Lancer en mode développement
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Extension Navigateur 🔌

#### Chrome / Edge / Brave
1. Naviguez vers le dossier `octoprompt/extension`
2. Ouvrez Chrome et tapez `chrome://extensions/`
3. Activez le **"Mode développeur"**
4. Cliquez sur **"Charger l'extension non empaquetée"**
5. Sélectionnez le dossier `extension`
6. ✅ Extension installée !

#### Firefox
1. Ouvrez Firefox et tapez `about:debugging`
2. Cliquez sur **"Ce Firefox"**
3. Cliquez sur **"Charger un module complémentaire temporaire"**
4. Sélectionnez `manifest.json` dans le dossier `extension`
5. ✅ Extension installée !

📖 **Guide complet** : [extension/INSTALLATION.md](extension/INSTALLATION.md)

## 🎁 Contenu du Repository

```
octoprompt/
├── app/                    # Application Next.js
├── components/             # Composants React
├── lib/                    # Logique d'analyse
├── types/                  # Types TypeScript
├── extension/              # 🆕 Extension navigateur
│   ├── icons/             # Icônes multi-tailles
│   ├── manifest.json      # Configuration
│   ├── content.js         # Script principal
│   ├── popup.html/js      # Interface popup
│   ├── test.html          # Page de test
│   └── *.md              # Documentation complète
└── ... (autres fichiers)
```

## 📱 Canaux de Communication

- **Twitter (X)** : Astuces rapides et exemples avant/après
- **LinkedIn** : Articles de fond et cas d'usage business
- **Instagram/TikTok** : Démonstrations visuelles courtes

## 👥 Cible

**Le Créateur Numérique Curieux** - Alex, 25-35 ans
- Passionné de technologie et de design
- Utilisateur actif d'outils IA générative
- Recherche des résultats professionnels et uniques

## 🎨 Identité Visuelle

- **Couleurs** : Bleu abyssal, Magenta néon, Cyan électrique
- **Typographie** : Orbitron (titres), Inter (texte)
- **Style** : Cyberpunk avec éléments marins bioluminescents

## 📝 Licence

MIT

## 👨‍💻 Auteur

Sana Bouchal - [GitHub](https://github.com/sana-bouchal)
