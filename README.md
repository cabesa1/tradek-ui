# TradeK — plataforma digital para comércio exterior

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-9FE870?style=flat-square&labelColor=111111)
![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)

Redesign completo da experiência digital da **TradeK**, empresa especializada em importação e comércio exterior. O projeto combina uma apresentação institucional multilíngue com um assistente virtual capaz de qualificar oportunidades comerciais.

> Projeto de interface, desenvolvimento full-stack e integração de IA.

## Visão do projeto

O objetivo foi transformar um site institucional tradicional em uma experiência mais clara, moderna e orientada à conversão. A identidade visual usa preto, branco, cinza e verde-limão para comunicar tecnologia, agilidade e confiança sem perder a seriedade do mercado B2B.

## Principais entregas

- experiência responsiva em português, inglês e espanhol;
- apresentação clara dos serviços de importação e comércio exterior;
- assistente virtual integrado à navegação;
- fluxo de qualificação de leads dentro do chat;
- respostas de IA via Groq em produção e Ollama no desenvolvimento local;
- metadados, sitemap e robots configurados para SEO;
- componentes reutilizáveis e interface acessível.

## Tecnologias

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS` · `Groq API` · `Ollama` · `Drizzle ORM` · `Cloudflare/Vercel`

## Decisões de produto

O chat foi desenhado com comunicação neutra em relação ao provedor de IA: o visitante conversa com o assistente da TradeK, não com a tecnologia por trás dele. As credenciais permanecem exclusivamente no servidor e nunca são expostas ao navegador.

## Executando localmente

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Para habilitar o chat, configure uma das opções abaixo em `.env.local`:

```env
GROQ_API_KEY=sua_chave
# ou
OLLAMA_BASE_URL=http://127.0.0.1:11434
```

Consulte [`docs/chat-deploy.md`](docs/chat-deploy.md) para detalhes de publicação. Não publique arquivos `.env` ou chaves de API.

## Qualidade

```bash
npm run lint
npm run build
```

---

Desenvolvido como projeto de UI/UX, frontend, backend e integração de IA para a TradeK.
