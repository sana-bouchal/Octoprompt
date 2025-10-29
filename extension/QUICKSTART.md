# 🐙 OctoPrompt - Extension Navigateur

## ✅ Installation Terminée !

L'extension OctoPrompt a été créée avec succès ! Voici ce qui a été généré :

### 📁 Structure du Projet

```
extension/
├── manifest.json          ✅ Configuration Manifest V3
├── content.js            ✅ Script principal (analyse + UI)
├── popup.html            ✅ Interface du popup
├── popup.js              ✅ Logique du popup
├── styles.css            ✅ Styles CSS
├── icons/                ✅ Icônes PNG (16, 32, 48, 128)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon128.svg
├── test.html             ✅ Page de test locale
├── generate_icons.py     ✅ Script de génération d'icônes
├── README.md             ✅ Documentation principale
├── INSTALLATION.md       ✅ Guide d'installation
├── DEVELOPMENT.md        ✅ Guide de développement
├── CHANGELOG.md          ✅ Historique des versions
└── DEMO.md               ✅ Démo visuelle
```

## 🚀 Étapes Suivantes

### 1. Installer l'extension

#### Chrome / Edge / Brave
```
1. Ouvrez chrome://extensions/
2. Activez "Mode développeur"
3. Cliquez "Charger l'extension non empaquetée"
4. Sélectionnez le dossier octoprompt/extension
5. ✅ Extension installée !
```

#### Firefox
```
1. Ouvrez about:debugging
2. Cliquez "Ce Firefox"
3. Cliquez "Charger un module complémentaire temporaire"
4. Sélectionnez manifest.json dans octoprompt/extension
5. ✅ Extension installée !
```

### 2. Tester l'extension

**Option A : Page de test locale**
```bash
# Ouvrir la page de test
cd extension
start test.html  # Windows
# ou
open test.html   # Mac
# ou
xdg-open test.html  # Linux
```

**Option B : Sur une vraie plateforme**
1. Aller sur https://chat.openai.com ou https://claude.ai
2. Commencer à écrire dans le champ de texte
3. Observer le tooltip OctoPrompt apparaître en bas à droite

### 3. Utiliser l'extension

1. **Écrivez un prompt** dans le champ de texte
2. **Attendez 0.5s** - L'analyse se lance automatiquement
3. **Consultez le score** et les suggestions
4. **Copiez le prompt amélioré** en un clic
5. **Profitez de meilleurs résultats IA !** 🎉

## 🎯 Plateformes Supportées

- ✅ **ChatGPT** (chat.openai.com, chatgpt.com)
- ✅ **Claude** (claude.ai)
- ✅ **Google Gemini** (gemini.google.com)
- ✅ **Perplexity** (perplexity.ai)
- ✅ **You.com**
- ✅ **Google Bard** (bard.google.com)

## 🎨 Fonctionnalités

- 📊 **Score en temps réel** (0-100)
- 💡 **Suggestions intelligentes** basées sur 7 règles
- ✨ **Génération automatique** de prompts optimisés
- 📋 **Copie en un clic**
- 🎛️ **Toggle on/off** via le popup
- 💾 **Sauvegarde des préférences**
- 🔒 **100% local** - aucune donnée envoyée

## 📊 Règles d'Analyse

1. **Rôle Spécifique** (20%) - "Agis en tant que..."
2. **Mots-clés de Style** (20%) - professionnel, créatif, etc.
3. **Longueur Optimale** (15%) - 10-200 mots
4. **Format de Sortie** (15%) - liste, tableau, etc.
5. **Verbes d'Action** (15%) - génère, analyse, etc.
6. **Audience Cible** (10%) - pour débutants, etc.
7. **Contraintes** (5%) - maximum, minimum, etc.

## 📚 Documentation

- 📖 **README.md** - Vue d'ensemble
- 🚀 **INSTALLATION.md** - Guide d'installation détaillé
- 🛠️ **DEVELOPMENT.md** - Guide pour les développeurs
- 📝 **CHANGELOG.md** - Historique des versions
- 📸 **DEMO.md** - Démonstration visuelle

## 🔧 Commandes Utiles

### Générer les icônes
```bash
cd extension
python generate_icons.py
```

### Tester localement
```bash
cd extension
start test.html  # Windows
```

### Recharger l'extension après modifications
1. chrome://extensions/
2. Clic sur l'icône "Actualiser" sous OctoPrompt
3. Recharger la page web

## 💡 Exemples d'Utilisation

### Prompt Faible (Score: 25)
```
Explique le cloud computing
```

### Prompt Amélioré (Score: 100)
```
Agis en tant qu'expert en infrastructure informatique. 
Explique le cloud computing de manière claire et accessible, 
adapté à des professionnels du secteur. Structure la réponse 
sous forme de 3 paragraphes : définition, avantages, et cas 
d'usage concrets. Utilise un style professionnel et technique. 
Limite la réponse à 200 mots maximum.
```

## 🔒 Sécurité & Confidentialité

- ✅ **100% local** - Analyse dans le navigateur
- ✅ **Aucun serveur** - Pas de données envoyées
- ✅ **Pas de tracking** - Respect total de la vie privée
- ✅ **Open source** - Code transparent et auditable
- ✅ **Permissions minimales** - activeTab + storage uniquement

## 🐛 Résolution de Problèmes

### Le tooltip ne s'affiche pas
1. Vérifier que vous êtes sur une plateforme supportée
2. Écrire au moins 5 caractères
3. Attendre 0.5 secondes
4. Vérifier que l'extension est activée (popup)

### L'extension ne fonctionne pas
1. Vérifier dans chrome://extensions/ que l'extension est activée
2. Recharger l'extension (icône refresh)
3. Recharger la page web (F5)
4. Ouvrir la console (F12) pour voir les erreurs

### Champ de texte non détecté
1. Certains sites peuvent avoir des sélecteurs différents
2. Vérifier dans la console s'il y a des erreurs
3. Signaler le problème sur GitHub avec le nom du site

## 🚀 Roadmap

### v1.1.0 (À venir)
- [ ] Mode sombre/clair
- [ ] Position personnalisable du tooltip
- [ ] Raccourcis clavier
- [ ] Historique des prompts

### v1.2.0
- [ ] Support multilingue
- [ ] Règles personnalisables
- [ ] Templates de prompts
- [ ] Export en .txt/.md

### v2.0.0
- [ ] Statistiques d'utilisation
- [ ] Sync cloud optionnel
- [ ] Partage communautaire
- [ ] Marketplace de templates

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

- 🐛 **Bugs** : Créer une issue sur GitHub
- 💡 **Suggestions** : Ouvrir une discussion
- 📧 **Contact** : Via GitHub
- ⭐ **Soutenir** : Donner une étoile au projet !

## 📄 Licence

MIT License - Voir LICENSE

## 👨‍💻 Auteur

**Sana Bouchal**
- GitHub: [@sana-bouchal](https://github.com/sana-bouchal)
- Projet: [OctoPrompt](https://github.com/sana-bouchal/octoprompt)

---

## 🎉 C'est Terminé !

Votre extension OctoPrompt est prête à être utilisée !

### Prochaines étapes :
1. ✅ Installer l'extension
2. ✅ Tester sur ChatGPT/Claude
3. ✅ Améliorer vos prompts
4. ✅ Profiter de meilleurs résultats IA !

### Bonus :
- 📤 Publier sur Chrome Web Store
- 📱 Partager avec vos amis
- ⭐ Donner une étoile sur GitHub
- 💬 Partager votre expérience

---

**🐙 Donnez des bras à vos idées avec OctoPrompt !**

**Happy prompting! 🚀**
