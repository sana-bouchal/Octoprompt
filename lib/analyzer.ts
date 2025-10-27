import { PROMPT_RULES } from './rules';
import { PromptAnalysis } from '@/types';

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

  return {
    score,
    passedRules,
    failedRules,
    suggestions
  };
}
