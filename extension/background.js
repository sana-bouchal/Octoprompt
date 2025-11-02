// Background Service Worker pour OctoPrompt

// Installation de l'extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('🐙 OctoPrompt installé !');
  } else if (details.reason === 'update') {
    console.log('🐙 OctoPrompt mis à jour vers', chrome.runtime.getManifest().version);
  }
});
