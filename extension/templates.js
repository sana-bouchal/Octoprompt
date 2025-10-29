// ========== BIBLIOTHÈQUE DE TEMPLATES ==========

const PROMPT_TEMPLATES = {
  marketing: [
    {
      id: 'mkt_1',
      name: 'Article de Blog SEO',
      category: 'Marketing',
      prompt: 'En tant qu\'expert SEO et rédacteur web, rédige un article de blog optimisé sur [SUJET]. Structure l\'article avec une introduction accrocheuse, 3-4 sections H2 bien développées avec des sous-titres H3, et une conclusion avec appel à l\'action. Intègre naturellement les mots-clés [MOTS-CLÉS]. Ton professionnel mais accessible. Longueur : 1200-1500 mots.',
      tags: ['SEO', 'Blog', 'Rédaction']
    },
    {
      id: 'mkt_2',
      name: 'Post LinkedIn Viral',
      category: 'Marketing',
      prompt: 'Tu es un expert en personal branding sur LinkedIn. Rédige un post engageant sur [SUJET] qui encourage les interactions. Commence par une accroche percutante, développe une idée claire avec des exemples concrets, termine par une question ouverte. Utilise des émojis stratégiquement. Longueur : 150-200 mots.',
      tags: ['LinkedIn', 'Social Media', 'Engagement']
    },
    {
      id: 'mkt_3',
      name: 'Email Marketing',
      category: 'Marketing',
      prompt: 'En tant que copywriter expert, crée une séquence d\'email marketing pour [PRODUIT/SERVICE]. Rédige un email de bienvenue chaleureux, un email de valeur avec des conseils utiles, et un email de vente subtil. Chaque email doit avoir un objet accrocheur et un CTA clair. Ton amical et professionnel.',
      tags: ['Email', 'Copywriting', 'Vente']
    },
    {
      id: 'mkt_4',
      name: 'Stratégie Réseaux Sociaux',
      category: 'Marketing',
      prompt: 'Tu es un stratège social media. Élabore un plan de contenu pour [MARQUE] sur [PLATEFORME] pour le mois prochain. Inclus : types de contenu, fréquence de publication, thèmes hebdomadaires, idées de posts (minimum 20), stratégie d\'engagement, et KPIs à suivre. Format tableau.',
      tags: ['Stratégie', 'Social Media', 'Planning']
    },
    {
      id: 'mkt_5',
      name: 'Landing Page Conversion',
      category: 'Marketing',
      prompt: 'En tant qu\'expert en conversion, rédige le contenu d\'une landing page pour [PRODUIT/SERVICE]. Inclus : titre accrocheur, sous-titre explicatif, 3 bénéfices clés avec icônes suggérés, section "Comment ça marche" en 3 étapes, témoignages clients (structure), FAQ (5 questions), et CTA puissant. Ton persuasif.',
      tags: ['Landing Page', 'Conversion', 'Vente']
    }
  ],
  
  developpement: [
    {
      id: 'dev_1',
      name: 'Documentation API',
      category: 'Développement',
      prompt: 'Tu es un développeur senior et expert en documentation. Rédige une documentation complète pour l\'API [NOM]. Inclus : introduction, authentification, endpoints (GET/POST/PUT/DELETE) avec exemples de requêtes/réponses, codes d\'erreur, rate limiting, exemples de code en JavaScript et Python. Format Markdown.',
      tags: ['API', 'Documentation', 'Backend']
    },
    {
      id: 'dev_2',
      name: 'Code Review Commentaire',
      category: 'Développement',
      prompt: 'En tant que lead developer, analyse ce code [LANGAGE] et fournis une review constructive. Évalue : lisibilité, performance, sécurité, bonnes pratiques, tests. Pour chaque point, explique le problème et propose une solution concrète avec exemple de code amélioré. Ton bienveillant et pédagogique.',
      tags: ['Code Review', 'Qualité', 'Best Practices']
    },
    {
      id: 'dev_3',
      name: 'Tests Unitaires',
      category: 'Développement',
      prompt: 'Tu es un expert en testing. Génère des tests unitaires complets pour la fonction [FONCTION] en [LANGAGE]. Couvre : cas nominaux, cas limites, erreurs attendues, edge cases. Utilise [FRAMEWORK DE TEST]. Chaque test doit avoir un nom descriptif et des assertions claires. Vise 100% de couverture.',
      tags: ['Testing', 'Qualité', 'TDD']
    },
    {
      id: 'dev_4',
      name: 'Architecture Technique',
      category: 'Développement',
      prompt: 'En tant qu\'architecte logiciel, conçois l\'architecture pour [PROJET]. Décris : stack technologique recommandé avec justifications, diagramme d\'architecture (description textuelle), patterns utilisés, gestion de la scalabilité, sécurité, CI/CD, monitoring. Format : document technique structuré.',
      tags: ['Architecture', 'Design', 'Système']
    },
    {
      id: 'dev_5',
      name: 'Debug & Optimisation',
      category: 'Développement',
      prompt: 'Tu es un expert en debugging et optimisation. Analyse ce code/problème [DESCRIPTION]. Identifie : la cause du bug, l\'impact sur les performances, les risques de sécurité. Propose 3 solutions avec pros/cons, et recommande la meilleure. Fournis le code corrigé et optimisé avec explications ligne par ligne.',
      tags: ['Debug', 'Performance', 'Optimisation']
    }
  ],
  
  redaction: [
    {
      id: 'red_1',
      name: 'Synthèse Exécutive',
      category: 'Rédaction',
      prompt: 'En tant que consultant senior, rédige une synthèse exécutive pour [PROJET/RAPPORT]. Résume en 300 mots maximum : contexte, objectifs, méthodologie, résultats clés, recommandations prioritaires, prochaines étapes. Utilise des bullet points pour la clarté. Destiné à des décideurs. Ton formel et impactant.',
      tags: ['Business', 'Synthèse', 'Corporate']
    },
    {
      id: 'red_2',
      name: 'Communiqué de Presse',
      category: 'Rédaction',
      prompt: 'Tu es un attaché de presse expérimenté. Rédige un communiqué de presse pour [ANNONCE]. Structure : titre percutant, chapeau (qui, quoi, quand, où, pourquoi), développement avec citations, à propos de l\'entreprise, contact presse. Longueur : 400-500 mots. Ton professionnel et newsworthy.',
      tags: ['PR', 'Communication', 'Média']
    },
    {
      id: 'red_3',
      name: 'Script Vidéo YouTube',
      category: 'Rédaction',
      prompt: 'En tant que créateur de contenu expert, écris un script vidéo YouTube sur [SUJET] pour [AUDIENCE]. Inclus : hook des 5 premières secondes, intro, 3-5 points clés avec transitions, exemples/anecdotes, conclusion avec CTA. Indique les moments pour les visuels/B-roll. Durée cible : [X] minutes. Ton [STYLE].',
      tags: ['Vidéo', 'YouTube', 'Script']
    },
    {
      id: 'red_4',
      name: 'Fiche Produit E-commerce',
      category: 'Rédaction',
      prompt: 'Tu es un rédacteur e-commerce spécialisé en conversion. Rédige une fiche produit optimisée pour [PRODUIT]. Inclus : titre SEO (60 caractères), description courte (150 caractères), description longue avec bénéfices, caractéristiques techniques, conseils d\'utilisation, garantie. Intègre des mots-clés naturellement. Ton persuasif.',
      tags: ['E-commerce', 'Produit', 'SEO']
    },
    {
      id: 'red_5',
      name: 'Newsletter Mensuelle',
      category: 'Rédaction',
      prompt: 'En tant qu\'expert en content marketing, crée une newsletter mensuelle pour [ENTREPRISE]. Structure : édito personnel, 3 actualités de l\'entreprise, 1 conseil pratique, 1 témoignage client, événements à venir, CTA. Ton convivial et engageant. Longueur : 600-800 mots. Optimisée pour mobile.',
      tags: ['Newsletter', 'Email', 'Engagement']
    }
  ],
  
  creation: [
    {
      id: 'cre_1',
      name: 'Prompt Image IA (DALL-E)',
      category: 'Création',
      prompt: 'Tu es un expert en prompt engineering pour IA générative d\'images. Crée un prompt détaillé pour générer [DESCRIPTION IMAGE]. Spécifie : sujet principal, style artistique, composition, éclairage, couleurs dominantes, mood, détails techniques (ex: 4K, realistic), artistes de référence si pertinent. Optimisé pour DALL-E/Midjourney/Stable Diffusion.',
      tags: ['IA', 'Image', 'DALL-E']
    },
    {
      id: 'cre_2',
      name: 'Brief Créatif Design',
      category: 'Création',
      prompt: 'En tant que directeur artistique, rédige un brief créatif pour [PROJET DESIGN]. Inclus : objectifs, audience cible, message clé, contraintes (format, couleurs, typographie), références visuelles à rechercher, moodboard suggestions, livrables attendus, timeline. Format structuré pour designer.',
      tags: ['Design', 'Brief', 'Créatif']
    },
    {
      id: 'cre_3',
      name: 'Storyboard Publicitaire',
      category: 'Création',
      prompt: 'Tu es un créatif publicitaire expert. Développe un storyboard pour une publicité [VIDÉO/PRINT] de [PRODUIT]. Décris : scène par scène (minimum 6 scènes), dialogues/voix-off, éléments visuels clés, musique/ambiance sonore, durée par scène, CTA final. Format tableau avec descriptions détaillées.',
      tags: ['Pub', 'Vidéo', 'Storyboard']
    },
    {
      id: 'cre_4',
      name: 'Naming & Slogan',
      category: 'Création',
      prompt: 'En tant que naming expert, propose 10 noms de marque pour [CONCEPT/PRODUIT] et 5 slogans accrocheurs. Pour chaque nom : signification, disponibilité .com à vérifier, mémorabilité. Pour chaque slogan : explication du concept, tonalité, public cible. Critères : court, mémorable, prononçable internationalement.',
      tags: ['Branding', 'Naming', 'Créatif']
    },
    {
      id: 'cre_5',
      name: 'Concept Jeu Vidéo',
      category: 'Création',
      prompt: 'Tu es un game designer expérimenté. Développe un concept de jeu original sur [THÈME]. Inclus : high concept (1 phrase), gameplay core loop, mécaniques principales, univers/setting, personnages clés, progression, monétisation si F2P, USP (unique selling point). Public cible : [AUDIENCE]. Format : game design document light.',
      tags: ['Gaming', 'Concept', 'Game Design']
    }
  ],
  
  business: [
    {
      id: 'bus_1',
      name: 'Business Plan Startup',
      category: 'Business',
      prompt: 'En tant que consultant en stratégie, élabore un business plan pour [STARTUP]. Inclus : executive summary, problème/solution, marché cible et taille, modèle économique, stratégie go-to-market, équipe, projections financières 3 ans, besoins de financement, risques et mitigation. Format professionnel pour investisseurs.',
      tags: ['Startup', 'Business Plan', 'Finance']
    },
    {
      id: 'bus_2',
      name: 'Analyse SWOT',
      category: 'Business',
      prompt: 'Tu es un analyste business. Réalise une analyse SWOT complète pour [ENTREPRISE/PROJET]. Pour chaque quadrant (Forces, Faiblesses, Opportunités, Menaces), liste 5-7 éléments détaillés avec impact et recommandations stratégiques. Priorise par importance. Format tableau + synthèse stratégique.',
      tags: ['Stratégie', 'Analyse', 'SWOT']
    },
    {
      id: 'bus_3',
      name: 'Pitch Deck Investisseurs',
      category: 'Business',
      prompt: 'En tant qu\'expert en levée de fonds, structure un pitch deck de 15 slides pour [STARTUP]. Décris le contenu de chaque slide : Problème, Solution, Marché, Produit, Business Model, Traction, Équipe, Concurrence, Roadmap, Financials, Utilisation des fonds. Fournis des bullet points clés et recommandations visuelles.',
      tags: ['Pitch', 'Investissement', 'Startup']
    },
    {
      id: 'bus_4',
      name: 'OKR Trimestriels',
      category: 'Business',
      prompt: 'Tu es un expert en OKR (Objectives & Key Results). Définis les OKR du prochain trimestre pour [ÉQUIPE/ENTREPRISE]. Pour chaque objectif : 3-4 key results mesurables avec baseline et target, initiatives pour les atteindre, ownership, risques potentiels. Maximum 3-5 objectifs. Format structuré et actionnable.',
      tags: ['OKR', 'Objectifs', 'Management']
    },
    {
      id: 'bus_5',
      name: 'Étude de Marché',
      category: 'Business',
      prompt: 'En tant qu\'analyste de marché, réalise une étude de marché pour [PRODUIT/SERVICE] dans [SECTEUR]. Analyse : taille du marché (TAM/SAM/SOM), tendances clés, segments clients, concurrents principaux avec positionnement, barrières à l\'entrée, opportunités de différenciation. Fournis des données chiffrées et sources.',
      tags: ['Marché', 'Recherche', 'Analyse']
    }
  ]
};

// Fonction pour obtenir tous les templates
function getAllTemplates() {
  const all = [];
  Object.values(PROMPT_TEMPLATES).forEach(category => {
    all.push(...category);
  });
  return all;
}

// Fonction pour rechercher des templates
function searchTemplates(query) {
  const allTemplates = getAllTemplates();
  const lowerQuery = query.toLowerCase();
  
  return allTemplates.filter(template => 
    template.name.toLowerCase().includes(lowerQuery) ||
    template.prompt.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Fonction pour obtenir un template par ID
function getTemplateById(id) {
  const allTemplates = getAllTemplates();
  return allTemplates.find(t => t.id === id);
}
