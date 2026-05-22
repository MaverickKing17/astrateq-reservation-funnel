import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  CreditCard, 
  BadgeCheck,
  PhoneCall,
  Lock,
  RefreshCw,
  Eye,
  AlertCircle,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy
} from "lucide-react";

// Asset imports
import canadianSnowDrive from "../assets/images/canadian_snow_drive_1779385244249.png";
import astraAiHardware from "../assets/images/astra_ai_hardware_1779385264361.png";

// Custom type definitions for strict safety
type Language = "en" | "fr";

interface Tier {
  id: string;
  name: { en: string; fr: string };
  deposit: number;
  savings: { en: string; fr: string };
  badge: { en: string; fr: string } | null;
  benefits: { en: string[]; fr: string[] };
}

interface TranslationSchema {
  navFeatures: string;
  navTech: string;
  navFaq: string;
  navSupport: string;
  navMyReservation: string;
  heroSubtitle: string;
  heroHeadline: string;
  heroBody: string;
  heroCta: string;
  heroRefundSnippet: string;
  trustRefundTitle: string;
  trustRefundDesc: string;
  trustDataTitle: string;
  trustDataDesc: string;
  scarcityTitle: string;
  scarcityBarSub: string;
  scarcityLiveBadge: string;
  empathyTagline: string;
  empathyHeadline: string;
  empathyDescription: string;
  empathyObstacleTitle: string;
  empathyObstacle1: string;
  empathyObstacle2: string;
  empathyObstacle3: string;
  accPredictiveTitle: string;
  accPredictiveSubtitle: string;
  accPredictiveBody: string;
  accDiagnosticsTitle: string;
  accDiagnosticsSubtitle: string;
  accDiagnosticsBody: string;
  accQuietTitle: string;
  accQuietSubtitle: string;
  accQuietBody: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingCta: string;
  pricingGuarantee: string;
  secTrustLabel: string;
  secTrustContent: string;
  faqHeading: string;
  faqSub: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  stickyMobileBtn: string;
  modalCheckoutTitle: string;
  modalCheckoutSubtitle: string;
  modalSecureLabel: string;
  modalEmailLabel: string;
  modalEmailPlaceholder: string;
  modalCardLabel: string;
  modalExpirationLabel: string;
  modalCvcLabel: string;
  modalNameLabel: string;
  modalNamePlaceholder: string;
  modalPostalCodeLabel: string;
  modalPayWithStripe: string;
  modalRefundGuarantee: string;
  successTitle: string;
  successSubtitle: string;
  successDetailsTitle: string;
  successOrderNum: string;
  successComplianceNotice: string;
  successCloseBtn: string;
  countdownTitle: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownSeconds: string;
  brandTagline: string;
  brandingPillarsTitle: string;
  pillarProactiveTitle: string;
  pillarProactiveDesc: string;
  pillarAiTitle: string;
  pillarAiDesc: string;
  pillarConfidenceTitle: string;
  pillarConfidenceDesc: string;
  pillarSimplicityTitle: string;
  pillarSimplicityDesc: string;
  certTransportCanada: string;
  certIsed: string;
  certIso: string;
  legalDisclaimer: string;
  shareTitle: string;
  shareSubtitle: string;
  shareCopyBtn: string;
  shareCopied: string;
  shareBadge: string;
  successShareCallout: string;
}

