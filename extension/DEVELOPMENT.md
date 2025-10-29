# 🛠️ Guide de Développement - OctoPrompt Extension

## Architecture

```
extension/
├── manifest.json          # Configuration de l'extension (Manifest V3)
├── content.js            # Script injecté dans les pages (logique principale)
├── popup.html            # Interface du popup de contrôle
├── popup.js              # Logique du popup
├── styles.css            # Styles CSS pour le tooltip
├── icons/                # Icônes de différentes tailles
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── generate_icons.py     # Script Python pour générer les icônes
├── test.html            # Page de test locale
├── README.md            # Documentation
└── INSTALLATION.md      # Guide d'installation
```

## Technologies

- **Manifest V3** : Dernière version du format d'extension Chrome
- **Vanilla JavaScript** : Pas de dépendances externes pour la légèreté
- **Chrome Storage API** : Pour sauvegarder les préférences utilisateur
- **CSS moderne** : backdrop-filter, gradients, animations

## Composants Principaux

### 1. manifest.json
Configuration de l'extension :
- Permissions : `activeTab`, `storage`
- Content scripts : Injectés sur les plateformes IA
- Host permissions : Liste des sites supportés
- Web accessible resources : Icônes

### 2. content.js
Script principal qui :
- Détecte automatiquement le champ de texte (textarea)
- Analyse le prompt en temps réel
- Affiche le tooltip avec les résultats
- Gère les événements utilisateur

**Fonctions clés :**
- `analyzePrompt(prompt)` : Analyse et scoring
- `findPromptInput()` : Détection du champ de texte
- `createTooltip()` : Création de l'interface
- `updateTooltip(analysis)` : Mise à jour des résultats

### 3. popup.html/js
Interface de contrôle :
- Toggle pour activer/désactiver l'analyse
- Affichage du statut
- Communication avec le content script

## Logique d'Analyse

### Règles de Scoring

Le système utilise 7 règles pondérées :

```javascript
const PROMPT_RULES = [
  {
    name: 'Rôle Spécifique',
    weight: 20,
    check: (prompt) => /* regex */,
    suggestion: 'Conseil'
  },
  // ... autres règles
];
```

**Calcul du score :**
```
Score = (Σ poids des règles validées / Σ poids total) × 100
```

### Génération de Prompt Amélioré

L'algorithme ajoute automatiquement les éléments manquants :
1. Rôle si absent
2. Verbe d'action si absent
3. Format de sortie si absent
4. Finalisation professionnelle

## Détection des Plateformes

### Sélecteurs CSS par plateforme

**ChatGPT :**
```javascript
document.querySelector('textarea[placeholder*="Message"]')
document.querySelector('textarea#prompt-textarea')
```

**Claude :**
```javascript
document.querySelector('div[contenteditable="true"]')
```

**Gemini :**
```javascript
document.querySelector('rich-textarea')
document.querySelector('textarea[aria-label*="message"]')
```

**Perplexity :**
```javascript
document.querySelector('textarea[placeholder*="Ask"]')
```

### Ajouter une nouvelle plateforme

1. Ajouter l'URL dans `manifest.json` :
```json
{
  "content_scripts": [{
    "matches": ["https://nouvelle-plateforme.com/*"]
  }],
  "host_permissions": ["https://nouvelle-plateforme.com/*"]
}
```

2. Ajouter le sélecteur dans `findPromptInput()` :
```javascript
if (!input) {
  input = document.querySelector('nouveau-selecteur');
}
```

## Communication

### Popup → Content Script

```javascript
// popup.js
chrome.tabs.sendMessage(tabId, {
  action: 'toggleAutoAnalyze',
  enabled: true
});

// content.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleAutoAnalyze') {
    isEnabled = message.enabled;
  }
});
```

### Storage

```javascript
// Sauvegarder
chrome.storage.sync.set({ autoAnalyze: true });

// Charger
chrome.storage.sync.get(['autoAnalyze'], (result) => {
  const enabled = result.autoAnalyze;
});
```

## Optimisations

### 1. Debouncing
L'analyse est déclenchée avec un délai pour éviter trop d'analyses :
```javascript
let debounceTimer = null;
const handleInput = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Analyser
  }, 500); // 500ms de délai
};
```

### 2. MutationObserver
Surveille les changements DOM pour détecter les nouveaux champs :
```javascript
const observer = new MutationObserver(() => {
  const input = findPromptInput();
  if (input && input !== currentInput) {
    attachToInput(input);
  }
});
```

### 3. Performance
- Analyse uniquement si > 5 caractères
- Cache du tooltip pour éviter les recréations
- Nettoyage des event listeners

## Debug

### Console Logs
```javascript
console.log('🐙 OctoPrompt extension chargée!');
```

### Outils de développement
1. Ouvrir `chrome://extensions/`
2. Cliquer sur "Inspecter les vues" sous l'extension
3. Onglet Console pour les logs
4. Onglet Sources pour déboguer

### Recharger l'extension
Après modification :
1. `chrome://extensions/`
2. Cliquer sur l'icône "Actualiser" de l'extension
3. Recharger la page web

## Tests

### Test Local
Ouvrir `test.html` dans le navigateur :
```bash
# Ouvrir directement
start extension/test.html

# Ou avec un serveur local
cd extension
python -m http.server 8000
# Ouvrir http://localhost:8000/test.html
```

### Test sur Plateformes Réelles
1. Installer l'extension
2. Aller sur ChatGPT/Claude/etc.
3. Commencer à écrire
4. Vérifier que le tooltip apparaît

### Vérifications
- ✅ Tooltip s'affiche après 0.5s
- ✅ Score calculé correctement
- ✅ Prompt amélioré généré
- ✅ Bouton copier fonctionne
- ✅ Fermeture du tooltip fonctionne
- ✅ Toggle dans popup fonctionne
- ✅ Préférences sauvegardées

## Amélirations Futures

### Court terme
- [ ] Mode sombre/clair
- [ ] Personnalisation de la position du tooltip
- [ ] Raccourcis clavier
- [ ] Historique des prompts

### Moyen terme
- [ ] Support de plus de langues
- [ ] Règles personnalisables
- [ ] Templates de prompts
- [ ] Statistiques d'utilisation

### Long terme
- [ ] Synchronisation cloud optionnelle
- [ ] Partage de prompts
- [ ] Marketplace de templates
- [ ] Version mobile (via userscript)

## Publication

### Chrome Web Store

1. **Préparer le package**
```bash
cd extension
zip -r octoprompt-extension.zip . -x "*.py" "test.html" "*.md" "generate_icons.py"
```

2. **Créer un compte développeur**
- Aller sur [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Payer les frais uniques de 5$

3. **Soumettre l'extension**
- Uploader le fichier .zip
- Remplir les métadonnées
- Ajouter des captures d'écran
- Soumettre pour révision

### Firefox Add-ons

1. **Préparer le package**
```bash
cd extension
zip -r octoprompt-extension.zip .
```

2. **Créer un compte**
- [addons.mozilla.org](https://addons.mozilla.org)

3. **Soumettre**
- Uploader le .zip
- Remplir les informations
- Attendre la validation

## Ressources

### Documentation officielle
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)
- [Firefox Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

### Outils utiles
- [Extension CLI](https://github.com/cezaraugusto/extension.js)
- [Web Extension Polyfill](https://github.com/mozilla/webextension-polyfill)
- [Chrome Extension TypeScript Starter](https://github.com/chibat/chrome-extension-typescript-starter)

## Support

- 📧 Issues GitHub
- 💬 Discussions
- 📖 Documentation

---

**Happy coding! 🐙**
