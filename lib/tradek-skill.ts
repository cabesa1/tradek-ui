import { readFileSync } from "node:fs";
import { join } from "node:path";

const root=join(process.cwd(),"chatbot-skills","tradek-importacao");
const files=["references/fundamentos-importacao.md","references/incoterms.md","references/tributos-custos.md","references/operacao-documentos.md","references/supply-chain-producao.md","references/tradek-comercial.md"];
const cache=new Map<string,string>();
function read(relativePath:string){if(!cache.has(relativePath))cache.set(relativePath,readFileSync(join(root,relativePath),"utf8"));return cache.get(relativePath)!}
function normalize(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function sections(markdown:string){return markdown.split(/(?=^#{1,2} )/gm).map(text=>text.trim()).filter(Boolean)}

export function getTradekKnowledge(message:string){
  const normalized=normalize(message);
  const words=new Set(normalized.match(/[a-z0-9]{3,}/g)??[]);
  const expansions:Record<string,string[]>={
    fob:["free","board","frete","risco","incoterm"],cif:["cost","insurance","freight","seguro","risco","incoterm"],
    imposto:["tributos","ncm","icms","ipi","cofins","aduaneiro"],taxa:["tributos","custos","financeiro"],
    supply:["chain","cadeia","finance"],producao:["oem","odm","moq","qualidade","inspecao","lead"],
    oem:["producao","projeto","ferramental"],moq:["quantidade","lote","producao"],inspecao:["qualidade","aql","embarque"],
    importar:["importacao","operacao","viabilidade"],fornecedor:["sourcing","procurement","validacao"]
  };
  for(const word of [...words])for(const extra of expansions[word]??[])words.add(extra);
  const ranked=files.flatMap(file=>sections(read(file)).map(section=>{const text=normalize(section);const title=normalize(section.split("\n")[0]);let score=0;for(const word of words){if(title.includes(word))score+=5;else if(text.includes(word))score+=1}return{section,score}})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score).slice(0,2);
  const skill=read("SKILL.md").split("## Referências")[0].trim();
  const selected=ranked.length?ranked.map(item=>item.section):[sections(read("references/fundamentos-importacao.md"))[0],sections(read("references/tradek-comercial.md"))[0]];
  return[skill,...selected].join("\n\n---\n\n").slice(0,2600);
}
