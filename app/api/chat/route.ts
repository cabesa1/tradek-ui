import { NextRequest, NextResponse } from "next/server";
import { getTradekKnowledge } from "@/lib/tradek-skill";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const unitContext: Record<string, string> = {
  supply_chain_finance: "Você está atendendo sobre Supply Chain Finance: importação financiada, pagamento do fornecedor na origem e prazo no Brasil, sempre sujeito a análise.",
  procurement: "Você está atendendo sobre Procurement Internacional: busca, validação, negociação e gestão de fornecedores na China.",
  produtos_motos: "Você está atendendo sobre Produtos da China: catálogo, cotações, compra em lote e revenda no Brasil.",
  geral: "Identifique se a demanda é sobre Supply Chain Finance, Procurement Internacional ou Produtos da China e conduza o visitante ao tema adequado.",
};

const demandQuestion: Record<string, string> = {
  supply_chain_finance: "O que sua empresa pretende importar e de qual país da Ásia?",
  procurement: "Qual produto ou fornecedor sua empresa precisa encontrar na China?",
  produtos_motos: "Qual produto da China sua empresa procura e em qual quantidade?",
  geral: "O que sua empresa precisa resolver hoje: financiar uma importação, encontrar fornecedores ou comprar produtos da China?",
};

type Language = "pt" | "en" | "es";
const flowCopy = {
  pt:{name:"Como posso chamar você?",company:"Qual é o nome da sua empresa?",value:"Qual é o valor aproximado dessa operação? Pode informar uma estimativa em reais ou dólares.",valueRetry:"Pode me passar uma faixa aproximada em reais ou dólares?",cnpj:"Qual é o CNPJ da empresa? Se ainda não tiver essa informação, pode responder “não tenho agora”",cnpjRetry:"Informe o CNPJ com 14 números ou responda “não tenho agora”",phone:"Qual é o melhor WhatsApp para nossa equipe entrar em contato?",phoneRetry:"Qual é o melhor WhatsApp para contato, com DDD?",pleasure:"Prazer",done:"Já reuni os dados iniciais da sua operação nesta conversa. Qual dúvida sobre essa operação você quer esclarecer?",scope:"Posso ajudar apenas com a operação comercial que você informou. Sua dúvida é sobre crédito, prazo, fornecedor, produto ou próxima etapa?"},
  en:{name:"What should I call you?",company:"What is your company’s name?",value:"What is the approximate value of this operation? You may estimate it in US dollars or Brazilian reais.",valueRetry:"Could you give me an approximate value range in dollars or reais?",cnpj:"What is the company’s Brazilian tax ID (CNPJ)? If you do not have it now, reply “I don’t have it now”",cnpjRetry:"Please provide the 14-digit CNPJ or reply “I don’t have it now”",phone:"What is the best WhatsApp number for our team to contact you?",phoneRetry:"What is the best WhatsApp number, including country and area code?",pleasure:"Nice to meet you",done:"I have gathered the initial details of your operation in this conversation. What would you like to clarify about it?",scope:"I can help with the commercial operation you described. Is your question about credit, terms, suppliers, products or the next step?"},
  es:{name:"¿Cómo puedo llamarle?",company:"¿Cuál es el nombre de su empresa?",value:"¿Cuál es el valor aproximado de esta operación? Puede estimarlo en dólares o reales.",valueRetry:"¿Puede indicarme un rango aproximado en dólares o reales?",cnpj:"¿Cuál es el CNPJ de la empresa? Si no lo tiene ahora, responda “no lo tengo ahora”",cnpjRetry:"Indique el CNPJ de 14 dígitos o responda “no lo tengo ahora”",phone:"¿Cuál es el mejor número de WhatsApp para que nuestro equipo le contacte?",phoneRetry:"¿Cuál es el mejor WhatsApp, con código de país y área?",pleasure:"Mucho gusto",done:"Ya reuní los datos iniciales de su operación en esta conversación. ¿Qué desea aclarar sobre ella?",scope:"Puedo ayudar con la operación comercial que indicó. ¿Su duda es sobre crédito, plazo, proveedores, productos o el próximo paso?"}
};
const askQuestionCopy: Record<Language, string> = {
  pt: "Claro. Qual é a sua dúvida?",
  en: "Of course. What would you like to know?",
  es: "Claro. ¿Cuál es su duda?",
};
function detectLanguage(text:string,preferred?:string):Language{if(/\b(the|what|why|how|company|supplier|dollars?|hello|hi|my name|i have|cost)\b/i.test(text))return"en";if(/[¿¡]|\b(qué|cuál|cuánto|quién|proveedor|importación|hola|me llamo|tengo|costo|plazo)\b/i.test(text))return"es";return preferred==="en"||preferred==="es"?preferred:"pt"}
function demandFor(language:Language,unit:string){const values={pt:demandQuestion[unit]??demandQuestion.geral,en:{supply_chain_finance:"What does your company plan to import, and from which country in Asia?",procurement:"What product or supplier does your company need to find in China?",produtos_motos:"What product from China is your company looking for, and in what quantity?",geral:"What does your company need: import finance, supplier sourcing or products from China?"}[unit as "geral"]??"What does your company need: import finance, supplier sourcing or products from China?",es:{supply_chain_finance:"¿Qué desea importar su empresa y desde qué país de Asia?",procurement:"¿Qué producto o proveedor necesita encontrar su empresa en China?",produtos_motos:"¿Qué producto de China busca su empresa y en qué cantidad?",geral:"¿Qué necesita su empresa: financiación de importación, búsqueda de proveedores o productos de China?"}[unit as "geral"]??"¿Qué necesita su empresa: financiación de importación, búsqueda de proveedores o productos de China?"};return values[language]}

