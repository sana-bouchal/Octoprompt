# 🐙 OctoPrompt - Extension Navigateur

**Améliorez vos prompts IA en temps réel**

## 📋 Description

OctoPrompt est une extension de navigateur qui analyse automatiquement vos prompts sur les plateformes d'IA (ChatGPT, Claude, Gemini, etc.) et vous propose des améliorations en temps réel.

## ✨ Fonctionnalités

- **Analyse en temps réel** : Score instantané pendant que vous écrivez
- **Suggestions intelligentes** : Conseils basés sur 7 règles de qualité
- **Génération automatique** : Prompt amélioré créé automatiquement
- **Multi-plateforme** : Compatible avec ChatGPT, Claude, Gemini, Perplexity, etc.
- **Interface élégante** : Design cyberpunk discret et moderne
- **Copie en un clic** : Copiez le prompt amélioré instantanément

## 🚀 Installation

### Chrome / Edge / Brave

1. Téléchargez ou clonez ce repository
2. Ouvrez Chrome et accédez à `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier `extension`
6. L'extension est installée ! 🎉

### Firefox

1. Téléchargez ou clonez ce repository
2. Ouvrez Firefox et accédez à `about:debugging`
3. Cliquez sur "Ce Firefox"
4. Cliquez sur "Charger un module complémentaire temporaire"
5. Sélectionnez le fichier `manifest.json` dans le dossier `extension`
6. L'extension est installée ! 🎉

## 📊 Règles d'Analyse

L'extension évalue votre prompt selon 7 critères :

1. **Rôle Spécifique** (20%) - Présence d'un contexte de rôle
2. **Mots-clés de Style** (20%) - Spécification du style souhaité
3. **Longueur Optimale** (15%) - Entre 10 et 200 mots
4. **Format de Sortie** (15%) - Format de réponse défini
5. **Verbes d'Action** (15%) - Utilisation de verbes clairs
6. **Audience Cible** (10%) - Public visé précisé
7. **Contraintes Spécifiques** (5%) - Limitations définies

## 🎯 Plateformes Supportées

- ✅ ChatGPT (chat.openai.com)
- ✅ Claude (claude.ai)
- ✅ Google Gemini (gemini.google.com)
- ✅ Perplexity (perplexity.ai)
- ✅ You.com
- ✅ Google Bard

## 🎨 Captures d'écran

L'extension apparaît discrètement en bas à droite de votre écran lorsque vous écrivez un prompt, affichant :
- Un score sur 100
- Des suggestions d'amélioration
- Un prompt amélioré automatiquement
- Un bouton de copie rapide

## ⚙️ Configuration

Cliquez sur l'icône de l'extension dans la barre d'outils pour :
- Activer/désactiver l'analyse automatique
- Voir le statut de l'extension

## 🔒 Confidentialité

- ✅ Aucune donnée n'est envoyée à des serveurs externes
- ✅ L'analyse se fait 100% localement dans votre navigateur
- ✅ Aucune collecte de données personnelles
- ✅ Open source et transparent

## 🛠️ Développement

### Structure du projet

```
extension/
├── manifest.json       # Configuration de l'extension
├── content.js         # Script principal d'analyse
├── popup.html         # Interface popup
├── popup.js           # Logique du popup
├── styles.css         # Styles CSS
├── icons/             # Icônes de l'extension
└── README.md          # Ce fichier
```

### Technologies utilisées

- Vanilla JavaScript (pas de dépendances)
- Chrome Extension API (Manifest V3)
- CSS moderne avec backdrop-filter

## 📝 Licence

MIT License - Voir le fichier LICENSE

## 👨‍💻 Auteur

**Sana Bouchal**
- GitHub: [@sana-bouchal](https://github.com/sana-bouchal)
- Projet original: [OctoPrompt Web App](https://github.com/sana-bouchal/octoprompt)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- 🐛 Signaler des bugs
- 💡 Proposer de nouvelles fonctionnalités
- 🔧 Soumettre des pull requests
- ⭐ Donner une étoile au projet !

## 📈 Roadmap

- [ ] Support de plus de plateformes IA
- [ ] Personnalisation des règles d'analyse
- [ ] Historique des prompts
- [ ] Export des prompts améliorés
- [ ] Thèmes personnalisables
- [ ] Support multilingue

## 🙏 Remerciements

Merci à tous les utilisateurs qui testent et améliorent OctoPrompt !

---

**Donnez des bras à vos idées avec OctoPrompt ! 🐙**
