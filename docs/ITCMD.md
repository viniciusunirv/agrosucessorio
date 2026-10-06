# Simulador de ITCMD — pesquisa, implementação e bloqueios

Atualização: 06/10/2026. **Pedido de cobertura das 27 UFs ainda não concluído. Nenhuma alíquota estadual habilitada.**

## Pesquisa realmente executada

- HTTP 200 no texto oficial da LC 227/2026 no Planalto: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm.
- Leitura do Livro II, especialmente arts. 148, § 2º; 152 a 159; e art. 182, III. Consulta em 06/10/2026, jurisdição federal. O texto informa publicação no DOU em 14/01/2026, republicação em 15/01/2026 e retificação em 23/01/2026.
- Art. 182, III prevê efeitos desde a publicação para os dispositivos citados. Isso não resolve as leis estaduais, anterioridades aplicáveis a majorações nem possíveis questões de aplicação; revisão profissional pendente.
- Tentativas nos 26 portais estaduais e no portal distrital: todas bloqueadas pelo proxy de rede com 403. Registro completo em `itcmd-acessos.json`. Os endereços são pontos iniciais de pesquisa, ainda sem leitura de conteúdo ou confirmação de redirecionamentos.
- Sem legislação estadual consolidada consultada, não foram cadastrados percentuais, faixas, isenções, valores de unidades fiscais, reduções ou datas de efeito.

Em `data/content.js` e `data/itcmd.js`, a LC 227/2026 tem consulta efetiva registrada. Nos 27 registros estaduais, `consultedOn` é nulo e `versions` está vazio. `itcmd-estados.csv` mostra essas lacunas, sem tentar completar percentuais de memória.

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

Os domínios dos 27 portais foram adicionados ao rascunho da política de rede, preservando os anteriores. A atualização foi salva; não é evidência de aplicação na máquina atual. É necessário revisar/salvar as configurações e publicar o ambiente conforme o fluxo do produto; depois, retomar as consultas. Redirecionamentos ou destinos de legislação ainda não conhecidos podem exigir novas adições específicas.

Depois da pesquisa, registrar por UF/doação/causa mortis: lei e alterações, dispositivo, faixas e modo de aplicação, unidade fiscal e período (se houver), isenções e seus requisitos, avaliação de bens/quotas, agregação de doações, usufruto, datas de vigência/efeitos, questões controvertidas e revisão jurídica/contábil. Apenas taxas completas e revisadas para cenários suportados serão ativadas; cobertura parcial deve continuar explícita.
