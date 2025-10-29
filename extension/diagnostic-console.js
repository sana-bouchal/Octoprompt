// Script de diagnostic à copier-coller dans la console de ChatGPT
// Pour l'utiliser : F12 > Console > Coller ce code > Entrée

console.clear();
console.log('%c🐙 OctoPrompt - Diagnostic Auto', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
console.log('%c═══════════════════════════════════════', 'color: #60a5fa;');

// 1. Vérifier l'URL
console.log('\n%c1️⃣ VÉRIFICATION URL', 'color: #10b981; font-weight: bold;');
console.log('URL actuelle:', window.location.href);
console.log('Hostname:', window.location.hostname);

const validHosts = ['chat.openai.com', 'chatgpt.com'];
const isValidHost = validHosts.includes(window.location.hostname);
console.log(isValidHost ? '✅ URL supportée' : '❌ URL non supportée');

// 2. Tester les sélecteurs
console.log('\n%c2️⃣ TEST DES SÉLECTEURS', 'color: #10b981; font-weight: bold;');

const selectors = [
  { name: 'textarea[id*="prompt"]', sel: 'textarea[id*="prompt"]' },
  { name: 'textarea avec "Message"', sel: 'textarea[placeholder*="Message"]' },
  { name: 'textarea avec "message"', sel: 'textarea[placeholder*="message"]' },
  { name: 'textarea#prompt-textarea', sel: 'textarea#prompt-textarea' },
  { name: 'textarea.m-0', sel: 'textarea.m-0' },
  { name: 'div contenteditable', sel: 'div[contenteditable="true"]' }
];

let foundInput = null;
selectors.forEach(({name, sel}) => {
  const el = document.querySelector(sel);
  if (el) {
    console.log(`%c✅ ${name}`, 'color: #10b981', el);
    if (!foundInput) foundInput = el;
  } else {
    console.log(`%c❌ ${name}`, 'color: #64748b');
  }
});

// 3. Liste de tous les textareas
console.log('\n%c3️⃣ TOUS LES TEXTAREAS', 'color: #10b981; font-weight: bold;');
const allTextareas = document.querySelectorAll('textarea');
console.log(`Nombre total: ${allTextareas.length}`);
allTextareas.forEach((ta, i) => {
  console.log(`Textarea ${i+1}:`, {
    id: ta.id,
    placeholder: ta.placeholder,
    classes: ta.className,
    visible: ta.offsetWidth > 0 && ta.offsetHeight > 0,
    element: ta
  });
});

// 4. Vérifier si l'extension est chargée
console.log('\n%c4️⃣ EXTENSION OCTOPROMPT', 'color: #10b981; font-weight: bold;');
const tooltip = document.getElementById('octoprompt-tooltip');
if (tooltip) {
  console.log('✅ Tooltip trouvé dans le DOM:', tooltip);
  console.log('Display:', tooltip.style.display);
} else {
  console.log('❌ Tooltip non trouvé (extension pas chargée ou pas encore créé)');
}

// 5. Vérifier les scripts
console.log('\n%c5️⃣ SCRIPTS CHARGÉS', 'color: #10b981; font-weight: bold;');
const scripts = Array.from(document.querySelectorAll('script'));
const extensionScripts = scripts.filter(s => 
  s.src && (s.src.includes('content.js') || s.src.includes('extension'))
);
if (extensionScripts.length > 0) {
  console.log('✅ Scripts d\'extension trouvés:', extensionScripts);
} else {
  console.log('⚠️ Aucun script d\'extension détecté');
}

// 6. Test d'attachement manuel
console.log('\n%c6️⃣ TEST MANUEL', 'color: #10b981; font-weight: bold;');
if (foundInput) {
  console.log('✅ Champ trouvé, tentative d\'attachement...');
  console.log('Type:', foundInput.tagName);
  console.log('Attributs:', {
    id: foundInput.id,
    name: foundInput.name,
    placeholder: foundInput.placeholder,
    'aria-label': foundInput.getAttribute('aria-label')
  });
  
  // Tester l'écoute d'événement
  foundInput.addEventListener('input', function testHandler(e) {
    console.log('🎉 Événement INPUT détecté ! Texte:', e.target.value);
    foundInput.removeEventListener('input', testHandler);
  }, { once: true });
  
  console.log('👉 Écrivez maintenant dans le champ pour tester !');
} else {
  console.log('❌ Aucun champ de saisie trouvé');
  console.log('💡 Essayez ces sélecteurs custom:');
  console.log('   document.querySelector("textarea")');
  console.log('   document.querySelector("[contenteditable]")');
}

// 7. Résumé
console.log('\n%c📋 RÉSUMÉ', 'color: #f97316; font-weight: bold;');
console.log('%c═══════════════════════════════════════', 'color: #60a5fa;');
if (!isValidHost) {
  console.log('%c❌ PROBLÈME: URL non supportée', 'color: #ef4444; font-weight: bold;');
  console.log('Solutions: Vérifiez que vous êtes sur chat.openai.com ou chatgpt.com');
} else if (!foundInput) {
  console.log('%c❌ PROBLÈME: Champ de texte non trouvé', 'color: #ef4444; font-weight: bold;');
  console.log('Solutions:');
  console.log('1. ChatGPT a peut-être changé son interface');
  console.log('2. Cherchez manuellement le textarea avec:');
  console.log('   document.querySelectorAll("textarea")');
  console.log('3. Contactez le développeur avec les infos ci-dessus');
} else if (!tooltip) {
  console.log('%c⚠️ PROBLÈME: Extension pas chargée', 'color: #f97316; font-weight: bold;');
  console.log('Solutions:');
  console.log('1. Vérifiez chrome://extensions/');
  console.log('2. L\'extension est-elle activée ?');
  console.log('3. Rechargez l\'extension');
  console.log('4. Rechargez cette page (F5)');
} else {
  console.log('%c✅ TOUT SEMBLE OK !', 'color: #10b981; font-weight: bold;');
  console.log('Si le tooltip ne s\'affiche toujours pas:');
  console.log('1. Écrivez plus de 5 caractères');
  console.log('2. Attendez 0.5 secondes');
  console.log('3. Vérifiez que l\'extension est activée dans le popup');
}

console.log('\n%c🐙 Fin du diagnostic', 'color: #06b6d4; font-size: 16px;');
console.log('%c═══════════════════════════════════════', 'color: #60a5fa;');
