import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const reference = url.searchParams.get("reference");
    const amount = url.searchParams.get("amount");

    if (!reference || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing reference or amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Load credentials from environment variables
    const merchantCode = Deno.env.get("INTERSWITCH_MERCHANT_CODE")!;
    const clientId = Deno.env.get("INTERSWITCH_CLIENT_ID")!;
    const secret = Deno.env.get("INTERSWITCH_SECRET")!;
    const dataRef = Deno.env.get("INTERSWITCH_DATA_REF") || "";
    const tillAlias = Deno.env.get("INTERSWITCH_TILL_ALIAS") || "";

    const verifyUrl = `https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode=${merchantCode}&transactionreference=${reference}&amount=${amount}`;

    const resp = await fetch(verifyUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${clientId}:${secret}`)}`,
      },
    });

    const data = await resp.json();

    return new Response(JSON.stringify({ ...data, dataRef, tillAlias }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
