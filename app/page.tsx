import type { Metadata } from "next";
import { ArrowUpRight, Box, Globe2, Link2, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const services = [
  { icon: Link2, title: "Supply Chain Finance", text: "Pagamento ao fornecedor na origem e prazo para sua empresa no Brasil.", href: "/scf" },
  { icon: Globe2, title: "Procurement Internacional", text: "Busca, validação e negociação com fornecedores na China.", href: "/proc" },
  { icon: Box, title: "Produtos da China", text: "Operações de compra em lote com suporte da origem à entrega.", href: "/motos" },
];

export default function Home() {
  return <>
    <a className="skip" href="#conteudo">Ir para o conteúdo</a>
    <SiteHeader/>
    <main id="conteudo" className="minimal-home">
      <section className="bank-hero">
        <div className="shell bank-hero-grid">
          <div className="bank-hero-copy">
            <p className="eyebrow light"><span/> China · Brasil</p>
            <h1>Capital e estrutura para importar melhor.</h1>
            <p>Crédito na origem, fornecedores validados e gestão da operação internacional em uma única estrutura.</p>
            <div className="bank-actions">
              <a className="pill lime-button" href="/contato">Solicitar análise <b><ArrowUpRight size={17}/></b></a>
              <a className="bank-link" href="/scf">Conhecer as soluções <ArrowUpRight size={15}/></a>
            </div>
          </div>
          <aside className="bank-summary" aria-label="Resumo da operação">
            <div className="bank-summary-head"><span>Operação internacional</span><ShieldCheck size={20}/></div>
            <strong>China <i/> Brasil</strong>
            <dl>
              <div><dt>FOB financiável</dt><dd>Até 100%</dd></div>
              <div><dt>Prazo estimado</dt><dd>90–180 dias</dd></div>
            </dl>
            <small>Condições sujeitas à análise cadastral, documental e financeira.</small>
          </aside>
        </div>
      </section>

      <section className="bank-services shell" id="solucoes">
        <div className="bank-section-title">
          <p className="eyebrow light"><span/> Soluções</p>
          <h2>Uma estrutura para cada etapa da operação.</h2>
        </div>
        <div className="bank-service-grid">
          {services.map(({icon:Icon,title,text,href})=><a href={href} key={title}><Icon/><h3>{title}</h3><p>{text}</p><span>Saiba mais <ArrowUpRight size={15}/></span></a>)}
        </div>
      </section>

      <section className="bank-institution shell">
        <div><ShieldCheck/><span>Estrutura empresarial</span></div>
        <p>A TradeK conecta empresas brasileiras à Ásia com capital, execução e controle.</p>
        <a href="/sobre">Conheça a TradeK <ArrowUpRight size={15}/></a>
      </section>

      <section className="bank-cta shell">
        <p className="eyebrow light"><span/> Próxima operação</p>
        <h2>Vamos avaliar sua importação.</h2>
        <a className="pill lime-button" href="/contato">Falar com um especialista <b><ArrowUpRight size={17}/></b></a>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
