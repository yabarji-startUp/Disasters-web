# 🎯 Cartographie des contraintes projet

## 📋 Contexte du projet
**Service numérique** : Plateforme de formation à l'optimisation web et l'éco-conception  
**Objectif** : Définir une stratégie d'implémentation responsable pour une fonctionnalité numérique existante

---

## 🔒 Contraintes techniques

### 🏗️ **Architecture**
- **Frontend** : React + TypeScript + Vite (imposé)
- **Backend** : Express.js (imposé)
- **Base de données** : Aucune (données statiques)
- **Déploiement** : GitHub Actions (imposé)

### 📦 **Dépendances imposées**
- **Three.js** : Rendu 3D lourd (20 objets animés)
- **Lodash** : Bibliothèque utilitaire
- **Moment.js** : Gestion des dates
- **Bootstrap** : Framework CSS
- **Recharts/Victory** : Graphiques

### 🎯 **Fonctionnalités obligatoires**
- Dashboard de monitoring temps réel
- Métriques de performance
- Rendu 3D avec Three.js
- API de données volumineuses

---

## ⏰ Contraintes temporelles

### 📅 **Planning**
- **J7** : Présentation orale (pitch 10 min max)
- **Délai** : 6 mois pour le plan d'action
- **Sprints** : À définir selon la roadmap

### 🚀 **Phases de développement**
1. **Phase 1** : Mesure (✅ Terminée)
2. **Phase 2** : Diagnostic (✅ Terminée)
3. **Phase 3** : Optimisation (🔄 En cours)

---

## 💰 Contraintes budgétaires

### 💸 **Coûts directs**
- **Hébergement** : GitHub Pages (gratuit)
- **Outils** : ecoindex-cli (gratuit)
- **Monitoring** : Lighthouse (gratuit)

### 💡 **Coûts indirects**
- **Temps de développement** : 6 mois
- **Formation équipe** : Bonnes pratiques éco-conception
- **Maintenance** : Optimisations continues

---

## 🌍 Contraintes environnementales

### 📊 **Objectifs EcoIndex**
- **Actuel** : Grade E ou F (volontairement mauvais)
- **Cible** : Grade A ou B (après optimisation)
- **Méthode** : ecoindex-cli + GitHub Actions

### 🎯 **KPIs environnementaux**
- **Taille bundle** : < 512KB (actuel ~2-3MB)
- **Poids page** : < 1MB (actuel ~10MB)
- **Objets DOM** : < 1000 (actuel ~2000)
- **Ressources** : < 50 (actuel ~100)

---

## 👥 Contraintes humaines

### 🎓 **Équipe**
- **Développeur principal** : Vous
- **Expertise** : React, TypeScript, éco-conception
- **Formation** : En cours sur les bonnes pratiques

### 🤝 **Stakeholders**
- **Formateur** : Évaluation via checklist
- **Utilisateurs finaux** : Étudiants en formation
- **GitHub** : Contrôle qualité via Actions

---

## 📋 Contraintes qualité

### ✅ **Standards imposés**
- **Git** : Commits clairs et traçables
- **Code** : ESLint + TypeScript
- **Performance** : Lighthouse audit
- **Accessibilité** : WCAG AA

### 🚫 **Restrictions**
- **IA** : Interdite dans les commits (.husky)
- **Optimisation prématurée** : App doit rester "mauvaise" pour l'entraînement
- **Fonctionnalités** : Pas de nouvelles features pendant l'optimisation

---

## 🔧 Contraintes techniques spécifiques

### 🖼️ **Images**
- **Format** : JPG imposé (6.9MB)
- **Optimisation** : WebP possible
- **Responsive** : Non implémenté

### 📊 **Données**
- **Format** : JSON statique
- **Taille** : 9.1KB (volontairement volumineux)
- **Compression** : Non appliquée

### ⚡ **Performance**
- **Cache** : Désactivé (`maxAge: 0`)
- **Compression** : Gzip activé
- **Minification** : Non appliquée

---

## 🎯 Contraintes pédagogiques

### 📚 **Objectifs d'apprentissage**
- **Éco-conception** : Comprendre l'impact environnemental
- **Optimisation** : Identifier et corriger les problèmes
- **Mesure** : Utiliser les outils de monitoring
- **Documentation** : Traçabilité des choix

### 📖 **Livrables obligatoires**
1. Cartographie des contraintes projet
2. Slides de plan d'action sur 6 mois
3. Fichier excel d'analyse EcoIndex
4. Backlog.md (minimum 3 user stories)
5. Lien vers le dépôt Git

---

## 🚀 Contraintes d'innovation

### 💡 **Opportunités**
- **Nouvelles technologies** : WebP, Web Workers, Service Workers
- **Bonnes pratiques RGESN** : 
  - RGESN 1.1 - Réduire la taille des ressources
  - RGESN 1.2 - Optimiser le code JavaScript
  - RGESN 1.3 - Supprimer le CSS inutilisé
  - RGESN 2.1 - Optimiser les images
  - RGESN 2.2 - Optimiser les ressources graphiques
  - RGESN 3.1 - Mettre en cache les ressources statiques
  - RGESN 3.2 - Mettre en cache intelligemment
  - RGESN 4.1 - Compresser et paginer les données
  - RGESN 5.1 - Concevoir de manière adaptative
  - RGESN 6.3 - Respecter les contrastes
- **Outils** : ecoindex-cli, Lighthouse CI

### 🔄 **Évolutions possibles**
- **PWA** : Progressive Web App
- **SSR** : Server-Side Rendering
- **Micro-frontends** : Architecture modulaire

---

*Cartographie générée le : $(date)* 