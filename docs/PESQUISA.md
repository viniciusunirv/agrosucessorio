# Delimitação e pesquisa — 06/10/2026

## Resultado de acesso

Consultas HTTPS com verificação TLS mantida a `www.planalto.gov.br`, `atos.cnj.jus.br` e `developers.cloudflare.com` retornaram **Tunnel connection failed: 403 Forbidden**. Não houve leitura dos textos oficiais. Não há base para chamar esta versão de pesquisa jurídica atualizada. O acesso ao registro npm foi suficiente para instalar ferramentas técnicas; não comprova acesso às fontes jurídicas.

Foram sugeridos na configuração do ambiente os domínios Planalto, CNJ, gov.br e Cloudflare. Salvar esse rascunho não muda automaticamente a rede em execução. Depois de aplicar as configurações, a pesquisa deve ser retomada.

## Catálogo de trabalho

1. Testamento: instrumento sucessório a pesquisar.
2. Doação e eventual usufruto: temas de transferência em vida e direitos distintos a pesquisar.
3. Sociedade patrimonial / holding familiar: estrutura societária, sem indicação automática.
4. Participações societárias: organização e operações sobre quotas/participações.
5. Governança familiar: mecanismos de diálogo, contratos e regras a analisar.
6. Liquidez e continuidade: complementos; não cobre produtos específicos.
7. Inventário e partilha: procedimentos após falecimento, separados do planejamento em vida.

Esta é uma arquitetura editorial provisória. Reorganize conforme a pesquisa e revisão. Não é catálogo completo nem classificação jurídica definitiva. Excluídos nesta versão: regras estaduais e municipais específicas, situações internacionais, conflitos, regimes familiares especiais, regularização fundiária/ambiental, produtos financeiros específicos e formalização de operações.

## Matriz

A matriz legível está em `data/content.js`, no site em “Fontes e revisão”, e em `docs/matriz-fontes.csv`. Todo registro precisa de:

- título e URL oficial direta;
- dispositivo legal específico, após conferência;
- jurisdição e alcance da aplicação;
- data efetiva da consulta e versão consolidada consultada;
- vigência e produção de efeitos por operação;
- estado: vigente, aplicação futura, proposta ou controvérsia;
- responsável e data de revisão jurídica/contábil;
- próxima revisão e temas dependentes.

Nesta entrega, a data efetiva de consulta é **nula**; a data de tentativa é 06/10/2026. Dispositivos, vigência, produção de efeitos e classificação estão pendentes. Não inferir vigência pelo ano ou número de uma norma.

EC 132/2023, LC 214/2025 e LC 227/2026 têm referências preparadas para conferência. A pertinência deve ser registrada por operação, não por aplicação genérica da “reforma”. O catálogo do CNJ e o portal da Receita são pontos iniciais de pesquisa; precisam ser substituídos ou complementados por links diretos aos atos/orientações pertinentes após a leitura.

## Próxima pesquisa necessária

1. Ler versões consolidadas dos textos e suas alterações, confirmando títulos, dispositivos e efeitos.
2. Vincular cada afirmação jurídica específica à fonte verificada, em vez de manter apenas referências gerais por tema.
3. Delimitar UFs/municípios antes de pesquisar ITCMD, ITBI e emolumentos locais. Não há alíquota nacional configurada.
4. Conferir requisitos documentais com fonte competente e indicar se são gerais, condicionais ou locais.
5. Pesquisar regras vigentes de procedimentos extrajudiciais e judiciais sem presumir condições ou prazos.
6. Separar controvérsias, propostas e regras futuras; solicitar revisão profissional.

## Conteúdo desatualizado

O banner de pendência é obrigatório nesta versão. Não o retire apenas por preencher uma data. Antes de apresentar regras verificadas, estabeleça prazo editorial de revisão, preserve evidências e crie bloqueio de recomendações/cálculos dependentes quando a revisão vencer ou a norma mudar. O protótipo mantém a calculadora sempre desligada; nenhum preenchimento de fonte ativa cálculos automaticamente.

## Atualização: pesquisa do simulador de ITCMD

Em nova tentativa em 06/10/2026, o Planalto respondeu HTTP 200 e foi consultado o Livro II da LC 227/2026 e seu art. 182. O bloqueio inicial permanece como registro histórico. Todos os 27 portais estaduais/distrital consultados nesta fase retornaram 403 do proxy. Consulte `docs/ITCMD.md`, `docs/itcmd-acessos.json` e `docs/itcmd-estados.csv`. A matriz em `data/content.js` foi atualizada somente para LC 227/2026; as demais normas não foram presumidas verificadas.

## Retomada de pesquisa estadual

A rodada inicial de bloqueios foi superada parcialmente. Em 06/10/2026 foram consultadas fontes com percentuais em AC, AL, ES, GO, MG, PE e SP; cobertura de SP limitada à doação em dinheiro na FAQ. Os outros vinte registros não têm percentuais confirmados. Isso não valida os demais conteúdos nem habilita cálculo. A situação atual e as fontes estão em `ITCMD.md`, `itcmd-observacoes.json` e na tabela pública `#aliquotas`. Os bloqueios anteriores descritos acima são históricos.
