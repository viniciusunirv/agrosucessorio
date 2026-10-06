# Verificações técnicas — 06/10/2026

Ambiente: Node 24.19.0, npm 11.9.0, Python 3.12.14 e Chromium 151 em Linux. Dependências instaladas com `npm ci`, respeitando o lockfile. Build estático em `dist/`.

Executados: `npm run check`, `npm run build` e 30 testes Playwright (quinze verificações em duas configurações de viewport: 1440 × 1000 e 390 × 844).

Cobertura:

- Regras explícitas, destinos válidos, informação insuficiente e todas as quatro condições de encaminhamento.
- Caminhos condicionais e exclusão de respostas que deixaram de se aplicar.
- Busca sem acentos, resultado vazio, filtros, limite de três seleções e comparação.
- Jornada das sete opções: explicação, documentos, marcações, custos bloqueados e resumo.
- Questionário completo, edição, apagar respostas e resultado incompleto.
- Aviso obrigatório em rotas, incluindo rota inexistente; nenhum pedido de rede externo durante navegação.
- Ausência de armazenamento local persistente e perda de respostas após recarregar.
- Navegação por teclado e link para pular conteúdo sem trocar a página.
- Ausência de transbordamento horizontal nas páginas representativas em ambos os tamanhos.

Capturas desktop e celular foram inspecionadas visualmente. Não é auditoria completa de acessibilidade, compatibilidade com todos os navegadores ou certificação de conformidade.

Não executados ou concluídos: validação jurídica/contábil, consulta das fontes oficiais bloqueadas, cálculo tributário (nenhum implementado), teste em dispositivos físicos, Safari/Firefox, conferência das condições atuais da hospedagem, publicação e verificação dos cabeçalhos no provedor. O servidor local de Python não aplica `_headers`; sua aplicação depende da hospedagem.

As instruções e permissões de rede foram salvas como rascunho do ambiente. Isso não publica o site nem comprova restauração do ambiente em nova tarefa.

## Pacote para abrir com duplo clique

O build passou a gerar `app.bundle.js`, script clássico sem imports, e `dist/index.html` o carrega com `defer`. Os testes pelo servidor passaram com esse pacote. A tentativa adicional de dois testes de abertura por `file://` (desktop/celular) foi bloqueada pelo Chromium gerenciado: `ERR_BLOCKED_BY_ADMINISTRATOR`, antes da execução do site. Portanto, abertura direta em Windows não foi confirmada neste ambiente. Esses testes estão separados em `tests/local-file.spec.js`, executáveis por `npm run test:local` em máquina com navegador que permita arquivos locais. Não constituem testes aprovados nesta entrega.

## Atualização do preparador de simulação de ITCMD

A versão atual passou em 30 testes (15 por configuração desktop/celular). Inclui valores em centavos, limites de faixas fictícias, arredondamento, agregação por UF/beneficiário, dados inválidos, conflitos de competência, fontes ausentes, revisão vencida, exceções não verificadas, edição de valores com invalidação do resultado anterior, cadastro das 27 UFs, formulário nas cinco opções pertinentes e apagamento dos valores. Os exemplos matemáticos de teste são fictícios e não representam alíquotas estaduais. Os formulários reais retornam informação insuficiente, não imposto zero, em todas as UFs. A fonte federal foi consultada; as 27 fontes estaduais/distrital ficaram bloqueadas pela rede. Nenhuma validação jurídica/contábil ou estimativa real foi executada.
