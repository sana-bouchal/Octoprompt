# 🚀 Guide d'Installation - OctoPrompt Extension

## Installation pour Chrome/Edge/Brave

### Étape 1 : Préparer l'extension
1. Naviguez vers le dossier `octoprompt/extension`
2. Vérifiez que tous les fichiers sont présents :
   - ✅ manifest.json
   - ✅ content.js
   - ✅ popup.html
   - ✅ popup.js
   - ✅ styles.css
   - ✅ icons/ (avec icon16.png, icon32.png, icon48.png, icon128.png)

### Étape 2 : Charger l'extension dans Chrome
1. Ouvrez Chrome
2. Tapez `chrome://extensions/` dans la barre d'adresse
3. Activez le **"Mode développeur"** (toggle en haut à droite)
4. Cliquez sur **"Charger l'extension non empaquetée"**
5. Sélectionnez le dossier `extension`
6. ✅ L'extension est installée !

### Étape 3 : Vérifier l'installation
- L'icône 🐙 OctoPrompt devrait apparaître dans votre barre d'extensions
- Cliquez dessus pour voir le popup de contrôle

## Installation pour Firefox

### Méthode 1 : Installation temporaire (développement)
1. Ouvrez Firefox
2. Tapez `about:debugging` dans la barre d'adresse
3. Cliquez sur **"Ce Firefox"**
4. Cliquez sur **"Charger un module complémentaire temporaire"**
5. Naviguez vers le dossier `extension` et sélectionnez `manifest.json`
6. ✅ L'extension est installée !

Note : L'extension sera supprimée à la fermeture de Firefox

### Méthode 2 : Installation permanente
Pour une installation permanente sur Firefox, il faut signer l'extension :
1. Créez un compte sur [addons.mozilla.org](https://addons.mozilla.org)
2. Packagez l'extension en .zip
3. Soumettez-la pour signature

## 📱 Utilisation

### 1. Activer l'extension
- L'extension est activée par défaut
- Pour la désactiver temporairement, cliquez sur l'icône et désactivez le toggle

### 2. Utiliser sur ChatGPT
1. Allez sur [chat.openai.com](https://chat.openai.com) ou [chatgpt.com](https://chatgpt.com)
2. Commencez à écrire dans le champ de texte
3. Une analyse apparaît automatiquement en bas à droite après 0.5 secondes
4. Vous voyez :
   - 📊 Score du prompt (0-100)
   - ✨ Version améliorée de votre prompt
   - 💡 Suggestions pour améliorer
5. Cliquez sur **"Copier"** pour utiliser le prompt amélioré

### 3. Utiliser sur Claude
1. Allez sur [claude.ai](https://claude.ai)
2. Commencez à écrire
3. L'extension détecte automatiquement le champ de texte
4. Suivez les suggestions en temps réel

### 4. Utiliser sur Google Gemini
1. Allez sur [gemini.google.com](https://gemini.google.com)
2. L'extension s'active automatiquement
3. Écrivez et améliorez vos prompts

## 🎯 Plateformes supportées

L'extension fonctionne sur :
- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude (claude.ai)
- ✅ Google Gemini (gemini.google.com)
- ✅ Perplexity (perplexity.ai)
- ✅ You.com
- ✅ Google Bard (bard.google.com)

## 🔧 Résolution de problèmes

### L'extension ne s'affiche pas
1. Vérifiez que vous êtes sur une plateforme supportée
2. Rechargez la page (F5)
3. Vérifiez que l'extension est activée dans le popup

### Le tooltip ne s'affiche pas
1. Écrivez au moins 5 caractères dans le champ de texte
2. Attendez 0.5 secondes
3. Vérifiez les permissions de l'extension

### L'analyse ne fonctionne pas
1. Ouvrez la console développeur (F12)
2. Vérifiez s'il y a des erreurs
3. Rechargez l'extension : chrome://extensions/ > Icône refresh

### Réinstaller l'extension
1. Allez dans chrome://extensions/
2. Cliquez sur "Supprimer" sous OctoPrompt
3. Suivez à nouveau les étapes d'installation

## 🎨 Personnalisation

### Désactiver l'analyse automatique
1. Cliquez sur l'icône OctoPrompt dans la barre d'outils
2. Désactivez le toggle "Activer l'analyse automatique"
3. L'extension ne s'affichera plus automatiquement

### Fermer temporairement le tooltip
- Cliquez sur le **×** en haut à droite du tooltip
- Il réapparaîtra quand vous modifierez votre prompt

## 📊 Comprendre le score

Le score est calculé sur 100 points selon 7 critères :

| Critère | Poids | Description |
|---------|-------|-------------|
| Rôle Spécifique | 20% | Présence d'un contexte de rôle |
| Mots-clés de Style | 20% | Spécification du style |
| Longueur Optimale | 15% | Entre 10 et 200 mots |
| Format de Sortie | 15% | Format de réponse défini |
| Verbes d'Action | 15% | Verbes clairs et précis |
| Audience Cible | 10% | Public visé précisé |
| Contraintes Spécifiques | 5% | Limitations définies |

### Interprétation du score :
- 🟢 **80-100** : Excellent prompt, prêt à l'emploi
- 🟠 **60-79** : Bon prompt, quelques améliorations possibles
- 🔴 **0-59** : Prompt à améliorer significativement

## 💡 Exemples d'utilisation

### Exemple 1 : Prompt initial faible (Score : 25)
```
Explique le cloud computing
```

### Prompt amélioré (Score : 100)
```
Agis en tant qu'expert en infrastructure informatique. Explique le cloud computing 
de manière claire et accessible, adapté à des professionnels du secteur. 
Structure la réponse sous forme de 3 paragraphes : définition, avantages, 
et cas d'usage concrets. Utilise un style professionnel et technique. 
Limite la réponse à 200 mots maximum.
```

### Exemple 2 : Amélioration progressive

**Prompt initial (Score : 35)**
```
Crée un logo
```

**Après ajout de contexte (Score : 65)**
```
Crée un logo moderne pour une startup tech
```

**Prompt optimal (Score : 95)**
```
Agis en tant que designer graphique professionnel. Crée un concept de logo 
minimaliste et moderne pour une startup tech spécialisée en IA, destiné à 
une audience de professionnels et investisseurs. Utilise un style élégant 
avec des formes géométriques simples. Propose 3 variations avec palette 
de couleurs tech (bleu, cyan). Format vectoriel, adapté pour utilisation 
web et print.
```

## 🔐 Sécurité et confidentialité

- ✅ **100% local** : Aucune donnée n'est envoyée à des serveurs
- ✅ **Pas de tracking** : Aucune collecte de données
- ✅ **Permissions minimales** : Uniquement activeTab et storage
- ✅ **Open source** : Code transparent et auditable

## 📞 Support

Besoin d'aide ? 
- 📧 Créez une issue sur GitHub
- 💬 Consultez la documentation
- ⭐ Donnez une étoile au projet !

---

**Donnez des bras à vos idées avec OctoPrompt ! 🐙**
