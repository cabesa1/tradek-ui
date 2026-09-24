"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChevronDown, MessageCircle, Paperclip, Send, Sparkles, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "./language-provider";

type Message = { role: "user" | "assistant"; content: string };

const specialists = {
  "/scf": {
    title: "Agente Supply Chain Finance",
    greeting: "Olá! Para começar, qual é o seu nome?",
    unit: "supply_chain_finance",
  },
  "/proc": {
    title: "Agente Procurement Internacional",
    greeting: "Olá! Para começar, qual é o seu nome?",
    unit: "procurement",
  },
  "/motos": {
    title: "Agente Produtos da China",
    greeting: "Olá! Para começar, qual é o seu nome?",
    unit: "produtos_motos",
  },
} as const;

const fallback = {
  title: "Agente TradeK",
  greeting: "Olá! Para começar, qual é o seu nome?",
  unit: "geral",
};

const chatCopy = {
  pt: { greeting: "Olá! Para começar, qual é o seu nome?", subtitle: "Assistente virtual", placeholder: "Digite sua mensagem…", error: "Não consegui responder agora. Tente novamente em instantes.", disclaimer: "Respostas geradas por IA. Confirme condições comerciais com a equipe TradeK." },
  en: { greeting: "Hello! To get started, what is your name?", subtitle: "Virtual assistant", placeholder: "Type your message…", error: "I couldn't reply right now. Please try again shortly.", disclaimer: "AI-generated answers. Confirm commercial terms with the TradeK team." },
  es: { greeting: "¡Hola! Para comenzar, ¿cuál es su nombre?", subtitle: "Asistente virtual", placeholder: "Escriba su mensaje…", error: "No pude responder ahora. Inténtelo de nuevo en unos momentos.", disclaimer: "Respuestas generadas por IA. Confirme las condiciones comerciales con el equipo TradeK." },
};
const titles = {
  pt: { geral:"Agente TradeK", supply_chain_finance:"Agente Supply Chain Finance", procurement:"Agente Procurement Internacional", produtos_motos:"Agente Produtos da China" },
  en: { geral:"TradeK Agent", supply_chain_finance:"Supply Chain Finance Agent", procurement:"International Procurement Agent", produtos_motos:"Products from China Agent" },
  es: { geral:"Agente TradeK", supply_chain_finance:"Agente de Supply Chain Finance", procurement:"Agente de Procurement Internacional", produtos_motos:"Agente de Productos de China" },
};

export function TradekChat() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const copy = chatCopy[language];
  const specialist = specialists[pathname as keyof typeof specialists] ?? fallback;
  const title = titles[language][specialist.unit as keyof typeof titles.pt];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("agent") === "1") setOpen(true);
  }, [searchParams]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: copy.greeting }]);
    setStage(0);
  }, [copy.greeting]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    });
  }, [open, messages, loading]);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text } satisfies Message];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((message) => message.content !== copy.greeting), unit: specialist.unit, stage, language }),
      });
      if (!response.ok) throw new Error("Falha ao consultar o agente");
      if (response.headers.get("content-type")?.startsWith("text/plain") && response.body) {
        setLoading(false); setMessages((current) => [...current,{role:"assistant",content:""}]);
        const reader=response.body.getReader();const decoder=new TextDecoder();
        while(true){const{done,value}=await reader.read();if(done)break;const chunk=decoder.decode(value,{stream:true});setMessages((current)=>current.map((message,index)=>index===current.length-1?{...message,content:message.content+chunk}:message));}
      } else {
        const data = (await response.json()) as { reply?: string; error?: string; nextStage?: number };
        if (!data.reply) throw new Error(data.error || "Falha ao consultar o agente");
        setMessages((current) => [...current, { role: "assistant", content: data.reply! }]);
        if (typeof data.nextStage === "number") setStage(data.nextStage);
      }
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        content: copy.error,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") setOpen(false);
  }

  function requestAttachment() {
    setMessages((current) => [...current, {
      role: "assistant",
      content: "Antes de anexar um documento, preciso de alguns dados seus (nome, empresa, CNPJ etc.). Pode me passar essas informações primeiro?",
    }]);
  }

  return <>
    <button className="chat-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar agente TradeK" : "Abrir agente TradeK"} aria-expanded={open}>
      {open ? <ChevronDown size={24}/> : <MessageCircle size={24}/>}
    </button>

    {open && <section className="chat-panel" role="dialog" aria-label={title}>
      <header className="chat-header">
        <span className="chat-avatar"><Sparkles size={18}/></span>
        <div><strong>{title}</strong><small>{copy.subtitle}</small></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar conversa"><X size={18}/></button>
      </header>

      <div className="chat-messages" ref={listRef} aria-live="polite">
        {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
        {loading && <div className="chat-message assistant chat-typing" aria-label="Agente digitando"><i/><i/><i/></div>}
      </div>

      <form className="chat-composer" onSubmit={sendMessage}>
        <button type="button" onClick={requestAttachment} aria-label="Anexar documento"><Paperclip size={19}/></button>
        <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} placeholder={copy.placeholder} aria-label="Mensagem" disabled={loading}/>
        <button className="chat-send" type="submit" disabled={!input.trim() || loading} aria-label="Enviar mensagem"><Send size={18}/></button>
      </form>
      <small className="chat-disclaimer">{copy.disclaimer}</small>
    </section>}
  </>;
}
