# Simulador de ITCMD — pesquisa, implementação e bloqueios

Atualização: 06/10/2026. **Pedido de cobertura das 27 UFs ainda não concluído. Nenhuma alíquota estadual habilitada.**

## Pesquisa realmente executada

- HTTP 200 no texto oficial da LC 227/2026 no Planalto: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm.
- Leitura do Livro II, especialmente arts. 148, § 2º; 152 a 159; e art. 182, III. Consulta em 06/10/2026, jurisdição federal. O texto informa publicação no DOU em 14/01/2026, republicação em 15/01/2026 e retificação em 23/01/2026.
- Art. 182, III prevê efeitos desde a publicação para os dispositivos citados. Isso não resolve as leis estaduais, anterioridades aplicáveis a majorações nem possíveis questões de aplicação; revisão profissional pendente.
- A primeira rodada de 27 portais retornou bloqueios 403. Na retomada, parte dos portais passou a responder, mas responder HTTP 200 não confirma alíquota. No RJ, por exemplo, a resposta é uma página de bloqueio de IP.
- Foram lidas fontes com percentuais de **AC, AL, ES, GO, MG, PE e SP**. São observações de pesquisa, não confirmação de regras completas ou liberação de cálculo. SP tem somente doação em dinheiro confirmada na FAQ; causa mortis continua pendente.
- Os outros **20 registros** permanecem sem percentuais confirmados. Há falhas 403/503, destinos adicionais bloqueados e portais acessíveis sem legislação específica concluída. Os detalhes, URLs, respostas e hashes das consultas constam de `itcmd-acessos.json`.
- Em PE, a LC 563/2025, arts. 20 e 27 e anexos 6 e 7, altera a Lei 13.974/2009 com efeitos desde 01/01/2026. Anexo 3: isenção até R$ 80 mil e faixas marginais de 2%, 4%, 6% e 8%; não confundir com benefícios temporários de 2025. Há outras isenções condicionadas, desconto de pagamento e atualização anual desde 2027.
- MG: o art. 10 atual da Lei 14.941/2003 prevê 5%; os percentuais antigos exibidos no mesmo texto são redações históricas. ES: art. 12 da Lei 10.011/2013 consultada prevê 4%. Ambos exigem revisão da aplicação da legislação federal em 2026.
- AC: arts. 29 e 30 da LC 373/2020 distinguem doação, sucessão e colaterais; as referências ao monte-mor, isenções e alterações posteriores exigem conferência.
- AL e GO: percentuais encontrados nas FAQs oficiais, sem concluir a consulta das respectivas leis consolidadas. GO distingue os períodos de agregação para isenção e para faixas.

`data/itcmd.js` separa `observation` (texto efetivamente consultado) de `versions` (regras aptas ao motor). As versões continuam vazias, `sourceVerified` continua falso no sentido de regra completa e a revisão profissional é nula. `docs/itcmd-observacoes.json` e `itcmd-estados.csv` permitem conferir as fontes e limitações sem usar percentuais de memória.

## O que foi implementado

Formulário preparatório e motor de cálculo nas páginas de **custos**:

| Tema | Operação delimitada |
| --- | --- |
| Testamento | Transmissão após falecimento; não calcula elaboração do testamento |
| Doação | Doação de propriedade plena; usufruto/nua-propriedade ainda não suportados |
| Sociedade patrimonial | Doação ou sucessão de participações; não integralização de imóveis nem criação da sociedade |
| Participações | Doação ou sucessão de participações, sujeitas a avaliação própria |
| Inventário | Transmissão causa mortis pela data da abertura da sucessão |
| Governança e liquidez | Sem cálculo próprio por não determinarem uma operação de transmissão por si sós |

O visitante pode escolher as 27 UFs, indicar se os imóveis estão em uma ou mais UFs e informar valores por beneficiário numerado (sem nomes). Grupos da mesma UF/beneficiário são somados antes das faixas. Isso não substitui agregação de doações anteriores, cujo período precisa ser pesquisado. Por isso, doações sucessivas são tratadas como situação específica não suportada.

Para imóveis no Brasil, usa-se a UF da localização (art. 158); para móveis e quotas, a UF do domicílio do doador na doação ou do falecido na sucessão, nos casos domésticos delimitados (art. 159). Casos no exterior ou múltiplos domicílios não são resolvidos pelo formulário.

