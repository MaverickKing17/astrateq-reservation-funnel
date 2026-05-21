import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // Email helper function to generate Apple/Samsung-like professional email
  function generateEmailHtml(
    lang: "en" | "fr",
    tierName: string,
    depositAmount: number,
    orderNumber: string,
    emailAddress: string
  ): string {
    const isEn = lang === "en";
    const title = isEn ? "Reservation Confirmed" : "Réservation Confirmée";
    const subtitle = isEn 
      ? "FOUNDER BATCH 01 PRIORITY RANKING LOCKED" 
      : "RANG PRIORITAIRE SÉCURISÉ - LOT PILOTE 01";
    
    const bannerText = isEn 
      ? "Welcome to Astrateq Gadgets" 
      : "Bienvenue chez Astrateq Gadgets";

    const greeting = isEn
      ? `Thank you for choosing Astrateq Gadgets. Your pre-launch deposit has been successfully processed. You have secured an exclusive, high-priority rank in the <strong>Founder Batch 01</strong> pool for the Astra-AI Predictive Vehicle Safety System.`
      : `Merci d'avoir choisi Astrateq Gadgets. Votre dépôt de pré-lancement a été traité avec succès. Vous avez sécurisé un rang exclusif et de haute priorité dans le <strong>Lot de Sélection 01</strong> pour la suite de sécurité prédictive Astra-AI.`;

    const summaryTitle = isEn ? "RESERVATION DETAILED SUMMARY" : "RÉSUMÉ DÉTAILLÉ DE LA RÉSERVATION";
    
    const labelOrder = isEn ? "Order Number" : "Numéro de commande";
    const labelTier = isEn ? "Ecosystem Tier" : "Formule d'Écosystème";
    const labelDeposit = isEn ? "Deposit Paid" : "Acompte Payé";
    const labelEmail = isEn ? "Registered Email" : "Courriel lié";
    const labelStatus = isEn ? "Status" : "Statut de la transaction";
    const valueStatus = isEn ? "Secured & Verified" : "Sécurisé & Vérifié";

    const refundBadge = isEn 
      ? "✓ 100% Refundable Deposit (cancellation@astrateq.com)"
      : "✓ Dépôt 100% remboursable (cancellation@astrateq.com)";

    const complianceTitle = isEn ? "PIPEDA Canadian Security Compliant" : "Conformité d'infrastructure PIPEDA (LPRPDE)";
    const complianceText = isEn
      ? "Your reservation data is stored securely in alignment with Canadian consumer safety guidelines. No driving metrics or diagnostics telemetry will ever be shared with third parties without your explicit consent."
      : "Vos données de réservation sont stockées en toute sécurité conformément aux réglementations canadiennes de protection des consommateurs. Aucune télémétrie de conduite ne sera partagée sans votre consentement.";

    const supportTitle = isEn ? "Support & Inquiries" : "Support & Assistance";
    const supportText = isEn
      ? "If you want to modify your reservation or request a hassle-free, no-questions-asked refund, simply reply to this email or write to cancellation@astrateq.com. Your deposit postback is processed in under 2 business days."
      : "Pour modifier votre réservation ou demander un remboursement rapide sans justification, répondez simplement à ce message ou écrivez à cancellation@astrateq.com. Le remboursement est initié en moins de 48 heures.";

    const footerText = isEn
      ? "Astrateq Gadgets Canada © 2026. Engineered for ultimate Canadian winter road driving readiness."
      : "Astrateq Gadgets Canada © 2026. Conçu pour résister aux conditions routières extrêmes de l'hiver canadien.";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #050505;
            color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0c0c0c;
            border: 1px solid #1a1a1a;
            border-radius: 16px;
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
          }
          .header {
            background-color: #050505;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid #1a1a1a;
          }
          .logo-area {
            font-size: 11px;
            font-family: Menlo, Monaco, Consolas, monospace;
            color: #00D4FF;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            margin-bottom: 16px;
          }
          .email-title {
            font-size: 26px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
            margin: 0;
            font-family: "Georgia", serif;
            line-height: 1.2;
          }
          .tagline {
            font-size: 10px;
            font-family: Menlo, Monaco, Consolas, monospace;
            color: #ffffff;
            letter-spacing: 0.15em;
            margin-top: 12px;
            opacity: 0.6;
          }
          .content-body {
            padding: 40px 30px;
          }
          .intro-text {
            font-size: 15px;
            line-height: 1.6;
            color: #cccccc;
            margin-bottom: 35px;
          }
          .summary-card {
            background-color: #121212;
            border: 1px solid #222222;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 35px;
          }
          .summary-header {
            font-size: 11px;
            font-family: Menlo, Monaco, Consolas, monospace;
            color: #00D4FF;
            letter-spacing: 0.2em;
            border-bottom: 1px solid #222;
            padding-bottom: 12px;
            margin-bottom: 16px;
            font-weight: bold;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            font-size: 13px;
            border-bottom: 1px solid #1a1a1a;
          }
          .summary-row:last-child {
            border-bottom: none;
          }
          .summary-label {
            color: #888888;
            font-weight: 500;
          }
          .summary-value {
            color: #ffffff;
            font-weight: 600;
            font-family: Menlo, Monaco, Consolas, monospace;
          }
          .summary-value.highlight {
            color: #00D4FF;
          }
          .refund-banner {
            background-color: rgba(0, 212, 255, 0.05);
            border: 1px dashed rgba(0, 212, 255, 0.3);
            color: #00D4FF;
            padding: 14px;
            border-radius: 8px;
            text-align: center;
            font-size: 11px;
            font-family: Menlo, Monaco, Consolas, monospace;
            letter-spacing: 0.05em;
            margin-top: 12px;
          }
          .info-block {
            border-top: 1px solid #1a1a1a;
            padding-top: 25px;
            margin-top: 25px;
          }
          .info-block-title {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }
          .info-block-desc {
            font-size: 12px;
            line-height: 1.5;
            color: #888888;
          }
          .footer {
            background-color: #050505;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #1a1a1a;
            font-size: 11px;
            color: #555555;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-area">ASTRA-AI</div>
            <h1 class="email-title">${title}</h1>
            <div class="tagline">${subtitle}</div>
          </div>
          
          <div class="content-body">
            <div class="intro-text">
              ${greeting}
            </div>
            
            <div class="summary-card">
              <div class="summary-header">${summaryTitle}</div>
              
              <div class="summary-row">
                <span class="summary-label">${labelOrder}</span>
                <span class="summary-value">${orderNumber}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">${labelTier}</span>
                <span class="summary-value" style="font-family: inherit;">${tierName}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">${labelDeposit}</span>
                <span class="summary-value highlight">$${depositAmount} CAD</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">${labelEmail}</span>
                <span class="summary-value" style="font-family: inherit;">${emailAddress}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">${labelStatus}</span>
                <span class="summary-value" style="color: #10B981;">${valueStatus}</span>
              </div>
              
              <div class="refund-banner">
                ${refundBadge}
              </div>
            </div>
            
            <div class="info-block">
              <div class="info-block-title">🔒 ${complianceTitle}</div>
              <div class="info-block-desc">${complianceText}</div>
            </div>

            <div class="info-block" style="margin-bottom: 10px;">
              <div class="info-block-title">✉️ ${supportTitle}</div>
              <div class="info-block-desc">${supportText}</div>
            </div>
          </div>
          
          <div class="footer">
            ${footerText}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // --- API Routes ---

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Main high-conversion reservation and email dispatcher API endpoint
  app.post("/api/reserve", async (req, res) => {
    const { email, tierName, deposit, orderNumber, language } = req.body;

    // Validate email format on server side too for robust security
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid email address format provided." 
      });
    }

    if (!tierName || !deposit || !orderNumber) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required reservation data parameters." 
      });
    }

    const selectedLang = language === "fr" ? "fr" : "en";
    console.log(`Processing reservation for ${email} ($${deposit} CAD) [${orderNumber}]`);

    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const fromEmail = process.env.SMTP_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = process.env.SMTP_FROM_NAME || "Astrateq Gadgets";

    const subject = selectedLang === "en"
      ? `Order Confirmed: Astrateq Gadgets Pre-Launch Rank - ${orderNumber}`
      : `Commande confirmée : Rang pré-lancement Astrateq Gadgets - ${orderNumber}`;

    const htmlBody = generateEmailHtml(selectedLang, tierName, deposit, orderNumber, email);

    // 1. Try Resend if configured
    if (resendApiKey) {
      try {
        console.log("Using Resend API wrapper to send pre-launch priority reservation confirmation.");
        const resend = new Resend(resendApiKey);

        // Resend requires verified domains unless using "onboarding@resend.dev"
        const finalFrom = resendApiKey.startsWith("re_") && fromEmail === "onboarding@resend.dev"
          ? "onboarding@resend.dev"
          : fromEmail;

        const response = await resend.emails.send({
          from: `"${fromName}" <${finalFrom}>`,
          to: [email],
          subject,
          html: htmlBody,
        });

        if (response.error) {
          console.error("Resend API returned error:", response.error);
          throw new Error(response.error.message);
        }

        console.log("Resend confirmation email sent successfully!", response.data);
        return res.status(200).json({
          success: true,
          emailSent: true,
          provider: "resend",
          orderNumber,
          email
        });
      } catch (error: any) {
        console.error("Resend delivery failed, checking SMTP fallback:", error.message || error);
      }
    }

    // 2. Try SMTP fallback if configured
    if (smtpHost && smtpUser && smtpPass) {
      try {
        console.log("Using NodeMailer SMTP fallback to send confirmation email.");
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for port 465, false otherwise
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"${fromName}" <${fromEmail}>`,
          to: email,
          subject,
          html: htmlBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`NodeMailer SMTP email sent successfully! MessageID: ${info.messageId}`);

        return res.status(200).json({
          success: true,
          emailSent: true,
          provider: "smtp",
          orderNumber,
          email
        });
      } catch (error: any) {
        console.error("NodeMailer SMTP fallback failed:", error);
      }
    }

    // 3. Fallback Simulation Mode
    console.warn("No active email provider keys are fully configured. Email simulated.");
    return res.status(200).json({
      success: true,
      emailSent: false,
      warning: "No active email keys configured. Reservation succeeded and was printed to system logs.",
      orderNumber,
      email
    });
  });

  // --- Serve Frontend Assets via Vite (Dev) or Express static (Prod) ---
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