const systemPrompt = `Você é o consultor comercial da TradeK para operações entre Ásia e Brasil.
Leia a conversa e a base recuperada antes de responder. Responda à intenção exata; não confunda importação, tributos, logística, produção, Supply Chain e Supply Chain Finance.
Não presuma o assunto de uma dúvida que o cliente ainda não fez. Se ele apenas disser que deseja perguntar ou esclarecer algo, peça que envie a pergunta sem sugerir FOB, preço, crédito ou qualquer outro tema.
Use até 7 linhas curtas, sem gerúndio, com explicação suficiente para esclarecer e avançar a conversa. Faça no máximo uma pergunta específica ao final. Não repita a pergunta nem use frases vagas.
Use sempre "a TradeK". Não invente alíquotas, taxas, aprovação, economia, licenças ou prazos garantidos. Diga quando algo depende de NCM, documentos, análise de crédito ou validação profissional.
Se houver objeção, esclareça com fatos da base e conecte ao impacto citado. Se o cliente perguntar durante a qualificação, responda antes de retomar os dados. Nunca peça senha, cartão ou dado bancário.`;

function validMessages(value: unknown): value is ChatMessage[] {
  return Array.isArray(value) && value.length <= 30 && value.every((item) => item && typeof item === "object" &&
    ((item as ChatMessage).role === "user" || (item as ChatMessage).role === "assistant") &&
    typeof (item as ChatMessage).content === "string" && (item as ChatMessage).content.length <= 4000);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { messages?: unknown; unit?: string; stage?: number; language?: string };
    if (!validMessages(body.messages)) return NextResponse.json({ error: "Conversa inválida." }, { status: 400 });
    const messages = body.messages;
    const userMessages = messages.filter((message) => message.role === "user");
    const firstName = userMessages[0]?.content.trim().replace(/[^\p{L}\p{M}' -]/gu, "").replace(/\s+/g, " ").split(" ")[0].slice(0, 30);
    const answer = userMessages.at(-1)?.content.trim() ?? "";
    const previousAssistant = [...messages].reverse().find((message) => message.role === "assistant")?.content ?? "";
    const normalizedAnswer = answer.normalize("NFKC").replace(/[‘’“”]/g, "'").replace(/[.!]+$/g, "").trim();
    const language = detectLanguage(answer, body.language);
    const copy = flowCopy[language];
    const stage = Number.isInteger(body.stage) ? Math.max(0, Math.min(6, body.stage!)) : 0;
    const looksLikeQuestion = /\?|[¿]|\b(como|quando|onde|por que|porque|qual|quanto|quem|voc[eê]|preço|taxa|what|why|how|when|where|who|price|rate|qué|cuál|cuanto|cuánto|quién|precio|tasa)\b/i.test(answer);
    const wantsToAsk = /(?:primeiro|antes).*(?:d[uú]vida|pergunt)|(?:gostaria|quero|posso).*(?:tirar|fazer|esclarecer).*(?:d[uú]vida|pergunta)|i (?:have|want to ask).*(?:question|doubt)|(?:first|before).*(?:question|ask)|(?:tengo|quiero hacer|puedo hacer).*(?:pregunta|duda)|(?:primero|antes).*(?:pregunta|duda)/i.test(answer);
    const onlyAnnouncesQuestion = wantsToAsk && !/\b(fob|cif|exw|taxa|preço|preco|custo|prazo|crédito|credito|fornecedor|produto|importa(?:r|ção|cao)|frete|seguro|tributo|imposto|price|cost|rate|credit|supplier|product|import|shipping|precio|costo|tasa|crédito|proveedor|producto|importación)\b/i.test(answer);
    const currentDemandQuestion = demandFor(language,body.unit??"geral");
    const qualificationPrompts = [copy.company, currentDemandQuestion, copy.value, copy.valueRetry, copy.cnpj, copy.cnpjRetry, copy.phone, copy.phoneRetry];
    const previousWasQualification = !previousAssistant || qualificationPrompts.some((prompt) => previousAssistant.includes(prompt));
    const shouldUseAI = looksLikeQuestion || wantsToAsk || !previousWasQualification;

    if (onlyAnnouncesQuestion) {
      return NextResponse.json({ reply: askQuestionCopy[language], nextStage: stage });
    }

    if (!shouldUseAI) {
    if (stage === 0) {
      const name = answer.replace(/^(meu nome é|me chamo|my name is|i am|i'm|me llamo|soy)\s+/i, "").replace(/[^\p{L}\p{M}' -]/gu, "").replace(/\s+/g, " ").slice(0, 60);
      if (!name || name.split(" ").length > 5 || looksLikeQuestion) return NextResponse.json({reply:copy.name,nextStage:0});
      return NextResponse.json({ reply: `${copy.pleasure}, ${name}. ${copy.company}`, nextStage: 1 });
    }
    if (stage === 1) {
      if (answer.length < 2 || answer.length > 100 || looksLikeQuestion) return NextResponse.json({reply:copy.company,nextStage:1});
      return NextResponse.json({ reply: demandFor(language,body.unit??"geral"), nextStage: 2 });
    }
    if (stage === 2) {
      if (answer.length < 5 || looksLikeQuestion) return NextResponse.json({reply:demandFor(language,body.unit??"geral"),nextStage:2});
      return NextResponse.json({ reply: copy.value, nextStage: 3 });
    }
    if (stage === 3) {
      const hasValue = /\d/.test(answer) || /\b(meio|half|medio|um|uma|one|un|uno|dois|duas|two|dos|três|tres|three|quatro|four|cinco|five|seis|six|sete|seven|oito|eight|nove|nine|dez|ten|cem|hundred|cien|cento|mil|thousand|milhão|milhao|milhões|milhoes|million|millón|millones|dólar|dolar|dólares|dolares|dollars?|reais?|usd|brl)\b/i.test(answer) || /não sei|ainda não sei|não tenho ideia|a definir|sem estimativa|don't know|do not know|no estimate|no sé|no se|sin estimación|sin estimacion/i.test(answer);
      if (!hasValue || looksLikeQuestion) return NextResponse.json({reply:copy.valueRetry,nextStage:3});
      return NextResponse.json({ reply: copy.cnpj, nextStage: 4 });
    }
    if (stage === 4) {
      const digits = answer.replace(/\D/g, "");
      const unavailable = /não tenho|nao tenho|não sei|nao sei|depois|don'?t have|do not have|i have no|not available|no lo tengo|no tengo|no lo sé|no lo se/i.test(normalizedAnswer);
      if ((digits.length !== 14 && !unavailable) || looksLikeQuestion) return NextResponse.json({reply:copy.cnpjRetry,nextStage:4});
      return NextResponse.json({ reply: copy.phone, nextStage: 5 });
    }
    if (stage === 5) {
      const digits = answer.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13 || looksLikeQuestion) return NextResponse.json({reply:copy.phoneRetry,nextStage:5});
      const salutation = firstName ? `, ${firstName}` : "";
      return NextResponse.json({ reply: `${language==="pt"?"Perfeito":language==="en"?"Perfect":"Perfecto"}${salutation}. ${copy.done}`, nextStage: 6, qualified: true });
    }
    }
    const groqKey = process.env.GROQ_API_KEY;
    const useGroq = Boolean(groqKey);
    if (process.env.VERCEL && !useGroq && !process.env.OLLAMA_BASE_URL) {
      return NextResponse.json({ error: "O agente ainda não foi configurado no servidor." }, { status: 503 });
    }
    const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);
    const modelMessages = messages.map((message, index) => index === messages.length - 1 && message.role === "user" && language !== "pt" ? { ...message, content: `${message.content}\n\n${language === "en" ? "Answer this message only in natural English." : "Responde este mensaje únicamente en español natural."}` } : message);
    const knowledge = getTradekKnowledge(answer);
    const modelInput = [
      { role: "system", content: `${systemPrompt}\nRespond only in ${language==="pt"?"Brazilian Portuguese":language==="en"?"English":"Spanish"}.\n${unitContext[body.unit ?? "geral"] ?? unitContext.geral}\n\nUse this TradeK skill as your factual source:\n${knowledge}` },
      ...modelMessages,
    ];
    const response = await fetch(useGroq ? "https://api.groq.com/openai/v1/chat/completions" : `${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(useGroq ? { Authorization: `Bearer ${groqKey}` } : {}) },
      signal: controller.signal,
      body: JSON.stringify(useGroq
        ? { model: process.env.GROQ_MODEL ?? "openai/gpt-oss-20b", stream: true, messages: modelInput, temperature: 0.15, reasoning_effort: "low", include_reasoning: false, max_completion_tokens: 400 }
        : { model: process.env.OLLAMA_MODEL ?? "qwen2.5:3b", stream: true, keep_alive: "30m", messages: modelInput, options: { temperature: 0.15, num_predict: 180, num_ctx: 3072 } }),
    });
    if (!response.ok) throw new Error(`Provedor de IA respondeu ${response.status}`);
    if (!response.body) throw new Error("Resposta vazia do modelo");
    const reader=response.body.getReader();const decoder=new TextDecoder();const encoder=new TextEncoder();let buffer="";
    const stream=new ReadableStream({async pull(target){const{done,value}=await reader.read();if(done){clearTimeout(timeout);target.close();return}buffer+=decoder.decode(value,{stream:true});const lines=buffer.split("\n");buffer=lines.pop()??"";for(const line of lines){const data=useGroq?line.trim().replace(/^data:\s*/,""):line.trim();if(!data||data==="[DONE]")continue;try{const item=JSON.parse(data) as {message?:{content?:string};choices?:Array<{delta?:{content?:string}}>};const content=(useGroq?item.choices?.[0]?.delta?.content:item.message?.content)?.replace(/\bda cálculo\b/gi,"do cálculo");if(content)target.enqueue(encoder.encode(content))}catch{}}},cancel(){clearTimeout(timeout);reader.cancel()}});
    return new Response(stream,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError" ? "O agente demorou para responder." : "O agente está indisponível no momento.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
