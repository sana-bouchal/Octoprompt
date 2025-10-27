// Générateur avancé de prompts avec IA multi-tâche et connaissances contextuelles

import { PROMPT_DATABASE, DOMAIN_KEYWORDS, DOMAIN_INDEX, PromptTemplate } from './promptDatabase';
import { Rule } from '@/types';

interface PromptContext {
  domain: string;
  subdomain: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  taskType: 'create' | 'explain' | 'analyze' | 'optimize' | 'compare';
  audience: 'general' | 'professional' | 'technical' | 'student';
  urgency: 'low' | 'medium' | 'high';
}

/**
 * Détecte automatiquement le domaine du prompt
 */
function detectDomain(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  const domainScores: Record<string, number> = {};
  
  // Calculer un score pour chaque domaine basé sur les mots-clés
  Object.entries(DOMAIN_KEYWORDS).forEach(([domain, keywords]) => {
    domainScores[domain] = keywords.filter(keyword => 
      promptLower.includes(keyword.toLowerCase())
    ).length;
  });
  
  // Retourner le domaine avec le score le plus élevé
  const topDomain = Object.entries(domainScores)
    .sort(([, a], [, b]) => b - a)[0];
  
  return topDomain && topDomain[1] > 0 ? topDomain[0] : 'Général';
}

/**
 * Détecte le type de tâche demandée
 */
function detectTaskType(prompt: string): PromptContext['taskType'] {
  const promptLower = prompt.toLowerCase();
  
  if (/crée|génère|développe|conçois|construis|produis/i.test(prompt)) {
    return 'create';
  } else if (/explique|décris|enseigne|clarifie|démontre/i.test(prompt)) {
    return 'explain';
  } else if (/analyse|évalue|examine|étudie|inspecte/i.test(prompt)) {
    return 'analyze';
  } else if (/optimise|améliore|perfectionne|augmente/i.test(prompt)) {
    return 'optimize';
  } else if (/compare|différence|versus|oppose|contraste/i.test(prompt)) {
    return 'compare';
  }
  
  return 'create'; // Par défaut
}

/**
 * Détecte le niveau de complexité
 */
function detectComplexity(prompt: string): PromptContext['complexity'] {
  const promptLower = prompt.toLowerCase();
  
  if (/débutant|simple|basique|introduction|initiation/i.test(prompt)) {
    return 'beginner';
  } else if (/expert|avancé|complexe|approfondi|détaillé|professionnel/i.test(prompt)) {
    return 'advanced';
  }
  
  return 'intermediate';
}

/**
 * Détecte l'audience cible
 */
function detectAudience(prompt: string): PromptContext['audience'] {
  const promptLower = prompt.toLowerCase();
  
  if (/technique|développeur|ingénieur|tech/i.test(prompt)) {
    return 'technical';
  } else if (/professionnel|business|entreprise|corporate/i.test(prompt)) {
    return 'professional';
  } else if (/étudiant|élève|apprenant|cours/i.test(prompt)) {
    return 'student';
  }
  
  return 'general';
}

/**
 * Analyse le contexte complet du prompt
 */
function analyzePromptContext(prompt: string): PromptContext {
  return {
    domain: detectDomain(prompt),
    subdomain: '', // Sera rempli lors de la sélection du template
    complexity: detectComplexity(prompt),
    taskType: detectTaskType(prompt),
    audience: detectAudience(prompt),
    urgency: 'medium' // Par défaut
  };
}

/**
 * Sélectionne le meilleur template de la base de données
 */
function selectBestTemplate(context: PromptContext): PromptTemplate | null {
  // Récupérer les templates du domaine détecté
  const domainTemplateIds = DOMAIN_INDEX[context.domain] || [];
  const candidates = PROMPT_DATABASE.filter(t => domainTemplateIds.includes(t.id));
  
  if (candidates.length === 0) return null;
  
  // Pour l'instant, retourner le premier template du domaine
  // TODO: Améliorer avec un scoring plus sophistiqué
  return candidates[0];
}

/**
 * Génère la structure de prompt spécifique au domaine
 */
