import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { type, to, data } = await req.json();

    let subject: string;
    let html: string;

    if (type === "space_confirmation") {
      subject = "Spacio — Confirmation de votre demande d'espace";
      html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h1 style="color:#1a1a2e;font-size:24px;">Merci pour votre demande !</h1>
          <p>Bonjour <strong>${data.organization_name}</strong>,</p>
          <p>Nous avons bien reçu votre demande${data.space_title ? ` pour <strong>${data.space_title}</strong>` : ""}.</p>
          <p>Notre équipe vous recontactera sous <strong>24 heures</strong> pour étudier votre demande.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:13px;color:#888;">Spacio — La marketplace d'espaces pour les associations</p>
        </div>
      `;
    } else if (type === "diagnostic_results") {
      const scoreColor = data.score < 30 ? "#ef4444" : data.score < 60 ? "#f59e0b" : "#22c55e";
      const advice = data.score < 30
        ? "Votre espace est peu utilisé. Pensez à le mutualiser avec d'autres organisations."
        : data.score < 60
        ? "Votre espace a un potentiel d'optimisation. Diversifiez ses usages sur les créneaux libres."
        : "Félicitations ! Votre espace est bien utilisé.";

      subject = `Spacio — Votre Intensi'Score : ${data.score}/100`;
      html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h1 style="color:#1a1a2e;font-size:24px;">Votre Intensi'Score</h1>
          <p>Bonjour <strong>${data.organization}</strong>,</p>
          <div style="text-align:center;margin:24px 0;">
            <span style="font-size:48px;font-weight:800;color:${scoreColor};">${data.score}</span>
            <span style="font-size:18px;color:#888;">/100</span>
          </div>
          <p style="text-align:center;color:#888;">Occupation moyenne : ${Math.round(data.ratio * 100)}%</p>
          <div style="background:#f8f9fa;border-radius:12px;padding:16px;margin:24px 0;">
            <p style="margin:0;font-weight:600;">💡 Conseil Spacio</p>
            <p style="margin:8px 0 0;color:#555;">${advice}</p>
          </div>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:13px;color:#888;">Spacio — La marketplace d'espaces pour les associations</p>
        </div>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Unknown email type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Spacio <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
