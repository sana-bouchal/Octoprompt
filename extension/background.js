// Background Service Worker pour OctoPrompt

// Gérer les messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openLibrary') {
    // Ouvrir la page de bibliothèque
    chrome.tabs.create({
      url: chrome.runtime.getURL('library.html')
    });
  }
});

// Installation de l'extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('🐙 OctoPrompt installé !');
    
    // Ouvrir la page de bienvenue
    chrome.tabs.create({
      url: chrome.runtime.getURL('library.html')
    });
  } else if (details.reason === 'update') {
    console.log('🐙 OctoPrompt mis à jour vers', chrome.runtime.getManifest().version);
  }
});
