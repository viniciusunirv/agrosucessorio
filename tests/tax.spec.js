import {test,expect} from '@playwright/test';
import {itcmdStates,instrumentScenarios,itcmdResearch} from '../data/itcmd.js';
import {parseMoney,calculateSchedule,simulateITCMD} from '../data/tax-engine.js';
const today='2026-10-06';
const input={instrument:'doacao',operation:'donation',asset:'property',country:'brasil',extent:'full',special:'ordinary',date:today,locationMode:'one',rows:[{uf:'SP',beneficiary:'1',amount:'1.500,00'}]};
// Dados exclusivamente fictícios, usados somente nos testes. Estes percentuais,
// limites e nomes não representam regras de SP ou de qualquer outra UF.
const fixture=()=>[{uf:'SP',name:'UF fictícia de teste',sourceVerified:true,consultedOn:today,versions:[{operation:'donation',assets:['property'],validFrom:'2026-01-01',validTo:'2026-12-31',scenarioProfile:'ordinary-full-ownership',exemptionsReviewed:true,exemption:{type:'none'},schedule:{method:'marginal',rounding:'per-band-half-up',bands:[{upToCents:100000,rateBps:200},{upToCents:null,rateBps:400}]},review:{status:'approved',by:'REVISOR FICTÍCIO — TESTE',on:today,expiresOn:'2026-12-31'},sources:[{url:'https://example.invalid/fixture',provision:'EXEMPLO MATEMÁTICO — SEM VALOR NORMATIVO',consultedOn:today}]}]}];
test('cadastro inclui todas as 27 UFs sem inventar alíquotas ou revisões',()=>{
 expect(itcmdStates).toHaveLength(27);expect(new Set(itcmdStates.map(s=>s.uf)).size).toBe(27);expect(itcmdStates.find(s=>s.uf==='DF')).toBeTruthy();
 for(const s of itcmdStates){expect(s.sourceVerified).toBe(false);expect(s.versions).toEqual([]);expect(s.professionalReview).toBeNull();if(s.observation){expect(s.consultedOn).toBe(today);expect(s.observation.sources.length).toBeGreaterThan(0);for(const f of s.observation.sources){expect(f.url).toMatch(/^https:\/\//);expect(f.provision).toBeTruthy();}}const r=simulateITCMD({...input,rows:[{uf:s.uf,beneficiary:'1',amount:'500.000,00'}]},itcmdStates,today);expect(r.status).toBe('blocked');expect(r.taxCents).toBeNull();expect(r.results).toEqual([]);expect(r.issues.join(' ')).toContain(s.uf);}
});
test('valores em reais, centavos e entradas inválidas',()=>{
 expect(parseMoney('500.000,00')).toBe(50000000);expect(parseMoney('R$ 1.234,5')).toBe(123450);expect(parseMoney('1.000')).toBe(100000);expect(parseMoney('1234.56')).toBe(123456);expect(parseMoney('0,01')).toBe(1);
 for(const s of ['','0','-100','1,234','1.2.3','1e9','Infinity','NaN','1,000.00','10x','100000000000000000000000'])expect(parseMoney(s)).toBeNull();
});
test('faixas matemáticas fictícias, limites e arredondamento em centavos',()=>{
 const schedule=fixture()[0].versions[0].schedule;
 expect(calculateSchedule(100000,schedule).taxCents).toBe(2000);
 expect(calculateSchedule(150000,schedule)).toEqual({taxCents:4000,breakdown:[{baseCents:100000,rateBps:200,taxCents:2000},{baseCents:50000,rateBps:400,taxCents:2000}]});
 expect(calculateSchedule(100001,schedule).taxCents).toBe(2000);
 expect(calculateSchedule(25,{method:'flat',bands:[{upToCents:null,rateBps:200}]}).taxCents).toBe(1);
 expect(()=>calculateSchedule(1,{method:'marginal',bands:[{upToCents:100,rateBps:200}]})).toThrow('final');
 expect(()=>calculateSchedule(1,{method:'marginal',bands:[{upToCents:null,rateBps:-1}]})).toThrow('Alíquota');
 expect(()=>calculateSchedule(1,{method:'marginal',bands:[{upToCents:100,rateBps:200},{upToCents:90,rateBps:300},{upToCents:null,rateBps:400}]})).toThrow('Limites');
});
test('agrega por beneficiário e UF, sem dividir espólio automaticamente',()=>{
 const same=simulateITCMD({...input,rows:[{uf:'SP',beneficiary:'1',amount:'1.000,00'},{uf:'SP',beneficiary:'1',amount:'500,00'}]},fixture(),today);
 expect(same.status).toBe('estimated');expect(same.results).toHaveLength(1);expect(same.taxCents).toBe(4000);
 const separate=simulateITCMD({...input,rows:[{uf:'SP',beneficiary:'1',amount:'1.000,00'},{uf:'SP',beneficiary:'2',amount:'500,00'}]},fixture(),today);
 expect(separate.results).toHaveLength(2);expect(separate.taxCents).toBe(3000);
 const registry=fixture();registry.push({...fixture()[0],uf:'MG'});
 const multi=simulateITCMD({...input,locationMode:'multiple',rows:[{uf:'SP',beneficiary:'1',amount:'1.000,00'},{uf:'MG',beneficiary:'1',amount:'500,00'}]},registry,today);
 expect(multi.status).toBe('estimated');expect(multi.taxCents).toBe(3000);
 registry[1].sourceVerified=false;expect(simulateITCMD({...input,locationMode:'multiple',rows:[{uf:'SP',beneficiary:'1',amount:'1.000,00'},{uf:'MG',beneficiary:'1',amount:'500,00'}]},registry,today).taxCents).toBeNull();
});
test('gates de fonte, revisão, validade, isenção e cenário',()=>{
 expect(simulateITCMD(input,fixture(),today).taxCents).toBe(4000);
 for(const mutate of [s=>s.sourceVerified=false,s=>s.versions[0].review=null,s=>s.versions[0].review.expiresOn='2026-10-05',s=>s.versions[0].validFrom='2027-01-01',s=>s.versions.push({...s.versions[0]}),s=>s.versions[0].sources=[],s=>s.versions[0].exemptionsReviewed=false,s=>s.versions[0].schedule.rounding=null]){
  const r=fixture();mutate(r[0]);expect(simulateITCMD(input,r,today).status).toBe('blocked');
 }
 for(const changes of [{asset:'shares'},{operation:'inheritance'},{country:'exterior'},{extent:'usufruct'},{special:'unknown'},{date:'2026-02-30'},{date:'2027-01-01'},{locationMode:'unknown'}])expect(simulateITCMD({...input,...changes},fixture(),today).taxCents).toBeNull();
 const r=fixture();r[0].versions[0].exemption={type:'base-threshold',thresholdCents:150000,provision:'EXEMPLO FICTÍCIO'};
 expect(simulateITCMD(input,r,today).taxCents).toBe(0);expect(simulateITCMD(input,r,today).results[0].exempt).toBe(true);
});
test('formulário nas cinco opções, 27 UFs e informação bloqueada diferente de zero',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of Object.keys(instrumentScenarios)){await page.goto(`/#opcao/${id}/custos`);await expect(page.locator('#tax-form')).toBeVisible();await expect(page.locator('#sim-uf-0 option')).toHaveCount(28);}
 await page.goto('/#opcao/doacao/custos');await page.locator('#sim-asset').selectOption('property');await page.locator('#sim-country').selectOption('brasil');await page.locator('#sim-extent').selectOption('full');await page.locator('#sim-special').selectOption('ordinary');await page.locator('#sim-location').selectOption('one');await page.locator('#sim-uf-0').selectOption('SP');await page.locator('#sim-amount-0').fill('500.000,00');await page.getByRole('button',{name:'Verificar possibilidade de simulação'}).click();
 await expect(page.locator('#simulation-result')).toContainText('São Paulo (SP)');await expect(page.locator('#simulation-result')).toContainText('não significa imposto zero');await expect(page.locator('.simulation-estimated')).toHaveCount(0);
 await page.locator('#sim-amount-0').fill('600.000,00');await expect(page.locator('#simulation-result')).toContainText('Nenhum valor de imposto foi calculado');
 await page.getByRole('button',{name:'Adicionar UF ou beneficiário'}).click();await expect(page.locator('.simulation-row')).toHaveCount(2);await page.locator('#sim-uf-1').selectOption('MG');await page.locator('#sim-amount-1').fill('100.000,00');await page.locator('#sim-location').selectOption('multiple');await page.getByRole('button',{name:'Verificar possibilidade de simulação'}).click();await expect(page.locator('#simulation-result')).toContainText('Minas Gerais (MG)');
 await page.getByRole('button',{name:'Remover grupo 2'}).click();await expect(page.locator('.simulation-row')).toHaveCount(1);await page.getByRole('button',{name:'Apagar dados da simulação'}).click();await expect(page.locator('#sim-amount-0')).toHaveValue('');
 expect(errors).toEqual([]);
});
test('UF de domicílio para quotas, outras opções, privacidade e matriz',async({page})=>{
 await page.goto('/#opcao/holding/custos');await page.locator('#sim-operation').selectOption('donation');await expect(page.getByLabel('UF do domicílio do doador no Brasil')).toBeVisible();await page.locator('#sim-operation').selectOption('inheritance');await expect(page.getByLabel('UF do domicílio do falecido no Brasil')).toBeVisible();
 await page.locator('#sim-amount-0').fill('1.234,56');await page.getByRole('button',{name:'Apagar minhas respostas',exact:true}).click();await page.goto('/#opcao/holding/custos');await expect(page.locator('#sim-amount-0')).toHaveValue('');
 for(const id of ['governanca','liquidez']){await page.goto(`/#opcao/${id}/custos`);await expect(page.locator('#tax-form')).toHaveCount(0);await expect(page.getByRole('heading',{name:'Este tema não define um imposto por si só'})).toBeVisible();}
 await page.goto('/#aliquotas');await expect(page.locator('tbody tr')).toHaveCount(27);await expect(page.getByRole('heading',{name:'Nenhuma alíquota estadual está habilitada'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const pe=page.locator('tbody tr').filter({has:page.getByRole('rowheader',{name:'Pernambuco (PE)',exact:true})});await expect(pe).toContainText('01/01/2026');await expect(pe).toContainText('R$ 80 mil');await expect(pe.getByRole('link',{name:/LC 563/})).toBeVisible();
 const sp=page.locator('tbody tr').filter({has:page.getByRole('rowheader',{name:'São Paulo (SP)',exact:true})});await expect(sp).toContainText('Ainda sem percentual confirmado');
 const df=page.locator('tbody tr').filter({has:page.getByRole('rowheader',{name:'Distrito Federal (DF)',exact:true})});await expect(df).toContainText('Percentuais e faixas pendentes');
 await page.goto('/#opcao/doacao/custos');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
