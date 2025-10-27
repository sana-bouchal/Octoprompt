import { PROMPT_RULES } from './rules';
import { PromptAnalysis, Rule } from '@/types';

function generateImprovedPrompt(originalPrompt: string, failedRules: Rule[]): string {
  let improved = originalPrompt.trim();
  
  // Détecter si le prompt commence déjà par une instruction
  const startsWithInstruction = /^(génère|crée|analyse|synthétise|rédige|explique|compare|liste|décris|propose|développe)/i.test(improved);
  
  // 1. Ajouter un rôle spécifique si manquant
  const hasRole = failedRules.find(r => r.name === 'Rôle Spécifique');
  if (hasRole) {
    // Détecter le contexte pour un rôle pertinent
    let role = 'expert dans le domaine';
    
    if (/design|graphique|visuel|image|logo/i.test(improved)) {
      role = 'designer graphique professionnel';
    } else if (/marketing|pub|campagne|stratégie/i.test(improved)) {
      role = 'expert en marketing digital';
    } else if (/code|programme|développ|app/i.test(improved)) {
      role = 'développeur expérimenté';
    } else if (/écrire|rédiger|article|contenu|texte/i.test(improved)) {
      role = 'rédacteur professionnel';
    } else if (/enseign|expliqu|form|apprend/i.test(improved)) {
      role = 'formateur pédagogue';
    } else if (/données|analys|statistique/i.test(improved)) {
      role = 'analyste de données';
    }
    
    improved = `Agis en tant que ${role}. ${improved}`;
  }
  
  // 2. Améliorer avec un verbe d'action fort si manquant
  const hasAction = failedRules.find(r => r.name === "Verbes d'Action");
  if (hasAction && !startsWithInstruction) {
    // Choisir le verbe approprié selon le contexte
    let verb = 'Génère';
    
    if (/expliqu|compren|clarifi/i.test(improved)) {
      verb = 'Explique';
    } else if (/compar|différe|oppose/i.test(improved)) {
      verb = 'Compare';
    } else if (/résume|synthèse|condense/i.test(improved)) {
      verb = 'Synthétise';
    } else if (/créa|invent|imagin/i.test(improved)) {
      verb = 'Crée';
    } else if (/évalue|examine|inspect/i.test(improved)) {
      verb = 'Analyse';
    }
    
    // Insérer le verbe après le rôle s'il existe
    if (hasRole) {
      improved = improved.replace(/\. /, `. ${verb} `);
    } else {
      improved = `${verb} ${improved}`;
    }
  }
  
  // 3. Ajouter un style et un ton si manquant
  const hasStyle = failedRules.find(r => r.name === 'Mots-clés de Style');
  if (hasStyle) {
    let styleAddition = '';
    
    // Détecter le type de contenu pour un style approprié
    if (/business|entreprise|corporate/i.test(improved)) {
      styleAddition = ' Adopte un style professionnel et corporate';
    } else if (/enfant|jeune|kid/i.test(improved)) {
      styleAddition = ' Utilise un ton ludique et accessible';
    } else if (/technique|scientifique|académique/i.test(improved)) {
      styleAddition = ' Maintiens un style technique et précis';
    } else if (/créatif|artistique|original/i.test(improved)) {
      styleAddition = ' Adopte une approche créative et originale';
    } else {
      styleAddition = ' Utilise un ton professionnel, clair et engageant';
    }
    
    improved += `.${styleAddition}`;
  }
  
  // 4. Ajouter l'audience cible si manquant
  const hasAudience = failedRules.find(r => r.name === 'Audience Cible');
  if (hasAudience) {
    let audience = '';
    
    // Essayer de déduire l'audience du contexte
    if (/débutant|novice|nouveau/i.test(improved)) {
      audience = ' destiné aux débutants';
    } else if (/expert|avancé|professionnel/i.test(improved)) {
      audience = ' pour un public expert';
    } else if (/étudiant|élève|apprenant/i.test(improved)) {
      audience = ' adapté aux étudiants';
    } else if (/général|tout public|large/i.test(improved)) {
      audience = ' pour le grand public';
    } else {
      audience = ' adapté à un public intermédiaire avec des connaissances de base';
    }
    
    improved += `,${audience}`;
  }
  
  // 5. Ajouter le format de sortie si manquant
  const hasFormat = failedRules.find(r => r.name === 'Format de Sortie');
  if (hasFormat) {
    let format = '';
    
    // Choisir le format selon le type de contenu
    if (/étape|procédure|instruction|guide/i.test(improved)) {
      format = ' Présente la réponse sous forme de liste numérotée avec des étapes claires et détaillées';
    } else if (/compar|différ|versus/i.test(improved)) {
      format = ' Organise la réponse sous forme de tableau comparatif';
    } else if (/avantage|inconvénient|pour|contre/i.test(improved)) {
      format = ' Structure la réponse avec des points positifs et négatifs';
    } else if (/exemple|cas|illustration/i.test(improved)) {
      format = ' Inclus des exemples concrets dans chaque section';
    } else {
      format = ' Structure la réponse en sections claires avec des points clés et des sous-titres';
    }
    
    improved += `.${format}`;
  }
  
  // 6. Ajouter des contraintes spécifiques si manquant
  const hasConstraints = failedRules.find(r => r.name === 'Contraintes Spécifiques');
  if (hasConstraints) {
    // Adapter la contrainte selon le contexte
    let constraint = '';
    
    if (/court|bref|rapide|résumé/i.test(improved)) {
      constraint = ' Limite ta réponse à 100-150 mots maximum';
    } else if (/détaillé|complet|approfondi/i.test(improved)) {
      constraint = ' Développe ta réponse sur 300-400 mots';
    } else if (/liste/i.test(improved)) {
      constraint = ' Fournis entre 5 et 10 points maximum';
    } else {
      constraint = ' Limite ta réponse à environ 200-250 mots pour maintenir la clarté';
    }
    
    improved += `.${constraint}`;
  }
  
  // 7. Ajouter une directive finale pour la qualité
  improved += '. Assure-toi que la réponse soit complète, précise et immédiatement applicable.';
  
  // Nettoyer les espaces multiples et la ponctuation en double
  improved = improved
    .replace(/\s+/g, ' ')
    .replace(/\.\./g, '.')
    .replace(/,,/g, ',')
    .replace(/\.\s*\./g, '.')
    .trim();
  
  return improved;
}

export function analyzePrompt(prompt: string): PromptAnalysis {
  if (!prompt || prompt.trim().length === 0) {
    return {
      score: 0,
      passedRules: [],
      failedRules: PROMPT_RULES,
      suggestions: ['Veuillez entrer un prompt à analyser.']
    };
  }

  const passedRules = PROMPT_RULES.filter(rule => rule.check(prompt));
  const failedRules = PROMPT_RULES.filter(rule => !rule.check(prompt));

  const totalWeight = PROMPT_RULES.reduce((sum, rule) => sum + rule.weight, 0);
  const achievedWeight = passedRules.reduce((sum, rule) => sum + rule.weight, 0);
  const score = Math.round((achievedWeight / totalWeight) * 100);

  const suggestions = failedRules.map(rule => rule.suggestion);
  
  // Générer le prompt amélioré seulement si le score est inférieur à 100
  const improvedPrompt = score < 100 ? generateImprovedPrompt(prompt, failedRules) : undefined;

  return {
    score,
    passedRules,
    failedRules,
    suggestions,
    improvedPrompt
  };
}
