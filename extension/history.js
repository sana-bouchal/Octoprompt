// ========== PAGE HISTORIQUE - GESTION UI ==========

let currentFilters = {};
let currentHistory = [];

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📚 Initialisation de la page historique');
  
  // Initialiser le gestionnaire d'historique
  await historyManager.initialize();
  
  // Charger et afficher l'historique
  loadHistory();
  
  // Mettre à jour les stats
  updateStats();
  
  // Event listeners
  setupEventListeners();
});

// Charger et afficher l'historique
function loadHistory(filters = {}) {
  currentFilters = filters;
  
  // Récupérer l'historique filtré
  const searchQuery = document.getElementById('searchBox').value;
  currentHistory = historyManager.search(searchQuery, filters);
  
  displayHistory(currentHistory);
}

// Afficher l'historique
function displayHistory(history) {
  const container = document.getElementById('historyList');
  
  if (history.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">Aucun résultat</div>
        <div class="empty-state-subtext">Essayez de modifier vos filtres</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = history.map(entry => createHistoryItem(entry)).join('');
  
  // Ajouter les event listeners aux boutons
  history.forEach(entry => {
    // Bouton copier
    document.getElementById(`copy-${entry.id}`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(entry.improvedPrompt || entry.originalPrompt);
    });
    
    // Bouton favori
    document.getElementById(`fav-${entry.id}`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(entry.id);
    });
    
    // Bouton supprimer
    document.getElementById(`del-${entry.id}`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteEntry(entry.id);
    });
    
    // Clic sur l'item pour voir les détails
    document.getElementById(`item-${entry.id}`)?.addEventListener('click', () => {
      showDetails(entry);
    });
  });
}

// Créer un item d'historique
function createHistoryItem(entry) {
  const date = new Date(entry.timestamp);
  const scoreClass = entry.score >= 80 ? 'score-high' : entry.score >= 60 ? 'score-medium' : 'score-low';
  
  return `
    <div class="history-item" id="item-${entry.id}">
      <div class="history-header">
        <span class="history-date">${formatDate(date)}</span>
        <span class="history-score ${scoreClass}">${entry.score}/100</span>
      </div>
      <div class="history-prompt">${escapeHtml(entry.originalPrompt)}</div>
      <div class="history-meta">
        <span class="badge badge-${entry.mode}">${entry.mode === 'ai' ? '🤖 IA' : '📋 Règles'}</span>
        <span class="badge badge-platform">${entry.platform}</span>
        <span class="tag">🌐 ${entry.language.toUpperCase()}</span>
        ${entry.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
      <div class="history-actions">
        <button class="action-btn action-copy" id="copy-${entry.id}">📋 Copier</button>
        <button class="action-btn action-favorite ${entry.favorite ? 'active' : ''}" id="fav-${entry.id}">
          ${entry.favorite ? '⭐ Favori' : '☆ Favori'}
        </button>
        <button class="action-btn action-delete" id="del-${entry.id}">🗑️</button>
      </div>
    </div>
  `;
}

// Mettre à jour les statistiques
function updateStats() {
  const stats = historyManager.getStats();
  
  document.getElementById('totalCount').textContent = stats.total;
  document.getElementById('avgScore').textContent = stats.averageScore;
  document.getElementById('favCount').textContent = stats.favorites;
  
  // Compter les entrées d'aujourd'hui
  const today = new Date().toDateString();
  const todayCount = historyManager.getAll().filter(entry => 
    new Date(entry.timestamp).toDateString() === today
  ).length;
  document.getElementById('todayCount').textContent = todayCount;
}

// Configurer les event listeners
function setupEventListeners() {
  // Recherche
  const searchBox = document.getElementById('searchBox');
  let searchTimeout;
  searchBox.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      loadHistory(currentFilters);
    }, 300);
  });
  
  // Filtres
  document.getElementById('filterMode').addEventListener('change', (e) => {
    currentFilters.mode = e.target.value || undefined;
    loadHistory(currentFilters);
  });
  
  document.getElementById('filterPlatform').addEventListener('change', (e) => {
    currentFilters.platform = e.target.value || undefined;
    loadHistory(currentFilters);
  });
  
  document.getElementById('filterScore').addEventListener('change', (e) => {
    currentFilters.minScore = e.target.value ? parseInt(e.target.value) : undefined;
    loadHistory(currentFilters);
  });
  
  // Boutons header
  document.getElementById('exportBtn').addEventListener('click', showExportMenu);
  document.getElementById('clearBtn').addEventListener('click', confirmClear);
  document.getElementById('statsBtn').addEventListener('click', showDetailedStats);
}

// Copier dans le presse-papier
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('✓ Copié !', 'success');
  } catch (error) {
    console.error('Erreur copie:', error);
    showNotification('❌ Erreur de copie', 'error');
  }
}

// Basculer le favori
async function toggleFavorite(id) {
  await historyManager.toggleFavorite(id);
  loadHistory(currentFilters);
  updateStats();
  showNotification('⭐ Favori mis à jour', 'success');
}

// Supprimer une entrée
async function deleteEntry(id) {
  if (confirm('Supprimer cette entrée de l\'historique ?')) {
    await historyManager.delete(id);
    loadHistory(currentFilters);
    updateStats();
    showNotification('🗑️ Entrée supprimée', 'success');
  }
}

