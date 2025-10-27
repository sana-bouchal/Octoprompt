// Base de données multi-disciplinaire de templates de prompts

export interface PromptTemplate {
  id: string;
  domain: string;
  subdomain: string;
  role: string;
  actionVerbs: string[];
  styleKeywords: string[];
  formatPatterns: string[];
  constraints: string[];
  contextualKnowledge: string[];
  examples: string[];
}

export const PROMPT_DATABASE: PromptTemplate[] = [
  // === DOMAINE: DESIGN & CRÉATIVITÉ ===
  {
    id: 'design-graphique',
    domain: 'Design',
    subdomain: 'Graphique',
    role: 'designer graphique expert avec 10 ans d\'expérience en branding',
    actionVerbs: ['Crée', 'Conçois', 'Génère', 'Dessine', 'Développe'],
    styleKeywords: ['moderne', 'minimaliste', 'élégant', 'professionnel', 'créatif', 'épuré', 'audacieux', 'sophistiqué'],
    formatPatterns: [
      'Présente 3 variations avec leurs rationnels de design',
      'Fournis une description détaillée incluant: palette de couleurs, typographie, et composition',
      'Structure en: concept principal, éléments visuels clés, et applications pratiques'
    ],
    constraints: ['respectant les principes de design moderne', 'optimisé pour le web et le print', 'accessible WCAG 2.1'],
    contextualKnowledge: [
      'Tendances design 2025: néomorphisme, glassmorphism, gradients subtils',
      'Principes de gestalt et hiérarchie visuelle',
      'Psychologie des couleurs et impact émotionnel'
    ],
    examples: [
      'logo minimaliste pour startup tech',
      'identité visuelle pour marque de cosmétiques naturels',
      'interface utilisateur pour application mobile bancaire'
    ]
  },
  {
    id: 'design-ux-ui',
    domain: 'Design',
    subdomain: 'UX/UI',
    role: 'expert UX/UI designer spécialisé en design thinking et accessibilité',
    actionVerbs: ['Conçois', 'Structure', 'Optimise', 'Analyse', 'Prototyper'],
    styleKeywords: ['intuitif', 'user-centric', 'accessible', 'responsive', 'moderne', 'fluide'],
    formatPatterns: [
      'Décris le parcours utilisateur étape par étape',
      'Liste les composants UI avec leurs interactions',
      'Présente en 3 parties: recherche utilisateur, wireframes, et design final'
    ],
    constraints: ['suivant les principes Material Design 3', 'mobile-first', 'temps de chargement < 3s'],
    contextualKnowledge: [
      'Loi de Hick: temps de décision augmente avec les options',
      'Règle des 8 secondes d\'attention utilisateur',
      'F-pattern et Z-pattern de lecture sur écran'
    ],
    examples: [
      'refonte d\'interface e-commerce avec taux de conversion amélioré',
      'dashboard analytics avec data visualization',
      'onboarding app mobile en 3 étapes'
    ]
  },

  // === DOMAINE: MARKETING & COMMUNICATION ===
  {
    id: 'marketing-digital',
    domain: 'Marketing',
    subdomain: 'Digital',
    role: 'stratège marketing digital avec expertise en growth hacking et analytics',
    actionVerbs: ['Développe', 'Crée', 'Optimise', 'Génère', 'Analyse'],
    styleKeywords: ['persuasif', 'engageant', 'data-driven', 'conversationnel', 'viral', 'authentique'],
    formatPatterns: [
      'Structure en: objectif, audience cible, message clé, canaux, et KPIs',
      'Présente 5 variations A/B testables',
      'Organise en: accroche, bénéfices, preuve sociale, et CTA'
    ],
    constraints: ['adapté aux algorithmes des réseaux sociaux 2025', 'optimisé SEO', 'conforme RGPD'],
    contextualKnowledge: [
      'Framework AIDA: Attention, Intérêt, Désir, Action',
      'Taux d\'engagement moyen par plateforme: Instagram 1.9%, LinkedIn 2.1%',
      'Peak posting times: LinkedIn 10h-11h, Instagram 19h-21h'
    ],
    examples: [
      'campagne de lancement produit SaaS B2B',
      'stratégie de contenu pour growth startup',
      'funnel de conversion e-commerce'
    ]
  },
  {
    id: 'copywriting',
    domain: 'Marketing',
    subdomain: 'Copywriting',
    role: 'copywriter créatif spécialisé en storytelling et persuasion',
    actionVerbs: ['Rédige', 'Écris', 'Crée', 'Développe', 'Compose'],
    styleKeywords: ['persuasif', 'émotionnel', 'impactant', 'concis', 'mémorable', 'authentique'],
    formatPatterns: [
      'Structure PAS: Problem, Agitate, Solve',
      'Utilise la méthode 4P: Picture, Promise, Prove, Push',
      'Format: Headline punchy + 3 bullets bénéfices + CTA fort'
    ],
    constraints: ['maximum 150 caractères pour les headlines', 'lisibilité grade 8', 'taux de clic cible >3%'],
    contextualKnowledge: [
      'Mots déclencheurs émotionnels: gratuit, exclusif, limité, garanti',
      'Ratio optimal features/benefits: 1:3',
      'Power words: découvrez, transformez, révolutionnaire'
    ],
    examples: [
      'page de vente pour formation en ligne',
      'email séquence pour lead nurturing',
      'landing page SaaS avec conversion >5%'
    ]
  },

  // === DOMAINE: DÉVELOPPEMENT & TECH ===
  {
    id: 'dev-fullstack',
    domain: 'Développement',
    subdomain: 'Full-Stack',
    role: 'développeur full-stack senior avec expertise en architecture cloud-native',
    actionVerbs: ['Développe', 'Implémente', 'Conçois', 'Optimise', 'Déploie'],
    styleKeywords: ['scalable', 'maintenable', 'performant', 'sécurisé', 'moderne', 'clean code'],
    formatPatterns: [
      'Structure: architecture, stack technique, implémentation, tests, et déploiement',
      'Code commenté avec best practices',
      'Présente en: backend API + frontend + database schema + CI/CD'
    ],
    constraints: ['suivant les principes SOLID', 'test coverage >80%', 'documentation complète'],
    contextualKnowledge: [
      'Architecture microservices vs monolithique',
      'Performance: N+1 queries, caching strategies, lazy loading',
      'Sécurité: OWASP Top 10, JWT, OAuth 2.0'
    ],
    examples: [
      'API REST avec authentification JWT',
      'application CRUD avec React et Node.js',
      'système de paiement sécurisé avec Stripe'
    ]
  },
  {
    id: 'dev-ia-ml',
    domain: 'Développement',
    subdomain: 'IA & Machine Learning',
    role: 'data scientist expert en deep learning et NLP',
    actionVerbs: ['Entraîne', 'Développe', 'Optimise', 'Analyse', 'Implémente'],
    styleKeywords: ['précis', 'rigoureux', 'data-driven', 'scientifique', 'reproductible'],
    formatPatterns: [
      'Structure: problème, dataset, prétraitement, modèle, métriques, résultats',
      'Inclus: hyperparamètres, courbes d\'apprentissage, et confusion matrix',
      'Format académique: introduction, méthodologie, expériences, résultats, conclusion'
    ],
    constraints: ['métrique principale F1-score >0.85', 'temps d\'inférence <100ms', 'explicabilité du modèle'],
    contextualKnowledge: [
      'Architectures: Transformers, CNN, RNN, LSTM, GAN',
      'Techniques: transfer learning, fine-tuning, data augmentation',
      'Frameworks: PyTorch, TensorFlow, HuggingFace'
    ],
    examples: [
      'modèle de classification de sentiments',
      'système de recommandation personnalisé',
      'chatbot conversationnel avec RAG'
    ]
  },

  // === DOMAINE: BUSINESS & STRATÉGIE ===
  {
    id: 'business-strategy',
    domain: 'Business',
    subdomain: 'Stratégie',
    role: 'consultant en stratégie d\'entreprise avec MBA et 15 ans d\'expérience',
    actionVerbs: ['Analyse', 'Développe', 'Évalue', 'Propose', 'Optimise'],
    styleKeywords: ['analytique', 'stratégique', 'data-driven', 'pragmatique', 'innovant'],
    formatPatterns: [
      'Framework SWOT: Strengths, Weaknesses, Opportunities, Threats',
      'Structure McKinsey: Situation, Complication, Resolution',
      'Format: executive summary + analyse détaillée + recommandations actionnables'
    ],
    constraints: ['ROI cible >200%', 'timeline 6-12 mois', 'risques identifiés et mitigés'],
    contextualKnowledge: [
      'Porter\'s Five Forces pour analyse concurrentielle',
      'Blue Ocean Strategy vs Red Ocean',
      'OKR framework pour alignment organisationnel'
    ],
    examples: [
      'stratégie de pénétration de marché pour startup',
      'plan de transformation digitale entreprise',
      'analyse de faisabilité pour nouveau produit'
    ]
  },

  // === DOMAINE: CONTENU & ÉDUCATION ===
  {
    id: 'education-pedagogie',
    domain: 'Éducation',
    subdomain: 'Pédagogie',
    role: 'pédagogue expert en sciences de l\'éducation et apprentissage adaptatif',
    actionVerbs: ['Explique', 'Enseigne', 'Démontre', 'Illustre', 'Simplifie'],
    styleKeywords: ['clair', 'progressif', 'illustré', 'interactif', 'accessible', 'motivant'],
    formatPatterns: [
      'Méthode Feynman: concept simple, enseignement, identification lacunes, simplification',
      'Structure: objectifs d\'apprentissage + théorie + exemples + exercices + récapitulatif',
      'Format: intro engageante + 3-5 points clés + analogies + quiz de validation'
    ],
    constraints: ['niveau adapté à l\'audience', 'exemples concrets du quotidien', 'progression logique'],
    contextualKnowledge: [
      'Taxonomie de Bloom: mémoriser, comprendre, appliquer, analyser, évaluer, créer',
      'Courbe d\'oubli d\'Ebbinghaus: révision espacée',
      'Styles d\'apprentissage: visuel, auditif, kinesthésique'
    ],
    examples: [
      'cours en ligne sur la blockchain pour débutants',
      'tutoriel de programmation Python interactif',
      'module e-learning sur le design thinking'
    ]
  },

  // === DOMAINE: SCIENCE & RECHERCHE ===
  {
    id: 'science-research',
    domain: 'Science',
    subdomain: 'Recherche',
    role: 'chercheur scientifique avec doctorat et publications dans journals peer-reviewed',
    actionVerbs: ['Analyse', 'Étudie', 'Recherche', 'Examine', 'Évalue'],
    styleKeywords: ['rigoureux', 'méthodique', 'objectif', 'précis', 'scientifique', 'reproductible'],
    formatPatterns: [
      'Format IMRAD: Introduction, Methods, Results, And Discussion',
      'Structure: revue de littérature + hypothèses + protocole + résultats + interprétation',
      'Inclus: méthodologie détaillée, statistiques, et limitations'
    ],
    constraints: ['significativité statistique p<0.05', 'taille d\'échantillon justifiée', 'biais identifiés'],
    contextualKnowledge: [
      'Tests statistiques: t-test, ANOVA, régression, chi-carré',
      'Protocoles: double-aveugle, randomisation, groupe contrôle',
      'Métriques: IC 95%, effect size, puissance statistique'
    ],
    examples: [
      'étude sur l\'impact du télétravail sur la productivité',
      'analyse comparative de traitements médicaux',
      'recherche en psychologie cognitive sur la mémoire'
    ]
  }
];