function generateDomainSpecificStructure(
  template: PromptTemplate,
  context: PromptContext,
  originalPrompt: string
): string {
  let structure = '';
  
  // 1. RÔLE ET EXPERTISE
  structure += `Agis en tant que ${template.role}. `;
  
  // 2. VERBE D'ACTION ADAPTÉ
  const verb = template.actionVerbs.find(v => 
    originalPrompt.toLowerCase().includes(v.toLowerCase())
  ) || template.actionVerbs[0];
  structure += `${verb} `;
  
  // 3. CONTENU ORIGINAL (nettoyé)
  const cleanedPrompt = originalPrompt
    .replace(/^(génère|crée|explique|analyse|développe|rédige)\s*/i, '')
    .trim();
  structure += cleanedPrompt;
  
  // 4. STYLE CONTEXTUEL
  const relevantStyles = template.styleKeywords.slice(0, 3).join(', ');
  structure += `. Adopte un style ${relevantStyles}`;
  
  // 5. AUDIENCE SPÉCIFIQUE
  const audienceMap = {
    'general': 'grand public',
    'professional': 'professionnels du secteur',
    'technical': 'audience technique',
    'student': 'étudiants et apprenants'
  };
  structure += `, adapté à ${audienceMap[context.audience]}`;
  
  // 6. NIVEAU DE COMPLEXITÉ
  const complexityInstructions = {
    'beginner': 'Utilise un langage simple et accessible, avec des exemples concrets du quotidien',
    'intermediate': 'Inclus des détails techniques pertinents et des bonnes pratiques',
    'advanced': 'Approfondis avec des concepts avancés, des cas limites et des optimisations'
  };
  structure += `. ${complexityInstructions[context.complexity]}`;
  
  // 7. FORMAT SPÉCIFIQUE AU DOMAINE
  if (template.formatPatterns.length > 0) {
    structure += `. ${template.formatPatterns[0]}`;
  }
  
  // 8. CONTRAINTES DU DOMAINE
  if (template.constraints.length > 0) {
    structure += `, ${template.constraints[0]}`;
  }
  
  // 9. CONNAISSANCES CONTEXTUELLES
  if (template.contextualKnowledge.length > 0) {
    structure += `. Intègre ces principes clés: ${template.contextualKnowledge[0]}`;
  }
  
  // 10. EXEMPLE DE RÉFÉRENCE (si pertinent)
  if (context.taskType === 'create' && template.examples.length > 0) {
    structure += `. Inspire-toi de projets similaires comme: ${template.examples[0]}`;
  }
  
  // 11. CRITÈRES DE QUALITÉ FINAUX
  structure += '. Assure-toi que le résultat soit actionnable, précis, et immédiatement utilisable dans un contexte professionnel.';
  
  return structure;
}

/**
 * Ajoute des instructions multi-tâches si nécessaire
 */
function addMultiTaskInstructions(prompt: string, context: PromptContext): string {
  let enhanced = prompt;
  
  // Détecter si plusieurs tâches sont demandées
  const hasMultipleTasks = (prompt.match(/et|puis|ensuite|également|aussi/gi) || []).length > 1;
  
  if (hasMultipleTasks) {
    enhanced += '\n\nPour chaque tâche:';
    enhanced += '\n1. Définis clairement l\'objectif';
    enhanced += '\n2. Présente la méthodologie';
    enhanced += '\n3. Fournis le résultat attendu';
    enhanced += '\n4. Indique les connexions avec les autres tâches';
  }
  
  return enhanced;
}

/**
 * Fonction principale: Génération avancée de prompt
 */
export function generateAdvancedPrompt(
  originalPrompt: string,
  failedRules: Rule[]
): string {
  // 1. Analyser le contexte du prompt original
  const context = analyzePromptContext(originalPrompt);
  
  // 2. Sélectionner le meilleur template de la base de données
  const template = selectBestTemplate(context);
  
  // 3. Si un template approprié existe, générer une structure spécialisée
  if (template) {
    context.subdomain = template.subdomain;
    let advancedPrompt = generateDomainSpecificStructure(template, context, originalPrompt);
    
    // 4. Ajouter des instructions multi-tâches si nécessaire
    advancedPrompt = addMultiTaskInstructions(advancedPrompt, context);
    
    // 5. Nettoyer et formater
    advancedPrompt = advancedPrompt
      .replace(/\s+/g, ' ')
      .replace(/\.\s*\./g, '.')
      .replace(/,\s*,/g, ',')
      .trim();
    
    return advancedPrompt;
  }
  
  // 6. Fallback: Utiliser la génération basique si aucun template trouvé
  return generateBasicImprovement(originalPrompt, failedRules);
}

/**
 * Génération basique pour les cas non couverts par la base de données
 */
function generateBasicImprovement(originalPrompt: string, failedRules: Rule[]): string {
  let improved = originalPrompt.trim();
  
  // Logique de base similaire à l'ancienne fonction
  const hasRole = failedRules.find(r => r.name === 'Rôle Spécifique');
  if (hasRole) {
    improved = `Agis en tant qu'expert dans le domaine. ${improved}`;
  }
  
  const hasAction = failedRules.find(r => r.name === "Verbes d'Action");
  if (hasAction && !/^(génère|crée|analyse|explique)/i.test(improved)) {
    improved = `Génère ${improved}`;
  }
  
  const hasFormat = failedRules.find(r => r.name === 'Format de Sortie');
  if (hasFormat) {
    improved += '. Structure la réponse de manière claire et organisée';
  }
  
  improved += '. Fournis un résultat complet et actionnable.';
  
  return improved.replace(/\s+/g, ' ').trim();
}

/**
 * Obtenir des suggestions contextuelles basées sur le domaine
 */
export function getContextualSuggestions(prompt: string): string[] {
  const context = analyzePromptContext(prompt);
  const template = selectBestTemplate(context);
  
  if (!template) return [];
  
  return [
    `💡 Domaine détecté: ${context.domain} - ${template.subdomain}`,
    `🎯 Type de tâche: ${context.taskType}`,
    `📊 Niveau: ${context.complexity}`,
    `👥 Audience: ${context.audience}`,
    `✨ Exemples similaires: ${template.examples[0]}`
  ];
}