// Afficher les détails d'une entrée
function showDetails(entry) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
  `;
  
  const content = `
    <div style="
      background: linear-gradient(135deg, #0c1445 0%, #1a1f4d 100%);
      border: 2px solid rgba(96, 165, 250, 0.5);
      border-radius: 16px;
      padding: 30px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="color: #60a5fa; margin: 0;">Détails de l'analyse</h2>
        <button onclick="this.closest('[style*=fixed]').remove()" style="
          background: none;
          border: none;
          color: #64748b;
          font-size: 24px;
          cursor: pointer;
        ">×</button>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="color: #93c5fd; font-size: 12px; margin-bottom: 5px;">Date</div>
        <div style="color: white;">${formatDate(new Date(entry.timestamp))}</div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="color: #93c5fd; font-size: 12px; margin-bottom: 5px;">Score</div>
        <div style="font-size: 32px; font-weight: bold; color: ${entry.score >= 80 ? '#10b981' : entry.score >= 60 ? '#f97316' : '#ef4444'}">
          ${entry.score}/100
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="color: #93c5fd; font-size: 12px; margin-bottom: 5px;">Prompt Original</div>
        <div style="
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 8px;
          padding: 15px;
          color: #bfdbfe;
          line-height: 1.5;
          white-space: pre-wrap;
        ">${escapeHtml(entry.originalPrompt)}</div>
      </div>
      
      ${entry.improvedPrompt ? `
        <div style="margin-bottom: 20px;">
          <div style="color: #06b6d4; font-size: 12px; margin-bottom: 5px;">Prompt Amélioré</div>
          <div style="
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.5);
            border-radius: 8px;
            padding: 15px;
            color: #bfdbfe;
            line-height: 1.5;
            white-space: pre-wrap;
          ">${escapeHtml(entry.improvedPrompt)}</div>
        </div>
      ` : ''}
      
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
        <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; background: rgba(139, 92, 246, 0.2); color: #a855f7;">
          ${entry.mode === 'ai' ? '🤖 Mode IA' : '📋 Mode Règles'}
        </span>
        <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; background: rgba(6, 182, 212, 0.2); color: #06b6d4;">
          ${entry.platform}
        </span>
        <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; background: rgba(100, 116, 139, 0.2); color: #94a3b8;">
          🌐 ${entry.language.toUpperCase()}
        </span>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button onclick="navigator.clipboard.writeText('${escapeHtml(entry.improvedPrompt || entry.originalPrompt).replace(/'/g, "\\'")}'); this.textContent = '✓ Copié!'" style="
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          color: white;
          font-weight: 600;
          cursor: pointer;
        ">📋 Copier</button>
        <button onclick="this.closest('[style*=fixed]').remove()" style="
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid rgba(96, 165, 250, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: #93c5fd;
          font-weight: 600;
          cursor: pointer;
        ">Fermer</button>
      </div>
    </div>
  `;
  
  modal.innerHTML = content;
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Menu d'export
function showExportMenu() {
  const menu = confirm('Exporter en JSON ?\n\nOK = JSON\nAnnuler = CSV');
  
  if (menu) {
    exportJSON();
  } else {
    exportCSV();
  }
}

// Exporter en JSON
function exportJSON() {
  const json = historyManager.exportToJSON();
  downloadFile(json, 'octoprompt-history.json', 'application/json');
  showNotification('📥 Exporté en JSON', 'success');
}

// Exporter en CSV
function exportCSV() {
  const csv = historyManager.exportToCSV();
  downloadFile(csv, 'octoprompt-history.csv', 'text/csv');
  showNotification('📥 Exporté en CSV', 'success');
}

// Télécharger un fichier
function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Confirmer la suppression totale
async function confirmClear() {
  if (confirm('⚠️ ATTENTION !\n\nCela supprimera TOUT l\'historique de façon permanente.\n\nÊtes-vous sûr ?')) {
    if (confirm('Dernière confirmation ?\n\nCette action est irréversible !')) {
      await historyManager.clear();
      loadHistory(currentFilters);
      updateStats();
      showNotification('🗑️ Historique vidé', 'success');
    }
  }
}

// Afficher les statistiques détaillées
function showDetailedStats() {
  const stats = historyManager.getStats();
  
  alert(`📊 STATISTIQUES DÉTAILLÉES

Total d'entrées : ${stats.total}
Score moyen : ${stats.averageScore}/100
Favoris : ${stats.favorites}

Par Mode :
• Mode IA : ${stats.byMode.ai}
• Mode Règles : ${stats.byMode.rules}

Par Langue :
• Français : ${stats.byLanguage.fr}
• Anglais : ${stats.byLanguage.en}

Par Plateforme :
${Object.entries(stats.byPlatform).map(([platform, count]) => `• ${platform} : ${count}`).join('\n')}

Tags utilisés : ${stats.tags.length}
${stats.tags.slice(0, 10).join(', ')}`);
}

// Notification toast
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Utilitaires
function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'À l\'instant';
  if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`;
  if (diff < 86400000) return `Il y a ${Math.floor(diff / 3600000)}h`;
  
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
