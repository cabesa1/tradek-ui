import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata:Metadata={title:"Perguntas frequentes",description:"Dúvidas sobre financiamento de importação, procurement e produtos da China.",alternates:{canonical:"/faq"},openGraph:{url:"/faq"}};

const groups=[
  {name:"Supply Chain Finance",items:[
    ["Preciso ter experiência em importação?","Não. A TradeK orienta todo o processo, do início à finalização. O requisito é ter a empresa regularizada para operar."],
    ["Preciso ter RADAR?","Sim. O RADAR/Siscomex é obrigatório para importar. Se ainda não tiver, orientamos como obter."],
    ["O prazo é garantido?","Não totalmente. O prazo médio varia entre 90 e 180 dias, dependendo da análise e aprovação de crédito e das condições da operação."],
    ["O financiamento é automático?","Não. Todas as operações passam por análise cadastral, financeira e documental."],
    ["Quais documentos são necessários?","Contrato social, cartão CNPJ, comprovante de endereço, documentos dos sócios, RADAR ativo e Invoice ou Proforma."],
  ]},
  {name:"Procurement Internacional",items:[
    ["A TradeK escolhe o fornecedor?","Você define a demanda e participa da decisão. A TradeK busca, pré-seleciona, valida e negocia as opções."],
    ["Posso importar sem conhecer fornecedores na China?","Sim. Encontramos fornecedores do zero conforme seu briefing."],
    ["Vocês fazem inspeção?","Sim. Oferecemos amostra e inspeção de qualidade antes do embarque."],
    ["É possível pedir amostra?","Sim. A amostragem faz parte do processo de validação."],
    ["Quanto tempo leva o sourcing?","Varia conforme a complexidade do produto e as certificações exigidas."],
    ["Preciso ter especificação técnica?","Ajuda muito, mas podemos apoiar na definição das especificações."],
  ]},
  {name:"Produtos da China",items:[
    ["Que tipos de produto vocês têm?","O catálogo parte de mobilidade elétrica e recebe novas categorias. Fale com a equipe sobre o que procura."],
    ["Existe quantidade mínima?","Sim. A compra é por lote — normalmente um contêiner. O MOQ é confirmado na cotação."],
    ["Posso comprar para revender no Brasil?","Sim. O objetivo é comprar do fornecedor chinês e revender no Brasil com importação assistida."],
    ["Como pago o fornecedor?","É possível usar Supply Chain Finance e pagar em 90–180 dias, sujeito à análise."],
    ["Precisa de certificação ou homologação?","Pode ser necessária conforme a categoria, como INMETRO ou ANATEL. Orientamos sobre o enquadramento."],
    ["A proposta é automática?","Não. A proposta comercial é validada pela equipe TradeK."],
  ]},
];

const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:groups.flatMap(group=>group.items.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}})))};

export default function Page(){return <><JsonLd data={faqSchema}/><SiteHeader/><main className="sub-main"><section className="faq shell"><p className="eyebrow light"><span/> Central de ajuda</p><h1>Perguntas frequentes</h1>{groups.map(g=><section key={g.name}><h2>{g.name}</h2>{g.items.map(([q,a])=><details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>)}</section>)}</section></main><SiteFooter/></>}