// Index pour recherche rapide par domaine
export const DOMAIN_INDEX: Record<string, string[]> = {
  'Design': ['design-graphique', 'design-ux-ui'],
  'Marketing': ['marketing-digital', 'copywriting'],
  'Développement': ['dev-fullstack', 'dev-ia-ml'],
  'Business': ['business-strategy'],
  'Éducation': ['education-pedagogie'],
  'Science': ['science-research']
};

// Mots-clés pour détection automatique du domaine
export const DOMAIN_KEYWORDS: Record<string, string[]> = {
  'Design': ['design', 'graphique', 'logo', 'interface', 'ux', 'ui', 'visuel', 'créatif', 'mockup', 'prototype'],
  'Marketing': ['marketing', 'campagne', 'pub', 'publicité', 'conversion', 'lead', 'seo', 'social media', 'stratégie'],
  'Développement': ['code', 'développe', 'programme', 'app', 'application', 'api', 'base de données', 'backend', 'frontend', 'ia', 'ml', 'machine learning'],
  'Business': ['business', 'stratégie', 'entreprise', 'marché', 'concurrence', 'revenue', 'roi', 'business plan'],
  'Éducation': ['enseigne', 'explique', 'apprendre', 'cours', 'formation', 'tutoriel', 'éducation', 'pédagogie'],
  'Science': ['recherche', 'étude', 'scientifique', 'analyse', 'expérience', 'hypothèse', 'données', 'statistique']
};
