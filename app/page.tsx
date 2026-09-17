import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, Landmark, Search, Ship } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const solutions = [
  { id: "01", icon: Landmark, label: "Supply Chain Finance", title: "Importe agora. Pague com prazo.", text: "Pagamento à vista para seu fornecedor na Ásia e até 180 dias para sua empresa pagar no Brasil.", action: "Conhecer Supply Chain Finance" },
  { id: "02", icon: Search, label: "Procurement Internacional", title: "O fornecedor certo, validado na origem.", text: "Busca, homologação, negociação e inspeção de fornecedores chineses conduzidas de ponta a ponta.", action: "Encontrar fornecedores" },
  { id: "03", icon: Globe2, label: "Produtos da China", title: "Produtos prontos para ganhar escala.", text: "Compra em lote, fornecedores selecionados e suporte completo para importar e revender no Brasil.", action: "Conhecer o catálogo" },
];

const steps = [
  ["01", "Entendemos a operação", "Produto, volume, fornecedor e objetivo financeiro."],
  ["02", "Desenhamos a estrutura", "Crédito, documentos, negociação e conformidade."],
  ["03", "Executamos na origem", "Pagamento, inspeção e acompanhamento na Ásia."],
  ["04", "Acompanhamos até o Brasil", "Visibilidade da operação até a liquidação."],
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <SiteHeader />

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-art" aria-hidden="true"><div className="orb one"/><div className="orb two"/><div className="route-mark"><span>CN</span><i/><span>BR</span></div></div>
          <div className="hero-word" aria-hidden="true">TRADEK</div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> China · Brasil · Trade Operations</p>
              <h1><span>Importe da Ásia.</span><span>Preserve seu caixa.</span><span>Acelere seu negócio.</span></h1>
              <p className="lead">Crédito, fornecedores e gestão da operação em uma estrutura única para sua empresa comprar melhor e crescer com previsibilidade.</p>
              <div className="actions"><a className="pill primary" href="#contato">Avaliar minha importação <b><ArrowUpRight size={17}/></b></a><a className="pill outline" href="#solucoes">Ver soluções</a></div>
              <p className="assurance"><Check size={14}/> Análise individual e sem compromisso</p>
            </div>
            <aside className="hero-card">
              <div className="card-label"><span>ROTA DA OPERAÇÃO</span><b>CHINA → BRASIL</b></div>
              <div className="route-visual"><div><i/><strong>Fornecedor</strong><small>Recebe à vista</small></div><span><Ship size={25}/></span><div><i/><strong>Sua empresa</strong><small>Paga com prazo</small></div></div>
              <div className="metric"><span>FOB financiável</span><strong>Até 100%</strong></div>
              <div className="metric"><span>Prazo estimado</span><strong>90–180 dias</strong></div>
              <p>Sujeito à análise cadastral, documental e financeira.</p>
            </aside>
          </div>
          <div className="shell hero-foot"><span>Operação internacional estruturada</span><span>Atendimento empresarial</span><a href="#solucoes">Explore <ArrowDown size={14}/></a></div>
        </section>

        <section className="statement shell" id="empresa">
          <div className="statement-mark"><Globe2/><p>Presença na origem para decisões mais seguras.</p></div>
          <h2>A TradeK conecta empresas brasileiras à Ásia com <em>capital, execução e controle em cada etapa da operação.</em></h2>
        </section>

        <section className="band shell" aria-label="Proposta TradeK"><div>Conecte</div><div>Financie</div><div><ArrowRight/></div><div>Importe</div></section>

        <section className="solutions shell" id="solucoes">
          <div className="section-heading"><p className="eyebrow dark"><span/> Nossas soluções</p><h2>Comece pelo desafio da sua empresa.</h2></div>
          <div className="solution-grid">
            {solutions.map(({id,icon:Icon,label,title,text,action}, index)=><article className="solution" key={id}><div className="solution-top"><span>{id}</span><Icon size={24}/></div><p className="solution-label">{label}</p><h3>{title}</h3><p>{text}</p><a href={["/scf","/proc","/motos"][index]}>{action}<ArrowUpRight size={17}/></a></article>)}
          </div>
        </section>

        <section className="process" id="processo"><div className="shell"><p className="eyebrow light"><span/> Como funciona</p><h2>Uma operação internacional, sem pontos cegos.</h2><ol>{steps.map(([n,t,d])=><li key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span><ArrowUpRight/></span></li>)}</ol></div></section>

        <section className="numbers shell"><div><p className="eyebrow light"><span/> Estrutura da operação</p><h2>Condições que trabalham a favor do seu crescimento.</h2><dl><div><dt>Até</dt><dd>100% <small>do FOB financiável</small></dd></div><div><dt>Entre</dt><dd>90–180 <small>dias para pagamento</small></dd></div><div><dt>Presença</dt><dd>2 países <small>China e Brasil</small></dd></div></dl></div></section>

        <section className="contact shell" id="contato"><p className="eyebrow dark"><span/> Próxima operação</p><h2>Vamos descobrir se essa estrutura faz sentido para sua empresa.</h2><a className="pill primary" href="/contato">Falar com um especialista <b><ArrowUpRight size={17}/></b></a></section>
      </main>

      <SiteFooter />
    </>
  );
}
