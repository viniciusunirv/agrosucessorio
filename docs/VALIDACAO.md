# Verificações técnicas — 06/10/2026

Ambiente: Node 24.19.0, npm 11.9.0, Python 3.12.14 e Chromium 151 em Linux. Dependências instaladas com `npm ci`, respeitando o lockfile. Build estático em `dist/`.

Executados: `npm run check`, `npm run build` e 16 testes Playwright (oito verificações em duas configurações de viewport: 1440 × 1000 e 390 × 844).

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
