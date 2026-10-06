// Nenhuma alíquota foi preenchida de memória. Versões estaduais somente entram
// aqui depois de consulta oficial e revisão profissional identificada.
export const ITCMD_DATE = '2026-10-06';
export const FEDERAL_ITCMD = {
 title:'Lei Complementar 227/2026 — Livro II',
 url:'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm',
 consultedOn:ITCMD_DATE,
 provisions:'Arts. 148, § 2º; 152 a 159; 182, III',
 effects:'O art. 182, III prevê efeitos desde a publicação para esses dispositivos. A aplicação de legislação estadual e eventual majoração exige conferência própria.',
 reviewStatus:'Pendente de validação jurídica e contábil',
 notes:[
  'O art. 148, § 2º trata separadamente sucessores ou donatários por ente competente.',
  'Os arts. 152 a 154 tratam da base de cálculo; o valor informado pelo visitante não é avaliação fiscal nem homologação.',
  'O art. 155 trata da agregação de doações sucessivas. O período depende da legislação estadual ou distrital.',
  'O art. 156 prevê progressividade por faixas e distingue a data da doação da abertura da sucessão.',
  'Para imóveis no Brasil, o art. 158 indica a UF da localização. Para móveis e participações, o art. 159 distingue domicílio do doador e do falecido, conforme a operação.'
 ]
};
export const itcmdStates = [
 ['AC','Acre','https://sefaz.ac.gov.br/'],
 ['AL','Alagoas','https://www.sefaz.al.gov.br/'],
 ['AP','Amapá','https://www.sefaz.ap.gov.br/'],
 ['AM','Amazonas','https://www.sefaz.am.gov.br/'],
 ['BA','Bahia','https://www.sefaz.ba.gov.br/'],
 ['CE','Ceará','https://www.sefaz.ce.gov.br/'],
 ['DF','Distrito Federal','https://www.receita.fazenda.df.gov.br/'],
 ['ES','Espírito Santo','https://sefaz.es.gov.br/'],
 ['GO','Goiás','https://goias.gov.br/economia/'],
 ['MA','Maranhão','https://portal.sefaz.ma.gov.br/'],
 ['MT','Mato Grosso','https://www.sefaz.mt.gov.br/'],
 ['MS','Mato Grosso do Sul','https://www.sefaz.ms.gov.br/'],
 ['MG','Minas Gerais','https://www.fazenda.mg.gov.br/'],
 ['PA','Pará','https://www.sefa.pa.gov.br/'],
 ['PB','Paraíba','https://www.sefaz.pb.gov.br/'],
 ['PR','Paraná','https://www.fazenda.pr.gov.br/'],
 ['PE','Pernambuco','https://www.sefaz.pe.gov.br/'],
 ['PI','Piauí','https://www.sefaz.pi.gov.br/'],
 ['RJ','Rio de Janeiro','https://portal.fazenda.rj.gov.br/'],
 ['RN','Rio Grande do Norte','https://www.sefaz.rn.gov.br/'],
 ['RS','Rio Grande do Sul','https://www.receita.fazenda.rs.gov.br/'],
 ['RO','Rondônia','https://www.sefin.ro.gov.br/'],
 ['RR','Roraima','https://www.sefaz.rr.gov.br/'],
 ['SC','Santa Catarina','https://www.sef.sc.gov.br/'],
 ['SP','São Paulo','https://portal.fazenda.sp.gov.br/servicos/itcmd/'],
 ['SE','Sergipe','https://www.sefaz.se.gov.br/'],
 ['TO','Tocantins','https://www.to.gov.br/sefaz/']
].map(([uf,name,portal])=>({uf,name,portal,status:'network-blocked',attemptedOn:ITCMD_DATE,consultedOn:null,sourceVerified:false,professionalReview:null,versions:[],blocker:'Consulta bloqueada pela política de rede (403). Alíquotas, faixas, isenções, unidades fiscais e vigência ainda não verificadas.'}));
export const instrumentScenarios = {
 testamento:{operations:['inheritance'],assets:['property','movable','shares'],explanation:'Simulação da transmissão após o falecimento, não da elaboração do testamento.'},
 doacao:{operations:['donation'],assets:['property','movable','shares'],explanation:'Doação de propriedade plena. Reserva ou extinção de usufruto depende de regras específicas e não é calculada nesta versão.'},
 holding:{operations:['donation','inheritance'],assets:['shares'],explanation:'Somente transmissão de participações da sociedade. Constituir a holding ou integralizar imóveis não equivale a uma doação de quotas; ITBI, IR e outros custos exigem análise separada.'},
 participacoes:{operations:['donation','inheritance'],assets:['shares'],explanation:'Transmissão de participações, com valor informado para discussão. A avaliação das quotas exige metodologia própria; não use automaticamente seu valor nominal.'},
 inventario:{operations:['inheritance'],assets:['property','movable','shares'],explanation:'Simulação da transmissão causa mortis, considerando a data da abertura da sucessão. Não estima emolumentos, taxas ou honorários.'}
};
export const SIMULATION_NOTICE = 'Simulação exclusivamente informativa para preparação de consulta. Não é guia de pagamento, avaliação fiscal ou confirmação de imposto devido. Conteúdo e regras pendentes de validação profissional.';
