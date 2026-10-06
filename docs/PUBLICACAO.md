# Publicar, atualizar e desfazer

**Nenhum site foi publicado.** Não há acesso a uma conta de hospedagem. As consultas à documentação oficial de Cloudflare Pages foram bloqueadas pela rede em 06/10/2026. Portanto, condições atuais, plano gratuito, limites e nomes dos botões **não foram verificados**. O roteiro abaixo é preparatório e deve ser conferido no serviço antes de publicar.

Referências oficiais a consultar:

- Início e integração Git: https://developers.cloudflare.com/pages/get-started/git-integration/
- Upload direto: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Limites: https://developers.cloudflare.com/pages/platform/limits/
- Reversão: https://developers.cloudflare.com/pages/configuration/rollbacks/
- Domínios: https://developers.cloudflare.com/pages/configuration/custom-domains/

## Antes de publicar

1. Concluir pesquisa e revisão jurídica/contábil ou restringir a versão ao uso de revisão, mantendo os avisos de pendência.
2. Confirmar no painel/documentação atual disponibilidade do plano gratuito para o uso desejado, limites de arquivos, builds e condições de domínio.
3. Executar `npm ci`, `npm run check`, `npm run build` e `npm test`.
4. Conferir que `dist/` contém somente arquivos públicos. Não incluir documentos familiares, logs, arquivos de credenciais ou dados reais.
5. Guardar uma cópia da versão publicada anterior e identificar a versão do conteúdo.

## Caminho A — upload direto (sem enviar código ao GitHub)

1. Criar ou acessar sua conta Cloudflare.
2. Procurar a criação de projeto Pages com upload de arquivos estáticos (confira os nomes atuais no painel).
3. Definir um nome de projeto disponível.
4. Enviar o conteúdo de `dist/`, preservando pastas `assets/` e `data/` e o arquivo `_headers`. `index.html` deve estar na raiz dos arquivos publicados.
5. Conferir avisos e concluir a implantação apenas quando o conteúdo estiver aprovado para seu uso.
6. Copiar o endereço HTTPS que o painel fornecer. O projeto normalmente usa um subdomínio do serviço; confirme o endereço real no painel, sem inventá-lo.
7. No endereço público, testar busca, comparação, todas as etapas, questionário e avisos em celular. Confirmar também os cabeçalhos de segurança na resposta HTTP.

## Caminho B — integração com GitHub

1. Revisar os arquivos locais, criar commits e enviá-los ao seu repositório GitHub por seu fluxo habitual. Esta entrega não realizou commit ou push.
2. No serviço, autorizar o acesso somente ao repositório necessário e escolher a branch que efetivamente contém o site. O remoto original estava sem branch `main` na inspeção inicial; ela só existirá após você publicar um commit nela.
3. Configurar sem preset de framework; diretório raiz do projeto = raiz do repositório; comando de build = `npm run build`; saída = `dist`.
4. Selecionar Node 24 pela configuração suportada no serviço, se necessário. O build só usa módulos nativos de Node; a ferramenta de testes não é necessária em produção.
5. Conferir o log, o endereço fornecido e a implantação. Testar a versão pública antes de divulgá-la.

Upload direto e integração Git podem ter diferentes possibilidades de migração. Confira a documentação atual antes de escolher; não é necessário contratar domínio próprio.

## Atualizar

- Edite `data/content.js` e arquivos relacionados, registre fonte, data e revisão; não retire avisos sem evidência.
- Execute as verificações, gere novamente `dist/` e preserve a versão anterior.
- No upload direto, envie a nova pasta ao mesmo projeto. Na integração Git, o envio à branch configurada normalmente aciona a implantação; confira isso no painel atual.
- Verifique o resultado no endereço público. Um build local aprovado não prova publicação bem-sucedida.

## Desfazer uma publicação problemática

- Use o histórico de implantações e a opção de retorno à versão anterior, **se disponível para o modo e plano escolhidos**. Confira a documentação de rollbacks.
- Se não houver retorno disponível, publique novamente a cópia dos arquivos `dist/` da última versão validada. Com Git, restaure o conteúdo por um novo commit e acompanhe a implantação; não apague o histórico para corrigir conteúdo.
- Verifique no endereço público se a versão correta está ativa. Se houver risco de conteúdo errado permanecer público, use o controle de retirada de publicação do provedor, conforme seus procedimentos atuais.

## Custos e endereço

Hospedagem em plano gratuito, subdomínio do provedor e domínio próprio são coisas diferentes. A disponibilidade e os limites do plano precisam de confirmação atual; não há promessa de gratuidade permanente ou recursos ilimitados. Domínio próprio costuma envolver registro e renovação pagos. Esta versão não precisa de funções, backend, banco de dados ou serviço pago.
