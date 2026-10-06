# AgroSucessório

Site educativo estático para explorar planejamento sucessório no agronegócio brasileiro. Sem cadastro, banco de dados, cookies de análise, API de IA ou envio das respostas.

**Estado da entrega:** protótipo funcional. Conteúdo, listas documentais, regras do questionário e tributação **não validados por profissionais**. A pesquisa jurídica atualizada não foi concluída. Na atualização de ITCMD, a LC 227/2026 foi consultada no Planalto; a pesquisa retomada registrou percentuais observados de sete UFs (AC, AL, ES, GO, MG, PE e SP), com cobertura parcial em SP. Vinte UFs continuam sem percentuais confirmados. A tabela mostra fontes e pendências. Não publique como orientação jurídica validada.

## Baixar pelo GitHub, sem instalar ferramentas

No repositório, clique em **Code → Download ZIP**. Extraia o arquivo baixado. Dentro da pasta do projeto, localize **site-pronto.zip** e extraia também esse arquivo. Nessa segunda pasta, abra **index.html** com um duplo clique para testar o site; os links e o questionário funcionam sem servidor. Ela também contém o site pronto para enviar ao Cloudflare Pages: `index.html`, os demais arquivos e as pastas `assets/` e `data/`. Não precisa instalar Node.js para usar esse pacote pronto. Consulte `docs/PUBLICACAO.md` para as etapas de publicação e mantenha os avisos de revisão pendente.

`site-pronto.zip` é uma cópia gerada; após alterar o código, regenere `dist/` e o pacote antes de enviá-lo novamente.

## Extração no Windows

O pacote `site-pronto.zip` usa ZIP padrão sem compressão e sem ZIP64. Se o ZIP geral baixado do GitHub não abrir, baixe apenas `site-pronto.zip` pelo botão de download desse arquivo no repositório. Salve o download completo no computador, clique com o botão direito e escolha **Extrair Tudo**. Escolha um caminho curto, como `C:\AgroSite`, para evitar problemas de comprimento de caminhos. Se continuar falhando, registre a mensagem exata e o nome do ZIP; ainda não foi possível reproduzir esse erro em Windows.

## Executar

Pré-requisitos: Node.js 24 (validado: 24.19.0), npm 11 e Python 3.12. O navegador precisa aceitar módulos JavaScript. Nenhuma chave ou conta é necessária para executar.

```sh
cd /workspace/agrosucessorio
npm ci --cache /workspace/.npm-cache --ignore-scripts --no-audit --no-fund
npm run dev
```

O servidor usa a porta 5173. Em seu computador, acesse essa porta no navegador. O `index.html` da raiz é a versão de desenvolvimento e usa módulos, portanto precisa de servidor HTTP. O `index.html` de `dist/` e de `site-pronto.zip` funciona com duplo clique, sem servidor. Para encerrar, pressione Ctrl+C no terminal do servidor.

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
| `app.js` | Interface e navegação por hash, sem backend; reunida em `dist/app.bundle.js` no build |
| `data/content.js` | Catálogo, documentos, matriz de fontes, escopo e estado editorial |
| `data/questionnaire.js` | Perguntas, ramificações, limpeza de respostas e regras explícitas |
| `data/tax.js` | Temas tributários gerais |
| `data/itcmd.js` | 27 UFs, fonte federal, cenários e versões estaduais ainda vazias |
| `data/tax-engine.js` | Valores em centavos, faixas, agregação por UF/beneficiário e bloqueios de fonte/revisão |
| `data/simulator-ui.js` | Formulário e resultado, sem chamadas de rede |
| `assets/` | Ilustrações SVG locais, sem serviço externo |
| `_headers` | Cabeçalhos de segurança para Cloudflare Pages |
| `docs/` | Pesquisa pendente, regras, revisão e publicação |
| `tests/` | Verificações funcionais e das regras |

O projeto usa JavaScript nativo porque permite hospedagem estática simples, sem compilação de framework, backend ou custo operacional obrigatório. A construção prepara a pasta pública e reúne os módulos em `app.bundle.js`, um script clássico que permite abrir a versão entregue diretamente como arquivo no computador. Rotas `#...` funcionam sem regras de redirecionamento do servidor.

As respostas ficam somente na memória da aba. Recarregar ou fechar apaga o progresso. O botão **Apagar minhas respostas** limpa respostas e marcações de documentos, mas não apaga PDFs criados pelo visitante. O provedor de hospedagem pode manter registros técnicos de acesso conforme sua política.

## Publicar e revisar

Leia [publicação](docs/PUBLICACAO.md), [pesquisa e matriz](docs/PESQUISA.md), [regras](docs/QUESTIONARIO.md) e [revisão profissional](docs/REVISAO.md).

Não existe publicação realizada, push ao GitHub ou domínio configurado nesta entrega. Os arquivos foram criados no checkout local. A publicação depende da sua conta e da validação do conteúdo. Sem texto verificado, esta versão pode servir para revisão interna; as pendências devem continuar visíveis.

Após cada atualização: revise fonte e contexto, execute os comandos acima, gere `dist/` novamente, confira as páginas alteradas e só então publique. Guarde uma versão anterior conhecida para reverter.

### Verificação opcional da abertura local

`npm run test:local` testa `dist/index.html` diretamente por `file://`. O navegador gerenciado deste ambiente bloqueia esse protocolo antes de executar o site; a abertura local não foi verificada em Windows. Os testes opcionais exigem navegador configurado em `playwright.local.config.js` que permita arquivos locais. `npm test` valida o pacote pelo servidor HTTP.

## Simulação de ITCMD — estado atual

As páginas de custos de testamento, doação, sociedade patrimonial, participações e inventário têm um formulário preparatório: operação, data, tipo de bem, UF, beneficiários numerados e valores. Para imóveis considera-se a localização; para móveis e quotas, o domicílio relevante conforme a operação, sem pedir endereço. Governança e liquidez não geram cálculo por si sós.

**Ainda não calcula impostos de nenhum estado:** as regras completas por cenário e sua revisão profissional estão pendentes, embora já haja percentuais observados de sete UFs. O motor está preparado e testado com exemplos matemáticos fictícios somente nos testes. Não há percentuais fictícios ou lembrados no cadastro público. A página `#aliquotas` mostra o estado das 27 pesquisas. Habilitar valores depende de consulta oficial, regras completas por cenário e revisão profissional identificada e vigente. Leia `docs/ITCMD.md`.
