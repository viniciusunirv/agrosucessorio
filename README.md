# AgroSucessório

Site educativo estático para explorar planejamento sucessório no agronegócio brasileiro. Sem cadastro, banco de dados, cookies de análise, API de IA ou envio das respostas.

**Estado da entrega:** protótipo funcional. Conteúdo, listas documentais, regras do questionário e tributação **não validados por profissionais**. A pesquisa jurídica atualizada não foi concluída: os destinos oficiais retornaram bloqueio de rede 403 em 06/10/2026. Links são referências para consulta, não fontes já lidas. Não publique como orientação jurídica validada.

## Baixar pelo GitHub, sem instalar ferramentas

No repositório, clique em **Code → Download ZIP**. Extraia o arquivo baixado. Dentro da pasta do projeto, localize **site-pronto.zip** e extraia também esse arquivo. Essa segunda pasta contém o site pronto para enviar ao Cloudflare Pages: `index.html`, os demais arquivos e as pastas `assets/` e `data/`. Não precisa instalar Node.js para usar esse pacote pronto. Consulte `docs/PUBLICACAO.md` para as etapas de publicação e mantenha os avisos de revisão pendente.

`site-pronto.zip` é uma cópia gerada; após alterar o código, regenere `dist/` e o pacote antes de enviá-lo novamente.

## Executar

Pré-requisitos: Node.js 24 (validado: 24.19.0), npm 11 e Python 3.12. O navegador precisa aceitar módulos JavaScript. Nenhuma chave ou conta é necessária para executar.

```sh
cd /workspace/agrosucessorio
npm ci --cache /workspace/.npm-cache --ignore-scripts --no-audit --no-fund
npm run dev
```

O servidor usa a porta 5173. Em seu computador, acesse essa porta no navegador. Não abra `index.html` diretamente como arquivo: módulos precisam de servidor HTTP. Para encerrar, pressione Ctrl+C no terminal do servidor.

Se baixar o ZIP em seu computador, extraia-o e abra um terminal na pasta `agrosucessorio`. Para só visualizar, execute `python3 -m http.server 5173` (macOS/Linux) ou `py -m http.server 5173` (Windows com Python instalado). No navegador, digite `http://localhost:5173`. Use `Ctrl+C` para parar. Para gerar `dist/` e executar testes, instale também Node.js e siga os comandos abaixo.

`npm ci` instala apenas ferramentas de teste; o site publicado não depende de pacotes npm. Se quiser apenas executar, Python e os arquivos do projeto bastam.

## Validar e gerar arquivos de publicação

```sh
npm run check
npm run build
npm test
```

- `check`: verifica sintaxe, não substitui testes funcionais.
- `build`: copia exclusivamente os arquivos públicos para `dist/`; não inclui testes, notas de pesquisa ou dependências.
- `test`: testa regras, jornada de cada opção, busca, filtros, comparação, questionário, encaminhamento, privacidade, teclado e layout em desktop e celular.

Os testes usam Chromium do ambiente em `/usr/bin/chromium`. Fora deste ambiente, instale um Chromium compatível e ajuste `executablePath` em `playwright.config.js`, ou use o navegador do Playwright removendo essa propriedade e executando `npx playwright install chromium`. Não desabilite verificação de downloads/TLS.

## Onde atualizar

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura, navegação e aviso obrigatório em todas as páginas |
| `styles.css` | Identidade visual, celular, teclado, impressão e redução de movimento |
| `app.js` | Interface e navegação por hash, sem backend |
| `data/content.js` | Catálogo, documentos, matriz de fontes, escopo e estado editorial |
| `data/questionnaire.js` | Perguntas, ramificações, limpeza de respostas e regras explícitas |
| `data/tax.js` | Temas tributários e bloqueio da calculadora |
| `assets/` | Ilustrações SVG locais, sem serviço externo |
| `_headers` | Cabeçalhos de segurança para Cloudflare Pages |
| `docs/` | Pesquisa pendente, regras, revisão e publicação |
| `tests/` | Verificações funcionais e das regras |

O projeto usa JavaScript nativo porque permite hospedagem estática simples, sem compilação de framework, backend ou custo operacional obrigatório. A construção apenas prepara a pasta pública. Rotas `#...` funcionam sem regras de redirecionamento do servidor.

As respostas ficam somente na memória da aba. Recarregar ou fechar apaga o progresso. O botão **Apagar minhas respostas** limpa respostas e marcações de documentos, mas não apaga PDFs criados pelo visitante. O provedor de hospedagem pode manter registros técnicos de acesso conforme sua política.

## Publicar e revisar

Leia [publicação](docs/PUBLICACAO.md), [pesquisa e matriz](docs/PESQUISA.md), [regras](docs/QUESTIONARIO.md) e [revisão profissional](docs/REVISAO.md).

Não existe publicação realizada, push ao GitHub ou domínio configurado nesta entrega. Os arquivos foram criados no checkout local. A publicação depende da sua conta e da validação do conteúdo. Sem texto verificado, esta versão pode servir para revisão interna; as pendências devem continuar visíveis.

Após cada atualização: revise fonte e contexto, execute os comandos acima, gere `dist/` novamente, confira as páginas alteradas e só então publique. Guarde uma versão anterior conhecida para reverter.
