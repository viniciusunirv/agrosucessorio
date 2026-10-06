# Regras educativas auditáveis

Implementação: `data/questionnaire.js`. A interface não calcula pontuação jurídica. Não há chamada a IA ou coleta de identificação. **Metodologia não validada profissionalmente.**

## Perguntas e caminhos

16 perguntas possíveis: objetivo, falecimento, continuidade, imóveis, UFs, sociedade, sócios externos, transferência em vida, uso/renda, gestão, participação familiar, acordos, liquidez, conflitos, dívidas e atenção familiar.

Três perguntas são condicionais:

- UFs: somente quando imóveis = Sim.
- Sócios: somente quando sociedade = Sim.
- Uso/renda: somente quando transferência em vida = Sim.

Cada pergunta oferece Não sei e Prefiro não responder. Ao mudar um antecedente, respostas de ramos inativos são apagadas antes de avaliar. Valores desconhecidos ou inválidos não equivalem a Não. O percurso tem entre 13 e 16 perguntas; o progresso percentual mede o percurso, nunca adequação.

## Ordem de avaliação

1. Falecimento, conflitos, dívidas relevantes ou necessidade de cuidado individual = Sim: encaminhamento direto, sem opções automatizadas.
2. Menos de cinco respostas conhecidas ou mais da metade em aberto: informações insuficientes.
3. Regras exploratórias ligam respostas a assuntos, com justificativa individual, na ordem documental. São deduplicadas e limitadas a três assuntos; não há ranking ou percentual.
4. Menos de dois assuntos fundamentados: informações insuficientes.
5. Dúvidas sobre as quatro condições sensíveis permanecem explicitamente registradas como riscos não esclarecidos. Bens em múltiplas UFs e sócios externos geram alertas contextuais.

As regras e suas condições completas são exibidas em `#regras`. Testamento aparece pelo objetivo de registrar intenções; doação pelo objetivo/intenção de transferência ou renda; governança por objetivos de gestão/continuidade ou participação diferente dos familiares; participações quando existe sociedade; liquidez quando há preocupação ou objetivo de caixa. Holding não é sugerida automaticamente. Inventário está no catálogo; o falecimento encaminha diretamente, sem orientação automática.

Perguntas sobre gestão e acordos também organizam o resumo da consulta. Não alimentam todas as regras exploratórias. Não atribua significado diagnóstico a essas respostas.

## Limites

Os limiares de quantidade de respostas são uma escolha conservadora de interface, não critério jurídico. Respostas completas não provam regularidade, capacidade, adequação ou economia. O resultado não substitui documentos nem avaliação da família. A versão de regras deve ser revisada junto do conteúdo e dos testes antes de atualização pública.