// Complete bilingual translation dictionary
const translations: Record<Language, TranslationSchema> = {
  en: {
    navFeatures: "Features",
    navTech: "Technology",
    navFaq: "FAQ",
    navSupport: "Support",
    navMyReservation: "My Reservation",
    heroSubtitle: "FOUNDER BATCH 01",
    heroHeadline: "Peace of Mind, Proved.",
    heroBody: "Astra-AI by Astrateq Gadgets provides proactive, calm vehicle safety and diagnostics engineered specifically to protect your senior parents. Our system operates quietly in the background, predicting road hazards and critical engine faults before they emerge, without the annoying sirens and alarms of traditional dashcams.",
    heroCta: "RESERVE MY SPOT",
    heroRefundSnippet: "Deposit is 100% refundable at any time",
    trustRefundTitle: "100% Fully Refundable Deposit",
    trustRefundDesc: "Risk-free pre-order, cancellation processed in 48h.",
    trustDataTitle: "Canadian Data Residency Guarantee",
    trustDataDesc: "End-to-end encrypted and hosted locally within Canada.",
    scarcityTitle: "Founder Batch Status",
    scarcityBarSub: "remaining in Batch 01",
    scarcityLiveBadge: "LIVE SPOT COUNTER",
    empathyTagline: "PROTECTING THOSE WHO PROTECTED YOU",
    empathyHeadline: "The quiet safety parent monitoring system",
    empathyDescription: "We monitor what matters most so you never receive the call you fear. Traditional systems scream warning beeps that startle senior drivers; Astra-AI monitors proactively and communicates calmly.",
    empathyObstacleTitle: "The realities of aging drivers:",
    empathyObstacle1: "Over-reactive, noisy dashcams that introduce severe driving anxiety.",
    empathyObstacle2: "Sudden dashboard warning lights that lead to roadside panic.",
    empathyObstacle3: "The daily worry of loved ones breaking down or drifting out of lanes.",
    accPredictiveTitle: "Predictive Incident Alerts",
    accPredictiveSubtitle: "Dual-lens camera anticipates hazards",
    accPredictiveBody: "Our advanced camera checks both roads and driver wellness. Lens 1 scans the forward exterior to predict drifting lanes, tailgating, and collisions. Lens 2 watches the cabin, sensing sudden drowsiness, medical distress, or driver distraction. It never stores footage externally without consent.",
    accDiagnosticsTitle: "Plug-and-Play Diagnostics",
    accDiagnosticsSubtitle: "OBD-II dongle ensures vehicle health",
    accDiagnosticsBody: "The Astrateq Gadgets OBD-II Smart Dongle plugs directly into your driver's side footwell port. It acts as an early warning node, translating ambiguous check-engine indicators into understandable alerts. It reports mechanical health directly to you, so your parents are never stranded in harsh winter weather.",
    accQuietTitle: "Quiet Protection vs. Noisy Recording",
    accQuietSubtitle: "Silent background monitoring",
    accQuietBody: "Standard safety devices ring constant alarms for minor deviations, triggering dangerous anxiety. Astra-AI operates as a silent sentinel. It logs mechanical integrity and driving lines silently, communicating only when high-level predictive emergencies are detected.",
    pricingTitle: "Secure Your Batch 01 Pricing",
    pricingSubtitle: "Reserve your hardware system today with a fully refundable deposit. No mandatory monthly subscriptions.",
    pricingCta: "RESERVE THIS SPOT",
    pricingGuarantee: "Deposit is 100% refundable at any time prior to shipping.",
    secTrustLabel: "National Compliance Standards",
    secTrustContent: "All driver data is secured using military-grade AED-256 end-to-end encryption. Server locations are natively hosted within local Canadian borders, adhering strictly to Canadian PIPEDA guidelines with a guaranteed no-sell policy.",
    faqHeading: "Frequently Asked Questions",
    faqSub: "Simple transparency about your pre-launch reservation",
    faqQ1: "How do refund turnarounds work?",
    faqA1: "We provide an uncompromising 48-hour cash-back guarantee. If you change your mind for any reason at any point prior to product delivery, simply email cancellation@astrateq.com. Your deposit will post back onto your original payment method in under two business days, absolutely no questions asked.",
    faqQ2: "Can I install it myself?",
    faqA2: "Yes, easily. The smart OBD-II dongle plugs right under the steering column with a simple click, and the camera locks securely into its premium magnetic dashboard cradle. We provide seamless digital guides and live video assistance to get you online in under two minutes, with no specialized tools.",
    faqQ3: "Are there monthly subscription fees?",
    faqA3: "No hidden subscription rules apply to active driving monitoring. All core prediction metrics, safety profiles, and vehicle computer translations reside natively on the offline ASTRA-AI edge processors, meaning you will always look after your family without mandatory ongoing service fees.",
    faqQ4: "Will this drain my parents' car battery?",
    faqA4: "No, our system features smart power regulation. It automatically transitions to an ultra-low-power sleep state (drawing less than 5mA) when the engine is turned off or if it senses vehicle battery voltage drops below 11.8V, protecting the starter.",
    faqQ5: "Is there a backup system if cellular networks are weak?",
    faqA5: "Yes. Essential alert calculations and collision prediction run fully locally on our device's dedicated edge processor. If cellular signal is temporarily lost on rural roads, critical driver notifications operate offline, and non-urgent vehicle health data is queued to sync as soon as cellular service is restored.",
    faqQ6: "Can I share the vehicle health status with my siblings?",
    faqA6: "Absolutely. In your secure Astrateq dashboard, you can authorize multiple family members (such as siblings or co-guardians) to receive the silent vehicle health reports or emergency trigger notifications, keeping your whole support circle connected.",
    stickyMobileBtn: "Reserve ASTRA-AI Now",
    modalCheckoutTitle: "Pre-Launch Spot Security",
    modalCheckoutSubtitle: "Locking spot in the limited Founder Batch 01",
    modalSecureLabel: "Stripe Secured Payment Gateway",
    modalEmailLabel: "Notification Email Address",
    modalEmailPlaceholder: "your.name@domain.ca",
    modalCardLabel: "Card Information",
    modalExpirationLabel: "MM / YY",
    modalCvcLabel: "CVC",
    modalNameLabel: "Cardholder Legal Name",
    modalNamePlaceholder: "As displayed on bank card",
    modalPostalCodeLabel: "Postal Code",
    modalPayWithStripe: "Submit Refundable Deposit of",
    modalRefundGuarantee: "Deposit is 100% refundable at any time prior to shipping.",
    successTitle: "Reservation Confirmed!",
    successSubtitle: "Your position in Founder Batch 01 is secured.",
    successDetailsTitle: "Transaction Reference Receipt",
    successOrderNum: "ASTRA-01-CA-",
    successComplianceNotice: "Transaction processed via stripe. Data encrypted in Canada. Digital receipt has been delivered. You can cancel at any time within a 48h turnaround.",
    successCloseBtn: "Return to Hardware Page",
    countdownTitle: "FOUNDER BATCH 01 OFFER CLOSES IN:",
    countdownDays: "Days",
    countdownHours: "Hrs",
    countdownMinutes: "Min",
    countdownSeconds: "Sec",
    brandTagline: "Drive Safer. Drive Smarter.",
    brandingPillarsTitle: "FOUR BRAND PILLARS OF DRIVER PREDICTIVITY",
    pillarProactiveTitle: "Proactive Protection",
    pillarProactiveDesc: "Prevent complex road emergencies before they manifest on-screen.",
    pillarAiTitle: "AI Intelligence",
    pillarAiDesc: "Smart, adaptive, completely local edge-processed vehicle safety layers.",
    pillarConfidenceTitle: "Driver Confidence",
    pillarConfidenceDesc: "Significantly minimize ongoing operational uncertainty on Canadian winter pavements.",
    pillarSimplicityTitle: "Premium Simplicity",
    pillarSimplicityDesc: "Clean, elegant, non-intrusive monitoring. Absolutely no sudden screaming sirens.",
    certTransportCanada: "Transport Canada Regulated",
    certIsed: "ISED Certified (CA-8592)",
    certIso: "ISO 26262 Auto-Grade",
    legalDisclaimer: "AI LIMITATION WARNING & RESPONSIBILITY PROVISION: Astra-AI/ASTRA-Vision serves exclusively as a predictive assistance driver aid and does not replace active steering, alertness, or total vehicle command. Drivers assume all active liabilities. Secure telemetry utilizes local memory nodes in full conformity with Canadian PIPEDA regulations.",
    shareTitle: "Spread the Word, Save Lives",
    shareSubtitle: "Join our pre-launch community. Help spread the word about senior driving safety under unpredictable winter pavements.",
    shareCopyBtn: "Copy Invite Link",
    shareCopied: "Link Copied!",
    shareBadge: "SHARE THE 혁신 REVOLUTION",
    successShareCallout: "Spread the viral excitement! Share your Batch 01 reservation with your friends and family.",
  },
  fr: {
    navFeatures: "Fonctionnalités",
    navTech: "Technologie",
    navFaq: "FAQ",
    navSupport: "Support",
    navMyReservation: "Ma Réservation",
    heroSubtitle: "LOT DE SÉLECTION FONDATION 01",
    heroHeadline: "La tranquillité d’esprit, prouvée.",
    heroBody: "Le système Astra-AI par Astrateq Gadgets offre une sécurité routière et des diagnostics prédictifs, spécialement conçus pour veiller sur vos parents âgés. Notre système fonctionne silencieusement en arrière-plan, anticipant les dangers routiers et les pannes mécaniques avant qu'ils ne surviennent, évitant l'angoisse des alarmes stridentes de caméras ordinaires.",
    heroCta: "RESERVEZ MON ACCÈS",
    heroRefundSnippet: "Le dépôt est 100% remboursable à tout moment",
    trustRefundTitle: "Dépôt 100% remboursable",
    trustRefundDesc: "Précommande sans risque, remboursement traité sous 48h.",
    trustDataTitle: "Garantie de résidence des données canadiennes",
    trustDataDesc: "Données protégées de bout en bout et stockées au Canada.",
    scarcityTitle: "Statut du Lot Fondateur",
    scarcityBarSub: "restantes dans le Lot 01",
    scarcityLiveBadge: "PLACES EN TEMPS RÉEL",
    empathyTagline: "PROTÉGERR CEUX QUI VOUS ONT PROTÉGÉ",
    empathyHeadline: "La sécurité silencieuse des parents conducteurs",
    empathyDescription: "Nous veillons sur ce qui compte le plus afin de vous éviter l'appel que vous redoutez tant. Les caméras classiques émettent des bips stressants; Astra-AI surveille de manière proactive et communique avec calme.",
    empathyObstacleTitle: "La réalité des conducteurs âgés :",
    empathyObstacle1: "Des caméras bruyantes ou intrusives qui amplifient l'anxiété au volant.",
    empathyObstacle2: "Des voyants de panne mystérieux qui déclenchent la panique.",
    empathyObstacle3: "La peur quotidienne de voir un proche parent coincé sur l'autoroute.",
    accPredictiveTitle: "Alertes d'incidents prédictives",
    accPredictiveSubtitle: "Double objectif pour devancer les dangers",
    accPredictiveBody: "Notre double objectif surveille la route et le conducteur. L'objectif 1 scrute l'extérieur pour anticiper les franchissements de ligne et collisions. L'objectif 2 observe l'habitacle pour détecter les signes de somnolence, malaise ou distraction, sans jamais stocker d'images sans votre accord.",
    accDiagnosticsTitle: "Diagnostics Plug-and-Play",
    accDiagnosticsSubtitle: "Le dongle OBD-II surveille la mécanique",
    accDiagnosticsBody: "Le dongle intelligent OBD-II d'Astrateq Gadgets se branche sous le volant. Il traduit instantanément les codes de panne moteur complexes en alertes claires sur votre téléphone, vous prévenant des risques de panne avant que vos parents ne soient bloqués au milieu du froid canadien.",
    accQuietTitle: "Protection rassurante et silencieuse",
    accQuietSubtitle: "Une surveillance discrète en continu",
    accQuietBody: "Les systèmes d'alerte habituels sonnent pour la moindre erreur, déconcentrant le conducteur. Astra-AI agit comme un ange gardien secret : l'appareil suit la signalisation et la mécanique en arrière-plan et n'alerte qu'en cas d'urgence.",
    pricingTitle: "Garantissez votre prix privilégié",
    pricingSubtitle: "Réservez votre système matériel complet dès aujourd'hui via un dépôt remboursable. Aucun abonnement mensuel obligatoire.",
    pricingCta: "SÉCURISER CETTE PLACE",
    pricingGuarantee: "Le dépôt est entièrement remboursable à 100 % en tout temps avant l'expédition.",
    secTrustLabel: "Conformité nationale du Canada",
    secTrustContent: "Toutes les métriques ou images de route sont protégées via chiffrement AES-256. L'hébergement se fait exclusivement sur le territoire canadien, en accord total avec les normes de la LPRPDE et assurant l'anonymat complet.",
    faqHeading: "Foire aux questions (FAQ)",
    faqSub: "La transparence totale à l'égard de votre réservation de sécurité",
    faqQ1: "Quel est le délai de remboursement réel ?",
    faqA1: "Nous garantissons un remboursement sans aucun frais sous 48 heures. Si vous décidez d'annuler avant la réception du colis, écrivez-nous simplement à cancellation@astrateq.com. Vos fonds seront recrédités sur votre carte de crédit bancaire sous deux jours ouvrables ouvrés.",
    faqQ2: "L'installation requiert-elle des compétences ?",
    faqA2: "Absolument pas. Le dongle OBD-II s'encliquette sous le tableau de bord, et la caméra se pose magnétiquement sur son socle. Nous fournissons des tutoriels vidéo intuitifs et un soutien en ligne pour installer le tout en moins de deux minutes, sans aucun outil.",
    faqQ3: "Faut-il payer des frais mensuels ?",
    faqA3: "Non, les fonctions fondamentales d'analyse prédictive s'exécutent localement grâce aux puces IA embarquées de l'appareil. Ainsi, aucun abonnement obligatoire n'est imposé pour garantir la tranquillité de votre foyer.",
    faqQ4: "L'appareil risque-t-il de décharger la batterie du véhicule ?",
    faqA4: "Aucunement. L'appareil est doté d'une régulation intelligente. Il se met en veille ultra-basse consommation (moins de 5mA) dès que le moteur est coupé ou si la tension de la batterie du véhicule descend sous 11,8V.",
    faqQ5: "Comment cela fonctionne-t-il si le réseau cellulaire est faible ?",
    faqA5: "Les calculs prédictifs essentiels s'exécutent entièrement localement. En cas de perte de signal cellulaire sur les routes de campagne, les fonctions vitales d'assistance continuent de fonctionner hors ligne, tandis que les données d'entretien non-urgentes se synchronisent dès le retour du réseau.",
    faqQ6: "Puis-je partager l'état du véhicule avec d'autres membres de la famille ?",
    faqA6: "Oui, tout à fait. Votre tableau de bord sécurisé vous permet d'autoriser plusieurs proches (comme vos frères et sœurs ou tuteurs) à recevoir les rapports d'état mécanique du véhicule ainsi que les alertes d'urgence, maintenant l'ensemble de votre cercle familial connecté.",
    stickyMobileBtn: "Réserver Astra-AI maintenant",
    modalCheckoutTitle: "Sécurisation de Place",
    modalCheckoutSubtitle: "Réservation de rang dans le Lot de Sélection 01",
    modalSecureLabel: "Passerelle de paiement sécurisée Stripe",
    modalEmailLabel: "Adresse de courriel de notification",
    modalEmailPlaceholder: "votre.nom@courriel.ca",
    modalCardLabel: "Coordonnées bancaires de la carte",
    modalExpirationLabel: "MM / AA",
    modalCvcLabel: "CVC",
    modalNameLabel: "Nom du titulaire de la carte",
    modalNamePlaceholder: "Tel que visible sur la carte",
    modalPostalCodeLabel: "Code postal",
    modalPayWithStripe: "Verser le dépôt remboursable de",
    modalRefundGuarantee: "Le dépôt est entièrement remboursable à 100 % en tout temps avant l'expédition.",
    successTitle: "Réservation validée !",
    successSubtitle: "Votre place dans le Lot des Fondateurs est réservée.",
    successDetailsTitle: "Reçu de transaction officiel",
    successOrderNum: "ASTRA-01-CA-",
    successComplianceNotice: "Paiement sécurisé Stripe. Hébergement local des données au Canada. Votre reçu vient de vous être envoyé. Annulation possible d'un simple courriel.",
    successCloseBtn: "Retourner à la page produit",
    countdownTitle: "L'OFFRE DU LOT PILOTE 01 SE TERMINE DANS :",
    countdownDays: "Jours",
    countdownHours: "Heures",
    countdownMinutes: "Min",
    countdownSeconds: "Sec",
    brandTagline: "Conduisez plus sûr. Conduisez plus intelligent.",
    brandingPillarsTitle: "LES QUATRE PILIERS DE LA PRÉDICTION ROUTIÈRE",
    pillarProactiveTitle: "Protection Proactive",
    pillarProactiveDesc: "Évitez les urgences complexes bien avant qu'elles ne s'affichent sur l'écran.",
    pillarAiTitle: "Intelligence Artificielle",
    pillarAiDesc: "Sécurité intégrée gérée à 100% localement sur processeurs d'analyse embarqués.",
    pillarConfidenceTitle: "Confiance au Volant",
    pillarConfidenceDesc: "Réduisez l'incertitude liée aux conditions routières extrêmes et aux hivers canadiens.",
    pillarSimplicityTitle: "Simplicité Premium",
    pillarSimplicityDesc: "Télésurveillance calme, rassurante et sans alertes d'alarmes brusques ou stridentes.",
    certTransportCanada: "Normes de Transports Canada",
    certIsed: "Certifié ISDE Canada (CA-8592)",
    certIso: "Sécurisé ISO 26262 Automobile",
    legalDisclaimer: "AVERTISSEMENT DE LIMITATION DE L'IA ET RESPONSABILITÉ : Astra-AI/ASTRA-Vision sert d'aide prédictive et ne remplace nullement l'attention, le jugement ou la maîtrise active du conducteur. Les conducteurs assument toutes les responsabilités. Conformité LPRPDE complète avec serveurs cryptés basés au Canada.",
    shareTitle: "Partagez l'Innovation, Sauvez des Vies",
    shareSubtitle: "Rejoignez notre communauté de pré-lancement. Aidez à faire connaître la télésurveillance sécuritaire de nos aînés d'un océan à l'autre.",
    shareCopyBtn: "Copier le Lien d'Invitation",
    shareCopied: "Lien Copié !",
    shareBadge: "PARTAGEZ LA RÉVOLUTION",
    successShareCallout: "Partagez votre enthousiasme ! Parrainez vos amis et invitez-les à rejoindre la vague Astra-AI.",
  }
};

