import {test,expect} from '@playwright/test';
import {evaluate,activeQuestions,sanitizeAnswers,questions,explorationRules} from '../data/questionnaire.js';
import {options} from '../data/content.js';
import {estimate,taxRules} from '../data/tax.js';
const full={objetivo:'vontade',falecimento:'nao',continuidade:'sim',terra:'sim',ufs:'sim',empresa:'sim',socios:'nao',transferencia:'sim',renda:'sim',gestao:'sim',herdeiros:'alguns',acordos:'nao',liquidez:'sim',conflitos:'nao',dividas:'nao',atencao:'nao'};
test('regras: incompletas, desconhecidas, caminhos e encaminhamentos',()=>{
 expect(evaluate({}).status).toBe('insufficient');
 expect(evaluate(Object.fromEntries(questions.map(q=>[q.id,'nao-sei']))).status).toBe('insufficient');
 expect(evaluate(full).status).toBe('explore');expect(evaluate(full).options.length).toBeGreaterThanOrEqual(2);
 for(const id of ['falecimento','conflitos','dividas','atencao']){const r=evaluate({...full,[id]:'sim'});expect(r.status).toBe('referral');expect(r.options).toEqual([]);}
 expect(activeQuestions(full)).toHaveLength(16);
 expect(activeQuestions({...full,terra:'nao',empresa:'nao',transferencia:'nao'})).toHaveLength(13);
 const clean=sanitizeAnswers({...full,terra:'nao',empresa:'nao',transferencia:'nao'});expect(clean.ufs).toBeUndefined();expect(clean.socios).toBeUndefined();expect(clean.renda).toBeUndefined();
 expect(evaluate({...full,conflitos:'nao-sei'}).cautions.join(' ')).toContain('não significa ausência de risco');
 expect(evaluate({...full,empresa:'invalid'}).unknown).toContain('Há participações em uma sociedade ou empresa?');
});
test('todas as regras exploratórias têm condição válida e alvo existente',()=>{
 for(const r of explorationRules){expect(questions.find(q=>q.id===r.question).choices.map(c=>c.value)).toContain(r.value);expect(options.map(o=>o.id)).toContain(r.option);}
 expect(estimate().enabled).toBe(false);expect(taxRules.calculatorEnabled).toBe(false);
});
test('home, busca, filtro e comparação',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('gerações');
 await page.getByRole('link',{name:'Ver o catálogo'}).click();await expect(page.locator('.option-card')).toHaveCount(7);
 await page.getByLabel('Buscar no catálogo').fill('doacao');await expect(page.locator('.option-card')).toHaveCount(1);await expect(page.locator('.option-card')).toContainText('Doação');
 await page.getByLabel('Buscar no catálogo').fill('xyzxyz');await expect(page.locator('.empty')).toContainText('Nenhuma');
 await page.getByLabel('Buscar no catálogo').fill('');await page.getByRole('button',{name:'Governança',exact:true}).click();await expect(page.locator('.option-card')).toHaveCount(1);
 await page.getByRole('button',{name:'Todas',exact:true}).click();
 for(const name of ['Testamento','Doação e usufruto','Sociedade patrimonial'])await page.getByLabel(`Comparar ${name}`,{exact:true}).check();
 await page.getByLabel('Comparar Governança familiar',{exact:true}).click();await expect(page.getByLabel('Comparar Governança familiar',{exact:true})).not.toBeChecked();
 await page.getByRole('button',{name:'Comparar opções'}).click();await expect(page.getByRole('table')).toBeVisible();await expect(page.locator('thead th')).toHaveCount(4);
 expect(errors).toEqual([]);
});
test('cada opção percorre explicação, documentos, custos e resumo',async({page})=>{
 for(const o of options){await page.goto(`/#opcao/${o.id}/explicacao`);await expect(page.getByRole('heading',{level:1})).toHaveText(o.title);await expect(page.locator('.example')).toContainText('fictício');
 await page.getByRole('link',{name:'Quero conhecer os próximos passos'}).click();await expect(page.locator('.document-item')).toHaveCount(o.documents.length);
 await page.locator('.document-item input').first().check();await page.getByRole('link',{name:'Entendi a documentação — continuar'}).click();await expect(page.locator('.tax-warning')).toContainText('Não é possível estimar com segurança');
 await page.getByRole('link',{name:'Preparar meu resumo'}).click();await expect(page.locator('.summary-sheet')).toContainText(o.documents[0].name);await expect(page.getByRole('button',{name:'Imprimir ou salvar como PDF'})).toBeVisible();}
});
test('questionário completo, alteração, resultado e apagar',async({page})=>{
 await page.goto('/#questionario');
 for(const q of activeQuestions(full)){await expect(page.getByRole('group')).toContainText(q.title);const label=q.choices.find(c=>c.value===full[q.id]).label;await page.getByRole('radio',{name:label,exact:true}).check();await page.locator('#quiz-form [type=submit]').click();}
 await expect(page.getByRole('heading',{level:1})).toHaveText('Opções para discutir com um especialista');await expect(page.locator('.result-card')).toHaveCount(3);
 await page.getByRole('button',{name:'Alterar respostas'}).click();await expect(page.getByRole('radio',{name:'Registrar intenções para o futuro'})).toBeChecked();
 await page.getByRole('button',{name:'Apagar minhas respostas',exact:true}).first().click();await expect(page.locator('#quiz-form [type=submit]')).toBeDisabled();await page.getByRole('button',{name:'Ver resultado com respostas atuais'}).click();await expect(page.getByRole('heading',{level:1})).toContainText('Informações insuficientes');
});
test('mudança de ramificação limpa respostas e encaminha falecimento',async({page})=>{
 await page.goto('/#questionario');await page.getByRole('radio',{name:'Organizar a gestão e as decisões'}).check();await page.locator('[type=submit]').click();await page.getByRole('radio',{name:'Sim',exact:true}).check();await page.getByRole('button',{name:'Ver resultado com respostas atuais'}).click();await expect(page.getByRole('heading',{level:1})).toContainText('conversa individual');await expect(page.locator('.result-card')).toHaveCount(0);
 await page.goto('/#questionario');await page.getByRole('button',{name:'Apagar minhas respostas',exact:true}).first().click();await page.getByRole('radio',{name:'Não sei',exact:true}).check();await page.locator('[type=submit]').click();await page.locator('input[value=nao]').check();await page.locator('[type=submit]').click();await page.locator('input[value=sim]').check();await page.locator('[type=submit]').click();await page.locator('input[value=sim]').check();await page.locator('[type=submit]').click();await expect(page.getByRole('group')).toContainText('mais de uma UF');await page.locator('input[value=sim]').check();await page.getByRole('button',{name:'Anterior'}).click();await page.locator('input[value=nao]').check();await page.locator('[type=submit]').click();await expect(page.getByRole('group')).toContainText('participações em uma sociedade');
});
test('privacidade, rodapé obrigatório, rotas e ausência de envio',async({page})=>{
 const external=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1'))external.push(r.url());});
 for(const route of ['inicio','fontes','regras','consulta','privacidade','duvidas','resultado','comparar','inexistente']){await page.goto(`/#${route}`);await expect(page.locator('footer .disclaimer')).toContainText('Este site oferece informações educativas para esclarecer dúvidas sobre planejamento sucessório no agronegócio.');await expect(page.locator('h1,h2').first()).toBeVisible();}
 expect(external).toEqual([]);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
 await page.goto('/#questionario');await page.locator('input[value=gestao]').check();await page.reload();await expect(page.locator('[type=submit]')).toBeDisabled();
});
test('layout sem transbordamento e navegação por teclado',async({page},info)=>{
 for(const route of ['inicio','catalogo','questionario','opcao/holding/custos','fontes']){await page.goto(`/#${route}`);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);}
 await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Pular para o conteúdo'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();await expect(page.getByRole('heading',{level:1})).toContainText('gerações');
 await page.screenshot({path:`test-results/home-${info.project.name}.png`,fullPage:true});
});

