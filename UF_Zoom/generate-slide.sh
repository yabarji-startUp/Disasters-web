#!/bin/bash
echo "🎯 Génération de la présentation 02-slides-plan-action-6mois.md..."

# Vérifier si Marp CLI est installé
if ! command -v marp &> /dev/null; then
    echo "❌ Marp CLI n'est pas installé. Installation..."
    npm install -g @marp-team/marp-cli
fi

# Vérifier si le thème existe
if [ ! -f "../Themes/yas-eco-red.css" ]; then
    echo "❌ Le thème yas-eco-red.css n'existe pas dans Themes/"
    exit 1
fi

# Vérifier si le fichier de présentation existe
if [ ! -f "02-slides-plan-action-6mois.md" ]; then
    echo "❌ Le fichier 02-slides-plan-action-6mois.md n'existe pas"
    exit 1
fi

# Créer le dossier de sortie
mkdir -p output

echo "📄 Génération de 02-slides-plan-action-6mois.md..."

# HTML
echo "  📄 HTML..."
marp "02-slides-plan-action-6mois.md" \
    --theme-set ../Themes/yas-eco-red.css \
    --html \
    --output "output/02-slides-plan-action-6mois.html"

# PDF
echo "  📄 PDF..."
marp "02-slides-plan-action-6mois.md" \
    --theme-set ../Themes/yas-eco-red.css \
    --pdf \
    --allow-local-files \
    --output "output/02-slides-plan-action-6mois.pdf"

# PowerPoint
echo "  📄 PPTX..."
marp "02-slides-plan-action-6mois.md" \
    --theme-set ../Themes/yas-eco-red.css \
    --pptx \
    --allow-local-files \
    --output "output/02-slides-plan-action-6mois.pptx"

echo ""
echo "✅ Présentation 02-slides-plan-action-6mois.md générée avec succès !"
echo "📁 Fichiers créés dans le dossier 'output/' :"
ls -la output/ | grep -E '02-slides-plan-action-6mois\.(html|pdf|pptx)$' | awk '{print "   - " $9}'

# Ouvrir la présentation HTML
if [ -f "output/02-slides-plan-action-6mois.html" ]; then
    echo "🌐 Ouverture de la présentation..."
    if command -v xdg-open &> /dev/null; then
        xdg-open output/02-slides-plan-action-6mois.html
    elif command -v open &> /dev/null; then
        open output/02-slides-plan-action-6mois.html
    else
        echo "💡 Ouvrez manuellement : output/02-slides-plan-action-6mois.html"
    fi
fi 