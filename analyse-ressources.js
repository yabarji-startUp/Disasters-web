#!/usr/bin/env node

/**
 * Script d'analyse des ressources pour optimiser le KPI "Ressources"
 * EcoTraining Platform - RGESN 1.1
 */

// Script à exécuter dans la console du navigateur
const script = `
console.log('🔍 Analyse des ressources - EcoTraining Platform');

// Récupérer toutes les ressources
const resources = performance.getEntriesByType('resource');
console.log('📊 Total des ressources:', resources.length);

// Analyser par type
const byType = {};
const byDomain = {};
const bySize = [];

resources.forEach(resource => {
  // Par type
  const type = resource.initiatorType || 'other';
  byType[type] = (byType[type] || 0) + 1;
  
  // Par domaine
  const domain = new URL(resource.name).hostname;
  byDomain[domain] = (byDomain[domain] || 0) + 1;
  
  // Par taille
  bySize.push({
    name: resource.name,
    size: resource.transferSize || 0,
    type: type,
    domain: domain
  });
});

console.log('📈 Répartition par type:');
Object.entries(byType).forEach(([type, count]) => {
  console.log(\`  \${type}: \${count} ressources\`);
});

console.log('🌐 Répartition par domaine:');
Object.entries(byDomain).forEach(([domain, count]) => {
  console.log(\`  \${domain}: \${count} ressources\`);
});

console.log('📦 Top 10 des plus grosses ressources:');
bySize
  .sort((a, b) => b.size - a.size)
  .slice(0, 10)
  .forEach((resource, index) => {
    console.log(\`  \${index + 1}. \${resource.name} (\${(resource.size / 1024).toFixed(1)} kB - \${resource.type})\`);
  });

console.log('🎯 Recommandations RGESN:');
console.log('  - RGESN 1.1: Supprimer les ressources inutiles');
console.log('  - RGESN 1.2: Optimiser les scripts JavaScript');
console.log('  - RGESN 1.3: Optimiser les styles CSS');
console.log('  - RGESN 2.1: Optimiser les images');
console.log('  - RGESN 3.1: Mettre en cache les ressources statiques');
`;

console.log('📋 Script d\'analyse des ressources :');
console.log('Copiez et collez ce script dans la console du navigateur (F12) :');
console.log('');
console.log(script);
console.log('');
console.log('🔧 Instructions :');
console.log('1. Ouvrez la page http://localhost:3000');
console.log('2. Appuyez sur F12 pour ouvrir les DevTools');
console.log('3. Allez dans l\'onglet Console');
console.log('4. Collez le script ci-dessus et appuyez sur Entrée');
console.log('5. Analysez les résultats pour identifier les optimisations possibles'); 