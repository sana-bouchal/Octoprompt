// ========== GESTIONNAIRE D'HISTORIQUE INTELLIGENT ==========

class HistoryManager {
  constructor() {
    this.storageKey = 'octoprompt_history';
    this.maxEntries = 100; // Limite à 100 entrées
    this.history = [];
  }

  // Initialiser et charger l'historique
  async initialize() {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.storageKey], (result) => {
        this.history = result[this.storageKey] || [];
        console.log(`📚 Historique chargé: ${this.history.length} entrées`);
        resolve(this.history);
      });
    });
  }

  // Ajouter une entrée à l'historique
  async add(entry) {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      originalPrompt: entry.originalPrompt,
      improvedPrompt: entry.improvedPrompt || null,
      score: entry.score || 0,
      mode: entry.mode || 'rules', // 'rules' ou 'ai'
      language: entry.language || 'fr',
      tags: entry.tags || [],
      platform: this.detectPlatform(),
      favorite: false
    };

    // Ajouter au début de l'historique
    this.history.unshift(newEntry);

    // Limiter la taille de l'historique
    if (this.history.length > this.maxEntries) {
      this.history = this.history.slice(0, this.maxEntries);
    }

    // Sauvegarder
    await this.save();
    
    console.log('✅ Entrée ajoutée à l\'historique:', newEntry.id);
    return newEntry;
  }

  // Sauvegarder l'historique
  async save() {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.storageKey]: this.history }, () => {
        resolve();
      });
    });
  }

  // Récupérer tout l'historique
  getAll() {
    return this.history;
  }

  // Récupérer une entrée par ID
  getById(id) {
    return this.history.find(entry => entry.id === id);
  }

  // Rechercher dans l'historique
  search(query, filters = {}) {
    let results = [...this.history];

    // Recherche textuelle
    if (query && query.trim()) {
      const searchLower = query.toLowerCase();
      results = results.filter(entry => 
        entry.originalPrompt.toLowerCase().includes(searchLower) ||
        (entry.improvedPrompt && entry.improvedPrompt.toLowerCase().includes(searchLower)) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filtrer par mode
    if (filters.mode) {
      results = results.filter(entry => entry.mode === filters.mode);
    }

    // Filtrer par langue
    if (filters.language) {
      results = results.filter(entry => entry.language === filters.language);
    }

    // Filtrer par plateforme
    if (filters.platform) {
      results = results.filter(entry => entry.platform === filters.platform);
    }

    // Filtrer par favoris
    if (filters.favorite) {
      results = results.filter(entry => entry.favorite === true);
    }

    // Filtrer par score
    if (filters.minScore) {
      results = results.filter(entry => entry.score >= filters.minScore);
    }

    // Filtrer par tags
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(entry => 
        filters.tags.some(tag => entry.tags.includes(tag))
      );
    }

    // Filtrer par date
    if (filters.startDate) {
      results = results.filter(entry => 
        new Date(entry.timestamp) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      results = results.filter(entry => 
        new Date(entry.timestamp) <= new Date(filters.endDate)
      );
    }

    return results;
  }

  // Mettre à jour une entrée
  async update(id, updates) {
    const index = this.history.findIndex(entry => entry.id === id);
    if (index === -1) return false;

    this.history[index] = {
      ...this.history[index],
      ...updates,
      id // Garder l'ID original
    };

    await this.save();
    return this.history[index];
  }

  // Supprimer une entrée
  async delete(id) {
    const initialLength = this.history.length;
    this.history = this.history.filter(entry => entry.id !== id);
    
    if (this.history.length < initialLength) {
      await this.save();
      console.log('🗑️ Entrée supprimée:', id);
      return true;
    }
    return false;
  }

  // Supprimer plusieurs entrées
  async deleteMultiple(ids) {
    this.history = this.history.filter(entry => !ids.includes(entry.id));
    await this.save();
    console.log(`🗑️ ${ids.length} entrées supprimées`);
  }

  // Vider tout l'historique
  async clear() {
    this.history = [];
    await this.save();
    console.log('🗑️ Historique vidé complètement');
  }

  // Ajouter/retirer un tag
  async toggleTag(id, tag) {
    const entry = this.getById(id);
    if (!entry) return false;

    if (entry.tags.includes(tag)) {
      entry.tags = entry.tags.filter(t => t !== tag);
    } else {
      entry.tags.push(tag);
    }

    await this.update(id, { tags: entry.tags });
    return entry;
  }

  // Ajouter/retirer des favoris
  async toggleFavorite(id) {
    const entry = this.getById(id);
    if (!entry) return false;

    await this.update(id, { favorite: !entry.favorite });
    return this.getById(id);
  }

  // Obtenir tous les tags uniques
  getAllTags() {
    const tags = new Set();
    this.history.forEach(entry => {
      entry.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  // Obtenir les statistiques
  getStats() {
    const stats = {
      total: this.history.length,
      byMode: {
        rules: this.history.filter(e => e.mode === 'rules').length,
        ai: this.history.filter(e => e.mode === 'ai').length
      },
      byLanguage: {
        fr: this.history.filter(e => e.language === 'fr').length,
        en: this.history.filter(e => e.language === 'en').length
      },
      byPlatform: {},
      averageScore: 0,
      favorites: this.history.filter(e => e.favorite).length,
      tags: this.getAllTags()
    };

    // Compter par plateforme
    this.history.forEach(entry => {
      const platform = entry.platform || 'unknown';
      stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1;
    });

    // Score moyen
    if (this.history.length > 0) {
      const totalScore = this.history.reduce((sum, entry) => sum + entry.score, 0);
      stats.averageScore = Math.round(totalScore / this.history.length);
    }

    return stats;
  }

  // Exporter l'historique en JSON
  exportToJSON() {
    return JSON.stringify(this.history, null, 2);
  }

  // Exporter l'historique en CSV
  exportToCSV() {
    if (this.history.length === 0) return '';

    const headers = ['ID', 'Date', 'Prompt Original', 'Prompt Amélioré', 'Score', 'Mode', 'Langue', 'Plateforme', 'Tags', 'Favori'];
    const rows = this.history.map(entry => [
      entry.id,
      new Date(entry.timestamp).toLocaleString(),
      `"${entry.originalPrompt.replace(/"/g, '""')}"`,
      `"${(entry.improvedPrompt || '').replace(/"/g, '""')}"`,
      entry.score,
      entry.mode,
      entry.language,
      entry.platform,
      entry.tags.join('; '),
      entry.favorite ? 'Oui' : 'Non'
    ]);

    return [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  }

  // Importer depuis JSON
  async importFromJSON(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (!Array.isArray(imported)) {
        throw new Error('Format invalide');
      }

      // Fusionner avec l'historique existant
      const newEntries = imported.filter(entry => 
        !this.history.some(existing => existing.id === entry.id)
      );

      this.history = [...newEntries, ...this.history];
      
      // Limiter la taille
      if (this.history.length > this.maxEntries) {
        this.history = this.history.slice(0, this.maxEntries);
      }

      await this.save();
      console.log(`📥 ${newEntries.length} nouvelles entrées importées`);
      return newEntries.length;
    } catch (error) {
      console.error('❌ Erreur import JSON:', error);
      throw error;
    }
  }

  // Détecter la plateforme actuelle
  detectPlatform() {
    const url = window.location.hostname;
    if (url.includes('chatgpt.com') || url.includes('chat.openai.com')) return 'ChatGPT';
    if (url.includes('claude.ai')) return 'Claude';
    if (url.includes('gemini.google.com') || url.includes('bard.google.com')) return 'Gemini';
    if (url.includes('perplexity.ai')) return 'Perplexity';
    if (url.includes('you.com')) return 'You.com';
    return 'Autre';
  }

  // Obtenir les entrées récentes (7 derniers jours)
  getRecent(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.history.filter(entry => 
      new Date(entry.timestamp) >= cutoffDate
    );
  }

  // Obtenir les meilleurs prompts (score élevé)
  getTopPrompts(limit = 10) {
    return [...this.history]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

// Instance globale
const historyManager = new HistoryManager();
