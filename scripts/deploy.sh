#!/usr/bin/env bash
# =============================================================================
# VISION 2000 ELC — Script de déploiement Vercel
# =============================================================================
# Usage:
#   ./deploy.sh           # Déploiement preview (URL temporaire)
#   ./deploy.sh --prod    # Déploiement production
# =============================================================================

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "🌍 VISION 2000 ELC — Déploiement Vercel"
echo "=========================================="

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
  echo "⚠️  Vercel CLI non trouvé. Installation..."
  npm install -g vercel
fi

# Vérifier la connexion
if ! vercel whoami &> /dev/null; then
  echo "🔐 Vous devez vous connecter à Vercel :"
  vercel login
fi

echo ""
echo "📦 Vérification du build local..."
bun run lint || { echo "❌ Lint échoué. Corrigez les erreurs avant de déployer."; exit 1; }

echo ""
if [[ "$1" == "--prod" ]]; then
  echo "🚀 Déploiement en PRODUCTION..."
  vercel --prod
  echo ""
  echo "✅ Site déployé en production !"
else
  echo "🚀 Déploiement PREVIEW..."
  vercel
  echo ""
  echo "✅ Déploiement preview créé !"
  echo "💡 Pour déployer en production : ./deploy.sh --prod"
fi

echo ""
echo "📋 Prochaines étapes :"
echo "  1. Vérifiez l'URL fournie par Vercel"
echo "  2. Configurez votre domaine personnalisé (vision2000elc.com) dans le dashboard Vercel"
echo "  3. Activez Vercel Analytics pour suivre le trafic"
