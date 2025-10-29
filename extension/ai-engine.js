// ========== MOTEUR IA POUR L'ANALYSE DES PROMPTS ==========

class AIEngine {
  constructor() {
    this.apiKey = null;
    this.provider = 'gemini'; // 'gemini' ou 'openai'
    this.model = 'gemini-1.5-flash'; // Modèle gratuit de Google
    this.openaiModel = 'gpt-4o-mini';
    this.geminiURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    this.openaiURL = 'https://api.openai.com/v1/chat/completions';
  }

  async initialize() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['apiKey', 'aiProvider'], (result) => {
        this.apiKey = result.apiKey;
        this.provider = result.aiProvider || 'gemini';
        resolve(!!this.apiKey);
      });
    });
  }

  async analyzePrompt(prompt) {
    if (!this.apiKey) {
      console.log('🤖 Clé API manquante, utilisation du mode règles');
      return null;
    }

    try {
      if (this.provider === 'gemini') {
        return await this.analyzeWithGemini(prompt);
      } else {
        return await this.analyzeWithOpenAI(prompt);
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'analyse IA:', error);
      return null;
    }
  }

  async analyzeWithGemini(prompt) {
    const systemPrompt = `Tu es un expert en prompt engineering. Analyse le prompt suivant et retourne UNIQUEMENT un objet JSON valide avec cette structure exacte :
{
  "score": 75,
  "passedRules": ["Rôle Spécifique", "Verbes d'Action"],
  "failedRules": ["Format de Sortie", "Audience Cible"],
  "suggestions": [
    "Ajoute un format de sortie précis (liste, tableau, etc.)",
    "Précise l'audience cible pour mieux adapter le ton"
  ],
  "improvedPrompt": "Version améliorée du prompt avec tous les éléments manquants"
}

Le score doit être entre 0 et 100.
Les règles possibles sont : "Rôle Spécifique", "Mots-clés de Style", "Longueur Optimale", "Format de Sortie", "Verbes d'Action", "Audience Cible", "Contraintes Spécifiques".
Sois créatif et pertinent dans les suggestions en français.
L'improvedPrompt doit être en français, cohérent avec le prompt original, et vraiment amélioré.

Prompt à analyser: "${prompt}"`;

    const response = await fetch(`${this.geminiURL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      })
    });

    if (!response.ok) {
      console.error('❌ Erreur Gemini API:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      console.error('❌ Pas de contenu dans la réponse Gemini');
      return null;
    }

    return this.parseAIResponse(content);
  }

  async analyzeWithOpenAI(prompt) {
    const systemPrompt = `Tu es un expert en prompt engineering. Analyse le prompt suivant et retourne UNIQUEMENT un objet JSON valide avec cette structure exacte :
{
  "score": 75,
  "passedRules": ["Rôle Spécifique", "Verbes d'Action"],
  "failedRules": ["Format de Sortie", "Audience Cible"],
  "suggestions": [
    "Ajoute un format de sortie précis (liste, tableau, etc.)",
    "Précise l'audience cible pour mieux adapter le ton"
  ],
  "improvedPrompt": "Version améliorée du prompt avec tous les éléments manquants"
}

Le score doit être entre 0 et 100.
Les règles possibles sont : "Rôle Spécifique", "Mots-clés de Style", "Longueur Optimale", "Format de Sortie", "Verbes d'Action", "Audience Cible", "Contraintes Spécifiques".
Sois créatif et pertinent dans les suggestions.
L'improvedPrompt doit être en français, cohérent avec le prompt original, et vraiment amélioré.`;

    const response = await fetch(this.openaiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.openaiModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Prompt à analyser: "${prompt}"` }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      console.error('❌ Erreur OpenAI API:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      console.error('❌ Pas de contenu dans la réponse OpenAI');
      return null;
    }

    return this.parseAIResponse(content);
  }

  parseAIResponse(content) {
    try {
      // Extraire le JSON de la réponse (au cas où il y aurait du texte autour)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('❌ Pas de JSON trouvé dans la réponse');
        return null;
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validation de la structure
      if (!analysis.score || !analysis.suggestions || !analysis.improvedPrompt) {
        console.error('❌ Structure JSON invalide');
        return null;
      }

      console.log('✅ Analyse IA réussie:', analysis);
      return analysis;
    } catch (error) {
      console.error('❌ Erreur parsing JSON:', error);
      return null;
    }
  }

  async generateImprovedPrompt(originalPrompt, context = {}) {
    if (!this.apiKey) return null;

    try {
      const systemPrompt = `Tu es un expert en prompt engineering. 
Améliore le prompt suivant en le rendant plus clair, précis et efficace.
Garde le sens original mais enrichis-le avec :
- Un rôle spécifique si manquant
- Des verbes d'action clairs
- Un format de sortie défini
- Une audience cible si pertinent
- Des contraintes utiles

Retourne UNIQUEMENT le prompt amélioré en français, sans explication.

Prompt à améliorer: ${originalPrompt}`;

      if (this.provider === 'gemini') {
        const response = await fetch(`${this.geminiURL}?key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemPrompt }]
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 500,
            }
          })
        });

        if (!response.ok) return null;
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      } else {
        const response = await fetch(this.openaiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: this.openaiModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: originalPrompt }
            ],
            temperature: 0.8,
            max_tokens: 500
          })
        });

        if (!response.ok) return null;
        const data = await response.json();
        return data.choices[0]?.message?.content?.trim();
      }
    } catch (error) {
      console.error('❌ Erreur génération IA:', error);
      return null;
    }
  }
}

// Instance globale
const aiEngine = new AIEngine();
