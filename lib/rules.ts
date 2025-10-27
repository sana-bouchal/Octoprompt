import { Rule } from '@/types';

export const PROMPT_RULES: Rule[] = [
  {
    name: 'Rôle Spécifique',
    category: 'Contexte',
    weight: 20,
    check: (prompt: string) => {
      const roleKeywords = ['agis en tant que', 'tu es un', 'rôle :', 'joue le rôle', 'en tant que'];
      return roleKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Ajoutez un rôle spécifique (ex: "Agis en tant que expert marketing...")'
  },
  {
    name: 'Mots-clés de Style',
    category: 'Spécificité',
    weight: 20,
    check: (prompt: string) => {
      const styleKeywords = [
        'photoréaliste', 'minimaliste', 'humoristique', 'professionnel',
        'artistique', 'moderne', 'vintage', 'élégant', 'créatif', 'technique'
      ];
      return styleKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Spécifiez un style (ex: "professionnel", "minimaliste", "créatif")'
  },
  {
    name: 'Longueur Optimale',
    category: 'Clarté',
    weight: 15,
    check: (prompt: string) => {
      const words = prompt.split(/\s+/).filter(w => w.length > 0);
      return words.length >= 10 && words.length <= 200;
    },
    suggestion: 'Ajustez la longueur : ni trop court (min 10 mots), ni trop long (max 200 mots)'
  },
  {
    name: 'Format de Sortie',
    category: 'Structure',
    weight: 15,
    check: (prompt: string) => {
      const formatKeywords = [
        'sous forme de liste', 'en json', 'tableau', 'paragraphes',
        'points', 'étapes', 'format', 'structure'
      ];
      return formatKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Indiquez le format souhaité (ex: "sous forme de liste", "en 3 paragraphes")'
  },
  {
    name: 'Verbes d\'Action',
    category: 'Action',
    weight: 15,
    check: (prompt: string) => {
      const actionVerbs = [
        'génère', 'crée', 'analyse', 'synthétise', 'rédige', 'explique',
        'compare', 'liste', 'décris', 'propose', 'développe'
      ];
      return actionVerbs.some(verb => prompt.toLowerCase().includes(verb));
    },
    suggestion: 'Utilisez des verbes d\'action clairs (ex: "génère", "analyse", "synthétise")'
  },
  {
    name: 'Audience Cible',
    category: 'Contexte',
    weight: 10,
    check: (prompt: string) => {
      const audienceKeywords = [
        'pour', 'audience', 'public', 'lecteur', 'utilisateur',
        'débutant', 'expert', 'enfant', 'professionnel'
      ];
      return audienceKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Précisez l\'audience visée (ex: "pour des débutants", "pour un public expert")'
  },
  {
    name: 'Contraintes Spécifiques',
    category: 'Spécificité',
    weight: 5,
    check: (prompt: string) => {
      const constraintKeywords = [
        'maximum', 'minimum', 'environ', 'limite', 'restriction',
        'en moins de', 'en plus de', 'entre'
      ];
      return constraintKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    },
    suggestion: 'Ajoutez des contraintes si nécessaire (ex: "en 100 mots maximum")'
  }
];
