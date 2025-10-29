// ========== GESTION DES ONGLETS ==========
function showTab(tabName) {
  // Masquer tous les contenus
  document.querySelectorAll('.content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Désactiver tous les tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Activer le contenu et le tab sélectionné
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
  
  // Charger les données selon l'onglet
  if (tabName === 'templates') {
    loadTemplates();
  } else if (tabName === 'history') {
    loadHistory();
  } else if (tabName === 'stats') {
    loadStats();
  }
}

// ========== TEMPLATES ==========
let currentTemplateId = null;

function loadTemplates() {
  const grid = document.getElementById('templatesGrid');
  const allTemplates = getAllTemplates();
  
  grid.innerHTML = allTemplates.map(template => `
    <div class="template-card" onclick="openTemplateModal('${template.id}')">
      <div class="template-header">
        <div class="template-name">${template.name}</div>
        <div class="template-category">${template.category}</div>
      </div>
      <div class="template-preview">${template.prompt}</div>
      <div class="template-tags">
        ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  // Mettre à jour le compteur
  document.querySelector('.tab.active').textContent = `📚 Templates (${allTemplates.length})`;
}

function filterTemplates() {
  const query = document.getElementById('searchTemplates').value;
  const grid = document.getElementById('templatesGrid');
  
  if (!query) {
    loadTemplates();
    return;
  }
  
  const results = searchTemplates(query);
  
  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🔍</div>
        <p>Aucun template trouvé pour "${query}"</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = results.map(template => `
    <div class="template-card" onclick="openTemplateModal('${template.id}')">
      <div class="template-header">
        <div class="template-name">${template.name}</div>
        <div class="template-category">${template.category}</div>
      </div>
      <div class="template-preview">${template.prompt}</div>
      <div class="template-tags">
        ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function openTemplateModal(templateId) {
  const template = getTemplateById(templateId);
  currentTemplateId = templateId;
  
  document.getElementById('modalTitle').textContent = template.name;
  document.getElementById('modalPrompt').textContent = template.prompt;
  document.getElementById('templateModal').classList.add('active');
}

function closeModal() {
  document.getElementById('templateModal').classList.remove('active');
  currentTemplateId = null;
}

function copyTemplate() {
  const promptText = document.getElementById('modalPrompt').textContent;
  navigator.clipboard.writeText(promptText);
  
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = '✓ Copié !';
  setTimeout(() => {
    btn.textContent = originalText;
  }, 2000);
}

function useTemplate() {
  const promptText = document.getElementById('modalPrompt').textContent;
  
  // Copier dans le presse-papier
  navigator.clipboard.writeText(promptText);
  
  // Envoyer un message pour remplir le champ de texte actif
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'insertTemplate',
        template: promptText
      });
    }
  });
  
  closeModal();
  
  // Afficher une confirmation
  alert('✨ Template inséré ! Retournez sur votre page et personnalisez les [VARIABLES].');
}

