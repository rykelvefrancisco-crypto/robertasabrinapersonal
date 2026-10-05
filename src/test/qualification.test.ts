import { describe, expect, it } from "vitest";
import { qualificationSchema, qualificationWhatsApp } from "@/lib/qualification";
const input = { name:"Maria Silva", age:30, location:"João Pessoa / Centro", experience:"Iniciante", whatsapp:"(83) 99999-1234" };
describe("Qualificação da aluna",()=>{
  it.each(["name","age","location","experience","whatsapp"])("exige %s",field=>{expect(qualificationSchema.safeParse({...input,[field]:undefined}).success).toBe(false);});
  it.each(["Iniciante","Intermediária","Avançada"])("aceita nível %s",experience=>{expect(qualificationSchema.parse({...input,experience}).experience).toBe(experience);});
  it("usa o WhatsApp indicado e todos os dados da mensagem",()=>{const url=new URL(qualificationWhatsApp(qualificationSchema.parse(input)));expect(url.pathname).toBe("/5583981995502");expect(url.searchParams.get("text")).toBe("Olá, Roberta! Vim pelo seu site e quero começar meu treino 💪\n*Nome:* Maria Silva\n*Idade:* 30 anos\n*Mora em:* João Pessoa / Centro\n*Experiência:* Iniciante\n*Meu WhatsApp:* 83999991234\nPodemos conversar?");});
});