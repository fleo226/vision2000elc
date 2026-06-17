'use client'

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { SectionHeading } from "./services"

const FAQS = [
  {
    q: "Pourquoi payer un traducteur humain alors que Google Translate est gratuit ?",
    a: "Google Translate et autres IA sont utiles pour des textes courts et non critiques. Mais pour vos documents officiels (contrats, dossiers administratifs, rapports bailleurs), l'IA présente trois risques majeurs : (1) vos données peuvent être stockées et utilisées pour entraîner leurs modèles, (2) la traduction n'a aucune valeur juridique et peut contenir des erreurs subtiles mais coûteuses, (3) les nuances culturelles et contextuelles sont perdues. Notre service vous garantit confidentialité, valeur juridique et qualité révisée par un second linguiste.",
  },
  {
    q: "Combien coûte une traduction professionnelle ?",
    a: "Le tarif dépend du type de document, du nombre de mots, du délai et de la spécialisation requise. À titre indicatif : comptez entre 80 et 150 FCFA par mot pour une traduction standard, et un supplément pour le service Express (24-48h) ou les documents très techniques (juridique, médical). Nous envoyons toujours un devis gratuit et détaillé sous 2h ouvrées avant de démarrer la mission.",
  },
  {
    q: "Quels délais pour une traduction ?",
    a: "Pour un délai standard, comptez environ 2 000 mots par jour et par linguiste. Pour les urgences, notre service Express permet une livraison sous 24 à 48h selon le volume. Nous pouvons également mobiliser plusieurs linguistes en parallèle pour les gros volumes. Le délai précis est toujours confirmé dans le devis.",
  },
  {
    q: "Vos traductions sont-elles certifiées ?",
    a: "Oui. Nous fournissons des traductions certifiées conformes, accompagnées d'un engagement de qualité signé, tamponnées et datées. Ces traductions sont acceptées par les administrations burkinabè, les ambassades, les tribunaux et les institutions internationales. Pour les traductions assermentées requises par certains pays, nous vous orientons vers nos partenaires agréés.",
  },
  {
    q: "Quels sont les niveaux et formats de formation en anglais ?",
    a: "Nous proposons trois niveaux d'anglais général (Débutant A1-A2, Intermédiaire B1-B2, Avancé C1-C2), des modules d'anglais professionnel (Administration, Finance, Commerce, ONG), et la préparation aux certifications internationales (TOEIC, TOEFL, IELTS). Quatre formats sont disponibles : cours en groupe (max 12), cours particuliers, formation en entreprise (dans vos locaux) et formation en ligne via Zoom/Teams.",
  },
  {
    q: "Combien de temps pour voir des progrès en anglais ?",
    a: "Avec une assiduité de 4 à 6 heures par semaine, un apprenant débutant atteint un niveau intermédiaire fonctionnel en 4 à 6 mois. Pour une préparation TOEIC ciblée, comptez 2 à 3 mois. La clé de la réussite : régularité, pratique orale et immersion. Nos formateurs vous accompagnent avec un plan personnalisé et des points d'étape réguliers.",
  },
  {
    q: "Comment réserver un interprète pour un événement ?",
    a: "Contactez-nous au moins 2 semaines avant l'événement pour garantir la disponibilité. Nous analysons votre besoin (thématique, durée, nombre de participants, lieu) et vous envoyons une proposition incluant l'interprète, le matériel technique (cabines, casques, micros) et la coordination logistique. Pour les événements de plus d'1h30, deux interprètes par cabine sont nécessaires (rotation toutes les 30 min).",
  },
  {
    q: "Garantissez-vous la confidentialité de mes documents ?",
    a: "Absolument. La confidentialité est l'un de nos piliers. Tous nos linguistes signent un accord de confidentialité. Vos documents ne sont jamais partagés avec des tiers ni envoyés à des services d'IA publique. Un NDA (accord de non-divulgation) spécifique peut être signé sur demande pour les missions sensibles. Nous pouvons également travailler sur vos serveurs sécurisés si nécessaire.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-cream">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Vos questions, <span className="gradient-text-orange">nos réponses</span></>}
          intro="Vous hésitez encore ? Voici les questions les plus fréquentes que nous posent nos clients avant de nous confier une mission. Si la vôtre n'y figure pas, contactez-nous directement."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-xl shadow-soft border border-navy/8 px-5 sm:px-6 [&[data-state=open]]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 group">
                  <div className="flex items-start gap-3 pr-4">
                    <div className="w-7 h-7 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0 mt-0.5 group-data-[state=open]:bg-orange group-data-[state=open]:text-white transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-display font-semibold text-navy text-[15px] sm:text-base leading-snug">
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-navy-soft/80 leading-relaxed pb-5 pl-10 pr-2 text-sm sm:text-[15px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
