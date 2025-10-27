export interface Rule {
  name: string;
  category: string;
  weight: number;
  check: (prompt: string) => boolean;
  suggestion: string;
}

export interface PromptAnalysis {
  score: number;
  passedRules: Rule[];
  failedRules: Rule[];
  suggestions: string[];
  improvedPrompt?: string;
}
