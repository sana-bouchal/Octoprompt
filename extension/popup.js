// Traductions
const translations = {
  fr: {
    subtitle: "Donnez des bras à vos idées",
    extensionActive: "Extension active",
    extensionPaused: "Extension en pause",
    autoAnalyze: "Activer l'analyse automatique",
    aiMode: "Mode IA",
    language: "Langue: Français",
    saved: "✓ Enregistré!",
    save: "Enregistrer",
    apiKeyPlaceholder: "Clé API",
    geminiHint: 'Pour Gemini: <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color: #06b6d4;">Obtenir une clé gratuite</a>',
    openaiHint: 'Pour OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" style="color: #06b6d4;">Obtenir une clé</a> (payant)',
    geminiPlaceholder: "Clé API Gemini",
    openaiPlaceholder: "Clé API OpenAI (sk-...)"
  },
  en: {
    subtitle: "Give arms to your ideas",
    extensionActive: "Extension active",
    extensionPaused: "Extension paused",
    autoAnalyze: "Enable automatic analysis",
    aiMode: "AI Mode",
    language: "Language: English",
    saved: "✓ Saved!",
    save: "Save",
    apiKeyPlaceholder: "API Key",
    geminiHint: 'For Gemini: <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color: #06b6d4;">Get a free key</a>',
    openaiHint: 'For OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" style="color: #06b6d4;">Get a key</a> (paid)',
    geminiPlaceholder: "Gemini API Key",
    openaiPlaceholder: "OpenAI API Key (sk-...)"
  }
};

// Gestion du toggle pour l'activation/désactivation de l'analyse automatique
document.addEventListener('DOMContentLoaded', () => {
  const autoAnalyzeToggle = document.getElementById('autoAnalyze');
  const aiModeToggle = document.getElementById('aiMode');
  const languageToggle = document.getElementById('languageToggle');
  const statusText = document.getElementById('statusText');
  const apiConfigSection = document.getElementById('apiConfigSection');
  const apiProviderSelect = document.getElementById('aiProvider');
  const apiKeyInput = document.getElementById('apiKey');
  const saveApiKeyBtn = document.getElementById('saveApiKey');
  const apiHint = document.getElementById('apiHint');

  let currentLang = 'fr';

  // Fonction pour mettre à jour les textes
  function updateTexts(lang) {
    const t = translations[lang];
    document.getElementById('headerSubtitle').textContent = t.subtitle;
    document.getElementById('statusText').textContent = autoAnalyzeToggle.checked ? t.extensionActive : t.extensionPaused;
    document.getElementById('autoAnalyzeLabel').textContent = t.autoAnalyze;
    document.getElementById('aiModeLabel').textContent = t.aiMode;
    document.getElementById('languageLabel').textContent = t.language;
    saveApiKeyBtn.textContent = t.save;
    updateApiHint(apiProviderSelect.value, lang);
  }

  // Charger l'état sauvegardé
  chrome.storage.sync.get(['autoAnalyze', 'aiMode', 'apiKey', 'aiProvider', 'language'], (result) => {
    autoAnalyzeToggle.checked = result.autoAnalyze !== false;
    aiModeToggle.checked = result.aiMode === true;
    apiProviderSelect.value = result.aiProvider || 'gemini';
    currentLang = result.language || 'fr';
    languageToggle.checked = currentLang === 'en';
    
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
    if (result.aiMode) {
      apiConfigSection.style.display = 'block';
    }
    updateTexts(currentLang);
  });

  // Mettre à jour le hint selon le provider
  function updateApiHint(provider, lang = currentLang) {
    const t = translations[lang];
    if (provider === 'gemini') {
      apiHint.innerHTML = t.geminiHint;
      apiKeyInput.placeholder = t.geminiPlaceholder;
    } else {
      apiHint.innerHTML = t.openaiHint;
      apiKeyInput.placeholder = t.openaiPlaceholder;
    }
  }

  // Toggle de langue
  languageToggle.addEventListener('change', () => {
    currentLang = languageToggle.checked ? 'en' : 'fr';
    chrome.storage.sync.set({ language: currentLang });
    updateTexts(currentLang);
    
    // Informer le content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'updateLanguage', 
          language: currentLang 
        });
      }
    });
  });

  // Changement de provider
  apiProviderSelect.addEventListener('change', () => {
    const provider = apiProviderSelect.value;
    chrome.storage.sync.set({ aiProvider: provider });
    updateApiHint(provider, currentLang);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'updateProvider', 
          provider: provider 
        });
      }
    });
  });

  // Sauvegarder l'état quand il change
  autoAnalyzeToggle.addEventListener('change', () => {
    const isEnabled = autoAnalyzeToggle.checked;
    chrome.storage.sync.set({ autoAnalyze: isEnabled });
    
    const t = translations[currentLang];
    statusText.textContent = isEnabled ? t.extensionActive : t.extensionPaused;
    
    // Informer le content script du changement
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'toggleAutoAnalyze', 
          enabled: isEnabled 
        });
      }
    });
  });

  // Mode IA
  aiModeToggle.addEventListener('change', () => {
    const aiEnabled = aiModeToggle.checked;
    chrome.storage.sync.set({ aiMode: aiEnabled });
    apiConfigSection.style.display = aiEnabled ? 'block' : 'none';
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'toggleAiMode', 
          enabled: aiEnabled 
        });
      }
    });
  });

  // Enregistrer la clé API
  saveApiKeyBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const provider = apiProviderSelect.value;
    
    if (apiKey) {
      chrome.storage.sync.set({ apiKey, aiProvider: provider }, () => {
        const t = translations[currentLang];
        saveApiKeyBtn.textContent = t.saved;
        setTimeout(() => {
          saveApiKeyBtn.textContent = t.save;
        }, 2000);
        
        // Informer le content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: 'updateApiKey',
              apiKey: apiKey,
              provider: provider
            });
          }
        });
      });
    }
  });
  
  // Bouton pour ouvrir la page d'historique
  document.getElementById('historyBtn')?.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('history.html') });
  });
});

