# 🔧 Guide de Dépannage Rapide

## L'extension ne fonctionne pas sur ChatGPT

### ✅ Étape 1 : Vérifier que l'extension est chargée

1. **Ouvrir Chrome Extensions**
   ```
   chrome://extensions/
   ```

2. **Vérifier que OctoPrompt est :**
   - ✅ Présent dans la liste
   - ✅ Activé (toggle ON)
   - ✅ Sans erreur (pas de message rouge)

3. **Si l'extension n'apparaît pas :**
   - Recommencer l'installation
   - "Mode développeur" doit être activé
   - Sélectionner le bon dossier : `octoprompt/extension`

---

### ✅ Étape 2 : Recharger l'extension

1. Dans `chrome://extensions/`
2. Cliquer sur l'icône **🔄 Actualiser** sous OctoPrompt
3. Recharger la page ChatGPT (F5)

---

### ✅ Étape 3 : Vérifier la console

1. **Sur ChatGPT**, appuyer sur **F12**
2. Aller dans l'onglet **Console**
3. Chercher les messages `🐙 OctoPrompt`

**Messages attendus :**
```
🐙 OctoPrompt extension chargée!
🐙 OctoPrompt - Initialisation...
🐙 Analyse automatique: activée
🐙 OctoPrompt - Recherche du champ de texte sur: chat.openai.com
🐙 Champ de texte trouvé: <textarea>
🐙 Attachement au champ de texte...
```

**Si vous voyez :**
```
🐙 Aucun champ de texte trouvé
🐙 Champ non trouvé, réessai dans 1 seconde...
```
→ Le problème vient de la détection du champ

---

### ✅ Étape 4 : Test avec la page de diagnostic

1. **Ouvrir** : `extension/diagnostic.html`
2. **Écrire** dans le champ de texte
3. **Vérifier** que le tooltip apparaît
4. **Consulter** les logs

**Si ça fonctionne sur diagnostic.html mais pas sur ChatGPT :**
→ Problème de sélecteur CSS pour ChatGPT

---

### ✅ Étape 5 : Vérifier l'URL de ChatGPT

L'extension fonctionne sur :
- ✅ `https://chat.openai.com/*`
- ✅ `https://chatgpt.com/*`

**Si vous êtes sur une autre URL :**
1. Ouvrir `manifest.json`
2. Ajouter l'URL dans `matches` et `host_permissions`

---

### ✅ Étape 6 : Test manuel du sélecteur

1. **Sur ChatGPT**, ouvrir la console (F12)
2. **Copier-coller** ce code :

```javascript
// Tester les sélecteurs un par un
const selectors = [
  'textarea[id*="prompt"]',
  'textarea[placeholder*="Message"]',
  'textarea[placeholder*="message"]',
  'textarea#prompt-textarea',
  'textarea.m-0',
  'div[contenteditable="true"]'
];

console.log('🔍 Test des sélecteurs:');
selectors.forEach(sel => {
  const el = document.querySelector(sel);
  if (el) {
    console.log('✅ Trouvé:', sel, el);
  } else {
    console.log('❌ Non trouvé:', sel);
  }
});

// Afficher tous les textareas
const allTextareas = document.querySelectorAll('textarea');
console.log('📝 Tous les textareas:', allTextareas);
```

3. **Noter** quel sélecteur fonctionne
4. **Copier** ce sélecteur

---

### ✅ Étape 7 : Corriger le sélecteur (si nécessaire)

Si vous avez trouvé un nouveau sélecteur :

1. **Ouvrir** : `extension/content.js`
2. **Trouver** la fonction `findPromptInput()`
3. **Ajouter** votre sélecteur en premier :

```javascript
function findPromptInput() {
  let input = document.querySelector('VOTRE_SELECTEUR_ICI') || // ← Ajouter ici
              document.querySelector('textarea[id*="prompt"]') ||
              // ... reste du code
```

4. **Sauvegarder**
5. **Recharger** l'extension (chrome://extensions/)
6. **Tester** sur ChatGPT

---

### ✅ Étape 8 : Vérifier les permissions

1. **Ouvrir** : `chrome://extensions/`
2. **Cliquer** sur "Détails" sous OctoPrompt
3. **Vérifier** que les permissions sont accordées :
   - ✅ Lire et modifier vos données sur chat.openai.com
   - ✅ Lire et modifier vos données sur chatgpt.com

**Si les permissions manquent :**
- Recharger l'extension
- Ou réinstaller complètement

---

## 🐛 Problèmes Courants

### Le tooltip ne s'affiche pas

**Causes possibles :**
1. ❌ Texte trop court (< 5 caractères)
2. ❌ Extension désactivée dans le popup
3. ❌ Conflit avec une autre extension
4. ❌ ChatGPT a changé son interface

**Solutions :**
- Écrire au moins 6 caractères
- Vérifier le toggle dans le popup (cliquer sur l'icône 🐙)
- Désactiver temporairement autres extensions
- Attendre 0.5 secondes après avoir écrit

---

### Le bouton "Copier" ne fonctionne pas

**Solution :**
1. Vérifier les permissions clipboard
2. Copier manuellement le texte
3. Vérifier la console pour les erreurs

---

### L'extension ralentit ChatGPT

**Solutions :**
- Augmenter le délai de debouncing dans `content.js` :
  ```javascript
  debounceTimer = setTimeout(() => {
    // ...
  }, 1000); // Passer de 500ms à 1000ms
  ```

---

## 📞 Toujours bloqué ?

### Option 1 : Test avec la page locale
```bash
cd extension
start test.html
```
Écrivez et vérifiez si le tooltip apparaît.

### Option 2 : Vérifier avec un autre site
Testez sur Claude.ai ou Gemini pour voir si le problème est spécifique à ChatGPT.

### Option 3 : Réinstallation complète
1. Supprimer l'extension
2. Fermer Chrome
3. Rouvrir Chrome
4. Réinstaller l'extension

---

## 💡 Astuce : Mode Debug

Pour plus de logs, ouvrez `content.js` et ajoutez en haut :

```javascript
const DEBUG = true;

function debug(...args) {
  if (DEBUG) console.log('🐙 DEBUG:', ...args);
}
```

Puis ajoutez `debug(...)` partout où vous voulez loguer.

---

## 📧 Signaler un Bug

Si rien ne fonctionne :

1. **Copier** les logs de la console
2. **Noter** :
   - Version de Chrome
   - URL exacte de ChatGPT
   - Message d'erreur
3. **Créer** une issue sur GitHub avec ces infos

---

**🐙 N'abandonnez pas ! L'extension fonctionne, il suffit de trouver le bon sélecteur !**
