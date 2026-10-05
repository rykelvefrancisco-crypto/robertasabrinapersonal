import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { qualificationSchema } from "./qualification";

export const submitQualification = createServerFn({ method: "POST" })
  .inputValidator((data) => qualificationSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error("Service indisponible.");
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_publishable_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from("leads").insert(data);
    if (error) throw new Error("Não foi possível salvar sua avaliação.");
    return { ok: true };
  });