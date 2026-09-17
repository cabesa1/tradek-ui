import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import { JsonLd } from "./json-ld";
import { SiteFooter, SiteHeader } from "./site-chrome";

type Step = [string, string];
type Props = { code:string; eyebrow:string; title:string; description:string; cta:string; stepsTitle:string; steps:Step[]; sideTitle:string; sideItems:string[]; note?:string; children?:React.ReactNode };

export function ServicePage({code,eyebrow,title,description,cta,stepsTitle,steps,sideTitle,sideItems,note,children}:Props) {
  const servicePath=code==="SCF"?"/scf":code==="PROC"?"/proc":"/motos";
  const schema={"@context":"https://schema.org","@type":"Service",name:eyebrow,description,url:`https://www.tradek.com.br${servicePath}`,areaServed:{"@type":"Country",name:"Brasil"},provider:{"@id":"https://www.tradek.com.br/#organization"}};
  return <><JsonLd data={schema}/><SiteHeader/><main className="sub-main"><section className="sub-hero"><div className="sub-glow"/><div className="shell sub-hero-grid"><div><a className="back-link" href="/">← Voltar ao início</a><p className="eyebrow light"><span/> {eyebrow}</p><h1>{title}</h1><p>{description}</p><a className="pill lime-button" href="/contato">{cta}<b><ArrowUpRight size={17}/></b></a></div><aside><span>{code}</span><Globe2/><p>Operação conectada<br/>China → Brasil</p></aside></div></section><section className="service-body shell"><div><p className="eyebrow light"><span/> {stepsTitle}</p><ol className="detail-steps">{steps.map(([name,text],i)=><li key={name}><b>0{i+1}</b><div><h2>{name}</h2><p>{text}</p></div></li>)}</ol></div><aside className="check-panel"><p>{sideTitle}</p><ul>{sideItems.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>{note&&<small>{note}</small>}</aside></section>{children}<section className="sub-cta shell"><p className="eyebrow light"><span/> Próximo passo</p><h2>Estruture sua próxima operação com mais controle.</h2><a className="pill lime-button" href="/contato">Solicitar análise <b><ArrowUpRight size={17}/></b></a></section></main><SiteFooter/></>;
}
