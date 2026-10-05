import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({ head: () => ({ meta: [{ title: "Acesso da treinadora | Roberta Sabrina" },{ name:"description",content:"Acesso exclusivo ao painel da treinadora."},{ property:"og:title",content:"Acesso da treinadora | Roberta Sabrina"},{ property:"og:description",content:"Acesso exclusivo ao painel da treinadora."},{ property:"og:type",content:"website"},{ name:"twitter:card",content:"summary"}] }), component: LoginPage });

function LoginPage() {
  const navigate = useNavigate(); const [user,setUser]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e: React.FormEvent) { e.preventDefault(); setLoading(true); setError(""); if(user.trim().toLowerCase()!=="robertasabrina"){setError("Usuário ou senha inválidos.");setLoading(false);return;} const result=await supabase.auth.signInWithPassword({email:"robertasabrina@admin.local",password}); if(result.error){setError("Usuário ou senha inválidos.");setLoading(false);return;} navigate({to:"/admin"}); }
  return <main className="flex min-h-screen items-center justify-center bg-background px-5"><div className="w-full max-w-sm"><Link to="/" className="mb-10 block"><BrandLogo /></Link><div className="rounded-2xl border border-border bg-card p-6 shadow-glow"><LockKeyhole className="mb-4 size-8 text-brand-pink"/><h1 className="font-display text-2xl font-black">Área da treinadora</h1><p className="mt-2 text-sm text-muted-foreground">Acesso exclusivo para Roberta Sabrina.</p><form onSubmit={submit} className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-semibold">Usuário<Input value={user} onChange={e=>setUser(e.target.value)} autoComplete="username" required className="h-12 bg-secondary"/></label><label className="grid gap-2 text-sm font-semibold">Senha<Input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required className="h-12 bg-secondary"/></label>{error&&<p className="text-sm text-destructive" role="alert">{error}</p>}<Button variant="premium" size="lg" disabled={loading}>{loading?"Entrando…":"Entrar"}</Button></form></div></div></main>;
}