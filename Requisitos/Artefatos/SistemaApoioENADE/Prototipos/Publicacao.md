# Publicação e atualização

Endereço para avaliação: **[Espaço de estudo ENADE](https://enade-grupo2-estudo.mario-gmm06.chatgpt.site)**.

Hospedagem estática pública no Sites. O visitante acessa o protótipo sem conta ou instalação. O código acadêmico permanece no repositório do Grupo 2; o pacote hospedado contém o HTML, CSS, JavaScript, catálogo e fonte local da mesma versão.

## Preparar uma atualização

1. Edite os arquivos deste diretório. Para alterar a seleção inicial, atualize content.json preservando proveniência e conferência.
2. Na raiz, execute **node scripts/build-content.mjs** e **node scripts/check.mjs**.
3. Avalie os fluxos do [roteiro](README.md), confira responsividade e atualize as capturas quando houver mudanças visuais.
4. Execute **node scripts/package-prototype.mjs CAMINHO_DO_DESTINO** para copiar somente os arquivos de execução e assets a um diretório separado.
5. Publique esse pacote na hospedagem, preservando o endereço público e conferindo a versão publicada. No Sites, reutilize o projeto existente; o manifesto da hospedagem usa static.directory igual a dist.
6. Versione no GitHub a documentação e o código correspondentes à publicação.

O projeto de hospedagem tem identificador appgprj_6aea08c95f008191af2d1a638a997514. Credenciais temporárias de publicação não fazem parte do repositório. A hospedagem e a permissão de escrita no GitHub são acessos independentes.

## Registro de publicação

Publicação confirmada pela hospedagem em 03/11/2026, às 13:49 (horário de Brasília), versão hospedada 1, protótipo 3.0. Fonte da hospedagem: commit 669f4748fe3a8e74314ea87d9e0dbb7284daf9e4. O pacote distribuído foi preparado a partir dos arquivos de execução versionados neste projeto. O acesso foi configurado como público para avaliação.

## Critérios acadêmicos

O link público atende ao acesso navegável para avaliação. O grupo deve enviar os links do protótipo e do GitHub no AVA e guardar o comprovante. Entrevistas, revisão pedagógica, teste com participantes e aceite do professor devem ser registrados após sua realização; a hospedagem não encerra essas pendências.
