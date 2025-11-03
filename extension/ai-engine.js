// ========== MOTEUR IA POUR L'ANALYSE DES PROMPTS ==========

class AIEngine {
  constructor() {
    this.apiKey = null;
    this.provider = 'gemini'; // 'gemini' ou 'openai'
    this.model = 'gemini-2.5-flash'; // Modèle gratuit de Google
    this.openaiModel = 'gpt-4o-mini';
    this.geminiURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
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
    const systemPrompt = `Analyse ce prompt et retourne un JSON valide :

{
  "score": 75,
  "passedRules": ["Verbes d'Action"],
  "failedRules": ["Format de Sortie"],
  "suggestions": ["Ajoute un format", "Précise l'audience"],
  "improvedPrompt": "Version améliorée complète du prompt"
}

Score: 0-100. Règles: Rôle, Style, Longueur, Format, Verbes, Audience, Contraintes.

Prompt: "${prompt.replace(/"/g, '\\"')}"

Retourne UNIQUEMENT le JSON complet.`;

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
          temperature: 0.3,
          maxOutputTokens: 4096,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur Gemini API:', response.status, response.statusText);
      console.error('Détails:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('📦 Réponse Gemini complète:', JSON.stringify(data, null, 2));
    
    // Vérifier si la réponse a été tronquée
    const finishReason = data.candidates?.[0]?.finishReason;
    if (finishReason === 'MAX_TOKENS') {
      console.warn('⚠️ Réponse Gemini tronquée (MAX_TOKENS atteint)');
      console.log('💡 Tentative de parsing du JSON partiel...');
    }
    
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      console.error('❌ Pas de contenu dans la réponse Gemini');
      console.error('Structure reçue:', {
        hasCandidates: !!data.candidates,
        candidatesLength: data.candidates?.length,
        firstCandidate: data.candidates?.[0],
        finishReason: data.candidates?.[0]?.finishReason,
        safetyRatings: data.candidates?.[0]?.safetyRatings
      });
      return null;
    }

    return this.parseAIResponse(content);
  }

  async analyzeWithOpenAI(prompt) {
    const systemPrompt = `Tu es un expert en prompt engineering. Analyse le prompt suivant et retourne UNIQUEMENT un objet JSON valide avec cette structure exacte, sans texte avant ou après :

{
  "score": 75,
  "passedRules": ["Rôle Spécifique", "Verbes d'Action"],
  "failedRules": ["Format de Sortie", "Audience Cible"],
  "suggestions": [
    "Ajoute un format de sortie précis (liste, tableau, etc.)",
    "Précise l'audience cible pour mieux adapter le ton"
  ],
  "improvedPrompt": "Version complètement améliorée du prompt avec tous les éléments manquants"
}

RÈGLES:
- Le score DOIT être un nombre entre 0 et 100
- passedRules et failedRules sont des listes de noms de règles
- suggestions doit contenir au moins 2 conseils concrets
- improvedPrompt doit être une réécriture complète en français

Les règles possibles sont : "Rôle Spécifique", "Style ou Ton", "Longueur Optimale", "Format de Sortie", "Verbes d'Action", "Audience Cible", "Contraintes Spécifiques".

Sois créatif et pertinent dans les suggestions. L'improvedPrompt doit être cohérent avec le prompt original et vraiment amélioré.

NE RETOURNE QUE LE JSON, rien d'autre.`;

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
          { role: 'user', content: `Prompt à analyser: "${prompt.replace(/"/g, '\\"')}"` }
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: "json_object" }
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
      // Supprimer les backticks markdown si présents (avant et après)
      let cleanContent = content
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
      