Não há dedução automática de meação, dívidas, financiamentos, reserva de usufruto ou capital nominal de quotas. O visitante informa somente a parcela que pretende discutir como transmitida; a base continua sujeita à análise e avaliação fiscal. Quotas têm regra de avaliação específica no art. 154. O formulário não faz essa avaliação.

## Estado da calculadora pública

**Nenhum valor de ITCMD pode ser retornado com o cadastro atual.** O formulário informa o que falta. Resultado indisponível é diferente de imposto zero. Não há calculadora manual que induza o visitante a escolher uma alíquota nacional ou presumir regra estadual.

O motor aceita regras previamente cadastradas e revisadas. A liberação exige:

1. Fonte oficial efetivamente consultada, URL, dispositivo e data.
2. Versão única para operação, bem e período.
3. Base, faixas, modo de aplicação e arredondamento revisados.
4. Tratamento verificado de isenção para o cenário simples — condições não implementadas bloqueiam o cálculo.
5. Revisão profissional com responsável, data e validade. Revisão vencida bloqueia estimativas, considerando a data atual do navegador no fuso de São Paulo.
6. Um cenário doméstico, de propriedade plena, sem fatores especiais ou informações desconhecidas que excedam o modelo.

São suportados cálculos matemáticos por alíquota única ou faixas marginais em pontos-base, com valores em centavos e multiplicação por BigInt. Arredondamento por faixa é explícito (`per-band-half-up`) e só poderá ser usado se revisado para a regra aplicável. Não se pode escolher o método só para obter resultado menor. Se o regime estadual não couber na implementação, amplie o motor e os testes antes de habilitá-lo.

Exemplos de regras nos testes são **puramente fictícios**. Não representam SP ou qualquer UF, não são importados pela interface e não são fontes jurídicas. Eles verificam limites de faixas, arredondamento, agregação por beneficiário, distinção entre indisponibilidade e isenção comprovada, validade e bloqueios.

## Resultado futuro, quando habilitado

Exibirá ITCMD parcial, valor/base informados, operação, data, detalhamento por UF/beneficiário e faixa, alíquotas aplicadas, fonte e revisão. Sempre conterá aviso de simulação informativa, sem guia de pagamento nem homologação.

Não serão somados sem regras próprias: ITBI municipal, IR/ganho de capital, IBS/CBS, emolumentos, taxas, honorários, multas ou juros. Uma holding não recebe “imposto zero” por suposição. Não há cálculo em cada tema apenas por existir uma página: é a operação que determina o tributo.

## Próximo requisito externo

Os domínios dos 27 portais e, nesta retomada, nove destinos oficiais de legislação/serviços foram adicionados ao rascunho da política de rede, preservando os anteriores. A atualização foi salva; não é evidência de aplicação na máquina atual. É necessário revisar/salvar as configurações e publicar o ambiente conforme o fluxo do produto; depois, retomar as consultas. Redirecionamentos ou destinos de legislação ainda não conhecidos podem exigir novas adições específicas.

Depois da pesquisa, registrar por UF/doação/causa mortis: lei e alterações, dispositivo, faixas e modo de aplicação, unidade fiscal e período (se houver), isenções e seus requisitos, avaliação de bens/quotas, agregação de doações, usufruto, datas de vigência/efeitos, questões controvertidas e revisão jurídica/contábil. Apenas taxas completas e revisadas para cenários suportados serão ativadas; cobertura parcial deve continuar explícita.

Destinos novos ainda sem acesso na máquina: `ww1.receita.fazenda.df.gov.br`, `legislacao.sef.sc.gov.br`, `www.contribuinte.fazenda.pr.gov.br`, `itcd.sefin.ro.gov.br`, `legislacao.fazenda.sp.gov.br`, `appasp.sefaz.go.gov.br`, `www3.sefaz.es.gov.br`, `conslegis.es.gov.br`, `legislacao.sefaz.ms.gov.br`.

A revisão profissional obrigatória veio do requisito original do projeto: só habilitar calculadoras com regra oficial verificada e revisada. Nenhum nome, aprovação ou prazo de revisão foi fabricado para remover esse bloqueio. A pesquisa parcial foi entregue e pode continuar após aplicação da rede; a calculadora numérica continua pendente de regras completas e revisão real.
