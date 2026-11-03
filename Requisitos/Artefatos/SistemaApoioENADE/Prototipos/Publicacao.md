# Publicação e atualização

Endereço para avaliação: **[Espaço de estudo ENADE](https://enade-grupo2-estudo.netlify.app)**.

Hospedagem estática pública no plano **Free do Netlify**, com HTTPS. O visitante acessa o protótipo diretamente, sem conta ou senha. O endereço usa o nome do projeto. O código acadêmico permanece no repositório do Grupo 2; a distribuição contém o HTML, CSS, JavaScript, catálogo e fonte local da mesma versão.

## Preparar uma atualização

1. Edite os arquivos do protótipo. Para alterar a seleção inicial, atualize content.json preservando a proveniência e a conferência.
2. Na raiz do repositório, execute **node scripts/build-netlify.mjs**. A rotina gera content.js, executa o verificador e copia somente os arquivos de execução e assets para dist.
3. Avalie os fluxos do [roteiro](README.md), confira a responsividade e atualize as capturas quando houver mudanças visuais.
4. No painel do projeto enade-grupo2-estudo no Netlify, abra Deploys e envie a pasta dist à área de publicação manual. Também é possível enviar um ZIP com index.html diretamente na raiz, acompanhado dos demais arquivos e assets.
5. Aguarde a publicação e confira o endereço público em uma janela sem sessão no Netlify.
6. Versione o código e a documentação correspondentes no GitHub.

O arquivo netlify.toml define o comando **node scripts/build-netlify.mjs** e o diretório de publicação **dist**. Essa configuração também pode ser usada caso o grupo conecte o repositório à publicação automática no painel do Netlify. A publicação registrada abaixo foi feita por envio direto do pacote, sem vinculação automática ao GitHub.

Mantenha a conta no plano Free e observe seus limites de utilização. O endereço netlify.app dispensa a compra de domínio. Credenciais de publicação e arquivos locais de sessão não integram o repositório.

## Registro de publicação

Publicação de produção confirmada em **03/11/2026, às 14:16, horário de Brasília**. Projeto: enade-grupo2-estudo. Identificador: 364505e5-8473-4bb9-a814-a52a0559e521. Publicação: 6aea16ddca6c2d9b9f39599e. Estado retornado pela hospedagem: ready. O endereço principal retornou HTTP 200 sem credenciais.

O pacote mantém o protótipo 3.0 e sua identidade visual UNIFOR. Contas, respostas e histórico permanecem locais ao navegador. Dados registrados em um endereço anterior não são transferidos automaticamente para outra origem.

## Critérios acadêmicos

O link público atende ao acesso navegável para avaliação. O grupo deve enviar os links do protótipo e do GitHub no AVA e guardar o comprovante. Entrevistas, revisão pedagógica, teste com participantes e aceite do professor devem ser registrados após sua realização; a hospedagem não encerra essas pendências.