      // Extraire le JSON de la réponse (accepte les accolades sur plusieurs lignes)
      let jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        console.error('❌ Pas de JSON trouvé dans la réponse IA');
        console.log('Contenu reçu:', content.substring(0, 200));
        console.log('Contenu nettoyé:', cleanContent.substring(0, 200));
        return null;
      }

      let jsonStr = jsonMatch[0];
      
      // Tenter de réparer un JSON tronqué
      if (!jsonStr.endsWith('}')) {
        console.warn('⚠️ JSON incomplet détecté, tentative de réparation...');
        
        // Compter les accolades ouvrantes et fermantes
        const openBraces = (jsonStr.match(/\{/g) || []).length;
        const closeBraces = (jsonStr.match(/\}/g) || []).length;
        
        // Fermer les tableaux ouverts
        const openBrackets = (jsonStr.match(/\[/g) || []).length;
        const closeBrackets = (jsonStr.match(/\]/g) || []).length;
        
        // Ajouter les fermetures manquantes
        if (openBrackets > closeBrackets) {
          // Si on est dans un string, le fermer
          const lastQuote = jsonStr.lastIndexOf('"');
          const beforeLastQuote = jsonStr.substring(0, lastQuote);
          const quoteCount = (beforeLastQuote.match(/"/g) || []).length;
          
          if (quoteCount % 2 !== 0) {
            jsonStr += '"';
          }
          
          jsonStr += ']'.repeat(openBrackets - closeBrackets);
        }
        
        jsonStr += '}'.repeat(openBraces - closeBraces);
        console.log('🔧 JSON réparé:', jsonStr.substring(jsonStr.length - 50));
      }

      const analysis = JSON.parse(jsonStr);
      
      // Validation de la structure avec valeurs par défaut
      if (typeof analysis.score === 'undefined' || analysis.score === null) {
        console.error('❌ Champ "score" manquant dans la réponse IA');
        console.log('JSON reçu:', JSON.stringify(analysis, null, 2));
        return null;
      }

      // Ajouter des valeurs par défaut si manquantes
      analysis.passedRules = analysis.passedRules || [];
      analysis.failedRules = analysis.failedRules || [];
      analysis.suggestions = analysis.suggestions || [];
      analysis.improvedPrompt = analysis.improvedPrompt || '';

      // Vérifier que le score est valide
      if (typeof analysis.score !== 'number' || analysis.score < 0 || analysis.score > 100) {
        console.error('❌ Score invalide (doit être entre 0 et 100):', analysis.score);
        return null;
      }

      console.log('✅ JSON parsé avec succès:', {
        score: analysis.score,
        suggestions: analysis.suggestions.length,
        improvedPrompt: analysis.improvedPrompt ? 'présent' : 'absent'
      });

      return analysis;
    } catch (error) {
      console.error('❌ Erreur parsing JSON:', error.message);
      console.log('Contenu qui a échoué:', content.substring(0, 300));
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

  async fixSpelling(text, language = 'fr') {
    if (!this.apiKey) {
      console.log('🤖 Clé API manquante pour la correction');
      return text;
    }

    try {
      const systemPrompt = language === 'fr' 
        ? `Tu es un correcteur d'orthographe et de grammaire français. 
Corrige UNIQUEMENT les fautes d'orthographe, de grammaire et de ponctuation dans le texte suivant.
Ne modifie PAS le sens, ne reformule PAS, ne change PAS le style.
Retourne UNIQUEMENT le texte corrigé, sans commentaire, sans explication.`
        : `You are a spelling and grammar checker.
Fix ONLY spelling, grammar and punctuation errors in the following text.
Do NOT change the meaning, do NOT rephrase, do NOT change the style.
Return ONLY the corrected text, without comments or explanations.`;

      if (this.provider === 'gemini') {
        const response = await fetch(`${this.geminiURL}?key=${this.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nTexte:\n${text}` }]
            }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 2000,
            }
          })
        });

        if (!response.ok) {
          console.error('❌ Erreur API Gemini');
          return text;
        }
        
        const data = await response.json();
        const corrected = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        return corrected || text;
        
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
              { role: 'user', content: text }
            ],
            temperature: 0.1,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          console.error('❌ Erreur API OpenAI');
          return text;
        }
        
        const data = await response.json();
        const corrected = data.choices[0]?.message?.content?.trim();
        return corrected || text;
      }
    } catch (error) {
      console.error('❌ Erreur correction orthographe IA:', error);
      return text;
    }
  }
}

// Instance globale
const aiEngine = new AIEngine();
