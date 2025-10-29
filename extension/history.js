// ========== GESTIONNAIRE D'HISTORIQUE ==========

class PromptHistory {
  constructor(maxSize = 50) {
    this.maxSize = maxSize;
    this.history = [];
    this.loadHistory();
  }

  // Charger l'historique depuis le storage
  async loadHistory() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['promptHistory'], (result) => {
        this.history = result.promptHistory || [];
        resolve(this.history);
      });
    });
  }

  // Sauvegarder l'historique
  async saveHistory() {
    return new Promise((resolve) => {
      chrome.storage.local.set({ promptHistory: this.history }, resolve);
    });
  }

  // Ajouter un prompt à l'historique
  async addPrompt(originalPrompt, improvedPrompt, score, mode = 'rules') {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      original: originalPrompt,
      improved: improvedPrompt,
      score: score,
      mode: mode,
      favorite: false
    };

    // Éviter les doublons consécutifs
    if (this.history.length > 0) {
      const last = this.history[0];
      if (last.original === originalPrompt) {
        return;
      }
    }

    // Ajouter au début
    this.history.unshift(entry);

    // Limiter la taille
    if (this.history.length > this.maxSize) {
      this.history = this.history.slice(0, this.maxSize);
    }

    await this.saveHistory();
    return entry;
  }

  // Obtenir tout l'historique
  getAll() {
    return this.history;
  }

  // Obtenir les favoris
  getFavorites() {
    return this.history.filter(entry => entry.favorite);
  }

  // Rechercher dans l'historique
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.history.filter(entry =>
      entry.original.toLowerCase().includes(lowerQuery) ||
      entry.improved.toLowerCase().includes(lowerQuery)
    );
  }

  // Marquer/démarquer un favori
  async toggleFavorite(id) {
    const entry = this.history.find(e => e.id === id);
    if (entry) {
      entry.favorite = !entry.favorite;
      await this.saveHistory();
    }
    return entry;
  }

  // Supprimer un élément
  async remove(id) {
    this.history = this.history.filter(e => e.id !== id);
    await this.saveHistory();
  }

  // Effacer tout l'historique
  async clear() {
    this.history = [];
    await this.saveHistory();
  }

  // Exporter en JSON
  exportJSON() {
    return JSON.stringify(this.history, null, 2);
  }

  // Exporter en CSV
  exportCSV() {
    const headers = ['Date', 'Prompt Original', 'Prompt Amélioré', 'Score', 'Mode'];
    const rows = this.history.map(entry => [
      new Date(entry.timestamp).toLocaleString('fr-FR'),
      `"${entry.original.replace(/"/g, '""')}"`,
      `"${entry.improved.replace(/"/g, '""')}"`,
      entry.score,
      entry.mode
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // Statistiques
  getStats() {
    if (this.history.length === 0) {
      return {
        total: 0,
        averageScore: 0,
        bestScore: 0,
        worstScore: 0,
        favorites: 0,
        byMode: { rules: 0, gemini: 0, openai: 0 }
      };
    }

    const scores = this.history.map(e => e.score);
    const byMode = this.history.reduce((acc, e) => {
      acc[e.mode] = (acc[e.mode] || 0) + 1;
      return acc;
    }, {});

    return {
      total: this.history.length,
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      bestScore: Math.max(...scores),
      worstScore: Math.min(...scores),
      favorites: this.history.filter(e => e.favorite).length,
      byMode: byMode
    };
  }

  // Obtenir la progression (scores par jour)
  getProgression() {
    const byDay = {};
    
    this.history.forEach(entry => {
      const date = new Date(entry.timestamp).toLocaleDateString('fr-FR');
      if (!byDay[date]) {
        byDay[date] = { scores: [], count: 0 };
      }
      byDay[date].scores.push(entry.score);
      byDay[date].count++;
    });

    return Object.entries(byDay).map(([date, data]) => ({
      date,
      averageScore: Math.round(data.scores.reduce((a, b) => a + b) / data.count),
      count: data.count
    })).reverse();
  }
}

// Instance globale
const promptHistory = new PromptHistory();
