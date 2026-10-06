export const UPDATE_DATE = '2026-10-06';
export const REVIEW_STATUS = 'Conteúdo pendente de verificação das fontes e de validação jurídica e contábil';
export const SHORT_NOTICE = 'Material educativo pendente de validação profissional. Não substitui a análise individual de advogado e, quando necessário, contador.';
export const categories = ['Todas', 'Instrumentos sucessórios', 'Estruturas societárias', 'Governança', 'Soluções complementares', 'Após o falecimento'];
// Links são referências a consultar, não prova de pesquisa realizada. Artigos,
// vigência e efeitos só devem ser preenchidos após leitura do texto consolidado.
export const sources = [
 {id:'civil', title:'Código Civil — Lei 10.406/2002', url:'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm', jurisdiction:'Federal', subject:'Sucessões, doações, usufruto e sociedades', provision:'Pendente de conferência', effects:'Vigência e alterações pendentes de conferência'},
 {id:'cf', title:'Constituição Federal — texto consolidado', url:'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm', jurisdiction:'Federal', subject:'Competências tributárias e limites constitucionais', provision:'Pendente de conferência', effects:'Texto consolidado pendente de conferência'},
 {id:'ec132', title:'Emenda Constitucional 132/2023', url:'https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm', jurisdiction:'Federal', subject:'Reforma tributária: investigar efeitos por operação', provision:'Pendente de conferência', effects:'Transição e produção de efeitos pendentes de conferência'},
 {id:'lc214', title:'Lei Complementar 214/2025', url:'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm', jurisdiction:'Federal', subject:'Investigar IBS/CBS e pertinência à atividade e operação', provision:'Pendente de conferência', effects:'Texto consolidado, alterações e transição pendentes'},
 {id:'lc227', title:'Lei Complementar 227/2026', url:'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm', jurisdiction:'Federal', subject:'Investigar disposições pertinentes à reforma e ao ITCMD', provision:'Pendente de conferência', effects:'Texto consolidado, alterações e efeitos pendentes'},
 {id:'ir', title:'Lei 9.532/1997 — referência para pesquisa sobre IR', url:'https://www.planalto.gov.br/ccivil_03/leis/l9532.htm', jurisdiction:'Federal', subject:'Investigar transferências patrimoniais e apuração de valores', provision:'Pendente de conferência', effects:'Texto consolidado e aplicação ao caso pendentes'},
 {id:'cnj', title:'CNJ — catálogo oficial de atos normativos', url:'https://atos.cnj.jus.br/', jurisdiction:'Nacional; aplicação local a conferir', subject:'Pesquisar normas atuais de inventário, partilha e atos extrajudiciais', provision:'Localizar e conferir atos consolidados pertinentes', effects:'Procedimentos, condições e alterações pendentes'},
 {id:'receita', title:'Receita Federal — portal oficial', url:'https://www.gov.br/receitafederal/pt-br', jurisdiction:'Federal', subject:'Localizar orientação vigente sobre IR, atividade rural e ganho de capital', provision:'Localizar orientação específica antes de publicar regras', effects:'Período fiscal e aplicabilidade pendentes'}
].map(s => ({...s, status:'Pendente de verificação', attemptedOn:UPDATE_DATE, consultedOn:null, professionalReview:'Não realizada'}));

const personal = {name:'Documentos pessoais e contexto familiar', purpose:'Ajudar o profissional a identificar envolvidos, relações familiares e situações que precisam de atenção.', kind:'Geralmente solicitado', caution:'Confirme a lista com o profissional. Não envie documentos neste site.'};
const rural = {name:'Matrícula e informações dos imóveis rurais', purpose:'Permitir análise de titularidade, registros, restrições e características dos bens.', kind:'Condicionado ao caso', caution:'Investigar pertinência de CCIR, ITR, CAR e georreferenciamento. Cada documento tem finalidade distinta; não presume regularidade completa.'};
const fiscal = {name:'Informações fiscais e histórico de valores', purpose:'Organizar a conversa sobre aquisição, declaração, transferências e possíveis efeitos tributários.', kind:'Condicionado ao caso', caution:'A forma de apresentar e os períodos necessários dependem da operação e da revisão contábil.'};
const corporate = {name:'Contrato social, alterações e participações', purpose:'Entender a estrutura da sociedade, os titulares e as regras de administração e transferência.', kind:'Condicionado ao caso', caution:'Inclua acordos existentes, se houver. Exigências de registro dependem do órgão competente.'};
const local = {name:'Certidões, avaliações e requisitos de formalização', purpose:'Identificar exigências do cartório, órgão de registro, município ou UF para o ato pretendido.', kind:'Depende da UF, município ou órgão', caution:'Verifique validade, formato, custos e documentos exigidos diretamente com o responsável pelo procedimento.'};

