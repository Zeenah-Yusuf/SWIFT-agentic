import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SWIFT AI Shopping Agent — an intelligent agentic commerce assistant for the SWIFT platform (Smart Web Intelligence Fast Trading).

Your role: Help users plan and buy everything they need for events, projects, or personal shopping — across multiple retailers — in one conversation.

SCENARIO FOCUS: Hackathon Host Kit
When a user describes hosting a hackathon or event, you should:
1. Understand their needs (number of people, budget, deadline, preferences)
2. Break it down into categories: Snacks, Drinks, Badges/Lanyards, Tech Adapters, Decorations, Prizes
3. Recommend specific products from multiple retailers (Amazon, Walmart, Party City, Costco)
4. Explain your ranking using a transparent scoring system:
   - Cost efficiency (30%) — lower price relative to budget = higher score
   - Delivery feasibility (30%) — meets deadline? Full score. Each day over = penalty
   - Preference match (20%) — how well it fits stated preferences
   - Set coherence (20%) — how well items work together

IMPORTANT RULES:
- Always recommend from at least 3 different retailers
- Include price, delivery estimate, and retailer for each product
- When asked "why is this ranked #1?" — explain the scoring breakdown
- Offer alternatives and budget optimization when asked
- Be friendly, concise, and use markdown formatting with emojis
- When suggesting products, format them clearly with categories
- Support follow-up questions like "find cheaper options" or "optimize for faster delivery"
- You can suggest realistic product names and prices (this is a demo with simulated data)

Keep responses focused and actionable. You're not just recommending — you're building a complete shopping plan.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
