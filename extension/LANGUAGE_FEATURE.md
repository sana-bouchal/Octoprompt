# 🌐 Fonctionnalité Multilingue - OctoPrompt

## Changement de Langue (Français ↔ Anglais)

### ✨ Fonctionnalités

L'extension OctoPrompt supporte maintenant **deux langues** :
- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**

### 🎯 Ce qui est traduit

1. **Interface du Popup**
   - Titre et sous-titre
   - Labels des toggles
   - Messages de confirmation
   - Hints pour les clés API

2. **Interface d'Analyse (Tooltip)**
   - Badge de mode (Mode IA / Mode Règles)
   - Titre "OctoPrompt"
   - Label "Prompt Amélioré"
   - Boutons "Copier" et "Coller"
   - Section "Suggestions"
   - Message de chargement "L'IA réfléchit..."

3. **Règles d'Analyse**
   - Noms des règles
   - Suggestions d'amélioration
   - Mots-clés de détection adaptés à chaque langue

4. **Génération de Prompts Améliorés**
   - Rôles contextuels
   - Verbes d'action
   - Formats de sortie
   - Audiences cibles
   - Conclusions

### 🔧 Utilisation

1. **Ouvrir le popup** de l'extension
2. **Trouver le toggle "Langue"**
   - Position OFF (gauche) = Français 🇫🇷
   - Position ON (droite) = Anglais 🇬🇧
3. **Le changement est instantané** et sauvegardé automatiquement

### 💾 Persistance

- La préférence de langue est sauvegardée dans `chrome.storage.sync`
- La langue est restaurée automatiquement au rechargement
- Synchronisée entre les différents onglets

### 🔄 Changement en Temps Réel

Lorsque vous changez de langue :
1. L'interface du popup se met à jour immédiatement
2. Un message est envoyé au content script
3. Le prompt actuel est ré-analysé avec la nouvelle langue
4. Les suggestions et le prompt amélioré sont régénérés

### 📝 Exemples de Traduction

#### Français
```
"✨ Prompt Amélioré"
"💡 Suggestions"
"🤖 L'IA réfléchit..."
"📋 Copier"
"✨ Coller"
"Tu es un expert dans ton domaine."
"Génère un résultat complet et détaillé"
```

#### Anglais
```
"✨ Improved Prompt"
"💡 Suggestions"
"🤖 AI is thinking..."
"📋 Copy"
"✨ Paste"
"You are an expert in your field."
"Generate a complete and detailed result"
```

### 🎨 Modes Disponibles

Le changement de langue fonctionne avec **les deux modes** :
- **Mode Règles** 📋 : Analyse basée sur des règles prédéfinies
- **Mode IA** 🤖 : Analyse intelligente avec Gemini ou OpenAI

### 🐛 Debug

Pour vérifier la langue active dans la console :
```javascript
// La console affichera :
🌐 Langue: fr
// ou
🌐 Langue: en
```

### 📊 Variables de Langue

Les traductions sont stockées dans l'objet `i18n` :
```javascript
i18n = {
  fr: { rules: {...}, ui: {...} },
  en: { rules: {...}, ui: {...} }
}
```

Accès via la fonction `t(key)` :
```javascript
t('ui.title')          // → "🐙 OctoPrompt"
t('ui.copy')           // → "📋 Copier" (FR) / "📋 Copy" (EN)
t('rules.optimalLength.suggestion')  // → Suggestion traduite
```

---

**Version** : 2.0.1
**Date** : Novembre 2024
**Développé par** : Sana Bouchal