// ========== TEMPLATES & HISTORIQUE ==========

let currentTemplateId = null;

// Changer d'onglet
function showMiniTab(tab) {
  // Mettre à jour les tabs
  document.querySelectorAll('.mini-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  
  // Afficher le bon contenu
  document.getElementById('miniTemplates').style.display = tab === 'templates' ? 'block' : 'none';
  document.getElementById('miniHistory').style.display = tab === 'history' ? 'block' : 'none';
  
  // Charger les données
  if (tab === 'templates') {
    loadMiniTemplates();
  } else {
    loadMiniHistory();
  }
}

// Charger les templates (top 10)
function loadMiniTemplates() {
  const allTemplates = getAllTemplates();
  const list = document.getElementById('templatesList');
  
  // Afficher seulement les 10 premiers par défaut
  const templatesToShow = allTemplates.slice(0, 10);
  
  list.innerHTML = templatesToShow.map(template => `
    <div class="template-item" onclick="openTemplateDetail('${template.id}')">
      <div class="template-name">${template.name}</div>
      <div class="template-category">${template.category}</div>
    </div>
  `).join('');
}

// Recherche dans les templates
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchTemplates');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const allTemplates = getAllTemplates();
      
      if (!query) {
        loadMiniTemplates();
        return;
      }
      
      const results = allTemplates.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query))
      );
      
      const list = document.getElementById('templatesList');
      if (results.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 20px; font-size: 12px;">Aucun résultat</div>';
      } else {
        list.innerHTML = results.slice(0, 10).map(template => `
          <div class="template-item" onclick="openTemplateDetail('${template.id}')">
            <div class="template-name">${template.name}</div>
            <div class="template-category">${template.category}</div>
          </div>
        `).join('');
      }
    });
  }
  
  // Charger les templates au démarrage
  loadMiniTemplates();
});

// Ouvrir le détail d'un template
function openTemplateDetail(templateId) {
  const template = getTemplateById(templateId);
  currentTemplateId = templateId;
  
  document.getElementById('modalTitle').textContent = template.name;
  document.getElementById('modalPrompt').textContent = template.prompt;
  document.getElementById('templateModal').style.display = 'flex';
}

// Fermer la modal
function closeTemplateModal() {
  document.getElementById('templateModal').style.display = 'none';
  currentTemplateId = null;
}

// Copier le template
function copyTemplateText() {
  const text = document.getElementById('modalPrompt').textContent;
  navigator.clipboard.writeText(text);
  
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = '✓ Copié !';
  setTimeout(() => {
    btn.textContent = originalText;
    closeTemplateModal();
  }, 1000);
}

// Charger l'historique
async function loadMiniHistory() {
  await promptHistory.loadHistory();
  const history = promptHistory.getAll();
  const list = document.getElementById('historyList');
  
  if (history.length === 0) {
    list.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 20px; font-size: 12px;">Aucun historique<br><small>Utilisez OctoPrompt pour voir vos prompts ici</small></div>';
    return;
  }
  
  // Afficher les 8 derniers
  list.innerHTML = history.slice(0, 8).map(entry => `
    <div class="history-item" onclick="copyHistoryPrompt('${entry.id}')">
      <div class="history-header">
        <div class="history-date">${new Date(entry.timestamp).toLocaleString('fr-FR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
        <div class="history-score">${entry.score}%</div>
      </div>
      <div class="history-text">${escapeHtml(entry.improved)}</div>
    </div>
  `).join('');
}

// Copier un prompt de l'historique
async function copyHistoryPrompt(id) {
  const entry = promptHistory.getAll().find(e => e.id == id);
  if (entry) {
    await navigator.clipboard.writeText(entry.improved);
    
    // Flash visuel
    event.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)';
    setTimeout(() => {
      event.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    }, 300);
  }
}

// Échapper le HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Fermer la modal en cliquant en dehors
document.addEventListener('click', (e) => {
  const modal = document.getElementById('templateModal');
  if (e.target === modal) {
    closeTemplateModal();
  }
});
