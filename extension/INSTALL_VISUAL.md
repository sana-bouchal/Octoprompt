# 🚀 Installation Visuelle - Pas à Pas

## ❌ Problème Détecté
Votre diagnostic montre : **"Extension non détectée"**

Cela signifie que l'extension n'est pas installée dans Chrome.

---

## ✅ Solution : Installation en 5 Étapes

### Étape 1️⃣ : Ouvrir Chrome Extensions

```
┌─────────────────────────────────────────────┐
│  🌐 Chrome - Barre d'adresse                │
├─────────────────────────────────────────────┤
│  chrome://extensions/                       │
│  [Appuyez sur Entrée]                       │
└─────────────────────────────────────────────┘
```

**OU** : Menu Chrome (3 points) > Plus d'outils > Extensions

---

### Étape 2️⃣ : Activer le Mode Développeur

Vous devriez voir cette page :

```
┌──────────────────────────────────────────────────────┐
│  Extensions                                          │
│                                                      │
│  [🔍 Rechercher]                    Mode développeur│
│                                            [ OFF ]   │← CLIQUEZ ICI
│  ┌─────────────────────────────────────────┐        │
│  │ Charger l'extension non empaquetée      │        │
│  │ Empaqueter l'extension                  │        │
│  │ Mettre à jour                           │        │
│  └─────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────┘
```

**Action :**
- Trouvez le toggle "Mode développeur" (en HAUT À DROITE)
- Cliquez dessus
- Il doit devenir BLEU (activé)

**APRÈS activation :**

```
┌──────────────────────────────────────────────────────┐
│  Extensions                                          │
│                                                      │
│  [🔍 Rechercher]                    Mode développeur│
│                                            [✓ ON ]   │← BLEU
│  ┌─────────────────────────────────────────┐        │
│  │ ✅ Charger l'extension non empaquetée   │← VISIBLE
│  │ Empaqueter l'extension                  │        │
│  │ Mettre à jour                           │        │
│  └─────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────┘
```

---

### Étape 3️⃣ : Charger l'Extension

**Action :**
1. Cliquez sur **"Charger l'extension non empaquetée"**
2. Une fenêtre s'ouvre :

```
┌──────────────────────────────────────────────────┐
│  Sélectionner le dossier de l'extension          │
├──────────────────────────────────────────────────┤
│  📁 Chemin : C:\Users\sanab\Desktop\octoprompt   │
│                                                  │
│  📁 extension          ← SÉLECTIONNEZ CE DOSSIER│
│  📁 app                                          │
│  📁 components                                   │
│  📄 package.json                                 │
│  📄 README.md                                    │
│                                                  │
│              [Annuler]  [Sélectionner le dossier]│
└──────────────────────────────────────────────────┘
```

**IMPORTANT :**
- ✅ Sélectionnez le dossier **`extension`**
- ❌ PAS le dossier `octoprompt` parent
- ❌ PAS un fichier, le DOSSIER entier

**Chemin complet :**
```
C:\Users\sanab\Desktop\octoprompt\extension
```

---

### Étape 4️⃣ : Vérifier l'Installation

Si tout s'est bien passé, vous verrez :

```
┌──────────────────────────────────────────────────────┐
│  Extensions                                          │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  🐙  OctoPrompt - Assistant IA        [✓ ON ]  │ │
│  │      ID: abcdef123456789...                    │ │
│  │      Version: 1.0.0                            │ │
│  │      Améliorez vos prompts IA en temps réel... │ │
│  │                                                │ │
│  │      🔄 Actualiser   🗑️ Supprimer   Détails   │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Erreurs:  Aucune                          ✅       │
└──────────────────────────────────────────────────────┘
```

**Vérifiez :**
- ✅ Nom : "OctoPrompt - Assistant IA"
- ✅ Icône : 🐙
- ✅ Toggle : BLEU (activé)
- ✅ Erreurs : Aucune

---

### ❌ SI VOUS VOYEZ DES ERREURS :

```
┌──────────────────────────────────────────────────────┐
│  🐙  OctoPrompt - Assistant IA        [✓ ON ]        │
│                                                      │
│  ⚠️ Erreurs (2)                                      │
│  ├─ Impossible de charger manifest.json             │
│  └─ Fichier introuvable: icons/icon16.png           │
└──────────────────────────────────────────────────────┘
```

**Solutions :**
1. **"Impossible de charger manifest.json"**
   → Vous avez sélectionné le mauvais dossier
   → Supprimez et réessayez avec le dossier `extension`

2. **"Fichier introuvable: icons/..."**
   → Les icônes n'ont pas été générées
   → Exécutez : `python extension/generate_icons.py`

---

### Étape 5️⃣ : Tester !

**Test 1 : Page de diagnostic**
1. Ouvrez (ou rechargez) : `extension\diagnostic.html`
2. Écrivez dans le champ
3. Résultat attendu :

```
✅ Extension OctoPrompt détectée !

[Texte saisi: "Bonjour le monde..."]
✅ Tooltip OctoPrompt affiché !
```

**Test 2 : ChatGPT**
1. Allez sur https://chat.openai.com
2. Écrivez dans le champ
3. Attendez 0.5 secondes
4. Le tooltip OctoPrompt devrait apparaître en bas à droite !

---

## 🐛 Problèmes Courants

### Problème 1 : "Mauvais chemin vers le dossier"
```
Erreur : Ce dossier ne contient pas de manifest.json valide
```

**Solution :**
- Vous avez sélectionné le mauvais dossier
- Le bon chemin : `C:\Users\sanab\Desktop\octoprompt\extension`
- PAS `C:\Users\sanab\Desktop\octoprompt`

### Problème 2 : "Extension chargée mais erreurs"
```
2 erreurs - Fichiers manquants
```

**Solution :**
```bash
cd C:\Users\sanab\Desktop\octoprompt\extension
python generate_icons.py
```
Puis rechargez l'extension (🔄 Actualiser)

### Problème 3 : "Toggle OFF automatiquement"
```
L'extension se désactive toute seule
```

**Solution :**
- Erreur dans le code
- Ouvrez la console (clic droit sur l'icône > Inspecter les vues > Popup)
- Partagez-moi les erreurs

---

## ✅ Checklist Finale

Avant de tester sur ChatGPT :

- [ ] Extension visible dans chrome://extensions/
- [ ] Toggle activé (BLEU)
- [ ] Aucune erreur affichée
- [ ] diagnostic.html fonctionne (tooltip s'affiche)
- [ ] Version : 1.0.0
- [ ] Icône 🐙 visible

---

## 📞 Besoin d'Aide ?

Si après ces étapes ça ne fonctionne toujours pas :

1. **Faites une capture d'écran** de chrome://extensions/
2. **Copiez les erreurs** (s'il y en a)
3. **Testez diagnostic.html** et partagez le résultat
4. **Partagez-moi tout** et je vous aide !

---

**🐙 Vous y êtes presque ! Suivez ces étapes et ça va marcher !**
