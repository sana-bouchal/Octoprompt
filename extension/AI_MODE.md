# 🤖 Mode IA - OctoPrompt

## Qu'est-ce que le Mode IA ?

Le Mode IA utilise **GPT-4** d'OpenAI pour analyser vos prompts de manière intelligente et contextuelle, au lieu d'utiliser des règles logiques fixes.

## ✨ Avantages du Mode IA

### Analyse par Règles (Mode par défaut)
- ✅ Gratuit
- ✅ Rapide
- ✅ Fonctionne hors ligne
- ❌ Suggestions génériques
- ❌ Patterns répétitifs

### Analyse IA (Mode avancé)
- ✅ Analyse contextuelle intelligente
- ✅ Suggestions ultra-personnalisées
- ✅ Prompts améliorés créatifs et diversifiés
- ✅ Comprend l'intention réelle
- ❌ Nécessite une clé API OpenAI
- ❌ Coût minime par analyse (~0.001€)

## 🚀 Comment activer le Mode IA ?

### 1. Obtenir une clé API OpenAI

1. Créez un compte sur [platform.openai.com](https://platform.openai.com)
2. Allez dans **API Keys** → **Create new secret key**
3. Copiez votre clé (format : `sk-...`)
4. Ajoutez des crédits (minimum 5€ recommandé)

### 2. Configurer l'extension

1. Cliquez sur l'icône 🐙 OctoPrompt dans Chrome
2. Activez **"Mode IA (GPT-4)"**
3. Un champ apparaît pour entrer votre clé API
4. Collez votre clé et cliquez sur **"Enregistrer"**
5. C'est prêt ! ✨

## 💡 Utilisation

Une fois activé, le Mode IA analyse automatiquement vos prompts :

```
Vous tapez : "écris un article"

❌ Mode Règles : 
"Agis en tant qu'expert. Génère écris un article. 
Structure la réponse de manière claire."

✅ Mode IA :
"Tu es un rédacteur web professionnel. Rédige un article 
complet et structuré sur le sujet demandé. Organise le 
contenu avec une introduction accrocheuse, 3-4 sections 
principales bien développées, et une conclusion percutante. 
Adapte le ton pour un public professionnel, en utilisant 
un style clair et engageant. Le résultat doit être prêt 
à publier."
```

## 🔒 Sécurité

- Votre clé API est stockée **localement** dans Chrome
- Elle n'est **jamais partagée** avec d'autres sites
- Seule l'API OpenAI reçoit vos prompts pour analyse
- Vous pouvez la supprimer à tout moment

## 💰 Coûts

Le modèle utilisé est **GPT-4-mini** (économique) :
- ~0.0001€ par analyse
- 10 000 analyses ≈ 1€
- Pour un usage quotidien : ~0.50€/mois

## 🔄 Fallback automatique

Si le Mode IA ne fonctionne pas (pas de connexion, quota dépassé, etc.),
l'extension revient automatiquement au mode par règles.

## ⚙️ Configuration avancée

Vous pouvez modifier `ai-engine.js` pour :
- Changer le modèle (`gpt-4`, `gpt-4-turbo`, etc.)
- Ajuster la température (créativité)
- Modifier les instructions système

## ❓ Dépannage

**Le Mode IA ne fonctionne pas ?**
1. Vérifiez que votre clé API est valide
2. Vérifiez vos crédits OpenAI
3. Regardez la console (F12) pour les erreurs
4. Désactivez/réactivez le mode

**Erreur 429 (Rate limit) ?**
- Vous avez dépassé votre quota
- Attendez quelques secondes
- Augmentez vos limites sur OpenAI

**Erreur 401 (Unauthorized) ?**
- Votre clé API est invalide ou expirée
- Régénérez une nouvelle clé sur OpenAI

---

Made with 💙 by Sana Bouchal