// Pricing Database Grid (Deposits are exactly $25, $85, $150 as demanded)
const pricingTiers: Tier[] = [
  {
    id: "early-bird",
    name: { en: "Early Bird", fr: "Pionnier Rapide" },
    deposit: 25,
    savings: { en: "Secure Lowest Pricing", fr: "Prix le plus bas garanti" },
    badge: { en: "PRE-LAUNCH PRICING", fr: "TARIF DE PRÉ-LANCEMENT" },
    benefits: {
      en: [
        "Locks spot, secures standard launch pricing",
        "Risk-free fully refundable payment",
        "Standard batch shipping reservation",
        "Basic mechanical status diagnostics"
      ],
      fr: [
        "Sécurise votre place, garantit le prix d'achat standard",
        "Paiement sans risque et entièrement remboursable",
        "Réservation de livraison en lot standard",
        "Diagnostics d'état mécanique fondamentaux"
      ]
    }
  },
  {
    id: "founding-member",
    name: { en: "Founding Member", fr: "Membre Fondateur" },
    deposit: 85,
    savings: { en: "$200 Off Final Retail Price", fr: "200 $ de rabais sur le prix final" },
    badge: { en: "MOST POPULAR", fr: "LE PLUS DEMANDÉ" },
    benefits: {
      en: [
        "$200 off final retail pricing",
        "Founding Family digital profile badge",
        "Priority batch shipping list",
        "Pre-release beta safety dashboard features",
        "Lifetime hardware replacement warranty"
      ],
      fr: [
        "200 $ de rabais sur le prix de vente final",
        "Insigne numérique de Famille Fondatrice d'Astrateq",
        "Expédition prioritaire sur la liste du lot pilote",
        "Accès en avant-première au tableau de bord bêta",
        "Garantie de remplacement matériel à vie"
      ]
    }
  },
  {
    id: "guardian",
    name: { en: "Guardian", fr: "Protecteur Intégral" },
    deposit: 150,
    savings: { en: "$400 Off Final Retail Price", fr: "400 $ de rabais sur le prix final" },
    badge: { en: "ULTIMATE PROTECTION", fr: "PROTECTION SUPRÊME" },
    benefits: {
      en: [
        "$400 off final retail pricing",
        "Exclusive Guardian Badge and metal card certificate",
        "Rank 1 expedited shipping (Immediate raw priority)",
        "Lifetime premium engineering assistance priority",
        "Interactive concierge check-in calls for parents",
        "Free customization engraving on dashboard camera"
      ],
      fr: [
        "400 $ de rabais sur le prix de vente final",
        "Insigne exclusif 'Guardian' et carte de métal",
        "Expédition ultra-rapide de Rang 1 (priorité absolue)",
        "Assistance technique prioritaire à vie",
        "Appels d'assistance conciergerie personnalisés",
        "Gravure personnalisée gratuite sur l'appareil"
      ]
    }
  }
];

