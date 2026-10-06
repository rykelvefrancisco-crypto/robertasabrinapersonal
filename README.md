# Roberta Sabrina: Sua Transformação

Crie uma landing page de alta conversão, moderna e profissional, com área administrativa protegida por login, para a personal trainer Roberta Sabrina. Site em português (pt-BR), mobile-first e totalmente responsivo.

## IDENTIDADE
- Nome: Roberta Sabrina | Personal Trainer | CREF 013477-G/PB
- Slogan: "Transformando vidas através do movimento"
- Tom de voz: profissional, motivador, enérgico, focado em resultados ("Vamos juntas alcançar seus objetivos!")
- Visual: dark mode sofisticado. Cores: fundo roxo profundo #1a0b2e, roxo vibrante #6b21a8, rosa/magenta #ec4899. Use gradientes roxo→rosa nos botões e destaques, cards com bordas sutis, cantos bem arredondados, sombras com brilho rosa, animações suaves de entrada ao rolar a página. Fonte: Montserrat (títulos pesados em 800/900).
- Logo: monograma "R S" em roxo com uma silhueta rosa de pessoa levantando uma barra com anilhas entre as letras, e abaixo "ROBERTA SABRINA" e "PERSONAL TRAINER" em rosa. Crie como SVG e deixe um espaço fácil de substituir pelo logo oficial.

## LANDING PAGE (rota /)
1. **Header fixo** com logo e links de âncora (Sobre, Serviços, Evolução, Avaliação) e um botão "Começar agora".
2. **Hero:** logo, headline "Cada treino é um passo mais perto da sua melhor versão", subtítulo curto e botão CTA "Quero minha avaliação" que rola suavemente até o questionário. Fundo com gradiente radial roxo.
3. **Quem sou eu:** 23 anos, Bacharel em Educação Física, treinadora dedicada a transformar vidas através do movimento, apaixonada por esporte e novos desafios. Mostre o selo "CREF 013477-G/PB" bem visível, uma coluna de 3 cards com os fatos e um espaço para foto dela.
4. **Serviços (4 cards com ícones lucide):** Atendimento Personalizado, Musculação, Funcional, Consultoria On-line e Presencial. Cada um com 1 linha de descrição.
5. **Galeria de Evolução das Alunas:** grid responsivo com as fotos cadastradas pela admin, carregadas dinamicamente do banco. Se não houver fotos, mostre placeholders elegantes com "Em breve: resultados das alunas". Clique na foto abre em lightbox.
6. **Questionário de qualificação (funil para WhatsApp):** formulário limpo com validação (react-hook-form + zod):
   - Nome (obrigatório)
   - Idade (número, obrigatório)
   - Onde mora (Cidade/Bairro, obrigatório)
   - Experiência com treino: seletor em botões (Iniciante / Intermediária / Avançada)
   - WhatsApp da aluna (obrigatório, com máscara brasileira)
   Ao enviar, monte esta mensagem e redirecione para https://wa.me/5583981995502?text=<mensagem codificada com encodeURIComponent>:
   "Olá, Roberta! Vim pelo seu site e quero começar meu treino 💪
   *Nome:* ...
   *Idade:* ... anos
   *Mora em:* ...
   *Experiência:* ...
   *Meu WhatsApp:* ...
   Podemos conversar?"
   Salve também cada resposta numa tabela "leads" para a Roberta consultar no painel.
7. **Rodapé** com logo, CREF, link do Instagram @robertasabrinapersonaltrainer, botão flutuante de WhatsApp (mesmo número) e link discreto "Área da treinadora" para /admin.

## ÁREA ADMINISTRATIVA
- **Backend:** use Supabase (Auth + Database + Storage) para que tudo seja persistente e compartilhado entre todos os visitantes. NÃO use localStorage para as fotos.
- **/admin/login:** tela limpa com usuário e senha. Crie a conta única da administradora no Supabase Auth com:
  - Usuário: robertasabrina (mapeie internamente para o e-mail robertasabrina@admin.local, o campo do formulário pede apenas "Usuário")
  - Senha: sabrinapersonal321
  Desative o cadastro público (sign-ups) para que ninguém mais consiga criar conta.
- **/admin (protegida):** redirecione para o login se não houver sessão. Use RLS: só a admin autenticada pode inserir/apagar fotos e ler leads; qualquer visitante pode apenas ler as fotos.
- **Painel com abas:**
  - **Fotos de evolução:** upload múltiplo com arrastar e soltar e pré-visualização. Comprima/redimensione a imagem no cliente (máx. 1200px) antes de enviar ao Supabase Storage (bucket público "evolucao"). Grid das fotos enviadas, com botão de excluir (com confirmação) e campo opcional de legenda. As fotos aparecem na galeria pública imediatamente.
  - **Leads:** tabela com os questionários recebidos (nome, idade, local, nível, WhatsApp, data), com botão "Chamar no WhatsApp" em cada linha.
- Botão "Sair" e link "Ver site".

## QUALIDADE
- SEO básico (title, meta description, Open Graph), imagens com alt, contraste acessível, foco visível, loading states e toasts de sucesso/erro.
- Código componentizado em React + TypeScript + Tailwind + shadcn/ui.
- Comece pela landing page e pelo formulário, depois implemente o login e o painel.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://robertasabrinapersonal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5ef0d2a2-c878-4000-a764-fafc2c465b06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