export const options = [
 {id:'testamento', icon:'✦', category:'Instrumentos sucessórios', title:'Testamento', short:'Conheça uma forma de registrar intenções para a sucessão.', goal:'Registrar intenções',
  intro:'Um tema para conversar sobre como registrar disposições para depois do falecimento, dentro dos limites legais que precisam ser verificados.',
  operation:'A conversa envolve o que se pretende dispor, quem participa da sucessão, a forma do ato e os requisitos para que ele tenha validade. Este protótipo não determina limites de disposição ou formalidades.',
  situations:['Desejo de explicitar intenções sobre bens e participações.','Preocupação com a continuidade da gestão e com a interpretação da vontade.'],
  limits:['A liberdade de disposição precisa de análise do contexto familiar e dos limites legais.','O testamento não resolve, sozinho, administração, liquidez, regularização de bens ou todas as etapas posteriores.'],
  benefits:['Pode contribuir para tornar intenções mais claras, quando formalizado adequadamente.'],
  risks:['Forma, capacidade e interpretação do ato exigem revisão.','Custos de orientação e formalização, além de procedimentos posteriores, devem ser apurados.'],
  example:'Exemplo fictício: uma produtora quer conversar sobre como suas participações serão tratadas após o falecimento. Leva ao advogado a composição familiar e as regras da sociedade antes de escolher o instrumento.',
  related:['governanca','liquidez','inventario'], documents:[personal,corporate,fiscal,local], sourceIds:['civil','cnj'], taxes:['itcmd','ir','formalizacao']},
 {id:'doacao', icon:'→', category:'Instrumentos sucessórios', title:'Doação e usufruto', short:'Explore a transferência em vida e a discussão sobre uso e renda.', goal:'Planejar transferências em vida',
  intro:'Doação e eventual reserva de usufruto são temas distintos que podem ser analisados em conjunto. Transferir, usar, administrar e receber renda não são a mesma coisa.',
  operation:'O profissional analisa o bem, o titular, os beneficiários, as condições pretendidas e a pertinência do usufruto. Os efeitos patrimoniais, familiares, fiscais e de registro dependem do caso.',
  situations:['Interesse em discutir transferência durante a vida.','Desejo de preservar uso ou renda, com clareza sobre limites e responsabilidades.'],
  limits:['Reserva de usufruto não deve ser tratada como manutenção automática de toda a gestão.','Limites familiares, dívidas, restrições do bem e efeitos futuros precisam de análise individual.'],
  benefits:['Pode permitir uma discussão antecipada sobre direitos, responsabilidades e renda.'],
  risks:['Não presumir reversibilidade, proteção absoluta ou economia tributária.','Investigar tributos, registros, despesas e eventuais conflitos sobre uso e administração.'],
  example:'Exemplo fictício: um casal cogita transferir uma área e manter renda. Antes de agir, discute com profissionais quem explorará a terra, como serão tratados os custos e quais atos e tributos podem existir.',
  related:['testamento','participacoes','governanca'], documents:[personal,rural,fiscal,local], sourceIds:['civil','cf','ec132','lc227','ir'], taxes:['itcmd','ir','formalizacao']},
 {id:'holding', icon:'▦', category:'Estruturas societárias', title:'Sociedade patrimonial', short:'Entenda as perguntas por trás de uma holding familiar.', goal:'Organizar patrimônio e administração',
  intro:'“Holding familiar” é uma expressão usada para estruturas societárias. Não é uma solução sucessória universal, nem uma promessa de economia ou proteção.',
  operation:'A análise considera finalidade da sociedade, bens e participações, administração, atividade rural e regras de entrada e saída. Constituição e transferência de patrimônio são operações que precisam ser avaliadas separadamente.',
  situations:['Interesse em discutir administração conjunta de patrimônio.','Necessidade de entender relações entre bens, atividade rural e participações.'],
  limits:['A criação de uma sociedade não elimina questões sucessórias ou familiares.','Custos recorrentes, contabilidade, restrições dos bens e consequências para a atividade rural exigem avaliação.'],
  benefits:['Pode ajudar a organizar responsabilidades e regras de administração, quando a estrutura faz sentido para o caso.'],
  risks:['Não presumir imunidade de ITBI, isenção de ITCMD ou menor tributação.','Avaliar formalização, contabilidade, obrigações e efeitos de cada transferência.'],
  example:'Exemplo fictício: irmãos estudam organizar propriedades em uma sociedade. Antes de transferir bens, comparam custos, registro, operação rural e administração com alternativas mais simples.',
  related:['participacoes','governanca','doacao'], documents:[personal,rural,corporate,fiscal,local], sourceIds:['civil','cf','ec132','lc214','lc227','ir'], taxes:['itbi','itcmd','ir','consumo','formalizacao']},
 {id:'participacoes', icon:'◫', category:'Estruturas societárias', title:'Participações societárias', short:'Reúna as questões sobre quotas, controle e continuidade.', goal:'Organizar participações',
  intro:'Participações em sociedades merecem uma análise própria: quem é titular, quem administra e quais regras se aplicam à transferência e à sucessão.',
  operation:'A revisão parte do contrato social, dos acordos, da estrutura de titularidade e dos objetivos. Doação, venda e transmissão após falecimento não devem ser tratadas como a mesma operação.',
  situations:['Existência de empresa ligada ao negócio rural.','Desejo de discutir entrada de familiares, continuidade da gestão ou saída de sócios.'],
  limits:['Ser titular de participação não significa automaticamente administrar.','Regras do contrato e direitos de outros envolvidos precisam ser considerados.'],
  benefits:['Pode tornar mais clara a relação entre participação econômica e gestão.'],
  risks:['Avaliação das participações, restrições de transferência e conflito entre sócios.','Tributos e custos dependem da operação escolhida, dos valores e da jurisdição.'],
  example:'Exemplo fictício: um produtor tem quotas de uma empresa agrícola e quer envolver filhos no negócio. A família começa distinguindo trabalho, administração e propriedade das quotas.',
  related:['holding','governanca','testamento'], documents:[personal,corporate,fiscal,local], sourceIds:['civil','cf','lc227','ir'], taxes:['itcmd','ir','formalizacao']},
 {id:'governanca', icon:'◎', category:'Governança', title:'Governança familiar', short:'Abra espaço para conversar sobre gestão, papéis e decisões.', goal:'Combinar regras de convivência e gestão',
  intro:'Protocolos familiares, acordos e rotinas de governança são temas para organizar a conversa entre família, propriedade e negócio.',
  operation:'Pode-se discutir papéis, critérios de participação, tomada de decisões e solução de divergências. Cada compromisso precisa de análise quanto à forma e aos efeitos jurídicos pretendidos.',
  situations:['Familiares participam de maneiras diferentes da atividade.','A família deseja documentar expectativas sobre trabalho, renda e decisões.'],
  limits:['Um protocolo não substitui automaticamente contratos, testamento ou atos de transferência.','Validade, alcance e relação entre documentos exigem revisão.'],
  benefits:['Pode criar espaços de diálogo e expectativas mais claras.'],
  risks:['Regras ambíguas, expectativas incompatíveis ou acordos sem implementação.','Há custos de facilitação, assessoria e atualização; conflitos não são eliminados por promessa.'],
  example:'Exemplo fictício: três irmãos, dos quais dois trabalham na fazenda, organizam uma conversa sobre remuneração do trabalho e decisões do negócio antes de discutir a divisão patrimonial.',
  related:['participacoes','holding','liquidez'], documents:[personal,corporate], sourceIds:['civil'], taxes:['formalizacao']},
 {id:'liquidez', icon:'≈', category:'Soluções complementares', title:'Liquidez e continuidade', short:'Prepare perguntas sobre recursos e operação durante a transição.', goal:'Discutir recursos para a transição',
  intro:'Reservas, planejamento de caixa e análise de instrumentos de proteção são complementos possíveis. Condições, riscos e custos de produtos precisam de pesquisa específica.',
  operation:'A família identifica despesas, compromissos e necessidades da operação durante uma transição. A escolha de produtos e seus efeitos fiscais não está coberta nesta versão.',
  situations:['Preocupação com recursos para custos de formalização e continuidade.','Dependência de uma pessoa na operação ou na administração financeira.'],
  limits:['Produto financeiro ou seguro não deve ser equiparado a um instrumento sucessório sem análise.','Não presumir liquidez imediata, tratamento tributário ou exclusão de procedimentos.'],
  benefits:['Pode ajudar a antecipar perguntas sobre caixa e continuidade operacional.'],
  risks:['Condições contratuais, exclusões, prazos e capacidade de manter aportes.','Custos, taxas e tratamento de beneficiários dependem do produto e de revisão própria.'],
  example:'Exemplo fictício: uma família teme interromper o ciclo de produção durante uma sucessão. Mapeia despesas e compromissos para discutir uma reserva de transição com profissionais.',
  related:['governanca','testamento','inventario'], documents:[personal,fiscal,corporate], sourceIds:['civil','receita'], taxes:['formalizacao']},
 {id:'inventario', icon:'≡', category:'Após o falecimento', title:'Inventário e partilha', short:'Entenda a etapa posterior e sua relação com o planejamento.', goal:'Organizar a discussão após o falecimento',
  intro:'Inventário e partilha têm função diferente do planejamento feito em vida. Esta seção organiza dúvidas sobre o tratamento de patrimônio e obrigações após o falecimento.',
  operation:'O profissional avalia patrimônio, envolvidos, obrigações e a via adequada ao caso. As condições atuais de procedimentos judiciais ou extrajudiciais precisam de conferência nas normas aplicáveis.',
  situations:['Já ocorreu um falecimento.','A família quer compreender as etapas posteriores ao planejamento.'],
  limits:['Não escolher via ou presumir requisitos, prazos e custos apenas com este site.','Testamento, conflitos, capacidade dos envolvidos e bens em locais distintos exigem atenção profissional.'],
  benefits:['Pode ajudar a organizar informações para uma consulta e identificar questões urgentes.'],
  risks:['Prazos, deveres fiscais, dívidas e continuidade da atividade precisam ser avaliados diretamente.','Custos de tributos, registros e atuação profissional variam.'],
  example:'Exemplo fictício: após o falecimento de um produtor, a família reúne uma visão dos bens e compromissos e procura orientação, sem fazer transferências com base no questionário.',
  related:['testamento','liquidez','governanca'], documents:[personal,rural,corporate,fiscal,local,{name:'Informações do falecimento e disposições existentes',purpose:'Permitir ao profissional examinar a sucessão e eventuais atos anteriores.',kind:'Condicionado ao caso',caution:'Confirme documentos e providências diretamente com o responsável. Esta lista não determina formalidades.'}], sourceIds:['civil','cnj','cf','lc227','ir'], taxes:['itcmd','ir','formalizacao']}
];
export const scope = {
 included:'Sete temas introdutórios: instrumentos sucessórios, estruturas societárias, governança, complementos de liquidez e procedimentos após falecimento. Eles podem se combinar; não constituem classificação jurídica definitiva.',
 excluded:'Não abrange regras detalhadas por UF ou município, famílias e bens no exterior, produtos financeiros específicos, regimes familiares especiais, litígios, regularização fundiária ou questões ambientais. Também não valida operações ou documentos.',
 classification:'Nenhuma regra é apresentada como vigente, futura ou controvertida sem conferência. Propostas legislativas não integram as regras do protótipo.'
};
