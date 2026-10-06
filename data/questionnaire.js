export const UNKNOWN = ['nao-sei', 'prefiro-nao-responder'];
const unsure = [{value:'nao-sei',label:'Não sei'},{value:'prefiro-nao-responder',label:'Prefiro não responder'}];
const yn = [{value:'sim',label:'Sim'},{value:'nao',label:'Não'}];
const q = (id,title,help,choices,when) => ({id,title,help,choices:[...choices,...unsure],when});
export const questions = [
 q('objetivo','Qual assunto você quer organizar primeiro?','Escolha o assunto que mais motivou esta visita.',[{value:'vontade',label:'Registrar intenções para o futuro'},{value:'transferir',label:'Entender transferências em vida'},{value:'gestao',label:'Organizar a gestão e as decisões'},{value:'caixa',label:'Planejar recursos para uma transição'}]),
 q('falecimento','Já ocorreu um falecimento relacionado a esta situação?','Uma sucessão em andamento precisa de avaliação própria.',yn),
 q('continuidade','Você deseja que a atividade rural continue na família?','Pense na intenção geral, sem precisar definir quem assumirá.',yn),
 q('terra','Há imóveis rurais envolvidos?','Não informe localização precisa ou dados dos imóveis.',yn),
 q('ufs','Os imóveis estão em mais de uma UF?','A jurisdição é um tema para a consulta, não uma definição de tributo neste site.',yn,a=>a.terra==='sim'),
 q('empresa','Há participações em uma sociedade ou empresa?','Considere quotas ou outras participações ligadas ao patrimônio ou negócio.',yn),
 q('socios','Há sócios fora do núcleo familiar?','Contratos e interesses de outros envolvidos podem precisar de atenção.',yn,a=>a.empresa==='sim'),
 q('transferencia','Você quer discutir transferir bens durante a vida?','Uma intenção não significa que a operação seja adequada.',yn),
 q('renda','Você gostaria de manter uso ou renda após uma transferência?','Use isto como pergunta para o profissional; não como garantia de resultado.',yn,a=>a.transferencia==='sim'),
 q('gestao','Você gostaria de continuar participando da gestão?','Gestão, renda e propriedade são assuntos diferentes.',yn),
 q('herdeiros','Como é a participação de familiares no negócio?','Não informe nomes ou parentescos específicos.',[{value:'todos',label:'A maioria participa'},{value:'alguns',label:'Alguns participam e outros não'},{value:'nenhum',label:'Ninguém participa atualmente'}]),
 q('acordos','Já existem regras ou acordos sobre decisões e responsabilidades?','Considere regras formais ou combinados que precisam ser revisados.',yn),
 q('liquidez','Há preocupação com recursos para manter a atividade durante a transição?','Não informe valores ou saldos.',yn),
 q('conflitos','Há conflitos relevantes, disputa ou pressão para decidir?','Uma situação sensível merece escuta e análise individual.',yn),
 q('dividas','Há dívidas relevantes ou risco financeiro que pode afetar o patrimônio?','Não informe credores ou valores.',yn),
 q('atencao','Existe alguma situação familiar que exige cuidado individual?','Por exemplo, vulnerabilidade ou dúvida sobre representação. Não descreva a situação aqui.',yn)
];
// Regras de encaminhamento vêm antes das regras exploratórias.
export const referralRules = [
 {id:'sucessao-aberta',question:'falecimento',value:'sim',reason:'Você informou que já ocorreu um falecimento. Via, prazos, obrigações e continuidade devem ser avaliados diretamente.'},
 {id:'conflito',question:'conflitos',value:'sim',reason:'Você informou conflito ou pressão para decidir. O questionário não avalia interesses e riscos individuais.'},
 {id:'risco-financeiro',question:'dividas',value:'sim',reason:'Você informou dívidas relevantes ou risco financeiro. Transferências e obrigações exigem análise individual.'},
 {id:'cuidado-individual',question:'atencao',value:'sim',reason:'Você informou uma situação familiar que exige cuidado individual.'}
];
export const explorationRules = [
 {id:'registrar-vontade',question:'objetivo',value:'vontade',option:'testamento',reason:'Seu objetivo é conversar sobre o registro de intenções para o futuro.'},
 {id:'transferir-objetivo',question:'objetivo',value:'transferir',option:'doacao',reason:'Seu objetivo inclui entender transferências em vida.'},
 {id:'transferir-intencao',question:'transferencia',value:'sim',option:'doacao',reason:'Você quer discutir transferência durante a vida.'},
 {id:'preservar-renda',question:'renda',value:'sim',option:'doacao',reason:'Você quer discutir uso ou renda após uma transferência; o usufruto pode ser um tema, sujeito a análise.'},
 {id:'organizar-gestao',question:'objetivo',value:'gestao',option:'governanca',reason:'Seu objetivo é organizar gestão e decisões.'},
 {id:'continuar-atividade',question:'continuidade',value:'sim',option:'governanca',reason:'Você deseja conversar sobre continuidade da atividade na família.'},
 {id:'papeis-distintos',question:'herdeiros',value:'alguns',option:'governanca',reason:'Familiares participam de formas diferentes do negócio.'},
 {id:'quotas-existentes',question:'empresa',value:'sim',option:'participacoes',reason:'Há participações societárias; contratos, titularidade e gestão merecem análise própria.'},
 {id:'planejar-caixa',question:'objetivo',value:'caixa',option:'liquidez',reason:'Seu objetivo é planejar recursos para uma transição.'},
 {id:'necessidade-recursos',question:'liquidez',value:'sim',option:'liquidez',reason:'Você tem preocupação com recursos para manter a atividade.'}
];
export function activeQuestions(answers) {return questions.filter(q=>!q.when || q.when(answers));}
export function sanitizeAnswers(answers) {
 const active=activeQuestions(answers);const clean={};
 for(const q of active) if(q.choices.some(c=>c.value===answers[q.id])) clean[q.id]=answers[q.id];
 return clean;
}
export function evaluate(input) {
 const answers=sanitizeAnswers(input), active=activeQuestions(answers);
 const referrals=referralRules.filter(r=>answers[r.question]===r.value);
 const unknown=active.filter(q=>!answers[q.id] || UNKNOWN.includes(answers[q.id])).map(q=>q.title);
 const known=active.length-unknown.length;
 const cautions=[];
 if(answers.ufs==='sim') cautions.push('Há bens em mais de uma UF: a competência e as regras locais precisam de análise.');
 if(answers.socios==='sim') cautions.push('Existem sócios fora da família: contratos e interesses de terceiros precisam de análise.');
 for(const id of ['falecimento','conflitos','dividas','atencao']) if(!answers[id]||UNKNOWN.includes(answers[id])) cautions.push(`A resposta sobre “${questions.find(q=>q.id===id).title}” ficou em aberto. Isso não significa ausência de risco.`);
 if(referrals.length) return {status:'referral',reasons:referrals.map(r=>r.reason),options:[],unknown,cautions};
 if(known<5 || unknown.length>active.length/2) return {status:'insufficient',options:[],unknown,cautions};
 const matched=explorationRules.filter(r=>answers[r.question]===r.value);
 const grouped=new Map();
 for(const r of matched){if(!grouped.has(r.option))grouped.set(r.option,{id:r.option,reasons:[],ruleIds:[]});grouped.get(r.option).reasons.push(r.reason);grouped.get(r.option).ruleIds.push(r.id);}
 // Ordem documental das regras, nunca percentual ou ranking de adequação.
 const options=[...grouped.values()].slice(0,3);
 if(options.length<2)return {status:'insufficient',options:[],unknown,cautions};
 return {status:'explore',options,unknown,cautions};
}
