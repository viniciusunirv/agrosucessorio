import {itcmdStates, instrumentScenarios, ITCMD_DATE} from './itcmd.js';
export function currentTaxDate(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const value=t=>parts.find(p=>p.type===t).value;return `${value('year')}-${value('month')}-${value('day')}`;}
export function parseMoney(value) {
 if(typeof value!=='string')return null;
 const s=value.trim().replace(/^R\$\s*/, '');let major,minor='';
 if(/^\d+(?:\.\d{1,2})$/.test(s)&&!s.includes(',')){[major,minor]=s.split('.');}
 else if(/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(s)){
  [major,minor='']=s.split(',');major=major.replaceAll('.','');
 }else return null;
 const cents=BigInt(major)*100n+BigInt(minor.padEnd(2,'0')||'0');
 if(cents<=0n||cents>1000000000000000n)return null;
 return Number(cents);
}
export function formatMoney(cents){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);}
function roundingTax(cents,bps){return (BigInt(cents)*BigInt(bps)+5000n)/10000n;}
// Regras de teste não são tabela tributária: todo registro real precisa cumprir
// o gate de fontes, datas e revisão antes de entrar no cálculo público.
export function calculateSchedule(baseCents,schedule){
 if(!Number.isSafeInteger(baseCents)||baseCents<0)throw new Error('Base inválida');
 if(!schedule||!Array.isArray(schedule.bands)||!schedule.bands.length)throw new Error('Faixas ausentes');
 let previous=0;
 for(let i=0;i<schedule.bands.length;i++){
  const b=schedule.bands[i];
  if(!Number.isInteger(b.rateBps)||b.rateBps<0||b.rateBps>10000)throw new Error('Alíquota inválida');
  if(b.upToCents===null){if(i!==schedule.bands.length-1)throw new Error('Faixa ilimitada fora do final');}
  else if(!Number.isSafeInteger(b.upToCents)||b.upToCents<=previous)throw new Error('Limites inválidos');
  if(b.upToCents!==null)previous=b.upToCents;
 }
 if(schedule.bands.at(-1).upToCents!==null)throw new Error('Faixa final ausente');
 const breakdown=[];let total=0n;let lower=0;
 if(schedule.method==='flat'){
  if(schedule.bands.length!==1)throw new Error('Alíquota única com várias faixas');
  const rate=schedule.bands[0].rateBps;total=roundingTax(baseCents,rate);breakdown.push({baseCents,rateBps:rate,taxCents:Number(total)});
 }else if(schedule.method==='marginal'){
  for(const band of schedule.bands){
   const upper=band.upToCents===null?baseCents:Math.min(baseCents,band.upToCents);
   const amount=Math.max(0,upper-lower);
   if(amount){const tax=roundingTax(amount,band.rateBps);total+=tax;breakdown.push({baseCents:amount,rateBps:band.rateBps,taxCents:Number(tax)});}
   if(band.upToCents===null||baseCents<=band.upToCents)break;
   lower=band.upToCents;
  }
 }else throw new Error('Método não suportado');
 if(total>BigInt(Number.MAX_SAFE_INTEGER))throw new Error('Resultado fora do limite');
 return {taxCents:Number(total),breakdown};
}
function validDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return false;const d=new Date(`${s}T12:00:00Z`);return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===s;}
const blocked=issues=>({status:'blocked',issues,taxCents:null,results:[]});
export function simulateITCMD(input,registry=itcmdStates,today=currentTaxDate()){
 const issues=[];const config=instrumentScenarios[input.instrument];
 if(!config)return blocked(['Este tema não define uma transmissão sujeita a cálculo de ITCMD por si só.']);
 if(!config.operations.includes(input.operation))issues.push('Escolha uma operação compatível com o tema.');
 if(!config.assets.includes(input.asset))issues.push('Escolha um tipo de bem compatível com a operação.');
 if(input.country!=='brasil')issues.push('Bens e domicílios no exterior ou não informados exigem análise própria.');
 if(input.extent!=='full')issues.push('Usufruto, nua-propriedade e condições desconhecidas exigem regras específicas ainda não habilitadas.');
 if(input.special!=='ordinary')issues.push('Isenções, dívidas, financiamento, doações anteriores e situações desconhecidas exigem verificação individual.');
 if(!validDate(input.date)||input.date>today)issues.push('Informe uma data válida, sem presumir legislação futura.');
 if(!['one','multiple'].includes(input.locationMode))issues.push('Informe se os bens estão em uma ou mais UFs.');
 if(input.asset!=='property'&&input.locationMode==='multiple')issues.push('Para móveis e participações, informe a UF do domicílio relevante; não distribua o imposto pela localização física dos bens.');
 if(!Array.isArray(input.rows)||input.rows.length<1||input.rows.length>20)return blocked([...issues,'Informe de um a vinte grupos de bens e beneficiários.']);
 const groups=new Map();const ufs=new Set();
 for(const [index,row]of input.rows.entries()){
  const record=registry.find(s=>s.uf===row.uf);const baseCents=parseMoney(row.amount);
  if(!record)issues.push(`Grupo ${index+1}: selecione uma UF válida.`);else ufs.add(row.uf);
  if(baseCents===null)issues.push(`Grupo ${index+1}: informe um valor positivo em reais com no máximo duas casas decimais.`);
  if(!Number.isInteger(Number(row.beneficiary))||Number(row.beneficiary)<1||Number(row.beneficiary)>20)issues.push(`Grupo ${index+1}: identifique o beneficiário apenas por um número de 1 a 20.`);
  if(record&&baseCents!==null){const key=`${row.uf}:${Number(row.beneficiary)}`;const old=groups.get(key)||{uf:row.uf,beneficiary:Number(row.beneficiary),baseCents:0};old.baseCents+=baseCents;if(!Number.isSafeInteger(old.baseCents)||old.baseCents>1000000000000000)issues.push('Soma de valores fora do limite suportado.');groups.set(key,old);}
 }
 if(input.locationMode==='one'&&ufs.size>1)issues.push('Você informou uma única UF, mas selecionou estados diferentes. Corrija o cenário.');
 if(input.asset!=='property'&&ufs.size>1)issues.push('Múltiplos domicílios ou competências para móveis e quotas exigem análise profissional.');
 if(issues.length)return blocked(issues);
 const prepared=[];
 for(const group of groups.values()){
  const record=registry.find(s=>s.uf===group.uf);
  if(!record.sourceVerified||!record.consultedOn||record.consultedOn>today){issues.push(`${record.name} (${record.uf}): ${record.observation?'há percentuais observados em fonte oficial, mas faltam regras completas e revisão profissional para calcular.':'alíquotas, faixas, isenções e vigência não verificadas em fonte oficial.'}`);continue;}
  const versions=(record.versions||[]).filter(v=>v.operation===input.operation&&v.assets?.includes(input.asset)&&validDate(v.validFrom)&&(!v.validTo||validDate(v.validTo))&&v.validFrom<=input.date&&(!v.validTo||input.date<=v.validTo));
  if(versions.length!==1){issues.push(`${record.uf}: não há uma versão única verificada para a operação, bem e data informados.`);continue;}
  const rule=versions[0];
  if(rule.schedule?.rounding!=='per-band-half-up'){issues.push(`${record.uf}: arredondamento ainda não verificado para a regra.`);continue;}
  if(!rule.review||rule.review.status!=='approved'||!rule.review.by||!validDate(rule.review.on)||!validDate(rule.review.expiresOn)||rule.review.on>today||rule.review.expiresOn<today){issues.push(`${record.uf}: falta revisão profissional identificada e vigente para a regra.`);continue;}
  if(!rule.sources?.length||rule.sources.some(s=>!s.url?.startsWith('https://')||!s.provision||!validDate(s.consultedOn)||s.consultedOn>today)){issues.push(`${record.uf}: registro de fonte e dispositivo incompleto.`);continue;}
  if(rule.scenarioProfile!=='ordinary-full-ownership'||rule.exemptionsReviewed!==true||!['none','base-threshold'].includes(rule.exemption?.type)){issues.push(`${record.uf}: benefícios fiscais ou condições específicas não foram verificados para este cenário.`);continue;}
  if(rule.exemption.type==='base-threshold'&&(!Number.isSafeInteger(rule.exemption.thresholdCents)||rule.exemption.thresholdCents<0||!rule.exemption.provision)){issues.push(`${record.uf}: isenção por valor sem parâmetros verificados.`);continue;}
  try{
   const calc=calculateSchedule(group.baseCents,rule.schedule);
   const exempt=rule.exemption.type==='base-threshold'&&group.baseCents<=rule.exemption.thresholdCents;
   prepared.push({...group,...calc,taxCents:exempt?0:calc.taxCents,exempt,rule});
  }catch(error){issues.push(`${record.uf}: ${error.message}. Não foi gerada estimativa.`);}
 }
 if(issues.length)return blocked([...new Set(issues)]);
 const taxCents=prepared.reduce((sum,p)=>sum+p.taxCents,0);
 if(!Number.isSafeInteger(taxCents))return blocked(['Total fora do limite suportado.']);
 return {status:'estimated',issues:[],results:prepared,taxCents,baseCents:prepared.reduce((s,p)=>s+p.baseCents,0),operation:input.operation,date:input.date,excluded:['ITBI','Imposto de renda e ganho de capital','IBS/CBS','Emolumentos, taxas e honorários','Multas, juros, benefícios e condições fora do cenário verificado']};
}
