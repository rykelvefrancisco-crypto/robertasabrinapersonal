import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  age: z.coerce.number().int().min(14, "Idade mínima: 14 anos").max(100),
  location: z.string().trim().min(2, "Informe cidade e bairro").max(150),
  experience: z.enum(["Iniciante", "Intermediária", "Avançada"], { required_error: "Selecione seu nível" }),
  whatsapp: z.string().transform((v) => v.replace(/\D/g, "")).refine((v) => /^\d{10,11}$/.test(v), "Informe um WhatsApp válido"),
});
type FormData = z.infer<typeof schema>;

function maskPhone(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11);
  return v.length > 10 ? v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3") : v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
}

export function QualificationForm() {
  const { register, setValue, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const selected = watch("experience");
  const submit = async (data: FormData) => {
    const { error } = await supabase.from("leads").insert({ name: data.name, age: data.age, location: data.location, experience: data.experience, whatsapp: data.whatsapp });
    if (error) { toast.error("Não foi possível enviar. Tente novamente."); return; }
    const message = `Olá, Roberta! Vim pelo seu site e quero começar meu treino 💪\n*Nome:* ${data.name}\n*Idade:* ${data.age} anos\n*Mora em:* ${data.location}\n*Experiência:* ${data.experience}\n*Meu WhatsApp:* ${data.whatsapp}\nPodemos conversar?`;
    toast.success("Avaliação enviada! Abrindo o WhatsApp…");
    window.location.href = `https://wa.me/5583981995502?text=${encodeURIComponent(message)}`;
  };
  const fieldClass = "h-12 rounded-xl border-border bg-secondary/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-pink";
  return <form onSubmit={handleSubmit(submit)} className="grid gap-5" noValidate>
    <label className="grid gap-2 text-sm font-semibold">Nome<Input {...register("name")} placeholder="Como você se chama?" className={fieldClass} />{errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}</label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Idade<Input {...register("age")} inputMode="numeric" placeholder="Sua idade" className={fieldClass} />{errors.age && <span className="text-xs text-destructive">{errors.age.message}</span>}</label><label className="grid gap-2 text-sm font-semibold">Onde mora<Input {...register("location")} placeholder="Cidade / Bairro" className={fieldClass} />{errors.location && <span className="text-xs text-destructive">{errors.location.message}</span>}</label></div>
    <fieldset className="grid gap-2"><legend className="mb-2 text-sm font-semibold">Experiência com treino</legend><div className="grid grid-cols-3 gap-2">{(["Iniciante","Intermediária","Avançada"] as const).map(level => <Button key={level} type="button" variant={selected === level ? "premium" : "outline"} className="h-11 px-2 text-xs sm:text-sm" onClick={() => setValue("experience", level, { shouldValidate: true })}>{selected === level && <CheckCircle2 />}{level}</Button>)}</div>{errors.experience && <span className="text-xs text-destructive">{errors.experience.message}</span>}</fieldset>
    <label className="grid gap-2 text-sm font-semibold">Seu WhatsApp<Input {...register("whatsapp")} onChange={(e) => setValue("whatsapp", maskPhone(e.target.value) as never, { shouldValidate: true })} inputMode="tel" placeholder="(83) 99999-9999" className={fieldClass} />{errors.whatsapp && <span className="text-xs text-destructive">{errors.whatsapp.message}</span>}</label>
    <Button type="submit" variant="premium" size="lg" className="mt-2 h-14 w-full text-base" disabled={isSubmitting}>{isSubmitting ? "Enviando…" : <>Quero começar agora <ArrowRight /></>}</Button>
  </form>;
}