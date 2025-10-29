# 🚀 Installation et Test - Mode IA

## ⚡ Installation Rapide

### 1. Charger l'extension dans Chrome

```bash
1. Ouvrir Chrome
2. Aller dans chrome://extensions/
3. Activer "Mode développeur" (coin supérieur droit)
4. Cliquer sur "Charger l'extension non empaquetée"
5. Sélectionner le dossier : C:\Users\sanab\Desktop\octoprompt\extension
6. L'icône 🐙 apparaît dans la barre d'outils
```

### 2. Configuration du Mode IA (optionnel)

```bash
1. Cliquer sur l'icône 🐙 OctoPrompt
2. Activer le toggle "Mode IA (GPT-4)"
3. Un champ apparaît pour la clé API
4. Entrer votre clé API OpenAI (format: sk-...)
5. Cliquer sur "Enregistrer"
6. ✅ Mode IA activé !
```

### 3. Tester l'extension

#### Option A : Page de test locale

```bash
1. Ouvrir le fichier : extension/test-ai-mode.html
2. Taper dans les zones de texte
3. Observer les suggestions en temps réel
```

#### Option B : Sur ChatGPT

```bash
1. Aller sur https://chatgpt.com
2. Commencer à taper dans le champ de texte
3. Observer le tooltip OctoPrompt apparaître
```

## 🧪 Tests à effectuer

### Test 1 : Mode Règles (par défaut)

```
1. S'assurer que le Mode IA est DÉSACTIVÉ
2. Taper : "écris un article"
3. ✅ Vérifier : Score, suggestions, prompt amélioré
4. ✅ Badge affiché : "📋 Mode Règles"
5. ✅ Réponse instantanée
```

### Test 2 : Mode IA

```
1. Activer le Mode IA + entrer la clé API
2. Taper : "écris un article"
3. ✅ Vérifier : Score, suggestions, prompt amélioré
4. ✅ Badge affiché : "🤖 Mode IA"
5. ✅ Suggestions plus détaillées et contextuelles
6. ✅ Réponse en 1-2 secondes
```

### Test 3 : Diversité des suggestions

```
1. Taper le même prompt 5 fois
2. Effacer et retaper à chaque fois
3. ✅ Mode Règles : Variations visibles
4. ✅ Mode IA : Chaque réponse unique
```

### Test 4 : Détection du contexte

```
Prompts à tester :

📝 Créatif :
- "dessine un logo"
- "imagine une histoire"

💻 Technique :
- "code une API REST"
- "développe un algorithme"

📊 Analyse :
- "analyse ces données"
- "compare ces options"

✍️ Rédaction :
- "rédige un email"
- "écris une lettre"

✅ Vérifier que les suggestions s'adaptent au contexte
```

### Test 5 : Fallback automatique

```
1. Activer le Mode IA avec une clé invalide
2. Taper un prompt
3. ✅ L'extension bascule automatiquement en Mode Règles
4. ✅ Message dans la console (F12)
```

## 🐛 Debugging

### Ouvrir la console

```bash
F12 > Console
```

### Messages à observer

```
✅ Mode Règles :
🐙 OctoPrompt - Initialisation...
🐙 Analyse automatique: activée
🤖 Mode IA: désactivé
🐙 Attachement au champ de texte...

✅ Mode IA :
🐙 OctoPrompt - Initialisation...
🐙 Analyse automatique: activée
🤖 Mode IA: activé
🤖 Moteur IA initialisé
🤖 Tentative d'analyse avec IA...
✅ Analyse IA réussie: {score: 75, ...}

❌ Erreur IA (fallback) :
🤖 Tentative d'analyse avec IA...
❌ Erreur API: 401 Unauthorized
⚠️ Fallback vers analyse par règles
```

## 📊 Vérifications de qualité

### Mode Règles

| Critère | Attendu |
|---------|---------|
| Temps de réponse | < 100ms |
| Variations | Oui (5+ patterns) |
| Score cohérent | Oui |
| Offline | Oui |

### Mode IA

| Critère | Attendu |
|---------|---------|
| Temps de réponse | 1-3s |
| Variations | Très élevée |
| Score cohérent | Oui |
| Contexte compris | Oui |
| Fallback | Automatique |

## 🔧 Problèmes courants

### L'extension ne se charge pas

```bash
❌ Erreur : "Manifest file is invalid"
✅ Solution : Vérifier manifest.json

❌ Erreur : "Could not load file"
✅ Solution : Vérifier que ai-engine.js et content.js existent
```

### Le tooltip n'apparaît pas

```bash
❌ Cause possible : Champ de texte non détecté
✅ Solution : Vérifier dans la console (F12)
✅ Vérifier que l'extension est activée

❌ Cause possible : Extension en pause
✅ Solution : Cliquer sur 🐙 et activer le toggle
```

### Mode IA ne fonctionne pas

```bash
❌ Erreur 401 : Clé API invalide
✅ Solution : Regénérer la clé sur platform.openai.com

❌ Erreur 429 : Quota dépassé
✅ Solution : Attendre ou augmenter les limites

❌ Pas de réponse : Pas de crédits
✅ Solution : Ajouter des crédits sur OpenAI
```

## ✅ Checklist finale

Avant de déployer :

- [ ] Extension se charge sans erreur
- [ ] Mode Règles fonctionne
- [ ] Mode IA fonctionne (avec clé valide)
- [ ] Fallback fonctionne (avec clé invalide)
- [ ] Badge affiche le bon mode
- [ ] Diversité visible dans les suggestions
- [ ] Détection du contexte fonctionne
- [ ] Tooltip s'affiche correctement
- [ ] Bouton "Copier" fonctionne
- [ ] Sauvegarde des paramètres fonctionne
- [ ] Pas d'erreurs dans la console
- [ ] Test sur ChatGPT réussi
- [ ] Test sur Claude réussi (optionnel)

## 📝 Notes

- Les fichiers modifiés sont automatiquement rechargés
- Si besoin de recharger : chrome://extensions/ > ⟳
- La clé API est stockée de façon sécurisée
- Le fallback garantit que l'extension fonctionne toujours

---

🎉 **Tout est prêt !** L'extension OctoPrompt v2.0 est maintenant équipée d'un moteur IA intelligent tout en gardant un mode gratuit performant.

Made with 💙 by Sana Bouchal
