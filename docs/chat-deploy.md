# Agente TradeK no site publicado

O site e a rota `/api/chat` rodam na Vercel. A geração das respostas precisa de um modelo hospedado; Supabase pode guardar dados, mas não executa o modelo por si só.

## Configuração na Vercel

1. Crie uma chave de API no [Groq Console](https://console.groq.com/keys).
2. No projeto da Vercel, abra **Settings → Environment Variables** e cadastre `GROQ_API_KEY` com a chave. Marque **Production** e, se desejar testar deploys de branch, **Preview**.
3. Faça um novo deploy da `main`. A variável é lida apenas no servidor e não deve ir para o GitHub nem para variáveis com prefixo `NEXT_PUBLIC_`.
4. Envie uma pergunta real ao agente no site publicado. O fluxo inicial de qualificação é local à rota; perguntas abertas precisam da chave e do provedor disponíveis.

O modelo padrão no Groq é `openai/gpt-oss-20b`. Para trocá-lo, defina `GROQ_MODEL` na Vercel e faça novo deploy. O plano gratuito do provedor tem limites; confira o painel da conta antes de usar o chat com tráfego de produção.

## Teste local

Sem `GROQ_API_KEY`, a rota usa Ollama em `http://127.0.0.1:11434` com `qwen2.5:3b`. Se precisar apontar para outra instância de Ollama, defina `OLLAMA_BASE_URL`. Se `GROQ_API_KEY` estiver definida, o Groq tem prioridade também no ambiente local.
