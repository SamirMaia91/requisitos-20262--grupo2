# Especificação de casos de uso

> Versão 2.2 · 06/11/2026 · Grupo 2

Os fluxos derivam das funcionalidades da [Visão](DocumentoDeVisao.md). Atores do produto: AT-01 Estudante e AT-02 Administrador. Para a demonstração, consulte o [guia do protótipo](Prototipos/README.md).

## UC-01 — Gerenciar acesso e dados da conta

**Ator** Estudante; Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Nenhuma sessão para cadastro/entrada; sessão válida para saída ou exclusão.

### Fluxo principal

1. Usuário informa dados de cadastro ou credenciais.
2. Sistema valida campos, unicidade do e-mail e credenciais.
3. Sistema cria conta de estudante ou abre sessão com o perfil existente.
4. Usuário pode encerrar sessão ou solicitar exclusão com confirmação.

### Alternativas e exceções

- UC-01-A1 — E-mail existente: orientar entrada sem criar duplicidade.
- UC-01-A2 — Credenciais inválidas: mensagem genérica e nenhuma sessão.
- UC-01-A3 — Pedido de exclusão: registrar solicitação e condições de retenção; saída invalida sessão.

**Pós-condição** Conta e sessão refletem a operação confirmada.

**Requisitos** RF-01, RF-12 · **Regras** RN-01, RN-11 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-02 — Consultar banco de questões

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Banco acessível. A consulta pode retornar uma lista vazia.

### Fluxo principal

1. Estudante abre o Banco de questões.
2. Sistema apresenta busca e filtros por ano, curso, componente e tema.
3. Estudante pesquisa pelo título, enunciado, tema, curso ou número e pode combinar os filtros.
4. Sistema lista as questões publicadas correspondentes e mostra as referências na questão selecionada.

### Alternativas e exceções

- UC-02-A1 — Sem correspondência, apresentar estado vazio e permitir limpar os filtros.

**Pós-condição** Questão localizada com referências identificadas.

**Requisitos** RF-02 · **Regras** RN-02, RN-03 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-03 — Praticar questão

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão válida e questão publicada.

### Fluxo principal

1. Estudante abre uma questão.
2. Sistema apresenta enunciado e cinco alternativas sem gabarito.
3. Estudante seleciona uma alternativa e confirma envio.
4. Sistema registra tentativa concluída e oferece correção (UC-05).

### Alternativas e exceções

- UC-03-A1 — Sem alternativa: impedir envio e indicar campo.
- UC-03-A2 — Questão arquivada antes do início: informar indisponibilidade e voltar à busca.

**Pós-condição** Resposta associada à tentativa concluída.

**Requisitos** RF-03 · **Regras** RN-03, RN-04, RN-07 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-04 — Realizar simulado cronometrado

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão válida, questões publicadas e nenhuma tentativa aberta concorrente.

### Fluxo principal

1. Estudante define filtros, quantidade e duração.
2. Sistema valida configuração e cria fotografia das questões e do gabarito.
3. Sistema registra início e prazo absoluto, mostrando tempo restante.
4. Estudante navega e registra ou altera alternativas.
5. Estudante pede encerramento e confirma; no vencimento, sistema encerra automaticamente.
6. Sistema persiste resultado único e libera UC-05.

### Alternativas e exceções

- UC-04-A1 — Quantidade insuficiente: não iniciar; solicitar ajuste.
- UC-04-A2 — Cancelamento da confirmação: continuar tentativa enquanto houver prazo.
- UC-04-A3 — Atualização ou retorno à página: retomar tentativa e prazo originais.
- UC-04-A4 — Prazo expirado durante ausência: encerrar na primeira verificação, sem aceitar respostas tardias.
- UC-04-A5 — Reenvio de encerramento: devolver resultado já registrado.

**Pós-condição** Tentativa imutável e corrigida.

**Requisitos** RF-04, RF-05 · **Regras** RN-03, RN-04, RN-05, RN-06, RN-08 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-05 — Consultar correção comentada

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Tentativa concluída pertencente ao estudante.

### Fluxo principal

1. Estudante abre resultado.
2. Sistema apresenta acertos, erros, omissões e percentual.
3. Estudante seleciona uma questão da tentativa.
4. Sistema apresenta resposta dada, gabarito preservado, comentário revisado e fonte.

### Alternativas e exceções

- UC-05-A1 — Tentativa aberta: não revelar gabarito.
- UC-05-A2 — Tentativa de outra conta: negar acesso.

**Pós-condição** Correção consultada sem alterar a tentativa.

**Requisitos** RF-06 · **Regras** RN-03, RN-06, RN-07, RN-08 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-06 — Consultar desempenho

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão válida.

### Fluxo principal

1. Estudante abre desempenho.
2. Sistema recupera somente tentativas concluídas do estudante.
3. Sistema agrega total e percentual por tema e apresenta gráfico e tabela.
4. Estudante abre uma tentativa para revisar sua correção.

### Alternativas e exceções

- UC-06-A1 — Sem tentativas: informar ausência de dados e oferecer prática.

**Pós-condição** Indicadores pessoais consultados com denominadores visíveis.

**Requisitos** RF-07 · **Regras** RN-07, RN-08 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-07 — Discutir uma questão

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão válida e questão identificada.

### Fluxo principal

1. Estudante abre discussão da questão.
2. Sistema lista mensagens visíveis com autoria e data.
3. Estudante envia texto; sistema valida tamanho e registra mensagem.
4. Estudante pode denunciar mensagem indicando motivo.

### Alternativas e exceções

