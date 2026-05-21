# Astrateq Gadgets — ASTRA-AI Reservation Funnel
> Premium, high-conversion pre-launch reservation engine for the ASTRA-AI Predictive Vehicle Safety System. 

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Framework: React 18](https://img.shields.io/badge/Framework-React%2018-blue?logo=react)](https://react.dev/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-61dafb?logo=tailwindcss)](https://tailwindcss.com/)
[![Compliance: AODA / WCAG AA](https://img.shields.io/badge/Compliance-AODA%20%2F%20WCAG%20AA-success)](#accessibility--compliance)

---

## 🎯 Project Overview
This repository contains the production-ready front-end web portal for the **Founder Batch 01** market validation campaign engineered for **Astrateq Gadgets**. 

The application is built explicitly to validate consumer demand for the **ASTRA-AI Predictive Vehicle Safety System**—an intelligent, two-part connected hardware setup (Smart OBD-II Diagnostic Dongle + Dual-Lens AI Windshield Camera) designed to mitigate driving anxieties for the Canadian "Sandwich Generation" (adults ages 35–55 caring for aging parents).

To firmly validate purchasing intent under modern 2026/2027 e-commerce paradigms, this site leverages an frictionless, high-trust user experience architecture to capture fully refundable micro-deposits across a structured 3-tier matrix ($25, $85, and $150 CAD) powered securely by Stripe.

---

## 🎨 Design System & UX Philosophy
The user interface follows a **"Light Editorial Tech"** visual framework designed to maximize consumer trust, high contrast, and accessibility while completely avoiding high-friction dark backgrounds or over-aggressive cyber-tech aesthetics.

* **Primary Background:** Pure White (`#FFFFFF`) & Soft Light Grey surfaces (`#F8F9FA`).
* **Typography Hierarchy:** * *Headings:* Elegant Serif (**DM Serif Display**) with an aggressive tight tracking metric (`-0.02em`) to mimic premium editorial layout layers.
  * *Body Text:* High-legibility Sans-Serif (**DM Sans**) optimized with an expanded vertical line-height (`1.6`).
* **Accent Theme:** Modern, high-visibility responsive Cyan (`#00D4FF`) utilized strictly for real-time live connection indicators, status bars, and active states.
* **Layout Grid:** Strict 8-point geometric structural grid. Mobile displays fold into unified 1-column responsive frameworks, while desktop viewports support standard 12-column layouts with spacious horizontal padding margins (`120px`).

---

## 🛠️ Technology Stack
* **Frontend Core:** React 18 (Vite Bundler Architecture) + TypeScript (`StrictMode` enforced)
* **Styling Framework:** Tailwind CSS v3+ (Inline responsive design tokens)
* **Animation Library:** Framer Motion (Orchestrating staggered entrance transitions and micro-interaction spring states)
* **Data Connectivity:** Supabase JavaScript Client (Listening to real-time broadcast channels for live inventory batch counts)
* **Payment Pipeline:** Stripe Elements / Stripe Payment Intents SDK

---

## 📦 Features & Component Architecture
1. **Global Navigation Header:** Sticky component using dynamic backdrop blur parameters (`backdrop-blur-md bg-white/80`) featuring local toggle options (`EN | FR`).
2. **F-Pattern Split Hero Section:** Left-aligned benefit-focused copy with clear structural conversion buttons stacked immediately above an inline credential trust row ("100% Fully Refundable" and "Canadian Data Residency").
3. **Live Scarcity Monitor Bar:** Implements a localized progress counter reading exactly `"247 of 250 spots remaining in Batch 01"`, synched to a custom pulsing breathing animation dot mimicking active Supabase listeners.
4. **Hardware Ecosystem Accordion:** Interactive blocks mapping hardware mechanics into clear, accessible human terms rather than raw developer metrics.
5. **3-Tier Pricing Architecture Grid:** Three balanced grey layout surfaces highlighting the respective micro-deposit tiers ($25 / $85 / $150 CAD) with persistent baseline text declaring refund guarantees.

---

## 🚀 Environment Configurations & Setup

To deploy this application seamlessly to production environments like Vercel or Netlify, you must map the following environment keys into your local setup or provider deployment pipelines:

```bash
# Stripe API Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PRICE_EARLYBIRD=price_...
VITE_STRIPE_PRICE_FOUNDING=price_...
VITE_STRIPE_PRICE_GUARDIAN=price_...

# Supabase Real-Time Engine Keys
VITE_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
VITE_SUPABASE_ANON_KEY=eyJhbG...
