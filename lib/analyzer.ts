import { PROMPT_RULES } from './rules';
import { PromptAnalysis, Rule } from '@/types';
import { generateAdvancedPrompt, getContextualSuggestions } from './advancedGenerator';

export function analyzePrompt(prompt: string): PromptAnalysis {
  try {
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
    
    // Ajouter des suggestions contextuelles basées sur l'analyse du domaine
    let contextualSuggestions: string[] = [];
    try {
      contextualSuggestions = getContextualSuggestions(prompt);
    } catch (error) {
      console.error('Error getting contextual suggestions:', error);
    }
    
    const allSuggestions = [...suggestions, ...contextualSuggestions];
    
    // Utiliser le générateur avancé avec base de données multi-disciplinaire
    let improvedPrompt: string | undefined;
    try {
      improvedPrompt = score < 100 ? generateAdvancedPrompt(prompt, failedRules) : undefined;
    } catch (error) {
      console.error('Error generating advanced prompt:', error);
      // Fallback: pas de prompt amélioré en cas d'erreur
    }

    return {
      score,
      passedRules,
      failedRules,
      suggestions: allSuggestions,
      improvedPrompt
    };
  } catch (error) {
    console.error('Error in analyzePrompt:', error);
    // Retourner une réponse par défaut en cas d'erreur
    return {
      score: 0,
      passedRules: [],
      failedRules: PROMPT_RULES,
      suggestions: ['Une erreur est survenue lors de l\'analyse. Veuillez réessayer.']
    };
  }
}
