// OctoPrompt Extension - Content Script
// Analyse les prompts en temps réel sur les plateformes IA

// ========== CONFIGURATION ==========
let isEnabled = true;
let aiModeEnabled = false;

// ========== RÈGLES D'ANALYSE ==========
const PROMPT_RULES = [
  {
    name: 'Longueur Optimale',
    category: 'Essentiel',
    weight: 25,
    check: (prompt) => {
      const words = prompt.split(/\s+/).filter(w => w.length > 0);
      return words.length >= 5 && words.length <= 200;
    },
    suggestion: 'Ajustez la longueur : ni trop court (min 5 mots), ni trop long (max 200 mots)'
  },
  {
    name: 'Verbes d\'Action',
    category: 'Essentiel',
    weight: 25,
    check: (prompt) => {
      const actionVerbs = [
        'génère', 'crée', 'analyse', 'synthétise', 'rédige', 'explique',
        'compare', 'liste', 'décris', 'propose', 'développe', 'écris',
        'fais', 'montre', 'donne', 'construis', 'code', 'dessine', 'imagine',
        'conçois', 'élabore', 'produis', 'fournis'
      ];
      return actionVerbs.some(verb => prompt.toLowerCase().includes(verb));
    },
    suggestion: 'Utilisez des verbes d\'action clairs (ex: "génère", "analyse", "rédige")'
  },
  {
    name: 'Clarté du Sujet',
    category: 'Essentiel',
    weight: 20,
    check: (prompt) => {
      // Un prompt clair a au moins un nom commun significatif
      const words = prompt.split(/\s+/);
      return words.length >= 3; // Au moins 3 mots pour être clair
    },
    suggestion: 'Soyez plus précis sur ce que vous voulez'
  },
  {
    name: 'Rôle Spécifique',
    category: 'Bonus',
    weight: 10,
    check: (prompt) => {
      const roleKeywords = ['agis en tant que', 'tu es un', 'tu es une', 'rôle :', 'joue le rôle', 'en tant que', 'expert', 'spécialiste'];
      return roleKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Bonus : Ajoutez un rôle spécifique (ex: "Agis en tant que expert...")'
  },
  {
    name: 'Style ou Ton',
    category: 'Bonus',
    weight: 10,
    check: (prompt) => {
      const styleKeywords = [
        'photoréaliste', 'minimaliste', 'humoristique', 'professionnel',
        'artistique', 'moderne', 'vintage', 'élégant', 'créatif', 'technique',
        'simple', 'détaillé', 'formel', 'informel', 'sérieux', 'ludique'
      ];
      return styleKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Bonus : Spécifiez un style ou ton (ex: "professionnel", "créatif")'
  },
  {
    name: 'Format de Sortie',
    category: 'Bonus',
    weight: 5,
    check: (prompt) => {
      const formatKeywords = [
        'sous forme de', 'en json', 'tableau', 'paragraphes', 'liste',
        'points', 'étapes', 'format', 'structure', 'sections'
      ];
      return formatKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Bonus : Indiquez le format souhaité (ex: "sous forme de liste")'
  },
  {
    name: 'Audience Cible',
    category: 'Bonus',
    weight: 3,
    check: (prompt) => {
      const audienceKeywords = [
        'pour', 'audience', 'public', 'lecteur', 'utilisateur',
        'débutant', 'expert', 'enfant', 'professionnel', 'client'
      ];
      return audienceKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Bonus : Précisez l\'audience (ex: "pour des débutants")'
  },
  {
    name: 'Contraintes',
    category: 'Bonus',
    weight: 2,
    check: (prompt) => {
      const constraintKeywords = [
        'maximum', 'minimum', 'environ', 'limite', 'restriction',
        'en moins de', 'en plus de', 'entre', 'mots', 'caractères'
      ];
      return constraintKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Bonus : Ajoutez des contraintes (ex: "en 100 mots maximum")'
  }
];

// ========== FONCTION D'ANALYSE ==========
async function analyzePrompt(prompt) {
  if (!prompt || prompt.trim().length === 0) {
    return {
      score: 0,
      passedRules: [],
      failedRules: PROMPT_RULES,
      suggestions: ['Veuillez entrer un prompt à analyser.']
    };
  }

  // Si le mode IA est activé, utiliser l'IA
  if (aiModeEnabled && typeof aiEngine !== 'undefined') {
    console.log('🤖 Tentative d\'analyse avec IA...');
    const aiAnalysis = await aiEngine.analyzePrompt(prompt);
    
    if (aiAnalysis) {
      console.log('✅ Analyse IA utilisée');
      return aiAnalysis;
    }
    
    console.log('⚠️ Fallback vers analyse par règles');
  }

  // Analyse par règles (fallback ou mode par défaut)
  const passedRules = PROMPT_RULES.filter(rule => rule.check(prompt));
  const failedRules = PROMPT_RULES.filter(rule => !rule.check(prompt));

  const totalWeight = PROMPT_RULES.reduce((sum, rule) => sum + rule.weight, 0);
  const achievedWeight = passedRules.reduce((sum, rule) => sum + rule.weight, 0);
  const score = Math.round((achievedWeight / totalWeight) * 100);

  const suggestions = failedRules.map(rule => rule.suggestion);
  
  let improvedPrompt = score < 100 ? generateImprovedPrompt(prompt, failedRules) : undefined;

  // Sauvegarder dans l'historique
  if (improvedPrompt && typeof promptHistory !== 'undefined') {
    promptHistory.addPrompt(prompt, improvedPrompt, score, 'rules');
  }

  return {
    score,
    passedRules,
    failedRules,
    suggestions,
    improvedPrompt
  };
}

// ========== GÉNÉRATION PROMPT AMÉLIORÉ ==========
function generateImprovedPrompt(originalPrompt, failedRules) {
  let improved = originalPrompt.trim();
  
  // Détection du contexte du prompt original
  const isCreativeTask = /image|design|créatif|créer|dessine|illustr/i.test(improved);
  const isTechnicalTask = /code|programm|fonction|algorithme|technique|développ/i.test(improved);
  const isAnalysisTask = /analys|étudi|examin|compar|évalu/i.test(improved);
  const isWritingTask = /rédige|écris|article|texte|contenu/i.test(improved);
  
  // Rôles variés selon le contexte
  const roles = {
    creative: [
      'Tu es un designer créatif expérimenté.',
      'En tant que directeur artistique,',
      'Avec ton expertise en création de contenu visuel,'
    ],
    technical: [
      'En tant que développeur senior,',
      'Tu es un expert technique spécialisé.',
      'Avec ton expérience en ingénierie logicielle,'
    ],
    analysis: [
      'Tu es un analyste expert.',
      'En tant que consultant spécialisé,',
      'Avec ton regard d\'expert analytique,'
    ],
    writing: [
      'Tu es un rédacteur professionnel.',
      'En tant qu\'expert en communication,',
      'Avec ton expérience en rédaction de contenu,'
    ],
    general: [
      'Tu es un expert dans ton domaine.',
      'En tant que professionnel qualifié,',
      'Avec ton expertise approfondie,',
      'Tu maîtrises parfaitement le sujet.'
    ]
  };
  
  // Verbes d'action variés selon le contexte
  const actionVerbs = {
    creative: ['Conçois', 'Crée', 'Imagine', 'Développe', 'Élabore'],
    technical: ['Développe', 'Construis', 'Implémente', 'Code', 'Conçois'],
    analysis: ['Analyse', 'Examine', 'Étudie', 'Évalue', 'Décortique'],
    writing: ['Rédige', 'Compose', 'Écris', 'Formule', 'Produis'],
    general: ['Génère', 'Produis', 'Fournis', 'Élabore', 'Développe']
  };
  
  // Formats de sortie variés
  const formats = [
    'Présente le résultat de façon structurée et détaillée',
    'Organise ta réponse en sections claires',
    'Structure la réponse avec des titres et sous-parties',
    'Fournis une réponse bien organisée et facile à suivre',
    'Présente l\'information de manière hiérarchisée'
  ];
  
  // Conclusions variées
  const conclusions = [
    'Assure-toi que le résultat soit complet et directement utilisable.',
    'Le résultat doit être précis et actionnable.',
    'Fournis tous les détails nécessaires pour une mise en œuvre immédiate.',
    'La réponse doit être exhaustive et pratique.',
    'Inclus tous les éléments essentiels pour un résultat optimal.'
  ];
  
  // Sélection aléatoire des éléments
  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Déterminer la catégorie
  let category = 'general';
  if (isCreativeTask) category = 'creative';
  else if (isTechnicalTask) category = 'technical';
  else if (isAnalysisTask) category = 'analysis';
  else if (isWritingTask) category = 'writing';
  
  // Ajout du rôle si manquant
  const hasRole = failedRules.find(r => r.name === 'Rôle Spécifique');
  if (hasRole) {
    const rolePrefix = randomElement(roles[category]);
    improved = `${rolePrefix} ${improved}`;
  }
  
  // Ajout du verbe d'action si manquant
  const hasAction = failedRules.find(r => r.name === "Verbes d'Action");
  if (hasAction && !/^(génère|crée|analyse|explique|rédige|développe|conçois)/i.test(improved)) {
    const actionVerb = randomElement(actionVerbs[category]);
    // Adapter le début du prompt
    improved = improved.charAt(0).toLowerCase() + improved.slice(1);
    improved = `${actionVerb} ${improved}`;
  }
  
  // Ajout du format si manquant
  const hasFormat = failedRules.find(r => r.name === 'Format de Sortie');
  if (hasFormat) {
    improved += `. ${randomElement(formats)}`;
  }
  
  // Ajout d'une audience si manquante et pertinent
  const hasAudience = failedRules.find(r => r.name === 'Audience Cible');
  if (hasAudience && Math.random() > 0.5) {
    const audiences = [
      'pour un public professionnel',
      'destiné à des utilisateurs avertis',
      'adapté à tous les niveaux',
      'pour une audience experte'
    ];
    improved += `, ${randomElement(audiences)}`;
  }
  
  // Ajout d'une conclusion variée
  improved += `. ${randomElement(conclusions)}`;
  
  return improved.replace(/\s+/g, ' ').trim();
}

// ========== DÉTECTION DU CHAMP DE TEXTE ==========
let lastFoundInput = null;

function findPromptInput() {
  // ChatGPT / OpenAI - Essayer plusieurs sélecteurs
  let input = document.querySelector('textarea[id*="prompt"]') ||
              document.querySelector('textarea[placeholder*="Message"]') ||
              document.querySelector('textarea[placeholder*="message"]') ||
              document.querySelector('textarea#prompt-textarea') ||
              document.querySelector('textarea[data-id="root"]') ||
              document.querySelector('div[contenteditable="true"][data-id*="root"]') ||
              document.querySelector('textarea.m-0') || // Nouveau ChatGPT
              document.querySelector('textarea[placeholder*="Envoy"]'); // ChatGPT FR
  
  // Claude.ai
  if (!input) {
    input = document.querySelector('div[contenteditable="true"]') ||
            document.querySelector('div.ProseMirror') ||
            document.querySelector('textarea.ProseMirror');
  }
  
  // Gemini
  if (!input) {
    input = document.querySelector('rich-textarea textarea') ||
            document.querySelector('textarea[aria-label*="message"]') ||
            document.querySelector('textarea[aria-label*="Message"]');
  }
  
  // Perplexity
  if (!input) {
    input = document.querySelector('textarea[placeholder*="Ask"]') ||
            document.querySelector('textarea[placeholder*="ask"]');
  }
  
  // Fallback: chercher n'importe quel textarea visible
  if (!input) {
    const textareas = document.querySelectorAll('textarea');
    for (const textarea of textareas) {
      if (textarea.offsetWidth > 0 && textarea.offsetHeight > 0) {
        input = textarea;
        break;
      }
    }
  }
  
  // Logger uniquement si c'est un nouveau champ trouvé
  if (input && input !== lastFoundInput) {
    console.log('🐙 Champ de texte trouvé:', input);
    lastFoundInput = input;
  }
  
  return input;
}

// ========== INTERFACE UTILISATEUR ==========
let tooltipElement = null;

function createTooltip() {
  if (tooltipElement) return tooltipElement;
  
  const tooltip = document.createElement('div');
  tooltip.id = 'octoprompt-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    min-width: 320px;
    max-width: 400px;
    background: linear-gradient(135deg, #0c1445 0%, #1a1f4d 100%);
    border: 2px solid rgba(96, 165, 250, 0.5);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    z-index: 999999;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: none;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(tooltip);
  tooltipElement = tooltip;
  return tooltip;
}

function updateTooltip(analysis) {
  if (!isEnabled) return;
  
  const tooltip = createTooltip();
  
  // Si analysis est null, afficher un loader
  if (analysis === null) {
    tooltip.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <div style="display: inline-block; width: 50px; height: 50px; border: 5px solid rgba(96, 165, 250, 0.3); border-top-color: #60a5fa; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <div style="margin-top: 15px; color: #93c5fd; font-size: 14px;">🤖 L'IA réfléchit...</div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    tooltip.style.display = 'block';
    return;
  }
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };
  
  const scoreColor = getScoreColor(analysis.score);
  
  // Badge pour indiquer le mode utilisé
  const modeBadge = aiModeEnabled 
    ? '<span style="background: linear-gradient(135deg, #8b5cf6, #ec4899); padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">🤖 Mode IA</span>'
    : '<span style="background: rgba(100, 116, 139, 0.5); padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">📋 Mode Règles</span>';
  
  let html = `
    <div style="margin-bottom: 15px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <h3 style="margin: 0; color: #60a5fa; font-size: 16px;">🐙 OctoPrompt</h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${modeBadge}
          <button id="octoprompt-close" style="background: none; border: none; color: #64748b; font-size: 20px; cursor: pointer;">×</button>
        </div>
      </div>
      <div style="text-align: center; margin-bottom: 15px;">
        <div style="font-size: 48px; font-weight: bold; color: ${scoreColor}; margin-bottom: 5px;">
          ${analysis.score}
        </div>
        <div style="color: #93c5fd; font-size: 12px;">/ 100</div>
      </div>
      <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: 4px; overflow: hidden;">
        <div style="background: ${scoreColor}; height: 100%; width: ${analysis.score}%; transition: width 0.5s ease;"></div>
      </div>
    </div>
  `;
  
  if (analysis.improvedPrompt) {
    html += `
      <div style="background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.5); border-radius: 12px; padding: 12px; margin-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #06b6d4; font-size: 14px; font-weight: 600;">✨ Prompt Amélioré</span>
          <button id="octoprompt-copy" style="background: #06b6d4; color: white; border: none; padding: 4px 12px; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 600;">Copier</button>
        </div>
        <div id="octoprompt-improved" style="color: #bfdbfe; font-size: 12px; line-height: 1.5; max-height: 150px; overflow-y: auto;">
          ${escapeHtml(analysis.improvedPrompt)}
        </div>
      </div>
    `;
  }
  
  if (analysis.suggestions && analysis.suggestions.length > 0) {
    html += `
      <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 12px;">
        <div style="color: #f97316; font-size: 13px; font-weight: 600; margin-bottom: 8px;">💡 Suggestions</div>
        <div style="max-height: 120px; overflow-y: auto;">
    `;
    
    analysis.suggestions.slice(0, 3).forEach((suggestion, index) => {
      html += `
        <div style="color: #cbd5e1; font-size: 11px; margin-bottom: 6px; padding: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
          <span style="color: #f97316; font-weight: bold;">${index + 1}.</span> ${escapeHtml(suggestion)}
        </div>
      `;
    });
    
    html += `</div></div>`;
  }
  
  tooltip.innerHTML = html;
  tooltip.style.display = 'block';
  
  // Event listeners
  document.getElementById('octoprompt-close')?.addEventListener('click', () => {
    tooltip.style.display = 'none';
  });
  
  document.getElementById('octoprompt-copy')?.addEventListener('click', () => {
    navigator.clipboard.writeText(analysis.improvedPrompt);
    const btn = document.getElementById('octoprompt-copy');
    if (btn) {
      btn.textContent = '✓ Copié!';
      setTimeout(() => { btn.textContent = 'Copier'; }, 2000);
    }
  });
}

function hideTooltip() {
  if (tooltipElement) {
    tooltipElement.style.display = 'none';
  }
}

// ========== FONCTION UTILITAIRE ==========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== SURVEILLANCE DU CHAMP DE TEXTE ==========
let currentInput = null;
let debounceTimer = null;
let lastAnalyzedText = '';
let isAnalyzing = false;

function attachToInput(input) {
  if (!input || currentInput === input) return;
  
  currentInput = input;
  
  const handleInput = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const text = input.value || input.textContent || '';
      
      // Éviter d'analyser le même texte ou si une analyse est en cours
      if (text === lastAnalyzedText || isAnalyzing) {
        return;
      }
      
      if (text.trim().length > 5) {
        isAnalyzing = true;
        lastAnalyzedText = text;
        
        // Afficher le loader pendant que l'IA réfléchit
        if (aiModeEnabled) {
          updateTooltip(null); // null = afficher le loader
        }
        
        const analysis = await analyzePrompt(text);
        updateTooltip(analysis);
        isAnalyzing = false;
      } else {
        hideTooltip();
        lastAnalyzedText = '';
      }
    }, 800);
  };
  
  input.addEventListener('input', handleInput);
  input.addEventListener('keyup', handleInput);
}

function initializeExtension() {
  console.log('🐙 OctoPrompt - Initialisation...');
  
  // Charger les préférences
  chrome.storage.sync.get(['autoAnalyze', 'aiMode', 'apiKey'], async (result) => {
    isEnabled = result.autoAnalyze !== false;
    aiModeEnabled = result.aiMode === true;
    
    console.log('🐙 Analyse automatique:', isEnabled ? 'activée' : 'désactivée');
    console.log('🤖 Mode IA:', aiModeEnabled ? 'activé' : 'désactivé');
    
    // Initialiser le moteur IA si activé
    if (aiModeEnabled && typeof aiEngine !== 'undefined') {
      await aiEngine.initialize();
      console.log('🤖 Moteur IA initialisé');
    }
    
    if (isEnabled) {
      // Attendre que le DOM soit complètement chargé
      const tryFindInput = () => {
        const input = findPromptInput();
        if (input) {
          console.log('🐙 Champ de texte attaché');
          attachToInput(input);
        } else {
          setTimeout(tryFindInput, 1000);
        }
      };
      
      // Essayer immédiatement
      tryFindInput();
      
      // Observer les changements dans le DOM
      const observer = new MutationObserver(() => {
        const input = findPromptInput();
        if (input && input !== currentInput) {
          attachToInput(input);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
}

// ========== MESSAGES DU POPUP ==========
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('🐙 Message reçu:', message);
  if (message.action === 'toggleAutoAnalyze') {
    isEnabled = message.enabled;
    console.log('🐙 Toggle:', isEnabled ? 'ON' : 'OFF');
    if (!isEnabled) {
      hideTooltip();
    } else {
      const input = findPromptInput();
      if (input) {
        attachToInput(input);
      }
    }
  } else if (message.action === 'toggleAiMode') {
    aiModeEnabled = message.enabled;
    console.log('🤖 Mode IA:', aiModeEnabled ? 'ON' : 'OFF');
    if (aiModeEnabled && typeof aiEngine !== 'undefined') {
      aiEngine.initialize();
    }
  } else if (message.action === 'updateApiKey' || message.action === 'updateProvider') {
    if (typeof aiEngine !== 'undefined') {
      aiEngine.initialize();
      console.log('🔄 Configuration IA mise à jour');
    }
  }
});

// ========== DÉMARRAGE ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  // DOM déjà chargé
  setTimeout(initializeExtension, 500);
}

console.log('🐙 OctoPrompt extension chargée!');
