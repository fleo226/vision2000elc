# 🌍 VISION 2000 ELC — Site officiel

> **Votre partenaire linguistique pour un monde sans frontières.**
> Centre de formation en anglais, traduction professionnelle et interprétation de conférence à Ouagadougou, Burkina Faso. **+20 ans d'expertise humaine.**

Site one-page moderne, optimisé pour la conversion et le SEO local, construit avec **Next.js 16**, **TypeScript**, **Tailwind CSS 4** et **shadcn/ui**.

---

## 🚀 Déploiement rapide sur Vercel

### Option A — Via GitHub (recommandé, déploiements automatiques)

1. **Pousser le code sur GitHub** (depuis votre machine locale après avoir cloné ce projet) :

   ```bash
   # Si pas encore fait, configurez votre identité Git
   git config --global user.name "fleo226"
   git config --global user.email "votre-email@exemple.com"

   # Créez le repo sur GitHub (depuis le site) puis :
   git remote add origin https://github.com/fleo226/vision2000elc.git
   git branch -M main
   git push -u origin main
   ```

2. **Connecter le repo à Vercel** :
   - Allez sur https://vercel.com/new
   - Sélectionnez le repo `fleo226/vision2000elc`
   - Vercel détecte automatiquement Next.js — **aucune config à modifier**
   - Cliquez sur **Deploy**
   - 🎉 Votre site est en ligne sur `https://vision2000elc.vercel.app` (ou un sous-domaine personnalisé)

3. **Déploiements automatiques** : chaque `git push` sur `main` reconstruit et publie le site.

### Option B — Via Vercel CLI (déploiement direct sans GitHub)

```bash
# 1. Se connecter à Vercel (une seule fois)
vercel login

# 2. Premier déploiement (crée le projet sur Vercel)
vercel

# 3. Déploiement en production
vercel --prod
```

---

## 💻 Lancement en local

```bash
# Installer les dépendances
bun install

# Lancer le serveur de développement
bun run dev
# → http://localhost:3000

# Lint
bun run lint

# Build de production
bun run build
```

---

## 🎨 Stack technique

| Outil | Rôle |
|-------|------|
| **Next.js 16** (App Router) | Framework React full-stack |
| **TypeScript 5** | Typage statique |
| **Tailwind CSS 4** | Styling utilitaire |
| **shadcn/ui** (New York) | Composants UI accessibles |
| **Framer Motion** | Animations |
| **Lucide React** | Icônes |
| **Vercel** | Hébergement & déploiement |

---

## 📐 Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout racine (métadonnées SEO, polices)
│   ├── page.tsx            # Page unique assemblant toutes les sections
│   └── globals.css         # Thème global (palette, utilitaires)
├── components/
│   ├── site/               # Sections du site
│   │   ├── header.tsx          # Navigation sticky + menu mobile
│   │   ├── hero.tsx            # Bannière principale + CTAs
│   │   ├── trust-bar.tsx       # Bandeau clients (ONG, banques, etc.)
│   │   ├── services.tsx        # 4 pôles de services
│   │   ├── about.tsx           # Histoire, vision, mission, valeurs
│   │   ├── why-human.tsx       # Section anti-IA "Humain vs IA"
│   │   ├── formations.tsx      # Catalogue par onglets + formats
│   │   ├── translation.tsx     # Service traduction + formulaire devis
│   │   ├── interpretation.tsx  # Modes + domaines d'intervention
│   │   ├── stats.tsx           # Compteurs animés (réalisations)
│   │   ├── testimonials.tsx    # Carrousel de témoignages
│   │   ├── blog.tsx            # Aperçu articles de blog
│   │   ├── faq.tsx             # Accordéon FAQ
│   │   ├── contact.tsx         # Formulaire + coordonnées + WhatsApp
│   │   ├── footer.tsx          # Footer complet + newsletter
│   │   └── floating-actions.tsx # Bouton WhatsApp flottant + back-to-top
│   └── ui/                 # Composants shadcn/ui
└── lib/                    # Utilitaires (cn, db, etc.)
public/
└── logo.jpeg               # Logo VISION 2000 ELC
```

---

## 🎯 Stratégie marketing & psychologique

Le site est conçu pour **convertir les visiteurs en clients** et se positionner contre les outils d'IA (Google Translate, ChatGPT) qui menacent le secteur :

### Leviers psychologiques activés
- **Preuve sociale** : "+20 ans", "1M+ mots traduits", "Centaines de pros formés", témoignages clients
- **Autorité** : référence aux institutions, ministères, ONG internationales
- **Confiance** : badges "100% Humain", "Confidentialité garantie", "Certifié"
- **Urgence** : "Service Express 24-48h", "Réponse sous 2h ouvrées"
- **Différenciation anti-IA** : section dédiée "Humain vs IA" avec tableau comparatif
- **Réduction de risque** : devis gratuit, sans engagement, NDA disponible
- **Ancrage local** : Ouagadougou, Burkina Faso, Afrique de l'Ouest, Koulouba

### Optimisations SEO
- Métadonnées complètes (title, description, OpenGraph, Twitter Cards)
- Mots-clés ciblés : formation anglais Ouagadougou, traduction Burkina Faso, interprétation conférence
- Structure sémantique HTML5 (header, main, section, footer)
- Lang="fr" + alternates hreflang FR/EN
- robots.txt optimisé
- URLs uniques par section (#accueil, #services, #formations, etc.)

---

## 📞 Coordonnées intégrées

- 📍 **Adresse** : Koulouba, Ouagadougou, Burkina Faso
- 📞 **Téléphone** : +226 70 46 26 70
- 📧 **Email** : contact@vision2000elc.com
- 🌐 **Site** : www.vision2000elc.com
- 💬 **WhatsApp** : [wa.me/22670462670](https://wa.me/22670462670)

---

## 🛠️ Personnalisation

### Changer les couleurs
Éditez les variables CSS dans `src/app/globals.css` :
```css
:root {
  --orange: #F97316;     /* Couleur CTA principale */
  --navy: #0B1F3A;       /* Couleur de fond sombre */
  --crimson: #DC2626;    /* Accents urgents */
  --emerald: #10B981;    /* Validation / WhatsApp */
}
```

### Modifier le contenu
Chaque section est isolée dans `src/components/site/`. Modifiez directement les tableaux de données en haut de chaque fichier (SERVICES, PROGRAMS, TESTIMONIALS, FAQS, etc.).

### Ajouter un vrai backend de formulaire
Les formulaires affichent actuellement une toast de confirmation. Pour brancher un vrai backend :
1. Créez une route API dans `src/app/api/contact/route.ts`
2. Utilisez Resend, SendGrid ou un webhook Zapier/Make pour envoyer les emails
3. Remplacez la simulation `setTimeout` par un `fetch('/api/contact', ...)`

---

## 📄 Licence

© 2026 VISION 2000 ELC. Tous droits réservés.

Conçu avec expertise à Ouagadougou, Burkina Faso. 🇧🇫
