export default {
  async fetch(request: Request): Promise<Response> {
    // 1. Menangani CORS (Izin Akses Browser)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Menangani Preflight request
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // 2. Menangani Request ke /nickname/:game
    if (request.method === "POST" && path.startsWith("/nickname/")) {
      try {
        const game = path.split("/")[2];
        const body = await request.json() as any;
        const { id, server } = body;

        // Logika Fetch ke Codashop (Mirip repo asli)
        // Catatan: Ini adalah logika dasar, pastikan ID & Server benar
        const response = await fetch("https://api.isan.eu.org/nickname/" + game, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, server })
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    return new Response(JSON.stringify({ message: "API Validator Aktif" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};
