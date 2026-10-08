import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { qualificationSchema as schema, qualificationWhatsApp, type Qualification as FormData } from "@/lib/qualification";
import { submitQualification } from "@/lib/qualification.functions";
import { toast } from "sonner";


function maskPhone(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11);
  return v.length > 10 ? v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3") : v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
}

export function QualificationForm() {
  const { register, setValue, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const selected = watch("experience");
  const submit = async (data: FormData) => {
    try {
      const url = qualificationWhatsApp(data);
      toast.success("Avaliando! Abrindo o WhatsApp...");
      window.location.href = url;
    } catch (error) {
      toast.error("Não foi possível abrir o WhatsApp. Tente novamente.");
    }
  };
  const fieldClass = "h-12 rounded-xl border-border bg-secondary/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-pink";
  return <form onSubmit={handleSubmit(submit)} className="grid gap-5" noValidate>
    <label className="grid gap-2 text-sm font-semibold">Nome<Input {...register("name")} placeholder="Como você se chama?" className={fieldClass} />{errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}</label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Idade<Input {...register("age")} inputMode="numeric" placeholder="Sua idade" className={fieldClass} />{errors.age && <span className="text-xs text-destructive">{errors.age.message}</span>}</label><label className="grid gap-2 text-sm font-semibold">Onde mora<Input {...register("location")} placeholder="Cidade / Bairro" className={fieldClass} />{errors.location && <span className="text-xs text-destructive">{errors.location.message}</span>}</label></div>
    <fieldset className="grid gap-2"><legend className="mb-2 text-sm font-semibold">Experiência com treino</legend><div className="grid grid-cols-3 gap-2">{(["Iniciante","Intermediária","Avançada"] as const).map(level => <Button key={level} type="button" variant={selected === level ? "premium" : "outline"} className="h-11 px-2 text-xs sm:text-sm" onClick={() => setValue("experience", level, { shouldValidate: true })}>{selected === level && <CheckCircle2 />}{level}</Button>)}</div>{errors.experience && <span className="text-xs text-destructive">{errors.experience.message}</span>}</fieldset>
    <label className="grid gap-2 text-sm font-semibold">Seu WhatsApp<Input {...register("whatsapp")} onChange={(e) => setValue("whatsapp", maskPhone(e.target.value), { shouldValidate: true })} inputMode="tel" placeholder="(83) 99999-9999" className={fieldClass} />{errors.whatsapp && <span className="text-xs text-destructive">{errors.whatsapp.message}</span>}</label>
    <Button type="submit" variant="premium" size="lg" className="mt-2 h-14 w-full text-base" disabled={isSubmitting}>{isSubmitting ? "Enviando…" : <>Quero começar agora <ArrowRight /></>}</Button>
  </form>;
}
