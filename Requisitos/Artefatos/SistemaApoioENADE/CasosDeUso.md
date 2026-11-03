# Especificação de casos de uso

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

Atores: AT-01 Estudante e AT-02 Administrador. O texto especifica o produto; [Protótipos](Prototipos/README.md) delimita a navegação local disponível.

## UC-01 — Gerenciar acesso e dados da conta

**Ator:** Estudante; Administrador. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Nenhuma sessão para cadastro/entrada; sessão válida para saída ou exclusão.

### Fluxo principal

1. Usuário informa dados de cadastro ou credenciais.
2. Sistema valida campos, unicidade do e-mail e credenciais.
3. Sistema cria conta de estudante ou abre sessão com o perfil existente.
4. Usuário pode encerrar sessão ou solicitar exclusão com confirmação.

### Alternativas e exceções

- UC-01-A1: E-mail existente: orientar entrada sem criar duplicidade.
- UC-01-A2: Credenciais inválidas: mensagem genérica e nenhuma sessão.
- UC-01-A3: Pedido de exclusão: registrar solicitação e condições de retenção; saída invalida sessão.

**Pós-condição:** Conta e sessão refletem a operação confirmada.

**Requisitos:** RF-01, RF-12. **Regras:** RN-01, RN-11. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-02 — Consultar questões e materiais

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Catálogo publicado disponível; resultados vazios são permitidos.

### Fluxo principal

1. Estudante abre banco de questões ou materiais.
2. Sistema apresenta filtros de ano, curso, componente e tema.
3. Estudante combina filtros e seleciona um item.
4. Sistema apresenta questão ou material com origem identificada.

### Alternativas e exceções

- UC-02-A1: Sem correspondência: estado vazio e limpar filtros.
- UC-02-A2: Fonte externa indisponível: preservar referência e permitir voltar ao catálogo.

**Pós-condição:** Conteúdo localizado, sem alteração do histórico.

**Requisitos:** RF-02, RF-11. **Regras:** RN-02, RN-03, RN-10. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-03 — Praticar questão

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão válida e questão publicada.

### Fluxo principal

1. Estudante abre uma questão.
2. Sistema apresenta enunciado e cinco alternativas sem gabarito.
3. Estudante seleciona uma alternativa e confirma envio.
4. Sistema registra tentativa concluída e oferece correção (UC-05).

### Alternativas e exceções

- UC-03-A1: Sem alternativa: impedir envio e indicar campo.
- UC-03-A2: Questão arquivada antes do início: informar indisponibilidade e voltar à busca.

**Pós-condição:** Resposta associada à tentativa concluída.

**Requisitos:** RF-03. **Regras:** RN-03, RN-04, RN-07. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-04 — Realizar simulado cronometrado

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão válida, questões publicadas e nenhuma tentativa aberta concorrente.

### Fluxo principal

1. Estudante define filtros, quantidade e duração.
2. Sistema valida configuração e cria fotografia das questões e do gabarito.
3. Sistema registra início e prazo absoluto, mostrando tempo restante.
4. Estudante navega e registra ou altera alternativas.
5. Estudante pede encerramento e confirma; no vencimento, sistema encerra automaticamente.
6. Sistema persiste resultado único e libera UC-05.

### Alternativas e exceções

- UC-04-A1: Quantidade insuficiente: não iniciar; solicitar ajuste.
- UC-04-A2: Cancelamento da confirmação: continuar tentativa enquanto houver prazo.
- UC-04-A3: Atualização ou retorno à página: retomar tentativa e prazo originais.
- UC-04-A4: Prazo expirado durante ausência: encerrar na primeira verificação, sem aceitar respostas tardias.
- UC-04-A5: Reenvio de encerramento: devolver resultado já registrado.

**Pós-condição:** Tentativa imutável e corrigida.

**Requisitos:** RF-04, RF-05. **Regras:** RN-03, RN-04, RN-05, RN-06, RN-08. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-05 — Consultar correção comentada

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Tentativa concluída pertencente ao estudante.

### Fluxo principal

1. Estudante abre resultado.
2. Sistema apresenta acertos, erros, omissões e percentual.
3. Estudante seleciona uma questão da tentativa.
4. Sistema apresenta resposta dada, gabarito preservado, comentário revisado e fonte.

### Alternativas e exceções

- UC-05-A1: Tentativa aberta: não revelar gabarito.
- UC-05-A2: Tentativa de outra conta: negar acesso.

**Pós-condição:** Correção consultada sem alterar a tentativa.

**Requisitos:** RF-06. **Regras:** RN-03, RN-06, RN-07, RN-08. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-06 — Consultar desempenho

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão válida.

### Fluxo principal

1. Estudante abre desempenho.
2. Sistema recupera somente tentativas concluídas do estudante.
3. Sistema agrega total e percentual por tema e apresenta gráfico e tabela.
4. Estudante abre uma tentativa para revisar sua correção.

### Alternativas e exceções

- UC-06-A1: Sem tentativas: informar ausência de dados e oferecer prática.

**Pós-condição:** Indicadores pessoais consultados com denominadores visíveis.

**Requisitos:** RF-07. **Regras:** RN-07, RN-08. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-07 — Discutir uma questão

**Ator:** Estudante. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão válida e questão identificada.

### Fluxo principal

1. Estudante abre discussão da questão.
2. Sistema lista mensagens visíveis com autoria e data.
3. Estudante envia texto; sistema valida tamanho e registra mensagem.
4. Estudante pode denunciar mensagem indicando motivo.

### Alternativas e exceções

- UC-07-A1: Mensagem vazia ou extensa: rejeitar sem perder texto.
- UC-07-A2: Mensagem ocultada: não retornar seu conteúdo na consulta pública.

**Pós-condição:** Mensagem ou denúncia registrada na questão correspondente.

**Requisitos:** RF-08. **Regras:** RN-09. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-08 — Manter catálogo

**Ator:** Administrador. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão administrativa válida.

### Fluxo principal

1. Administrador cadastra ou edita questão ou material.
2. Sistema valida campos e origem.
3. Administrador revisa gabarito e comentário e solicita publicação.
4. Sistema publica conteúdo elegível ou mantém rascunho com pendências.
5. Administrador pode arquivar conteúdo, preservando tentativas anteriores.

### Alternativas e exceções

- UC-08-A1: Perfil estudante: negar alteração.
- UC-08-A2: Fonte, alternativas ou comentário ausentes: impedir publicação.
- UC-08-A3: Item já utilizado: editar uma nova versão, sem mudar a fotografia de tentativas.

**Pós-condição:** Catálogo atualizado com rastreabilidade da revisão.

**Requisitos:** RF-09. **Regras:** RN-01, RN-02, RN-03, RN-08, RN-10. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.

## UC-09 — Moderar discussão

**Ator:** Administrador. **Tipo:** concreto. **Gatilho:** solicitação do ator. **Frequência:** sob demanda, ainda sem medição de uso.

**Pré-condições:** Sessão administrativa e denúncia registrada.

### Fluxo principal

1. Administrador abre fila de denúncias.
2. Sistema apresenta mensagem e motivo.
3. Administrador registra decisão e justificativa.
4. Sistema oculta a mensagem ou mantém publicação, registrando responsável e data.

### Alternativas e exceções

- UC-09-A1: Sem denúncias: fila vazia.
- UC-09-A2: Decisão sem motivo: impedir conclusão.

**Pós-condição:** Denúncia analisada com decisão rastreável.

**Requisitos:** RF-10. **Regras:** RN-01, RN-09. **Qualidade:** RNF-01, RNF-02, RNF-05, RNF-06, RNF-08.