- UC-07-A1 — Mensagem vazia ou extensa: rejeitar sem perder texto.
- UC-07-A2 — Mensagem ocultada: não retornar seu conteúdo na consulta pública.

**Pós-condição** Mensagem ou denúncia registrada na questão correspondente.

**Requisitos** RF-08 · **Regras** RN-09 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-08 — Gerenciar questões

**Ator** Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão administrativa válida.

### Fluxo principal

1. Administrador abre Curadoria de conteúdo e seleciona Questões.
2. Administrador cadastra ou edita uma questão e informa metadados, alternativas, fontes, gabarito e comentário.
3. Sistema valida os dados. A questão é publicada após conferência ou permanece em rascunho.
4. Administrador pode arquivar a questão. Ao editar, uma nova versão atende as próximas tentativas.

### Alternativas e exceções

- UC-08-A1 — Perfil sem autorização, negar alteração.
- UC-08-A2 — Dados de publicação ausentes, manter em rascunho quando elegível.
- UC-08-A3 — Histórico existente continua vinculado à fotografia da versão respondida.

**Pós-condição** Catálogo atualizado com rastreabilidade da revisão.

**Requisitos** RF-09 · **Regras** RN-01, RN-02, RN-03, RN-08 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-09 — Moderar discussão

**Ator** Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão administrativa e denúncia registrada.

### Fluxo principal

1. Administrador abre fila de denúncias.
2. Sistema apresenta mensagem e motivo.
3. Administrador registra decisão e justificativa.
4. Sistema oculta a mensagem ou mantém publicação, registrando responsável e data.

### Alternativas e exceções

- UC-09-A1 — Sem denúncias: fila vazia.
- UC-09-A2 — Decisão sem motivo: impedir conclusão.

**Pós-condição** Denúncia analisada com decisão rastreável.

**Requisitos** RF-10 · **Regras** RN-01, RN-09 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-10 — Cadastrar material de estudo

**Ator** Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão administrativa válida. No protótipo, ativar Avaliar curadoria.

### Fluxo principal

1. Administrador abre Curadoria de conteúdo, seleciona Materiais e escolhe Novo material.
2. Administrador preenche título, tema e descrição, seleciona o arquivo e a situação e solicita o salvamento.
3. Sistema valida os campos e o anexo, registra a origem do tipo arquivo e salva o material.
4. Se publicado, o item passa a aparecer na biblioteca para o estudante filtrar por tema e baixar o arquivo.

### Alternativas e exceções

- UC-10-A1 — Arquivo ausente, tamanho acima do limite ou formato incompatível, manter o formulário e indicar o ajuste.
- UC-10-A2 — Falha de armazenamento, informar o erro e conservar o formulário para nova tentativa.

**Pós-condição** Material registrado. A situação publicada disponibiliza o item para UC-11.

**Requisitos** RF-09 · **Regras** RN-01, RN-02, RN-10 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-11 — Consultar materiais de estudo

**Ator** Estudante · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Biblioteca acessível. A consulta pode retornar uma lista vazia.

### Fluxo principal

1. Estudante abre Materiais de estudo.
2. Sistema lista os materiais publicados com título, tema, descrição e origem.
3. Estudante filtra por tema e seleciona um material.
4. Estudante baixa o anexo ou abre o endereço externo identificado na ficha.

### Alternativas e exceções

- UC-11-A1 — Sem correspondência, exibir estado vazio e oferecer a lista de todos os materiais.
- UC-11-A2 — Se a fonte externa estiver indisponível ou o arquivo não puder ser lido, manter a ficha e permitir voltar à biblioteca.

**Pós-condição** Material consultado, com sua origem identificada.

**Requisitos** RF-11 · **Regras** RN-02, RN-10 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-12 — Atualizar e arquivar material de estudo

**Ator** Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Solicitação do ator.

**Pré-condições** Sessão administrativa válida e material existente.

### Fluxo principal

1. Administrador abre a lista de materiais na curadoria.
2. Administrador edita os metadados, troca o anexo quando necessário ou solicita o arquivamento.
3. Sistema valida e persiste a mudança. Ao arquivar, registra a data e conserva o cadastro e o anexo no histórico da curadoria. O material deixa de aparecer na biblioteca.

### Alternativas e exceções

- UC-12-A1 — Na edição sem novo arquivo, preservar o anexo atual ou a referência externa existente.
- UC-12-A2 — Arquivo inválido ou falha de armazenamento, manter o material anterior.

**Pós-condição** Catálogo atualizado. Materiais arquivados ficam no histórico da curadoria e a consulta mostra somente os publicados.

**Requisitos** RF-09 · **Regras** RN-01, RN-02, RN-10 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-13 — Excluir material de estudo

**Ator** Administrador · **Tipo** concreto · **Frequência** sob demanda.

**Gatilho** Selecionar a ação de excluir um material.

**Pré-condições** Sessão administrativa válida e material existente.

### Fluxo principal

1. Administrador abre a aba Materiais na Curadoria de conteúdo e aciona Excluir no item.
2. Sistema explica o efeito da exclusão e solicita confirmação.
3. Administrador confirma.
4. Sistema remove o material e seu anexo, quando houver, e atualiza a lista.

### Alternativas e exceções

- UC-13-A1 — Cancelamento mantém o material e o arquivo.
- UC-13-A2 — Falha ao salvar a alteração mantém o material na lista e informa o erro.

**Pós-condição** Material removido da curadoria e da biblioteca. Outros materiais e tentativas são preservados.

**Requisitos** RF-09 · **Regras** RN-01, RN-10 · **Qualidade** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.
