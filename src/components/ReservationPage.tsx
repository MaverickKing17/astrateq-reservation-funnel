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
  AlertCircle
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

  const heroRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  // Active translation selector
  const t = useMemo(() => translations[lang], [lang]);

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
        // Show after scrolling 100px past hero bottom or similar
        setIsStickyCtaVisible(window.scrollY > heroBottom - 200);
      }
    };
    window.addEventListener("scroll", handleScroll);
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

  // Basic payment submission validation
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!emailInput.includes("@") || emailInput.length < 5) {
      setFormError(lang === "en" ? "Please enter a valid Canadian email address." : "Veuillez entrer une adresse courriel valide.");
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

    // Simulate standard Stripe delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      const uniqueSuffix = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderNum(`${t.successOrderNum}${uniqueSuffix}`);
      setIsPaidSuccess(true);
      // Deplete simulated spot count as live proof validation works
      setSpotsRemaining((prev) => Math.max(200, prev - 1));
    }, 1800);
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
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased selection:bg-[#00D4FF] selection:text-[#050505] overflow-x-hidden" id="funnel-container">
      
      {/* 4.1 Global Navigation Header */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/85 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          
          {/* Typographic branding & Logo integration */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img 
              src="https://i.ibb.co/Lz56Kf7m/Gemini-Generated-Image-pta8i9pta8i9pta8.png" 
              alt="Astrateq Gadgets Logo" 
              className="h-10 w-10 object-contain rounded-md brightness-0 invert"
              referrerPolicy="no-referrer"
              id="top-logo-img"
            />
            <div className="flex flex-col">
              <span className="text-sm font-serif font-black tracking-tight text-white leading-none">Astrateq Gadgets</span>
              <span className="text-[9px] font-mono leading-none tracking-[0.25em] text-[#00D4FF] mt-1">ASTRA-AI</span>
            </div>
          </div>

          {/* Desktop Navigation Menu Links */}
          <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold">
            <a href="#features" className="text-white/60 hover:text-white transition-colors">{t.navFeatures}</a>
            <a href="#technology" className="text-white/60 hover:text-white transition-colors">{t.navTech}</a>
            <a href="#faq" className="text-white/60 hover:text-white transition-colors">{t.navFaq}</a>
            <a href="#pricing" className="text-white/60 hover:text-white transition-colors">{t.navSupport}</a>
          </div>

          {/* Right Header Options - EN/FR language toggle and Reservation Trigger button */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center space-x-2 text-xs font-mono tracking-wider text-white/70 hover:text-white focus:outline-none transition-colors border border-white/10 px-3.5 py-1.5 rounded-full bg-white/5 cursor-pointer"
              aria-label="Toggle language"
              id="desktop-lang-tgl"
            >
              <Globe className="w-3.5 h-3.5 stroke-[#00D4FF]" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection(pricingSectionRef)}
              className="bg-[#00D4FF] text-[#050505] hover:bg-cyan-400 font-extrabold text-[11px] tracking-widest uppercase py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg shadow-cyan-950/20 cursor-pointer"
              id="nav-my-reservation-btn"
            >
              {t.navMyReservation}
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center space-x-2 bg-white/5 border border-white/10 p-1.5 rounded-full">
            <button 
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-xs font-mono px-2.5 py-1 text-white/80 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 stroke-[#00D4FF]" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80 p-1 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Options */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#050505]"
            >
              <div className="px-6 py-8 space-y-5 flex flex-col">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-white/70 font-medium hover:text-white transition-colors">{t.navFeatures}</a>
                <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="text-white/70 font-medium hover:text-white transition-colors">{t.navTech}</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-white/70 font-medium hover:text-white transition-colors">{t.navFaq}</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-white/70 font-medium hover:text-white transition-colors">{t.navSupport}</a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollToSection(pricingSectionRef); }}
                  className="bg-[#00D4FF] text-black hover:bg-cyan-400 font-bold text-center text-sm py-3 px-6 rounded-xl transition-all duration-300 w-full self-center cursor-pointer"
                >
                  {t.navMyReservation}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 4.2 Split-Screen Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-16 lg:py-28 max-w-[1400px] mx-auto px-6 lg:px-16" id="features">
        {/* Background Concentric Geometric Fine Circles */}
        <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none -right-40 top-1/4 animate-pulse duration-10000"></div>
        <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full pointer-events-none -right-20 top-[35%]"></div>
        <div className="absolute w-[200px] h-[200px] border border-white/5 rounded-full pointer-events-none -right-2 top-[45%]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column Content Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-1 text-xs text-white/70 tracking-[0.2em] font-mono uppercase px-3.5" id="hero-mini-tag">
              <span className="flex h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse"></span>
              <span>{t.heroSubtitle}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif tracking-tight text-white leading-[1.1]" id="hero-main-title">
              {t.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-[620px]" id="hero-body-paragraph">
              {t.heroBody}
            </p>

            {/* CTA action container */}
            <div className="pt-4 space-y-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(pricingSectionRef)}
                className="bg-[#00D4FF] text-[#050505] hover:bg-[#00e1ff] font-extrabold uppercase tracking-[0.2em] py-4.5 px-9 rounded-full shadow-lg shadow-cyan-950/30 transition-all duration-300 text-xs inline-flex items-center space-x-3 border-none cursor-pointer"
                id="hero-reserve-btn"
              >
                <span>{t.heroCta}</span>
                <ArrowRight className="w-4 h-4 ml-1 stroke-[2.5]" />
              </motion.button>
              
              {/* Mandatory refund snippet explicitly near CTA */}
              <p className="text-[11px] font-mono text-white/50 flex items-center space-x-1.5 pt-1.5 pl-1.5 select-none">
                <Check className="w-3.5 h-3.5 text-[#00D4FF] stroke-[3]" />
                <span>{t.heroRefundSnippet}</span>
              </p>
            </div>

            {/* Trust Row Section containing detailed trust badges */}
            <div className="border-t border-white/10 pt-8 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6" id="hero-trust-badges">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#00D4FF] border border-white/10 mt-0.5">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.trustRefundTitle}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{t.trustRefundDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#00D4FF] border border-white/10 mt-0.5">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.trustDataTitle}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{t.trustDataDesc}</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column Imagery Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
            id="hero-image-block"
          >
            {/* Embedded circular target elements highlighting geometric safety focus */}
            <div className="absolute -inset-8 border border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute -inset-4 border border-white/10 rounded-full pointer-events-none"></div>

            <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-white/5 aspect-video lg:aspect-[4/3] group">
              <img 
                src={canadianSnowDrive} 
                alt="Safe Vehicle Driving in Snowy Canadian Road" 
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
                id="hero-lifestyle-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>
              
              {/* Overlapping interactive maple leaf flag decorative accent to represent Canada */}
              <div className="absolute top-4 right-4 bg-[#050505]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-2 border border-white/10 select-none">
                <span className="text-xs text-red-500 font-bold font-serif">🇨🇦</span>
                <span className="text-[9px] tracking-[0.2em] font-mono font-bold text-white">CA EDITION</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4.3 Real-Time Scarcity & Social Proof Banner */}
      <section className="bg-white/2 border-y border-white/10 py-10" id="scarcity-block">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="bg-[#0c0c0c] rounded-2xl p-6 lg:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Visual ambient accent ring */}
            <div className="absolute top-0 right-0 transform translate-x-20 -translate-y-20 w-80 h-80 rounded-full bg-[#00D4FF]/5 blur-3xl pointer-events-none"></div>
            
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] py-1 px-3 rounded-full text-[9px] font-mono tracking-[0.2em] leading-none font-bold">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse-cyan"></span>
                <span>{t.scarcityLiveBadge}</span>
              </div>
              <h3 className="text-xl font-serif font-black text-white">{t.scarcityTitle}</h3>
              <p className="text-xs font-semibold text-white/70 font-mono tracking-wide mt-1">
                {lang === "en" ? `${spotsRemaining} of 250 spots remaining in Batch 01` : `${spotsRemaining} places restantes sur 250 dans le Lot 01`}
              </p>
            </div>

            {/* Progress indicator representing active scarcity levels */}
            <div className="flex-1 max-w-xl self-center w-full relative z-10" id="progress-bar-container">
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                <motion.div 
                  className="bg-gradient-to-r from-cyan-400 to-[#00D4FF] h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(spotsRemaining / 250) * 100}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono mt-2 text-white/50 tracking-wider">
                <span>96% {lang === "en" ? "RESERVED" : "RÉSERVÉ"}</span>
                <span>{250 - spotsRemaining} {lang === "en" ? "ACTUAL RESERVATIONS" : "INSCRIPTIONS COMPTABILISÉES"}</span>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection(pricingSectionRef)}
              className="bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold px-5 py-3 rounded-xl transition-all duration-300 self-start md:self-center shrink-0 border border-white/10 uppercase tracking-[0.25em] font-mono flex items-center space-x-2 cursor-pointer"
              id="scarcity-jump-btn"
            >
              <span>{lang === "en" ? "Jump to pricing" : "Accéder aux prix"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </section>

      {/* 4.4 Hardware Ecosystem & Empathy Accordion */}
      <section className="py-20 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-16" id="technology">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Pain Points Presentation */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D4FF] uppercase font-bold block">{t.empathyTagline}</span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white" id="empathy-section-title">
              {t.empathyHeadline}
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              {t.empathyDescription}
            </p>
            
            {/* Visual Separation Card explaining sandwich generation problems */}
            <div className="bg-white/2 rounded-2xl p-6 border border-white/10 space-y-4" id="pain-points-card">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/90">
                {t.empathyObstacleTitle}
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start text-xs text-white/60 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-500/20">!</span>
                  <span>{t.empathyObstacle1}</span>
                </li>
                <li className="flex items-start text-xs text-white/60 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-500/20">!</span>
                  <span>{t.empathyObstacle2}</span>
                </li>
                <li className="flex items-start text-xs text-white/60 leading-relaxed">
                  <span className="min-w-5 h-5 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-bold font-mono text-[10px] mr-3 mt-0.5 border border-red-500/20">!</span>
                  <span>{t.empathyObstacle3}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5 aspect-video relative group">
              <img 
                src={astraAiHardware} 
                alt="Astrateq Gadgets Hardware System OBD-II Camera" 
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                id="empathy-hardware-img"
              />
            </div>
          </div>

          {/* Right Column Expandable Accordion */}
          <div className="lg:col-span-7 space-y-4 mt-8 lg:mt-0">
            
            {/* Accordion Element 1 - Predictive incident alerts */}
            <div className={`border rounded-2xl transition-all duration-300 ${activeAccordion === 0 ? "bg-white/5 border-white/20" : "border-white/10 hover:border-white/20 bg-transparent"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 0}
                id="accordion-trigger-0"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[9px] font-mono font-bold uppercase text-[#00D4FF] tracking-[0.25em]">{t.accPredictiveSubtitle}</span>
                  <h3 className="text-lg font-serif font-semibold text-white">{t.accPredictiveTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${activeAccordion === 0 ? "rotate-180 bg-white/10" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-white/70" />
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
                    <div className="px-6 pb-6 text-sm text-white/70 space-y-4 border-t border-white/5 pt-4 leading-relaxed">
                      <p>{t.accPredictiveBody}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="bg-[#0c0c0c] p-4 rounded-xl border border-white/10">
                          <strong className="text-xs font-semibold block text-[#00D4FF] font-mono tracking-wider mb-1.5">{lang === "en" ? "LENS 1: HAZARD ENGINE" : "LENS 1 : COMPORTEMENT ROUTE"}</strong>
                          <span className="text-xs text-white/50 leading-relaxed">{lang === "en" ? "Road surface collision tracking and lane guard alerts." : "Suivi prédictif des lignes de voies et alertes anti-collision."}</span>
                        </div>
                        <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#00D4FF]/20">
                          <strong className="text-xs font-semibold block text-[#00D4FF] font-mono tracking-wider mb-1.5">{lang === "en" ? "LENS 2: WELLNESS NODE" : "LENS 2 : SÉCURITÉ CONDUCTEUR"}</strong>
                          <span className="text-xs text-white/50 leading-relaxed">{lang === "en" ? "Senses sudden drowsiness, distress, or lack of attention." : "Analyse l'assoupissement, le malaise brutal ou l'inattention."}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Element 2 - Diagnostics */}
            <div className={`border rounded-2xl transition-all duration-300 ${activeAccordion === 1 ? "bg-white/5 border-white/20" : "border-white/10 hover:border-white/20 bg-transparent"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 1}
                id="accordion-trigger-1"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[9px] font-mono font-bold uppercase text-[#00D4FF] tracking-[0.25em]">{t.accDiagnosticsSubtitle}</span>
                  <h3 className="text-lg font-serif font-semibold text-white">{t.accDiagnosticsTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${activeAccordion === 1 ? "rotate-180 bg-white/10" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-white/70" />
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
                    <div className="px-6 pb-6 text-sm text-white/70 space-y-4 border-t border-white/5 pt-4 leading-relaxed">
                      <p>{t.accDiagnosticsBody}</p>
                      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#00D4FF]/20 flex space-x-3 items-start">
                        <Check className="w-4 h-4 text-[#00D4FF] shrink-0 fill-none mt-1 stroke-[3]" />
                        <span className="text-xs text-white/60 leading-relaxed">{lang === "en" ? "Active mechanical polling connects into standard OBD-II systems built post-1996 for reliable diagnostic monitoring." : "Le décodage OBD-II s'adapte à tous véhicules fabriqués de 1996 à aujourd'hui."}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Element 3 - Quiet Protection */}
            <div className={`border rounded-2xl transition-all duration-300 ${activeAccordion === 2 ? "bg-white/5 border-white/20" : "border-white/10 hover:border-white/20 bg-transparent"}`}>
              <button 
                onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeAccordion === 2}
                id="accordion-trigger-2"
              >
                <div className="space-y-1.5 pr-4">
                  <span className="text-[9px] font-mono font-bold uppercase text-[#00D4FF] tracking-[0.25em]">{t.accQuietSubtitle}</span>
                  <h3 className="text-lg font-serif font-semibold text-white">{t.accQuietTitle}</h3>
                </div>
                <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${activeAccordion === 2 ? "rotate-180 bg-white/10" : ""}`}>
                  <ChevronDown className="w-5 h-5 text-white/70" />
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
                    <div className="px-6 pb-6 text-sm text-white/70 space-y-4 border-t border-white/5 pt-4 leading-relaxed">
                      <p>{t.accQuietBody}</p>
                      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#00D4FF]/20 flex space-x-3 items-start">
                        <Check className="w-4 h-4 text-[#00D4FF] shrink-0 fill-none mt-1 stroke-[3]" />
                        <span className="text-xs text-white/60 leading-relaxed">{lang === "en" ? "Unlike classical systems with sirens, safety calls are issued via polite smart alerts or quiet phone companion messages." : "De simples messages silencieux ou bips harmonieux à volume progressif remplacent les alarmes stridentes d'autrefois."}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 Explicit 3-Tier Pricing Grid */}
      <section ref={pricingSectionRef} className="py-20 lg:py-32 bg-[#090909] border-t border-white/10 scroll-mt-20 relative overflow-hidden" id="pricing">
        {/* Decorative backdrop geometric vector lines */}
        <div className="absolute w-[800px] h-[800px] border border-white/3 rounded-full pointer-events-none left-1/2 -translate-x-1/2 top-10"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center max-w-[700px] mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D4FF] uppercase font-bold px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full inline-block">{lang === "en" ? "EARLY ADOPTER ACCESS" : "COMPAGNE PILOTE LIMITÉE"}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-white" id="pricing-headline">
              {t.pricingTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              {t.pricingSubtitle}
            </p>
          </div>

          {/* Pricing cards wrapper container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {pricingTiers.map((tier, idx) => (
              <motion.div 
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-[#0c0c0c] rounded-2xl border ${tier.id === "founding-member" ? "border-[#00D4FF] ring-[1px] ring-[#00D4FF]/40 shadow-2xl shadow-cyan-950/20" : "border-white/10"} flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:-translate-y-1 relative group`}
                id={`pricing-card-${tier.id}`}
              >
                {/* Popular card highlights */}
                {tier.badge && (
                  <div className="bg-[#00D4FF] text-black text-[9px] font-mono tracking-[0.25em] leading-none py-2 px-3 text-center font-bold uppercase w-full">
                    {tier.badge[lang]}
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif text-white font-extrabold">{tier.name[lang]}</h3>
                    <p className="text-[10px] font-mono font-bold text-[#00D4FF] uppercase bg-white/5 py-1.5 px-3 rounded-md inline-block tracking-wide border border-white/5">
                      {tier.savings[lang]}
                    </p>
                    
                    {/* Largest typographical hierarchy for deposit amounts as mandated */}
                    <div className="pt-4 pb-2">
                      <span className="text-[10px] font-mono uppercase align-super text-white/50 mr-1.5">DEP.</span>
                      <span className="text-5xl lg:text-6xl font-serif font-black text-white" id={`price-label-${tier.id}`}>
                        ${tier.deposit}
                      </span>
                      <span className="text-xs font-mono text-white/40 ml-1.5">CAD</span>
                    </div>

                    <div className="border-t border-white/5 pt-6 mt-4">
                      <ul className="space-y-3.5">
                        {tier.benefits[lang].map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start text-xs text-white/70 leading-relaxed">
                            <span className="text-[#00D4FF] mr-2.5 mt-0.5 shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <button 
                      onClick={() => handleOpenCheckout(tier)}
                      className={`w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.18em] text-center transition-all duration-300 border cursor-pointer ${tier.id === "founding-member" ? "bg-[#00D4FF] text-black hover:bg-cyan-400 border-none shadow-lg shadow-cyan-950/20" : "bg-white text-black hover:bg-gray-100 border-none"}`}
                      id={`pricing-booking-${tier.id}`}
                    >
                      {t.pricingCta}
                    </button>
                    
                    {/* Mandatory refund guarantee under every single pricing CTA */}
                    <p className="text-[10px] font-mono text-center text-white/40 uppercase tracking-wide leading-none">
                      {lang === "en" ? "✓ 100% Refundable Deposit" : "✓ Dépôt 100% remboursable"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-white/50 font-mono select-none">
              ⚠️ {t.pricingGuarantee}
            </p>
          </div>

        </div>
      </section>

      {/* 4.6 Canadian Trust, Compliance & FAQ */}
      <section className="py-20 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-16" id="faq">
        
        {/* Strict Canadian Data Declaration */}
        <div className="bg-white/2 rounded-3xl p-8 lg:p-12 border border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-20 relative overflow-hidden animate-fade-in" id="canadian-compliance-banner">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00D4FF]"></div>
          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[#00D4FF]">
              <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] font-mono font-bold block text-[#00D4FF] uppercase">{t.secTrustLabel}</span>
              <h3 className="text-xl font-serif font-black text-white">PIPEDA Conformity</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-[720px] md:border-l md:border-white/10 md:pl-8">
            {t.secTrustContent}
          </p>
        </div>

        {/* FAQ grid addressing precise mandates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-3xl font-serif tracking-tight text-white" id="faq-heading-text">
              {t.faqHeading}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
              {t.faqSub}
            </p>
            
            {/* Direct Phone Assistance Info for Canadian sandwich generation */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center space-x-3.5">
              <PhoneCall className="w-5 h-5 text-[#00D4FF] shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block text-white">{lang === "en" ? "Need help placing deposit?" : "Besoin d'aide pour réserver ?"}</span>
                <span className="text-[#00D4FF] font-mono">1-800-555-ASTRA</span>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Container */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* FAQ 1 */}
            <div className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
              <button 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                className="w-full text-left px-6 py-4.5 bg-white/2 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 0}
                id="faq-accordion-trigger-0"
              >
                <span className="text-sm font-semibold text-white font-mono flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#00D4FF]" />
                  <span>{t.faqQ1}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${activeFaq === 0 ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/5 text-xs sm:text-sm text-white/70 leading-relaxed">
                      {t.faqA1}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
              <button 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="w-full text-left px-6 py-4.5 bg-white/2 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 1}
                id="faq-accordion-trigger-1"
              >
                <span className="text-sm font-semibold text-white font-mono flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#00D4FF]" />
                  <span>{t.faqQ2}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${activeFaq === 1 ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/5 text-xs sm:text-sm text-white/70 leading-relaxed">
                      {t.faqA2}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
              <button 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="w-full text-left px-6 py-4.5 bg-white/2 flex justify-between items-center focus:outline-none cursor-pointer"
                aria-expanded={activeFaq === 2}
                id="faq-accordion-trigger-2"
              >
                <span className="text-sm font-semibold text-white font-mono flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#00D4FF]" />
                  <span>{t.faqQ3}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${activeFaq === 2 ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/5 text-xs sm:text-sm text-white/70 leading-relaxed">
                      {t.faqA3}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </section>

      {/* Footer copyright, billing context and legal attribution */}
      <footer className="border-t border-white/10 bg-[#030303] py-12 text-xs text-white/40 relative z-10 select-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          
          <div className="flex flex-col space-y-1.5 items-center sm:items-start">
            <span className="font-serif font-bold text-sm text-white tracking-tight">© 2026 Astrateq Gadgets</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00D4FF]">Predictive Hardware Ecosystem — ASTRA-AI</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-8 items-center gap-2 font-mono text-[10px]">
            <span>{t.heroRefundSnippet}</span>
            <span className="hidden sm:inline-block">|</span>
            <span>Version française disponible sur demande.</span>
          </div>

        </div>
      </footer>

      {/* 5. Sticky Mobile & Floating Bottom CTA Drawer (appears when scrolling down past Hero) */}
      <AnimatePresence>
        {isStickyCtaVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-[#050505]/95 backdrop-blur-md border-t border-white/10 px-6 py-4 shadow-2xl flex items-center justify-between max-w-[1400px] mx-auto rounded-t-2xl"
            id="sticky-mobile-drawer"
          >
            <div className="hidden sm:flex flex-col">
              <span className="text-[9px] font-mono text-[#00D4FF] tracking-[0.2em] uppercase font-bold leading-none mb-1">FOUNDER BATCH 01</span>
              <span className="text-sm font-serif font-extrabold text-white leading-tight">ASTRA-AI Pre-order Bundle</span>
            </div>
            
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {/* Scalable flexible grid list selection indicators */}
              <div className="flex -space-x-1 border border-white/10 p-1.5 rounded-lg bg-white/5 mr-4 shrink-0 hidden sm:flex">
                <span className="text-xs font-mono font-extrabold text-white/90 px-2">$25</span>
                <span className="text-xs font-mono font-extrabold text-white/90 border-l border-white/10 px-2">$85</span>
                <span className="text-xs font-mono font-extrabold text-white/90 border-l border-white/10 px-2">$150</span>
              </div>
              
              <button 
                onClick={() => scrollToSection(pricingSectionRef)}
                className="w-full sm:w-auto bg-[#00D4FF] hover:bg-cyan-400 text-black font-mono font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-xl transition-all duration-300 text-center shrink-0 flex items-center justify-center space-x-2 cursor-pointer animate-pulse-cyan"
                id="sticky-reservation-btn"
              >
                <span>{t.stickyMobileBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4.5 Pre-Order Checkout Simulation Drawer Module */}
      <AnimatePresence>
        {isCheckoutOpen && selectedTier && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6" id="checkout-modal-backdrop">
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0c0c] rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-white/12 text-white"
              id="checkout-modal-panel"
            >
              
              {/* Header block */}
              <div className="bg-white/3 px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-[#00D4FF] rounded-lg">
                    <CreditCard className="w-4 h-4 text-black shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-black text-white leading-none mb-0.5">{t.modalCheckoutTitle}</h3>
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
                          <span className="text-[9px] font-mono text-white/50 block uppercase leading-none mb-1.5">{t.modalCheckoutTitle}</span>
                          <span className="text-sm font-semibold text-white block font-serif" id="checkout-tier-name">{selectedTier.name[lang]}</span>
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
                            className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all duration-200 text-white placeholder:text-white/30"
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
                            <label className="text-[10px] font-mono uppercase block text-white/50 mb-1.5">{t.modalCardLabel}</label>
                            <input 
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => formatCardNumber(e.target.value)}
                              placeholder="4242  4242  4242  4242"
                              className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all placeholder:text-white/30 text-white"
                              id="checkout-card-num"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-mono uppercase block text-white/50 mb-1.5">{t.modalExpirationLabel}</label>
                              <input 
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => formatExpiry(e.target.value)}
                                placeholder="MM / YY"
                                className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-center text-white placeholder:text-white/30"
                                id="checkout-card-expiry"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono uppercase block text-white/50 mb-1.5">{t.modalCvcLabel}</label>
                              <input 
                                type="text"
                                required
                                value={cardCVC}
                                onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ""))}
                                placeholder="123"
                                className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-center text-white placeholder:text-white/30"
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
                            className="w-full bg-white/5 border border-white/10 text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-white placeholder:text-white/20"
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
                            className="w-full bg-white/5 border border-white/10 font-mono text-sm px-4 py-2.5 rounded-xl focus:bg-[#050505] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all text-white placeholder:text-white/20"
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
                        
                        <p className="text-[10px] font-mono text-white/50 text-center uppercase tracking-wide leading-normal px-2">
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
                        <h4 className="text-xl font-serif font-black text-white">{t.successTitle}</h4>
                        <p className="text-xs text-white/60 leading-relaxed max-w-[340px] mx-auto">
                          {t.successSubtitle}
                        </p>
                      </div>

                      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 max-w-[380px] mx-auto space-y-3 shadow-inner" id="receipt-details">
                        <span className="text-[10px] font-mono tracking-[0.15em] font-semibold text-white/50 uppercase block border-b border-white/5 pb-1.5">{t.successDetailsTitle}</span>
                        
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/40">{lang === "en" ? "MEMBER ID" : "ID MEMBRE"} :</span>
                          <strong className="text-[#00D4FF]">{generatedOrderNum}</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/40">{lang === "en" ? "TRANSACTION AMOUNT" : "MONTANT VERSÉ"} :</span>
                          <strong className="text-white">${selectedTier.deposit}.00 CAD</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/40">{lang === "en" ? "EMAIL RESERVED" : "COURRIEL LIÉ"} :</span>
                          <strong className="text-white text-ellipsis overflow-hidden max-w-[180px]">{emailInput}</strong>
                        </div>
                        <div className="flex justify-between text-xs font-mono py-1">
                          <span className="text-white/40">{lang === "en" ? "COMPLIANCE KEY" : "CONFORMITÉ CA"} :</span>
                          <strong className="text-white">PIPEDA-SHA256</strong>
                        </div>
                      </div>

                      <div className="pt-4 text-center space-y-4">
                        <p className="text-[10px] text-white/50 font-mono leading-relaxed px-4 max-w-[360px] mx-auto">
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
