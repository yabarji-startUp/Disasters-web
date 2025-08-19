# 🚀 Guide de Déploiement sur Render

## 📋 Configuration Requise

### 1. **Secrets GitHub Actions**

Configurez les secrets suivants dans votre repository GitHub (`Settings > Secrets and variables > Actions`) :

```bash
RENDER_SERVICE_ID=your-render-service-id
RENDER_API_KEY=your-render-api-key
RENDER_URL=https://your-app-name.onrender.com
```

### 2. **Service Render**

Créez un service web sur Render avec les paramètres suivants :

- **Type :** Web Service
- **Environment :** Node
- **Build Command :** `npm ci && npm run build`
- **Start Command :** `npm start`
- **Health Check Path :** `/api/server`

## 🔧 Configuration Automatique

### Pipeline GitHub Actions

Le pipeline `.github/workflows/deploy-render.yml` s'exécute automatiquement :

- **Sur push** vers `main` ou `develop`
- **Sur pull request** vers `main`
- **Manuellement** via `workflow_dispatch`

### Étapes du Pipeline

1. **Test et Build**
   - Installation des dépendances
   - Linting du code
   - Build de l'application
   - Vérification de la taille du bundle

2. **Déploiement**
   - Déclenchement du déploiement via API Render
   - Vérification de la connectivité
   - Tests des endpoints

3. **Vérification Éco-conception**
   - Analyse EcoIndex sur l'application déployée
   - Vérification du score de performance
   - Génération de rapport

## 🌱 Optimisations Éco-conception

### Build Optimisé

- **Tree Shaking** : Élimination du code inutilisé
- **Code Splitting** : Séparation des chunks
- **Minification** : Compression CSS/JS
- **Compression** : Gzip/Brotli activée

### Monitoring

- **EcoIndex Score** : Objectif > 85/100
- **Bundle Size** : Surveillance de la taille
- **Performance** : Tests automatisés

## 📊 Métriques de Déploiement

### KPIs Techniques
- **Temps de build** : < 5 minutes
- **Taille du bundle** : < 500KB
- **Temps de déploiement** : < 10 minutes

### KPIs Environnementaux
- **Score EcoIndex** : > 85/100
- **Éléments DOM** : < 800
- **Requêtes HTTP** : < 15
- **Taille totale** : < 500KB

## 🔍 Vérification Post-Déploiement

### Tests Automatiques
```bash
# Vérification de l'API
curl https://your-app.onrender.com/api/server

# Vérification de la page principale
curl https://your-app.onrender.com

# Test EcoIndex
ecoindex-cli https://your-app.onrender.com
```

### Tests Manuels
1. **Page d'accueil** : Chargement rapide
2. **Visualisation** : Données affichées correctement
3. **Performance** : Temps de réponse < 2s
4. **Responsive** : Adaptation mobile/desktop

## 🛠️ Dépannage

### Erreurs Courantes

#### Build Failed
```bash
# Vérifier les dépendances
npm ci
npm run build
```

#### Déploiement Failed
```bash
# Vérifier les logs Render
# Vérifier les variables d'environnement
# Vérifier la configuration du service
```

#### EcoIndex Low Score
```bash
# Optimiser les images
# Réduire les requêtes HTTP
# Optimiser le JavaScript
# Améliorer le cache
```

## 📈 Amélioration Continue

### Optimisations Recommandées
1. **Images** : Format WebP, lazy loading
2. **Cache** : Headers optimisés
3. **Code** : Tree shaking, minification
4. **Réseau** : Compression, CDN

### Monitoring Continu
- **Lighthouse** : Audit de performance
- **EcoIndex** : Score environnemental
- **Bundle Analyzer** : Analyse du code
- **Real User Monitoring** : Métriques utilisateurs

---

*Ce guide garantit un déploiement éco-responsable et performant sur Render.* 🌱 