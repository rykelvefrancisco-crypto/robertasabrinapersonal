import { z } from "zod";

export const qualificationSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  age: z.coerce.number().int().min(1, "Informe uma idade válida").max(120),
  location: z.string().trim().min(2, "Informe cidade e bairro").max(150),
  experience: z.enum(["Iniciante", "Intermediária", "Avançada"], { required_error: "Selecione seu nível" }),
  whatsapp: z.string().transform((v) => v.replace(/\D/g, "")).refine((v) => /^\d{10,11}$/.test(v), "Informe um WhatsApp válido"),
});
export type Qualification = z.infer<typeof qualificationSchema>;
export function qualificationWhatsApp(data: Qualification) {
  const message = `Olá, Roberta! Vim pelo seu site e quero começar meu treino 💪\n*Nome:* ${data.name}\n*Idade:* ${data.age} anos\n*Mora em:* ${data.location}\n*Experiência:* ${data.experience}\n*Meu WhatsApp:* ${data.whatsapp}\nPodemos conversar?`;
  return `https://wa.me/5583981995502?text=${encodeURIComponent(message)}`;
}