// ========== HISTORIQUE ==========
async function loadHistory() {
  await promptHistory.loadHistory();
  const history = promptHistory.getAll();
  const list = document.getElementById('historyList');
  
  if (history.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>Aucun prompt dans l'historique</p>
        <p style="font-size: 14px; margin-top: 10px;">Commencez à utiliser OctoPrompt pour voir vos prompts ici !</p>
      </div>
    `;
    return;
  }
  
  list.innerHTML = history.map(entry => `
    <div class="history-item">
      <div class="history-header">
        <div class="history-date">
          ${new Date(entry.timestamp).toLocaleString('fr-FR')}
          <span class="tag">${entry.mode === 'rules' ? '📋 Règles' : entry.mode === 'gemini' ? '🤖 Gemini' : '🤖 OpenAI'}</span>
        </div>
        <div class="history-score">
          <span class="score-badge">${entry.score}%</span>
          ${entry.favorite ? '⭐' : ''}
        </div>
      </div>
      <div class="history-content">
        <div class="prompt-box">
          <div class="prompt-label">Original</div>
          <div class="prompt-text">${escapeHtml(entry.original)}</div>
        </div>
        <div class="prompt-box">
          <div class="prompt-label">Amélioré</div>
          <div class="prompt-text">${escapeHtml(entry.improved)}</div>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn btn-primary" onclick="copyPrompt('${entry.id}', 'improved')">📋 Copier Amélioré</button>
        <button class="btn btn-secondary" onclick="toggleFavorite(${entry.id})">${entry.favorite ? '★' : '☆'} Favori</button>
        <button class="btn btn-secondary" onclick="deleteEntry(${entry.id})">🗑️ Supprimer</button>
      </div>
    </div>
  `).join('');
}

function filterHistory() {
  const query = document.getElementById('searchHistory').value;
  
  if (!query) {
    loadHistory();
    return;
  }
  
  const results = promptHistory.search(query);
  const list = document.getElementById('historyList');
  
  if (results.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <p>Aucun résultat pour "${query}"</p>
      </div>
    `;
    return;
  }
  
  // Même affichage que loadHistory mais avec results
  list.innerHTML = results.map(entry => `
    <div class="history-item">
      <div class="history-header">
        <div class="history-date">
          ${new Date(entry.timestamp).toLocaleString('fr-FR')}
          <span class="tag">${entry.mode === 'rules' ? '📋 Règles' : '🤖 IA'}</span>
        </div>
        <div class="history-score">
          <span class="score-badge">${entry.score}%</span>
          ${entry.favorite ? '⭐' : ''}
        </div>
      </div>
      <div class="history-content">
        <div class="prompt-box">
          <div class="prompt-label">Original</div>
          <div class="prompt-text">${escapeHtml(entry.original)}</div>
        </div>
        <div class="prompt-box">
          <div class="prompt-label">Amélioré</div>
          <div class="prompt-text">${escapeHtml(entry.improved)}</div>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn btn-primary" onclick="copyPrompt('${entry.id}', 'improved')">📋 Copier Amélioré</button>
        <button class="btn btn-secondary" onclick="toggleFavorite(${entry.id})">${entry.favorite ? '★' : '☆'} Favori</button>
        <button class="btn btn-secondary" onclick="deleteEntry(${entry.id})">🗑️ Supprimer</button>
      </div>
    </div>
  `).join('');
}

async function copyPrompt(id, type) {
  const entry = promptHistory.getAll().find(e => e.id == id);
  if (entry) {
    const text = type === 'improved' ? entry.improved : entry.original;
    await navigator.clipboard.writeText(text);
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copié !';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }
}

async function toggleFavorite(id) {
  await promptHistory.toggleFavorite(id);
  loadHistory();
}

async function deleteEntry(id) {
  if (confirm('Supprimer cet élément de l\'historique ?')) {
    await promptHistory.remove(id);
    loadHistory();
  }
}

// ========== STATISTIQUES ==========
async function loadStats() {
  await promptHistory.loadHistory();
  const stats = promptHistory.getStats();
  const progression = promptHistory.getProgression();
  
  const grid = document.getElementById('statsGrid');
  
  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${stats.total}</div>
      <div class="stat-label">Prompts Analysés</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.averageScore}%</div>
      <div class="stat-label">Score Moyen</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.bestScore}%</div>
      <div class="stat-label">Meilleur Score</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.favorites}</div>
      <div class="stat-label">Favoris</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.byMode.rules || 0}</div>
      <div class="stat-label">Mode Règles</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${(stats.byMode.gemini || 0) + (stats.byMode.openai || 0)}</div>
      <div class="stat-label">Mode IA</div>
    </div>
  `;
  
  // Ajouter la progression
  if (progression.length > 0) {
    grid.innerHTML += `
      <div class="stat-card" style="grid-column: 1 / -1;">
        <div class="stat-label" style="margin-bottom: 15px;">📈 Progression</div>
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto;">
          ${progression.map(day => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
              <span style="color: rgba(255,255,255,0.8);">${day.date}</span>
              <div>
                <span style="color: #06b6d4; font-weight: 600;">${day.averageScore}%</span>
                <span style="color: rgba(255,255,255,0.5); margin-left: 10px;">(${day.count} prompts)</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// ========== UTILITAIRES ==========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
  loadTemplates();
  
  // Fermer la modal en cliquant en dehors
  document.getElementById('templateModal').addEventListener('click', (e) => {
    if (e.target.id === 'templateModal') {
      closeModal();
    }
  });
});