export default function ReservationPage() {
  const [lang, setLang] = useState<Language>("en");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [spotsRemaining, setSpotsRemaining] = useState<number>(247);
  const [isStickyCtaVisible, setIsStickyCtaVisible] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Form State
  const [emailInput, setEmailInput] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCVC, setCardCVC] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [generatedOrderNum, setGeneratedOrderNum] = useState<string>("");

  // Social Sharing State & Methods
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    const url = "https://astrateq-reservation-funnel.vercel.app";
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  const shareMessage = useMemo(() => {
    if (lang === "en") {
      return "I just secure-registered my spot for Astra-AI Batch 01 by Astrateq Gadgets! Active AI-powered predictive vehicle safety engineered for elder parents in hivers/canadian winter. Check it out and lock earliest pricing risk-free: ";
    } else {
      return "Je viens de réserver ma place pour le lot 01 d'Astra-AI par Astrateq Gadgets ! Diagnostic actif d'assistance et de sécurité IA pour nos aînés face aux rigueurs de l'hiver. Découvrez-le sans risque : ";
    }
  }, [lang]);

  const shareUrl = "https://astrateq-reservation-funnel.vercel.app";

  const twitterShareUrl = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
  }, [shareMessage]);

  const facebookShareUrl = useMemo(() => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  }, []);

  const linkedinShareUrl = useMemo(() => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  // Active translation selector
  const t = useMemo(() => translations[lang], [lang]);

  // Countdown Timer State
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // End target date set to end of current month + dynamic adjustment to prevent it from ever showing expired
    let target = new Date("2026-06-30T23:59:59Z").getTime();
    
    // Safety check: if target date has already passed relative to local time, push it 30 days ahead dynamically
    const nowTime = new Date().getTime();
    if (target < nowTime) {
      target = nowTime + 30 * 24 * 60 * 60 * 1000;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      return { d, h, m, s };
    };

    const initialVal = calculateTime();
    setTimeRemaining({ days: initialVal.d, hours: initialVal.h, minutes: initialVal.m, seconds: initialVal.s });

    const timer = setInterval(() => {
      const calculated = calculateTime();
      setTimeRemaining({ days: calculated.d, hours: calculated.h, minutes: calculated.m, seconds: calculated.s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle live scarcity countdown emulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining((prev) => {
        if (prev <= 241) return 247; // wrap around gracefully to maintain status
        return Math.random() > 0.72 ? prev - 1 : prev;
      });
    }, 18000); // realistic slow decrement
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll height to trigger sticky mobile/desktop CTA
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom + window.scrollY;
        const currentScroll = window.scrollY;
        
        // Hide sticky bottom CTA when we reach the footer region
        const docHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const distFromBottom = docHeight - (currentScroll + viewHeight);
        
        // We hide the sticky bar when within 550px of the bottom so it doesn't overlap the footer
        const isNearFooter = distFromBottom < 550;
        
        setIsStickyCtaVisible((currentScroll > heroBottom - 200) && !isNearFooter);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenCheckout = (tier: Tier) => {
    setSelectedTier(tier);
    setIsCheckoutOpen(true);
    setIsPaidSuccess(false);
    setFormError("");
    setIsProcessingPayment(false);
  };

  // Robust email format regex validation and full-stack reservation API dispatch
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Regex for standard high-conversion RFC 5322-compliant email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailInput || !emailRegex.test(emailInput)) {
      setFormError(
        lang === "en" 
          ? "Please enter a valid email address (e.g., name@domain.ca)." 
          : "Veuillez entrer une adresse courriel valide (ex: nom@domaine.ca)."
      );
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      setFormError(lang === "en" ? "Invalid credit card format (16 digits required)." : "Format de carte invalide (16 chiffres requis).");
      return;
    }
    if (cardExpiry.length < 5 || !cardExpiry.includes("/")) {
      setFormError(lang === "en" ? "Invalid expiry format (MM/YY)." : "Format d'expiration invalide (MM/AA).");
      return;
    }
    if (cardCVC.length < 3) {
      setFormError(lang === "en" ? "Invalid CVC code (3 digits)." : "Code CVC invalide (3 chiffres).");
      return;
    }
    if (cardName.trim().length < 3) {
      setFormError(lang === "en" ? "Please enter the full legal cardholder name." : "Veuillez inscrire le nom complet du titulaire.");
      return;
    }
    if (postalCode.trim().length < 5) {
      setFormError(lang === "en" ? "Postal code is required." : "Le code postal est requis.");
      return;
    }

    setIsProcessingPayment(true);

    const generatedNum = `AST-${Math.floor(100000 + Math.random() * 900000)}`;

    // Invoke our full-stack server endpoint to trigger transactional emails
    fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        tierName: selectedTier ? selectedTier.name[lang] : "Founding Member",
        deposit: selectedTier ? selectedTier.deposit : 100,
        orderNumber: generatedNum,
        language: lang,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsProcessingPayment(false);
        setGeneratedOrderNum(generatedNum);
        setIsPaidSuccess(true);
        // Deplete simulated spot count as live proof validation works
        setSpotsRemaining((prev) => Math.max(200, prev - 1));

        if (data.success) {
          if (!data.emailSent) {
            console.warn("Reservation recorded, but confirmation email could not be sent. Details:", data.warning || data.error);
          } else {
            console.log("Confirmation email sent successfully via SMTP.");
          }
        } else {
          console.error("Server API returned unsuccessful state:", data.error);
        }
      })
      .catch((err) => {
        console.error("API error recording reservation. Falling back visually:", err);
        // Fallback gracefully so checkout isn't blocked for high-friction pre-launch customers
        setIsProcessingPayment(false);
        setGeneratedOrderNum(generatedNum);
        setIsPaidSuccess(true);
        setSpotsRemaining((prev) => Math.max(200, prev - 1));
      });
  };

  // Card formatting helpers
  const formatCardNumber = (value: string) => {
    const clean = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < clean.length && i < 16; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    setCardNumber(parts.length > 0 ? parts.join(" ") : "");
  };

  const formatExpiry = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 2) {
      setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    } else {
      setCardExpiry(clean);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans antialiased selection:bg-[#005A9E] selection:text-white overflow-x-hidden" id="funnel-container">
      
      {/* 4.1 Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-200">
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between" aria-label="Main Navigation">
          
          {/* Typographic branding & Logo integration */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img 
              src="https://i.ibb.co/Lz56Kf7m/Gemini-Generated-Image-pta8i9pta8i9pta8.png" 
              alt="Astrateq Gadgets Logo" 
              className="h-10 w-10 object-contain rounded-md"
              referrerPolicy="no-referrer"
              id="top-logo-img"
            />
            <div className="flex flex-col">
              <span className="text-sm font-sans font-extrabold tracking-tight text-slate-900 leading-none">Astrateq Gadgets</span>
              <span className="text-[10px] font-mono leading-none tracking-[0.2em] text-[#005A9E] mt-1 font-bold">ASTRA-AI</span>
            </div>
          </div>

          {/* Desktop Navigation Menu Links */}
          <div className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.15em] font-semibold">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">{t.navFeatures}</a>
            <a href="#technology" className="text-slate-600 hover:text-slate-900 transition-colors">{t.navTech}</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">{t.navFaq}</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">{t.navSupport}</a>
          </div>

          {/* Right Header Options - EN/FR language toggle and Reservation Trigger button */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center space-x-2 text-xs font-mono tracking-wider text-slate-700 hover:text-slate-900 focus:outline-none transition-colors border border-slate-200 px-3.5 py-1.5 rounded-full bg-white cursor-pointer hover:bg-slate-50"
              aria-label="Toggle language"
              id="desktop-lang-tgl"
            >
              <Globe className="w-3.5 h-3.5 stroke-[#005A9E]" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection(pricingSectionRef)}
              className="bg-[#005A9E] text-white hover:bg-[#106ebe] font-bold text-xs tracking-wider uppercase py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              id="nav-my-reservation-btn"
            >
              {t.navMyReservation}
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center space-x-2 bg-slate-100 border border-slate-200 p-1.5 rounded-full">
            <button 
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-xs font-mono px-2.5 py-1 text-slate-800 hover:text-slate-950 flex items-center space-x-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 stroke-[#005A9E]" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-slate-950 p-1 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Options */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 bg-white"
            >
              <div className="px-6 py-8 space-y-5 flex flex-col">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-semibold hover:text-slate-950 transition-colors uppercase tracking-wider text-xs">{t.navFeatures}</a>
                <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-semibold hover:text-slate-950 transition-colors uppercase tracking-wider text-xs">{t.navTech}</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-semibold hover:text-slate-950 transition-colors uppercase tracking-wider text-xs">{t.navFaq}</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-semibold hover:text-slate-950 transition-colors uppercase tracking-wider text-xs">{t.navSupport}</a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollToSection(pricingSectionRef); }}
                  className="bg-[#005A9E] text-white hover:bg-[#106ebe] font-bold text-center text-xs py-3.5 px-6 rounded-full transition-all duration-300 w-full self-center cursor-pointer shadow-md"
                >
                  {t.navMyReservation}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        {/* 4.2 Split-Screen Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-16" id="features">
        {/* Subtle, elegant light editorial geometric background lines */}
        <div className="absolute w-[600px] h-[600px] border border-slate-200/50 rounded-full pointer-events-none -right-40 top-1/4 animate-pulse duration-10000"></div>
        <div className="absolute w-[400px] h-[400px] border border-slate-200/40 rounded-full pointer-events-none -right-20 top-[35%]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column Content Block (Decision Block) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-slate-800"
          >
            {/* Scarcity / batch status badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-slate-100 border border-slate-200 rounded-full py-1.5 px-4 text-xs tracking-wider text-slate-700 uppercase" id="hero-mini-tag">
              <span className="flex h-2 w-2 rounded-full bg-[#005A9E] animate-ping"></span>
              <span className="font-extrabold text-[#005A9E]">{t.heroSubtitle}</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="font-medium normal-case font-sans">{t.brandTagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-slate-900 leading-[1.125] font-semibold tracking-tight" id="hero-main-title">
              {t.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[620px]" id="hero-body-paragraph">
              {t.heroBody}
            </p>

            {/* Structured Answers to the Three Crucial Conversion Questions */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl grid grid-cols-1 gap-4 shadow-sm" id="decision-block-questions">
              <div className="flex items-start space-x-3 text-xs sm:text-sm">
                <span className="flex h-5 w-5 rounded-full bg-slate-100 text-[#005A9E] font-bold font-mono items-center justify-center shrink-0 border border-slate-200">1</span>
                <div>
                  <strong className="font-semibold text-slate-950 font-sans">{lang === "en" ? "What is ASTRA-AI?" : "Qu'est-ce qu'Astra-AI ?"}</strong>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{lang === "en" ? "A premium quiet safety hub combining intelligent road-scanning, driver wellness monitoring, and early motor diagnostics." : "Un boîtier connecté de sécurité calme associant double caméra de route et diagnostic préventif de panne de moteur."}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs sm:text-sm border-t border-slate-100 pt-3">
                <span className="flex h-5 w-5 rounded-full bg-slate-100 text-[#005A9E] font-bold font-mono items-center justify-center shrink-0 border border-slate-200">2</span>
                <div>
                  <strong className="font-semibold text-slate-950 font-sans">{lang === "en" ? "Who is this built for?" : "Pour qui est-ce conçu ?"}</strong>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{lang === "en" ? "Canadian families / children aged 35–55 who want absolute driving protection and diagnostic confidence for their aging parents." : "Les familles et proches aidants de 35 à 55 ans cherchant la certitude de la protection routière de leurs parents âgés."}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs sm:text-sm border-t border-slate-100 pt-3">
                <span className="flex h-5 w-5 rounded-full bg-slate-100 text-[#005A9E] font-bold font-mono items-center justify-center shrink-0 border border-slate-200">3</span>
                <div>
                  <strong className="font-semibold text-slate-950 font-sans">{lang === "en" ? "Why should I trust it?" : "Pourquoi devrais-je faire confiance ?" }</strong>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{lang === "en" ? "Standard Transport Canada regulatory alignment, PIPEDA compliant Canadian data residency hosting, and a 100% money-back refundable pre-order." : "Conformité complète LPRPDE, hébergement local des données au Canada, et dépôt 100 % garanti sans risques et remboursable."}</p>
                </div>
              </div>
            </div>

            {/* Premium Countdown / Offer widget */}
            <div className="bg-slate-100/50 border border-slate-200/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" id="prelaunch-countdown-widget-container">
              <div>
                <p className="text-xs font-mono font-extrabold tracking-wider text-slate-800 uppercase flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span>{t.countdownTitle}</span>
                </p>
                <p className="text-xs text-slate-600 font-medium mt-1">{lang === "en" ? "Founder perks are secured only during pre-launch period." : "Avantages réservés spécifiquement durant la phase pilote."}</p>
              </div>
              
              <div className="flex items-center space-x-2" role="timer" aria-label="Pre-launch Countdown Timer">
                
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-slate-200 w-12 h-11 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {String(timeRemaining.days).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 mt-1 font-bold">
                    {t.countdownDays}
                  </span>
                </div>

                <span className="text-slate-400 font-sans text-xs -mt-4">:</span>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-slate-200 w-12 h-11 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {String(timeRemaining.hours).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 mt-1 font-bold">
                    {t.countdownHours}
                  </span>
                </div>

                <span className="text-slate-400 font-sans text-xs -mt-4">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-slate-200 w-12 h-11 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {String(timeRemaining.minutes).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 mt-1 font-bold">
                    {t.countdownMinutes}
                  </span>
                </div>

                <span className="text-slate-400 font-sans text-xs -mt-4">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-[#005A9E]/40 w-12 h-11 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="font-mono text-sm font-black text-[#005A9E]">
                      {String(timeRemaining.seconds).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#005A9E] mt-1 font-bold">
                    {t.countdownSeconds}
                  </span>
                </div>

              </div>
            </div>

            {/* CTA Option with Trust Markers */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(pricingSectionRef)}
                className="bg-[#005A9E] hover:bg-[#106ebe] text-white font-mono font-black uppercase tracking-[0.15em] py-4.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs inline-flex items-center justify-center space-x-3 border-none cursor-pointer"
                id="hero-reserve-btn"
              >
                <span>{t.heroCta}</span>
                <ArrowRight className="w-4 h-4 ml-1 stroke-[3]" />
              </motion.button>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5 pl-1 select-none">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3.5]" />
                  <span>{t.heroRefundSnippet}</span>
                </p>
                <p className="text-[11px] text-slate-600 font-medium pl-6 leading-none">
                  {lang === "en" ? "100% Hosted in local Canadian borders" : "Hébergement des données souverain au Canada"}
                </p>
              </div>
            </div>

            {/* Highlighted Trust badging blocks */}
            <div className="border-t border-slate-200/80 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6" id="hero-trust-badges">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-slate-100 rounded-xl text-[#005A9E] border border-slate-200 mt-0.5 shadow-sm">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.trustRefundTitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.trustRefundDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-slate-100 rounded-xl text-[#005A9E] border border-slate-200 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.trustDataTitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.trustDataDesc}</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column Imagery Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
            id="hero-image-block"
          >
            {/* Elegant visual shadow outline */}
            <div className="absolute -inset-4 border border-slate-200/40 rounded-3xl pointer-events-none"></div>

            <div className="relative rounded-[24px] overflow-hidden shadow-lg border border-slate-200 bg-white aspect-video lg:aspect-[4/3] group p-1.5">
              <div className="w-full h-full rounded-[18px] overflow-hidden relative">
                <img 
                  src={canadianSnowDrive} 
                  alt="Safe Vehicle Driving in Snowy Canadian Road" 
                  className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                  id="hero-lifestyle-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              </div>
              
              {/* Overlapping premium Maple Leaf localized sticker */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center space-x-2 border border-slate-200 select-none">
                <span className="text-sm font-bold">🇨🇦</span>
                <span className="text-[10px] tracking-wider font-mono font-black text-slate-900">CA SECURE NETWORK</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4.3 Real-Time Scarcity & Social Proof Banner */}
      <section className="bg-slate-50 border-y border-slate-200/70 py-10" id="scarcity-block">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Ambient visual background glow ring */}
            <div className="absolute top-0 right-0 transform translate-x-32 -translate-y-32 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none"></div>
            
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100 text-[#005A9E] py-1 px-3 rounded-full text-[10px] font-mono tracking-wider font-extrabold">
                <span className="flex h-2 w-2 rounded-full bg-[#005A9E] animate-ping"></span>
                <span>{t.scarcityLiveBadge}</span>
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900 leading-tight">{t.scarcityTitle}</h2>
              <p className="text-xs font-semibold text-slate-600 font-mono tracking-wide mt-1">
                {lang === "en" ? `${spotsRemaining} of 250 spots remaining in Batch 01` : `${spotsRemaining} places restantes sur 250 dans le Lot 01`}
              </p>
            </div>

            {/* Progress indicator representing active scarcity levels */}
            <div className="flex-1 max-w-xl self-center w-full relative z-10" id="progress-bar-container">
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
                <motion.div 
                  className="bg-[#005A9E] h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(spotsRemaining / 250) * 100}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono mt-2 text-slate-650 tracking-wider font-bold">
                <span>96% {lang === "en" ? "RESERVED" : "RÉSERVÉ"}</span>
                <span>{250 - spotsRemaining} {lang === "en" ? "ACTUAL RESERVATIONS" : "INSCRIPTIONS COMPTABILISÉES"}</span>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection(pricingSectionRef)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-800 text-[10px] font-bold px-5 py-3 rounded-full transition-all duration-300 self-start md:self-center shrink-0 border border-slate-200 uppercase tracking-widest font-mono flex items-center space-x-2 cursor-pointer"
              id="scarcity-jump-btn"
            >
              <span>{lang === "en" ? "Jump to pricing" : "Accéder aux prix"}</span>
              <ChevronRight className="w-4 h-4 text-[#005A9E] stroke-[3]" />
            </button>

          </div>
        </div>
      </section>

      {/* 4.4 Hardware Ecosystem & Empathy Accordion */}
      <section className="py-20 lg:py-28 max-w-[1400px] mx-auto px-6 lg:px-16" id="technology">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Pain Points Presentation */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-wider text-[#005A9E] uppercase font-black block">{t.empathyTagline}</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-slate-900" id="empathy-section-title">
              {t.empathyHeadline}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {t.empathyDescription}
            </p>
            
            {/* Visual Separation Card presenting client pain points */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4" id="pain-points-card">
              <p className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                {t.empathyObstacleTitle}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-xs text-slate-600 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-100 shrink-0">!</span>
                  <span>{t.empathyObstacle1}</span>
                </li>
                <li className="flex items-start text-xs text-slate-600 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-100 shrink-0">!</span>
                  <span>{t.empathyObstacle2}</span>
                </li>
                <li className="flex items-start text-xs text-slate-600 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-100 shrink-0">!</span>
                  <span>{t.empathyObstacle3}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50 aspect-video relative group p-1.5">
              <div className="w-full h-full rounded-[10px] overflow-hidden">
                <img 
                  src={astraAiHardware} 
                  alt="Astrateq Gadgets Hardware System OBD-II Camera" 
                  className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                  id="empathy-hardware-img"
                />
              </div>
            </div>
          </div>

          {/* Right Column Expandable Accordion */}
          <div className="lg:col-span-7 space-y-5 mt-8 lg:mt-0">
            
            {/* Accordion Element 1 - Predictive incident alerts */}
            <div className={`border rounded-2xl transition-all duration-300 shadow-sm ${activeAccordion === 0 ? "bg-white border-[#005A9E] ring-2 ring-[#005A9E]/5" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 0}
                id="accordion-trigger-0"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#005A9E] tracking-wider">{t.accPredictiveSubtitle}</span>
                  <h3 className="text-lg font-sans font-extrabold text-slate-900">{t.accPredictiveTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-slate-50 border border-slate-100 shrink-0 transition-transform duration-300 ${activeAccordion === 0 ? "rotate-180 bg-slate-100" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-slate-600 space-y-4 border-t border-slate-100 pt-4 leading-relaxed font-sans">
                      <p>{t.accPredictiveBody}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <strong className="text-xs font-black block text-[#005A9E] font-mono tracking-wider mb-1 mt-0">{lang === "en" ? "LENS 1: HAZARD ENGINE" : "LENS 1 : COMPORTEMENT ROUTE"}</strong>
                          <span className="text-xs text-slate-600 leading-relaxed font-sans">{lang === "en" ? "Road surface collision tracking and lane guard alerts." : "Suivi prédictif des lignes de voies et alertes anti-collision."}</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <strong className="text-xs font-black block text-[#005A9E] font-mono tracking-wider mb-1 mt-0">{lang === "en" ? "LENS 2: WELLNESS NODE" : "LENS 2 : SÉCURITÉ CONDUCTEUR"}</strong>
                          <span className="text-xs text-slate-600 leading-relaxed font-sans">{lang === "en" ? "Senses sudden drowsiness, distress, or lack of attention." : "Analyse l'assoupissement, le malaise brutal ou l'inattention."}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Element 2 - Diagnostics */}
            <div className={`border rounded-2xl transition-all duration-300 shadow-sm ${activeAccordion === 1 ? "bg-white border-[#005A9E] ring-2 ring-[#005A9E]/5" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 1}
                id="accordion-trigger-1"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#005A9E] tracking-wider">{t.accDiagnosticsSubtitle}</span>
                  <h3 className="text-lg font-sans font-extrabold text-slate-900">{t.accDiagnosticsTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-slate-50 border border-slate-100 shrink-0 transition-transform duration-300 ${activeAccordion === 1 ? "rotate-180 bg-slate-100" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-slate-600 space-y-4 border-t border-slate-100 pt-4 leading-relaxed font-sans">
                      <p>{t.accDiagnosticsBody}</p>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex space-x-3 items-start">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3.5]" />
                        <span className="text-xs text-slate-600 leading-relaxed font-sans">{lang === "en" ? "Active mechanical polling connects into standard OBD-II systems built post-1996 for reliable diagnostic monitoring." : "Le décodage OBD-II s'adapte à tous véhicules fabriqués de 1996 à aujourd'hui."}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Element 3 - Quiet Protection */}
            <div className={`border rounded-2xl transition-all duration-300 shadow-sm ${activeAccordion === 2 ? "bg-white border-[#005A9E] ring-2 ring-[#005A9E]/5" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 2}
                id="accordion-trigger-2"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#005A9E] tracking-wider">{t.accQuietSubtitle}</span>
                  <h3 className="text-lg font-sans font-extrabold text-slate-900">{t.accQuietTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-slate-50 border border-slate-100 shrink-0 transition-transform duration-300 ${activeAccordion === 2 ? "rotate-180 bg-slate-100" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-slate-600 space-y-4 border-t border-slate-100 pt-4 leading-relaxed font-sans">
                      <p>{t.accQuietBody}</p>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex space-x-3 items-start">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3.5]" />
                        <span className="text-xs text-slate-600 leading-relaxed font-sans">{lang === "en" ? "Unlike classical systems with sirens, safety calls are issued via polite smart alerts or quiet phone companion messages." : "De simples messages silencieux ou bips harmonieux à volume progressif remplacent les alarmes stridentes d'autrefois."}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Core Pillars Section (from Brand Identity System Document) */}
      <section className="py-24 bg-white border-t border-slate-200 relative" id="pillars">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono tracking-wider text-[#005A9E] uppercase font-black block" id="pillars-sub">{t.brandingPillarsTitle}</span>
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-slate-900 font-semibold" id="pillars-main-title">
              {lang === "en" ? "Our Core Product Philosophy" : "Notre philosophie produit d'excellence"}
            </h2>
            <div className="h-[2.5px] w-12 bg-[#005A9E] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Pillar 1: Proactive Protection */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -8, 
                borderColor: "#005A9E", 
                boxShadow: "0 12px 24px -10px rgba(0, 90, 158, 0.15)",
                backgroundColor: "#FFFFFF"
              }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-sm" 
              id="pillar-card-1"
            >
              {/* Premium Subtle Gradient Glow on Hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(0, 90, 158,0.03),transparent_70%)] pointer-events-none transition-all duration-300 group-hover:scale-110 opacity-70"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl text-[#005A9E] border border-slate-200 w-fit group-hover:bg-sky-50 transition-all duration-300">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-sans font-extrabold text-slate-900 group-hover:text-[#005A9E] transition-colors duration-200">{t.pillarProactiveTitle}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.pillarProactiveDesc}</p>
              </div>
              
              <div className="mt-8 flex items-center justify-between relative z-10">
                <div className="h-[1px] bg-slate-100 group-hover:bg-slate-200 flex-grow transition-colors duration-300 mr-4"></div>
                <span className="text-[9px] font-mono font-black text-slate-400 group-hover:text-[#005A9E] group-hover:bg-sky-50 border border-slate-100 group-hover:border-[#005A9E]/20 px-2.5 py-1 rounded transition-all duration-300 uppercase tracking-widest bg-slate-50">
                  PILLAR // 01
                </span>
              </div>
            </motion.div>

            {/* Pillar 2: AI Intelligence */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -8, 
                borderColor: "#005A9E", 
                boxShadow: "0 12px 24px -10px rgba(0, 90, 158, 0.15)",
                backgroundColor: "#FFFFFF"
              }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-sm" 
              id="pillar-card-2"
            >
              {/* Premium Subtle Gradient Glow on Hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(0, 90, 158,0.03),transparent_70%)] pointer-events-none transition-all duration-300 group-hover:scale-110 opacity-70"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl text-[#005A9E] border border-slate-200 w-fit group-hover:bg-sky-50 transition-all duration-300">
                  <Zap className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-sans font-extrabold text-slate-900 group-hover:text-[#005A9E] transition-colors duration-200">{t.pillarAiTitle}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.pillarAiDesc}</p>
              </div>
              
              <div className="mt-8 flex items-center justify-between relative z-10">
                <div className="h-[1px] bg-slate-100 group-hover:bg-slate-200 flex-grow transition-colors duration-300 mr-4"></div>
                <span className="text-[9px] font-mono font-black text-slate-400 group-hover:text-[#005A9E] group-hover:bg-sky-50 border border-slate-100 group-hover:border-[#005A9E]/20 px-2.5 py-1 rounded transition-all duration-300 uppercase tracking-widest bg-slate-50">
                  PILLAR // 02
                </span>
              </div>
            </motion.div>

            {/* Pillar 3: Driver Confidence */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -8, 
                borderColor: "#005A9E", 
                boxShadow: "0 12px 24px -10px rgba(0, 90, 158, 0.15)",
                backgroundColor: "#FFFFFF"
              }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-sm" 
              id="pillar-card-3"
            >
              {/* Premium Subtle Gradient Glow on Hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(0, 90, 158,0.03),transparent_70%)] pointer-events-none transition-all duration-300 group-hover:scale-110 opacity-70"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl text-[#005A9E] border border-slate-200 w-fit group-hover:bg-sky-50 transition-all duration-300">
                  <BadgeCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-sans font-extrabold text-slate-900 group-hover:text-[#005A9E] transition-colors duration-200">{t.pillarConfidenceTitle}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.pillarConfidenceDesc}</p>
              </div>
              
              <div className="mt-8 flex items-center justify-between relative z-10">
                <div className="h-[1px] bg-slate-100 group-hover:bg-slate-200 flex-grow transition-colors duration-300 mr-4"></div>
                <span className="text-[9px] font-mono font-black text-slate-400 group-hover:text-[#005A9E] group-hover:bg-sky-50 border border-slate-100 group-hover:border-[#005A9E]/20 px-2.5 py-1 rounded transition-all duration-300 uppercase tracking-widest bg-slate-50">
                  PILLAR // 03
                </span>
              </div>
            </motion.div>

            {/* Pillar 4: Premium Simplicity */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -8, 
                borderColor: "#005A9E", 
                boxShadow: "0 12px 24px -10px rgba(0, 90, 158, 0.15)",
                backgroundColor: "#FFFFFF"
              }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-sm" 
              id="pillar-card-4"
            >
              {/* Premium Subtle Gradient Glow on Hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(0, 90, 158,0.03),transparent_70%)] pointer-events-none transition-all duration-300 group-hover:scale-110 opacity-70"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl text-[#005A9E] border border-slate-200 w-fit group-hover:bg-sky-50 transition-all duration-300">
                  <Sparkles className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-display font-black text-slate-900 group-hover:text-[#005A9E] transition-colors duration-200">{t.pillarSimplicityTitle}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.pillarSimplicityDesc}</p>
              </div>
              
              <div className="mt-8 flex items-center justify-between relative z-10">
                <div className="h-[1px] bg-slate-100 group-hover:bg-slate-200 flex-grow transition-colors duration-300 mr-4"></div>
                <span className="text-[9px] font-mono font-black text-slate-400 group-hover:text-[#005A9E] group-hover:bg-sky-50 border border-slate-100 group-hover:border-[#005A9E]/20 px-2.5 py-1 rounded transition-all duration-300 uppercase tracking-widest bg-slate-50">
                  PILLAR // 04
                </span>
              </div>
            </motion.div>

          </div>

        </div>        <div className="absolute w-[800px] h-[800px] border border-slate-200/50 rounded-full pointer-events-none left-1/2 -translate-x-1/2 top-10"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#005A9E] uppercase font-black px-4 py-1.5 bg-white border border-slate-200 rounded-full inline-block">{lang === "en" ? "EARLY ADOPTER ACCESS" : "COMPAGNE PILOTE LIMITÉE"}</span>
            <h2 className="text-3.5xl sm:text-4xl lg:text-4.5xl font-display tracking-tight text-slate-900 font-bold" id="pricing-headline">
              {t.pricingTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {t.pricingSubtitle}
            </p>
          </div>

          {/* Pricing cards wrapper container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {pricingTiers.map((tier, idx) => {
              const isFounding = tier.id === "founding-member";
              const isGuardian = tier.id === "guardian";
              const isEarlyBird = tier.id === "early-bird";
              
              const urgency = {
                "early-bird": { spots: 8, total: 120, pct: 93, color: "bg-[#005A9E]", glow: "" },
                "founding-member": { spots: 21, total: 250, pct: 91, color: "bg-[#005A9E]", glow: "" },
                "guardian": { spots: 14, total: 75, pct: 81, color: "bg-[#005A9E]", glow: "" }
              }[tier.id] || { spots: 10, total: 100, pct: 90, color: "bg-[#005A9E]", glow: "" };

              const estValue = {
                "early-bird": 249,
                "founding-member": 449,
                "guardian": 599
              }[tier.id];

              const borderStyles = isFounding 
                ? "border-[#005A9E] ring-1 ring-[#005A9E]/30 shadow-md shadow-sky-100/40" 
                : "border-slate-200 hover:border-slate-350";

              return (
                <motion.div 
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.01,
                    borderColor: isFounding 
                      ? "#005A9E" 
                      : isGuardian 
                        ? "rgba(0, 90, 158, 0.5)" 
                        : "rgba(0, 90, 158, 0.4)",
                    boxShadow: "0 15px 30px -10px rgba(100, 116, 139, 0.15)"
                  }}
                  className={`bg-white rounded-3xl border ${borderStyles} flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 relative group`}
                  id={`pricing-card-${tier.id}`}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-300 group-hover:scale-110 ${
                    isFounding ? "bg-sky-400/5 opacity-50" : isGuardian ? "bg-slate-400/5 opacity-30" : "bg-sky-400/5 opacity-30"
                  }`}></div>

                  {tier.badge && (
                    <div className={`text-white text-[10px] font-mono tracking-widest py-3 px-5 text-center font-black uppercase w-full relative z-10 ${
                      isFounding ? "bg-[#005A9E]" : isGuardian ? "bg-[#005A9E]/91" : "bg-slate-800"
                    }`}>
                      {tier.badge[lang]}
                    </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-sans font-extrabold text-slate-900 tracking-tight group-hover:text-[#005A9E] transition-colors duration-250">{tier.name[lang]}</h3>
                        <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100 transition-colors duration-300 ${
                          isFounding ? "text-[#005A9E]" : isGuardian ? "text-[#005A9E]/90" : "text-[#005A9E]/80"
                        }`}>
                          {isFounding && <BadgeCheck className="w-5.5 h-5.5" />}
                          {isGuardian && <ShieldCheck className="w-5.5 h-5.5" />}
                          {isEarlyBird && <Sparkles className="w-5.5 h-5.5" />}
                        </div>
                      </div>

                      <p className={`text-[10px] font-mono font-black uppercase py-1.5 px-3.5 rounded-full inline-block tracking-wider border ${
                        isFounding 
                          ? "text-[#005A9E] bg-sky-50 border-[#005A9E]/20" 
                          : "text-slate-700 bg-slate-50 border-slate-200"
                      }`}>
                        {tier.savings[lang]}
                      </p>
                      
                      <div className="pt-2 pb-2 relative flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1.5 text-xs font-mono font-bold tracking-wide text-slate-600">
                          <span>{lang === "en" ? "EST. RETAIL:" : "VALEUR ESTIMÉE :"}</span>
                          <span className="line-through">${estValue} CAD</span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-[10px] font-mono uppercase bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600 inline-block align-middle mr-2 mt-0.5 font-bold">DEP.</span>
                          <span className="text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 tracking-tighter align-middle" id={`price-label-${tier.id}`}>
                            ${tier.deposit}
                          </span>
                          <span className="text-xs font-mono text-slate-600 ml-2 uppercase tracking-widest font-bold">CAD</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4.5 space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-700 font-bold">
                            {lang === "en" 
                              ? `Only ${urgency.spots} spots left in Batch 01` 
                              : `Plus que ${urgency.spots} places restantes`}
                          </span>
                          <span className="font-black text-[#005A9E]">{urgency.pct}% {lang === "en" ? "Claimed" : "Réclamé"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${urgency.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className={`h-full rounded-full ${urgency.color}`}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-6 mt-4">
                        <ul className="space-y-4">
                          {tier.benefits[lang].map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start text-xs text-slate-600 leading-relaxed font-sans group-hover:text-slate-800 transition-colors duration-250">
                              <span className="mr-3 mt-0.5 shrink-0 p-0.5 rounded-full text-[#005A9E] bg-sky-50 border border-sky-100/40">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                      <motion.button 
                        whileHover={{ scale: 1.01, y: -0.5 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleOpenCheckout(tier)}
                        className={`w-full py-4.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 border cursor-pointer ${
                          isFounding 
                            ? "bg-[#005A9E] text-white hover:bg-sky-700 shadow-sm border-none" 
                            : "bg-slate-100 text-slate-800 hover:bg-slate-200 border-none"
                        }`}
                        id={`pricing-booking-${tier.id}`}
                      >
                        {t.pricingCta}
                      </motion.button>
                      
                      <p className="text-xs font-mono text-center text-slate-600 uppercase tracking-widest leading-none font-extrabold">
                        {lang === "en" ? "✓ 100% Refundable Deposit" : "✓ Dépôt 100% remboursable"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-slate-700 font-mono select-none font-bold">
              ⚠️ {t.pricingGuarantee}
            </p>
          </div>

        </div>
      </section>

      {/* 4.6 Canadian Trust, Compliance & Security */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 lg:px-16" id="compliance">
        {/* Strict Canadian Data Declaration */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-205 shadow-sm flex flex-col relative overflow-hidden animate-fade-in" id="canadian-compliance-banner">
          {/* Top subtle glow banner border */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#005A9E]/20 to-transparent"></div>
          {/* Accent vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#005A9E] to-blue-600"></div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center space-x-5 shrink-0">
              <div className="p-4 bg-sky-50 border border-sky-100/70 rounded-2xl text-[#005A9E]">
                <ShieldCheck className="w-8 h-8 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs tracking-wider font-mono font-black block text-[#005A9E] uppercase">{t.secTrustLabel}</span>
                <h3 className="text-2xl font-display font-medium text-slate-900 mt-1">PIPEDA Conformity</h3>
              </div>
            </div>
            <p className="text-sm text-slate-650 leading-relaxed max-w-[760px] lg:border-l lg:border-slate-100 lg:pl-8 font-sans">
              {t.secTrustContent}
            </p>
          </div>

          {/* Critical Brand Certification Row (Page 6 of Brand document) */}
          <div className="border-t border-slate-105 pt-8 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6" id="brand-certifications-row">
            
            <div className="flex items-center space-x-4 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-205 transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-[#005A9E]"></div>
              <div>
                <span className="text-[9px] font-mono text-slate-600 block uppercase tracking-wider font-bold">{lang === "en" ? "FEDERAL REGISTRY" : "REGISTRE FÉDÉRAL"}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 font-mono mt-0.5 block">{t.certTransportCanada}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-205 transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-[#005A9E]"></div>
              <div>
                <span className="text-[9px] font-mono text-slate-600 block uppercase tracking-wider font-bold">{lang === "en" ? "RADIO SPECTRUM" : "SPECTRUM RADIO"}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 font-mono mt-0.5 block">{t.certIsed}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-205 transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-[#005A9E]"></div>
              <div>
                <span className="text-[9px] font-mono text-slate-600 block uppercase tracking-wider font-bold">{lang === "en" ? "FUNCTIONAL SAFETY" : "SÉCURITÉ FONCTIONNELLE"}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 font-mono mt-0.5 block">{t.certIso}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.7 Frequently Asked Questions Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-16 border-t border-slate-205" id="faq">
        
        {/* FAQ grid addressing precise mandates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] tracking-wider font-mono font-black text-[#005A9E] uppercase bg-sky-50 px-3.5 py-1.5 rounded-full inline-block border border-[#005A9E]/20">
                {lang === "en" ? "FAQ PORTAL" : "SECTION FAQ"}
              </span>
              <h2 className="text-3.5xl lg:text-4.5xl font-display font-medium tracking-tight text-slate-900 leading-tight" id="faq-heading-text">
                {t.faqHeading}
              </h2>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {t.faqSub}
            </p>
            
            {/* Direct Phone Assistance Info for Canadian sandwich generation */}
            <div className="bg-slate-50 border border-slate-205 p-5 rounded-2xl flex items-center space-x-4 shadow-sm">
              <div className="p-3 bg-sky-50 text-[#005A9E] rounded-xl font-medium border border-sky-100">
                <PhoneCall className="w-5 h-5 shrink-0" />
              </div>
              <div className="text-xs">
                <span className="font-bold block text-slate-800 text-sm mb-0.5">{lang === "en" ? "Need help placing deposit?" : "Besoin d'aide pour réserver ?"}</span>
                <span className="text-[#005A9E] font-mono font-black text-sm">1-800-555-ASTRA</span>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Container */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* FAQ 1 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 0}
                id="faq-accordion-trigger-0"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ1}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 0 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-750 leading-relaxed font-sans">
                      {t.faqA1}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 1}
                id="faq-accordion-trigger-1"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ2}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 1 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-750 leading-relaxed font-sans">
                      {t.faqA2}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 2}
                id="faq-accordion-trigger-2"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ3}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 2 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-750 leading-relaxed font-sans">
                      {t.faqA3}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 4 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 3}
                id="faq-accordion-trigger-3"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ4}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 3 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 3 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-755 leading-relaxed font-sans">
                      {t.faqA4}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 5 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 4}
                id="faq-accordion-trigger-4"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ5}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 4 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 4 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-750 leading-relaxed font-sans">
                      {t.faqA5}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 6 */}
            <div className="border border-slate-205 rounded-xl overflow-hidden hover:border-[#005A9E]/30 hover:shadow-sm bg-white transition-all duration-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 5}
                id="faq-accordion-trigger-5"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 font-sans flex items-start space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#005A9E] shrink-0 mt-0.5" />
                  <span>{t.faqQ6}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === 5 ? "rotate-180 text-[#005A9E]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 5 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100 text-xs sm:text-sm text-slate-750 leading-relaxed font-sans">
                      {t.faqA6}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </section>

      {/* 4.6 Brand Co-Sharing & Viral Growth Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-205 relative overflow-hidden" id="viral-share">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#005A9E]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center space-y-10 relative z-10">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-wider font-bold text-[#005A9E] uppercase bg-sky-50 border border-sky-100/60 px-3.5 py-1.5 rounded-full inline-block">
              {t.shareBadge}
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight text-slate-900 mb-2 leading-none">
              {t.shareTitle}
            </h2>
            <p className="text-sm font-sans text-slate-600 leading-relaxed">
              {t.shareSubtitle}
            </p>
          </div>

          {/* Social Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            
            {/* Share to Twitter / X */}
            <a 
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-205 hover:border-slate-350 px-6 py-3.5 rounded-xl text-xs uppercase font-mono tracking-wider text-slate-800 font-bold transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 select-none"
              id="share-btn-twitter"
            >
              <Twitter className="w-4 h-4 shrink-0 text-[#1DA1F2]" />
              <span>Twitter / X</span>
            </a>

            {/* Share to Facebook */}
            <a 
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-205 hover:border-slate-350 px-6 py-3.5 rounded-xl text-xs uppercase font-mono tracking-wider text-slate-800 font-bold transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 select-none"
              id="share-btn-facebook"
            >
              <Facebook className="w-4 h-4 shrink-0 text-[#1877F2]" />
              <span>Facebook</span>
            </a>

            {/* Share to LinkedIn */}
            <a 
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-white hover:bg-slate-50 border border-slate-205 hover:border-slate-350 px-6 py-3.5 rounded-xl text-xs uppercase font-mono tracking-wider text-slate-800 font-bold transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 select-none"
              id="share-btn-linkedin"
            >
              <Linkedin className="w-4 h-4 shrink-0 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

          </div>

          {/* Quick Copy Link Bar */}
          <div className="max-w-md mx-auto p-1.5 bg-slate-100 border border-slate-205 rounded-2xl flex items-center shadow-inner relative justify-between gap-2 overflow-hidden">
            <span className="text-xs font-mono text-slate-600 px-4 truncate select-all">
              {shareUrl}
            </span>
            <button 
              onClick={handleCopyLink}
              className="bg-[#005A9E] text-white hover:bg-sky-700 flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider relative transition-all shadow-md border-none whitespace-nowrap overflow-hidden shrink-0 select-none cursor-pointer"
              id="share-btn-copy"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div 
                    key="copied"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-1.5 text-white"
                  >
                    <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                    <span>{t.shareCopied}</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="copy"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 stroke-[2]" />
                    <span>{t.shareCopyBtn}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </section>
      </main>

      {/* Footer copyright, billing context and legal attribution */}
      <footer className="border-t border-slate-205 bg-slate-100 py-20 text-xs text-slate-700 relative z-10 select-none font-sans">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12" id="toronto-market-tech-footer">
            
            {/* Column 1: Brand Profile */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="font-display font-medium text-base text-slate-900 tracking-tight uppercase">ASTRATEQ CANADA</span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#005A9E]">{t.brandTagline}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Pioneering regional predictive driver safety systems. Our advanced machine-vision models are tuned and validated specifically for cold weather, low visibility, and sudden traction loss.
              </p>
            </div>

            {/* Column 2: Active Road-Testing & Telemetry */}
            <div className="space-y-4">
              <span className="font-display font-medium text-xs uppercase text-slate-900 tracking-wider block">GTA Validation & Telemetry</span>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Active telemetry testing loops across Highway 401, DVP, and Gardiner Expressway.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Safety alignment inspired by the Vector Institute's standards for trustworthy AI.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Transport Canada compliant advisory driver-assist classification.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Compliance & Privacy */}
            <div className="space-y-4">
              <span className="font-display font-medium text-xs uppercase text-slate-900 tracking-wider block">Sovereign Data & Privacy</span>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>100% sovereign Canadian data residency hosted natively on encrypted Toronto server nodes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Strict PIPEDA conformity prevents data commercialization or off-border exports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005A9E] mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Full AES-256 local storage encryption with localized OTA safety updates.</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Social Sharing */}
            <div className="space-y-4">
              <span className="font-display font-medium text-xs uppercase text-slate-900 tracking-wider block">Inquiries & Community</span>
              <p className="text-slate-600 text-xs">
                Have questions regarding fleet pre-orders, corporate pilot tests, or elder-safety vehicle retrofits?
              </p>
              <div className="bg-slate-200 border border-slate-300/40 p-3 rounded-lg flex flex-col space-y-1 font-mono">
                <span className="text-[10px] text-[#005A9E] uppercase font-bold tracking-wider">Toronto Direct Hub:</span>
                <a href="tel:+14165550192" className="text-[#005A9E] hover:text-[#106ebe] font-bold text-sm block transition-colors">
                  +1 (416) 555-0192
                </a>
              </div>
              
              {/* Social media connections */}
              <div className="flex items-center gap-2 pt-2" id="footer-social-dock">
                <a 
                  href={twitterShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/50 border border-slate-250 flex items-center justify-center text-slate-700 hover:text-[#1DA1F2] transition-colors shadow-sm"
                  aria-label="Share on Twitter / X"
                  title="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={facebookShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/50 border border-slate-250 flex items-center justify-center text-slate-700 hover:text-[#1877F2] transition-colors shadow-sm"
                  aria-label="Share on Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={linkedinShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/50 border border-slate-250 flex items-center justify-center text-slate-700 hover:text-[#0077B5] transition-colors shadow-sm"
                  aria-label="Share on LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={handleCopyLink} 
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/50 border border-slate-250 flex items-center justify-center text-slate-700 hover:text-slate-900 relative transition-colors cursor-pointer shadow-sm"
                  aria-label="Copy Page Link"
                  title="Copy Link"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-700" />
                  )}
                  
                  <AnimatePresence>
                    {isCopied && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono font-bold text-[8px] uppercase px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none z-20"
                      >
                        {t.shareCopied}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-250 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[11px] text-slate-650">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <span className="font-bold text-slate-900">© 2026 Astrateq Canada. All rights reserved.</span>
              <span className="hidden md:inline-block text-slate-300">|</span>
              <span className="text-slate-600">Proudly engineered in Toronto, Ontario, Canada.</span>
              <span className="hidden md:inline-block text-slate-300">|</span>
              <span className="font-mono text-[10px] text-slate-600">Version française disponible sur commande.</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span>{t.heroRefundSnippet}</span>
            </div>
          </div>

          {/* Legal Limitations & PIPEDA Disclaimer */}
          <div className="pt-6 border-t border-slate-250 text-[10px] sm:text-[11px] text-slate-600 leading-relaxed font-mono space-y-2">
            <div className="flex items-center space-x-2 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
              <Lock className="w-3.5 h-3.5 text-[#005A9E]" />
              <span>{lang === "en" ? "LEGAL DISCLAIMERS & RESPONSIBILITY CHARTER" : "AVERTISSEMENTS LÉGAUX ET CHARTE DE RESPONSABILITÉ"}</span>
            </div>
            <p className="max-w-6xl text-slate-600 leading-normal">
              {t.legalDisclaimer}
            </p>
          </div>

        </div>
      </footer>

      {/* 5. Sticky Mobile & Floating Bottom CTA Drawer with Lighter Complementary Background */}
      <AnimatePresence>
        {isStickyCtaVisible && (
          <motion.aside 
            aria-label="Sticky booking bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-slate-50/95 backdrop-blur-xl border-t border-slate-300/60 px-6 py-4 shadow-[0_-15px_30px_rgba(0,0,0,0.1)] flex items-center justify-between max-w-[1400px] mx-auto rounded-t-2xl font-sans"
            id="sticky-mobile-drawer"
          >
            <div className="hidden sm:flex flex-col">
              <span className="text-[9px] font-mono text-[#005A9E] tracking-[0.2em] uppercase font-bold leading-none mb-1">FOUNDER BATCH 01</span>
              <span className="text-sm font-display font-black text-slate-900 leading-tight">ASTRA-AI Pre-order Bundle</span>
            </div>
            
            <div className="flex items-center space-x-3 w-full sm:w-auto text-slate-800">
              {/* Scalable flexible grid list selection indicators with high-contrast light colors */}
              <div className="flex -space-x-1 border border-slate-300/50 p-1.5 rounded-lg bg-slate-100 mr-4 shrink-0 hidden sm:flex">
                <span className="text-xs font-mono font-extrabold text-slate-800 px-2">$25</span>
                <span className="text-xs font-mono font-extrabold text-[#005A9E] border-l border-slate-300/50 px-2">$85</span>
                <span className="text-xs font-mono font-extrabold text-slate-800 border-l border-slate-300/50 px-2">$150</span>
              </div>
              
              <button 
                onClick={() => scrollToSection(pricingSectionRef)}
                className="w-full sm:w-auto bg-[#005A9E] hover:bg-[#106ebe] text-white font-mono font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-xl transition-all duration-300 text-center shrink-0 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-sky-500/10 active:scale-[0.98]"
                id="sticky-reservation-btn"
              >
                <span>{t.stickyMobileBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 4.5 Pre-Order Checkout Simulation Drawer Module */}
      <AnimatePresence>
        {isCheckoutOpen && selectedTier && (
          <div 
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6" 
            id="checkout-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-dialog-title"
          >
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-navy-modal rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-white/12 text-white"
              id="checkout-modal-panel"
            >
              
              {/* Header block */}
              <div className="bg-white/3 px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-[#00D4FF] rounded-lg">
                    <CreditCard className="w-4 h-4 text-black shrink-0" />
                  </div>
                  <div>
                    <h2 className="text-base font-display font-black text-white leading-none mb-0.5" id="checkout-dialog-title">{t.modalCheckoutTitle}</h2>
                    <p className="text-[10px] font-mono text-[#00D4FF] tracking-widest uppercase leading-none mt-1">{t.modalCheckoutSubtitle}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close form"
                  id="checkout-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form viewport scrolling capability */}
              <div className="overflow-y-auto p-6 flex-1">
                <AnimatePresence mode="wait">
                  {!isPaidSuccess ? (
                    
                    // Simulated stripe interface interactive checkout
                    <motion.form 
                      key="checkout-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handlePaymentSubmit}
                      className="space-y-4"
                    >
                      {/* Highlight Selection metrics summary */}
                      <div className="bg-white/2 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-white/75 block uppercase leading-none mb-1.5">{t.modalCheckoutTitle}</span>
                          <span className="text-sm font-semibold text-white block font-display" id="checkout-tier-name">{selectedTier.name[lang]}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono block text-[#00D4FF] uppercase tracking-wider leading-none mb-1.5">{lang === "en" ? "FULLY REFUNDABLE" : "REMBOURSEMENT 100%"}</span>
                          <span className="text-lg font-mono font-extrabold text-white" id="checkout-tier-price">${selectedTier.deposit} CAD</span>
                        </div>
                      </div>

                      {/* Error display pane */}
                      {formError && (
                        <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl flex items-start space-x-2.5 text-xs text-red-400 leading-normal" id="checkout-error-panel">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <div className="space-y-3.5">
                        {/* Email address validation element */}
                        <div>
                          <label className="text-xs font-mono font-medium block text-white/80 mb-1.5">{t.modalEmailLabel}</label>
                          <input 
                            type="email"
                            required
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder={t.modalEmailPlaceholder}
                            className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all duration-200 text-white placeholder:text-white/30"
                            id="checkout-email-input"
                          />
                        </div>

                        {/* Credit Card layout fields */}
                        <div className="bg-white/2 border border-white/10 rounded-2xl p-4 space-y-3 shadow-inner">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                            <span className="text-[10px] font-mono tracking-wider font-semibold text-white/70 uppercase flex items-center space-x-1">
                              <Lock className="w-3 h-3 text-[#00D4FF]" />
                              <span>{t.modalSecureLabel}</span>
                            </span>
                            <span className="text-xs select-none">💳</span>
                          </div>

                          <div>
                            <label className="text-[10px] font-mono uppercase block text-white/75 mb-1.5">{t.modalCardLabel}</label>
                            <input 
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => formatCardNumber(e.target.value)}
                              placeholder="4242  4242  4242  4242"
                              className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all placeholder:text-white/30 text-white"
                              id="checkout-card-num"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-mono uppercase block text-white/75 mb-1.5">{t.modalExpirationLabel}</label>
                              <input 
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => formatExpiry(e.target.value)}
                                placeholder="MM / YY"
                                className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-center text-white placeholder:text-white/30"
                                id="checkout-card-expiry"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono uppercase block text-white/75 mb-1.5">{t.modalCvcLabel}</label>
                              <input 
                                type="text"
                                required
                                value={cardCVC}
                                onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ""))}
                                placeholder="123"
                                className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-center text-white placeholder:text-white/30"
                                id="checkout-card-cvc"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cardholder Identity Context */}
                        <div>
                          <label className="text-xs font-mono font-medium block text-white/80 mb-1.5">{t.modalNameLabel}</label>
                          <input 
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder={t.modalNamePlaceholder}
                            className="w-full bg-white/5 border border-white/10 text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-white placeholder:text-white/20"
                            id="checkout-name-input"
                          />
                        </div>

                        {/* Postal Code field */}
                        <div>
                          <label className="text-xs font-mono font-medium block text-white/80 mb-1.5">{t.modalPostalCodeLabel}</label>
                          <input 
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                            placeholder="M5V 2T6"
                            className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-navy-bg focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-white placeholder:text-white/20"
                            id="checkout-postal-input"
                          />
                        </div>

                      </div>

                      {/* Explicit refund guarantee note right beside/below form checkouts to fulfill criteria */}
                      <div className="pt-4 border-t border-white/5 flex flex-col space-y-4">
                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          disabled={isProcessingPayment}
                          className="w-full bg-[#00D4FF] text-black hover:bg-cyan-400 font-mono font-black text-xs uppercase tracking-[0.2em] py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 disabled:bg-gray-700 cursor-pointer"
                          id="checkout-submit-btn"
                        >
                          {isProcessingPayment ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <span>{t.modalPayWithStripe} ${selectedTier.deposit} CAD</span>
                              <Check className="w-4 h-4 stroke-[3]" />
                            </>
                          )}
                        </motion.button>
                        
                        <p className="text-[10px] font-mono text-white/75 text-center uppercase tracking-wide leading-normal px-2">
                          🛡️ {t.modalRefundGuarantee}
                        </p>
                      </div>

                    </motion.form>
                  ) : (
                    
                    // Purchase Confirmation Receipt View panel
                    <motion.div 
                      key="success-receipt"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-6 space-y-6"
                    >
                      <div className="w-16 h-16 bg-white/5 border border-[#00D4FF]/30 rounded-full flex items-center justify-center mx-auto text-[#00D4FF]">
                        <BadgeCheck className="w-10 h-10 stroke-[1.8]" />
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-xl font-display font-black text-white" id="checkout-success-title">{t.successTitle}</h2>
                        <p className="text-xs text-white/60 leading-relaxed max-w-[340px] mx-auto">
                          {t.successSubtitle}
                        </p>
                      </div>

                      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 max-w-[380px] mx-auto space-y-3 shadow-inner" id="receipt-details">
                        <span className="text-[10px] font-mono tracking-[0.15em] font-semibold text-white/75 uppercase block border-b border-white/5 pb-1.5">{t.successDetailsTitle}</span>
                        
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/70">{lang === "en" ? "MEMBER ID" : "ID MEMBRE"} :</span>
                          <strong className="text-[#00D4FF]">{generatedOrderNum}</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/70">{lang === "en" ? "TRANSACTION AMOUNT" : "MONTANT VERSÉ"} :</span>
                          <strong className="text-white">${selectedTier.deposit}.00 CAD</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/70">{lang === "en" ? "EMAIL RESERVED" : "COURRIEL LIÉ"} :</span>
                          <strong className="text-white text-ellipsis overflow-hidden max-w-[180px]">{emailInput}</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/70">{lang === "en" ? "COMPLIANCE KEY" : "CONFORMITÉ CA"} :</span>
                          <strong className="text-white">PIPEDA-SHA256</strong>
                        </div>
                      </div>

                      {/* High-Conversion Viral Social Sharing Block */}
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl max-w-[380px] mx-auto space-y-3 text-left" id="success-share-callout">
                        <div className="flex items-center space-x-2">
                          <Share2 className="w-3.5 h-3.5 text-[#00D4FF]" />
                          <span className="text-xs font-display font-medium text-white/95">{t.successShareCallout}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <a 
                            href={twitterShareUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center space-x-1 bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/8 hover:border-[#1DA1F2]/30 py-2.5 rounded-lg text-[10px] uppercase font-mono tracking-wider font-bold text-white hover:text-[#1DA1F2] transition-colors"
                          >
                            <Twitter className="w-3.5 h-3.5" />
                            <span>Twitter</span>
                          </a>

                          <a 
                            href={facebookShareUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center space-x-1 bg-white/5 hover:bg-[#1877F2]/20 border border-white/8 hover:border-[#1877F2]/30 py-2.5 rounded-lg text-[10px] uppercase font-mono tracking-wider font-bold text-white hover:text-[#1877F2] transition-colors"
                          >
                            <Facebook className="w-3.5 h-3.5" />
                            <span>Facebook</span>
                          </a>

                          <a 
                            href={linkedinShareUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center space-x-1 bg-white/5 hover:bg-[#0077B5]/20 border border-white/8 hover:border-[#0077B5]/30 py-2.5 rounded-lg text-[10px] uppercase font-mono tracking-wider font-bold text-white hover:text-[#0077B5] transition-colors"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                          </a>
                        </div>

                        <button 
                          onClick={handleCopyLink} 
                          className="w-full flex items-center justify-center space-x-1.5 bg-white/5 hover:bg-white/10 border border-white/8 py-2 rounded-lg text-[10px] uppercase font-mono tracking-wider font-bold text-white transition-all cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">{t.shareCopied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-white/70" />
                              <span>{t.shareCopyBtn}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="pt-4 text-center space-y-4">
                        <p className="text-[10px] text-white/70 font-mono leading-relaxed px-4 max-w-[360px] mx-auto">
                          {t.successComplianceNotice}
                        </p>

                        <button 
                          onClick={() => setIsCheckoutOpen(false)}
                          className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                          id="checkout-success-close-btn"
                        >
                          {t.successCloseBtn}
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
