// Nenhum cálculo ou alíquota está habilitado. Mudanças exigem fonte oficial,
// cenário jurisdicional completo e registro de revisão profissional.
export const taxRules = {
 status:'Pendente de pesquisa e revisão profissional', calculatorEnabled:false,
 items:{
  itcmd:{name:'ITCMD',kind:'Tributo estadual',jurisdiction:'UF competente a verificar',description:'Investigar eventual incidência em doação ou transmissão após falecimento, competência, base de cálculo, progressividade, isenções e efeitos da legislação atual.',sources:['cf','ec132','lc227'],missing:'UF competente, data, tipo de transmissão, bens, valores, vínculos e legislação estadual consolidada.'},
  itbi:{name:'ITBI',kind:'Tributo municipal',jurisdiction:'Município competente a verificar',description:'Investigar tratamento de operações com imóveis, inclusive transferências para sociedades. Não presumir incidência, imunidade ou isenção.',sources:['cf'],missing:'Município, operação, imóvel, valores, atividade da sociedade e legislação e entendimento aplicáveis.'},
  ir:{name:'Imposto de renda e ganho de capital',kind:'Tributo federal',jurisdiction:'Federal',description:'Investigar os efeitos dos valores de aquisição, declaração e transferência, conforme a operação e o sujeito envolvido.',sources:['ir','receita'],missing:'Operação, titular, histórico de aquisição, valores fiscais, período e regras federais verificadas.'},
  consumo:{name:'IBS/CBS e atividade rural',kind:'Tributos a investigar no contexto da reforma',jurisdiction:'Competência e período a verificar',description:'Conferir EC 132/2023, LC 214/2025 e LC 227/2026 em seus textos consolidados. A pertinência depende da atividade e operação; não presumir aplicação a toda sucessão.',sources:['ec132','lc214','lc227'],missing:'Atividade, sujeito, operação, período de transição e dispositivos pertinentes verificados.'},
  formalizacao:{name:'Formalização e assessoria',kind:'Custos não tributários',jurisdiction:'Órgão, UF e profissionais envolvidos',description:'Separar emolumentos de cartório ou registro, taxas do procedimento e honorários profissionais. Custos recorrentes de sociedades também precisam ser considerados.',sources:['cnj'],missing:'Ato, local, tabelas vigentes, serviços necessários e propostas dos profissionais.'}
 }
};
export function estimate() {return {enabled:false,message:'Não é possível estimar com segurança com as informações disponíveis',missing:'Faltam cenário, regras oficiais verificadas e revisão jurídica e contábil. Nenhum tributo, taxa ou honorário foi calculado.'};}
