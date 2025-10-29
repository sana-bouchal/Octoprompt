# 📝 Changelog - OctoPrompt Extension

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-10-27

### 🎉 Première Release

#### ✨ Ajouté
- Extension navigateur complète pour Chrome/Firefox/Edge/Brave
- Analyse en temps réel des prompts sur les plateformes IA
- Support des plateformes majeures :
  - ChatGPT (chat.openai.com, chatgpt.com)
  - Claude (claude.ai)
  - Google Gemini (gemini.google.com)
  - Perplexity (perplexity.ai)
  - You.com
  - Google Bard (bard.google.com)
- Système de scoring basé sur 7 règles pondérées :
  - Rôle Spécifique (20%)
  - Mots-clés de Style (20%)
  - Longueur Optimale (15%)
  - Format de Sortie (15%)
  - Verbes d'Action (15%)
  - Audience Cible (10%)
  - Contraintes Spécifiques (5%)
- Génération automatique de prompts améliorés
- Interface tooltip élégante et discrète
- Bouton de copie en un clic
- Popup de contrôle avec toggle on/off
- Sauvegarde des préférences utilisateur
- Design cyberpunk avec effets glassmorphism
- Icônes personnalisées aux multiples tailles (16, 32, 48, 128px)
- Page de test locale (test.html)
- Documentation complète :
  - README.md
  - INSTALLATION.md
  - DEVELOPMENT.md

#### 🔒 Sécurité
- Analyse 100% locale (aucune donnée envoyée)
- Permissions minimales (activeTab, storage)
- Pas de tracking ou collecte de données
- Code open source et auditable

#### 📚 Documentation
- Guide d'installation détaillé
- Guide de développement complet
- Exemples de prompts avec scores
- Architecture technique documentée

#### 🎨 Design
- Interface moderne avec gradients bleu/cyan
- Animations fluides (slideIn, pulse)
- Scrollbars personnalisées
- Responsive et adaptable
- Thème sombre cyberpunk

---

## [Unreleased] - Roadmap Future

### 🚀 Planifié pour v1.1.0
- [ ] Mode sombre/clair
- [ ] Personnalisation de la position du tooltip
- [ ] Raccourcis clavier (Ctrl+Shift+O pour toggle)
- [ ] Historique des 10 derniers prompts analysés

### 🔮 Planifié pour v1.2.0
- [ ] Support multilingue (EN, FR, ES)
- [ ] Règles personnalisables par l'utilisateur
- [ ] Templates de prompts préenregistrés
- [ ] Export des prompts en .txt ou .md

### 🌟 Planifié pour v2.0.0
- [ ] Statistiques d'utilisation (scores moyens, prompts favoris)
- [ ] Synchronisation cloud optionnelle
- [ ] Partage de prompts avec la communauté
- [ ] Marketplace de templates
- [ ] Intelligence artificielle pour suggestions contextuelles

### 🔧 Améliorations Techniques
- [ ] Refactoring en TypeScript
- [ ] Tests unitaires automatisés
- [ ] CI/CD pour build automatique
- [ ] Optimisation des performances
- [ ] Support de Service Workers

---

## Notes de Version

### Version 1.0.0 - Détails

**Date de sortie** : 27 octobre 2025

**Changements majeurs :**
- Conversion du projet web OctoPrompt en extension navigateur
- Intégration native sur les plateformes IA majeures
- Analyse en temps réel sans quitter la page

**Breaking Changes :**
- Aucun (première version)

**Bugs connus :**
- Sur certaines versions de Firefox, les emojis peuvent ne pas s'afficher correctement dans les icônes
- Le tooltip peut parfois se superposer avec d'autres éléments de la page (rare)

**Contournements :**
- Pour Firefox emoji issue : Le fallback utilise un cercle stylisé
- Pour tooltip overlap : Fermer temporairement le tooltip avec le bouton ×

**Performance :**
- Temps d'analyse moyen : < 10ms
- Impact mémoire : ~5MB
- Impact CPU : Négligeable (analyse uniquement sur input)

**Compatibilité :**
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Brave (toutes versions récentes)
- ✅ Firefox 78+
- ✅ Opera 74+

**Taille du package :**
- Extension complète : ~150KB
- Icônes : ~50KB
- Code JavaScript : ~40KB
- HTML/CSS : ~15KB

---

## Comment Contribuer

Pour proposer une fonctionnalité ou signaler un bug :
1. Créer une issue sur GitHub
2. Décrire le problème ou la fonctionnalité
3. Si possible, joindre des captures d'écran
4. Pour les bugs : décrire les étapes de reproduction

Pour contribuer au code :
1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

**Donnez des bras à vos idées ! 🐙**
