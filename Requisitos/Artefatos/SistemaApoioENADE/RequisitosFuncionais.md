# Requisitos funcionais

> Versão 2.2 · 06/11/2026 · Grupo 2

Os requisitos especificam o produto. As telas e os limites da demonstração estão no [protótipo](Prototipos/README.md).

## RF-01 — Cadastrar e autenticar usuários

Permitir cadastro com nome, e-mail e senha, entrada e saída de sessão. Atribuir estudante por padrão; conceder administração somente por responsável autorizado.

**Origem** NEC-05 · **Casos de uso** UC-01 · **Regras** RN-01 · **Prioridade** Alta

**Aceitação** Cadastro válido cria conta sem privilégio administrativo; acesso inválido não abre sessão; saída invalida a sessão.

## RF-02 — Consultar banco de questões

Listar questões publicadas, buscar por título, enunciado, tema, curso ou número e combinar os filtros de ano, curso, componente e tema.

**Origem** NEC-01 · **Casos de uso** UC-02 · **Regras** RN-02, RN-03 · **Prioridade** Alta

**Aceitação** A busca por título funciona em conjunto com os filtros. Sem correspondências, mostrar estado vazio e permitir limpar os filtros.

## RF-03 — Responder questões em prática

Abrir questão objetiva, registrar uma alternativa por questão e confirmar o envio para correção.

**Origem** NEC-02 · **Casos de uso** UC-03 · **Regras** RN-04 · **Prioridade** Alta

**Aceitação** Envio sem alternativa é impedido; uma resposta enviada mantém vínculo com usuário, questão e versão do gabarito.

## RF-04 — Configurar e iniciar simulado

Selecionar filtros, quantidade de questões e duração entre 1 e 240 minutos; criar tentativa com uma fotografia das questões e do gabarito vigente.

**Origem** NEC-02 · **Casos de uso** UC-04 · **Regras** RN-03, RN-05 · **Prioridade** Alta

**Aceitação** Impedir início com quantidade superior às questões elegíveis ou sem questões; registrar início e prazo de encerramento.

## RF-05 — Executar e encerrar simulado

Permitir navegar entre questões, alterar respostas enquanto a tentativa estiver aberta e finalizar manualmente com confirmação ou automaticamente ao vencer o prazo.

**Origem** NEC-02 · **Casos de uso** UC-04 · **Regras** RN-04, RN-05, RN-06 · **Prioridade** Alta

**Aceitação** Encerramento único preserva respostas até o prazo; reenvio não cria outro resultado; tentativa encerrada não permite alteração.

## RF-06 — Consultar correção e gabarito comentado

Após o envio de prática ou encerramento de simulado, exibir alternativa selecionada, resposta correta, justificativa revisada e referência da questão.

**Origem** NEC-03 · **Casos de uso** UC-05 · **Regras** RN-03, RN-06, RN-07 · **Prioridade** Alta

**Aceitação** Antes do encerramento do simulado, não revelar gabarito; depois, apresentar correção inclusive das questões em branco.

## RF-07 — Acompanhar desempenho

Apresentar histórico pessoal de tentativas concluídas, acertos, erros, omissões e percentual global e por tema, com representação gráfica e tabela equivalente.

**Origem** NEC-03 · **Casos de uso** UC-06 · **Regras** RN-07, RN-08 · **Prioridade** Alta

**Aceitação** Sem tentativas concluídas, não inventar notas; agregações usam somente resultados do próprio estudante e denominador explicitado.

## RF-08 — Participar da discussão da questão

Permitir publicar e consultar mensagens de texto ligadas a uma questão; oferecer denúncia de conteúdo inadequado.

**Origem** NEC-04 · **Casos de uso** UC-07 · **Regras** RN-09 · **Prioridade** Média

**Aceitação** Mensagem vazia ou acima de 2000 caracteres é rejeitada; manter autoria e data; denúncia gera registro para moderação.

## RF-09 — Gerenciar conteúdos de estudo

Permitir ao administrador gerenciar questões e cadastrar, editar, publicar ou arquivar materiais de estudo. Um novo material requer título, tema, descrição, arquivo e situação. Referências externas já incluídas no catálogo conservam o link de origem. Permitir exclusão confirmada de materiais, com remoção do registro e do anexo associado.

**Origem** NEC-07, NEC-08 · **Casos de uso** UC-08, UC-10, UC-12, UC-13 · **Regras** RN-01, RN-02, RN-03, RN-10 · **Prioridade** Alta

**Aceitação** Somente o administrador altera o catálogo. Questões incompletas ficam em rascunho. Materiais novos exigem arquivo válido. Materiais publicados aparecem na biblioteca e materiais arquivados saem da consulta. A exclusão confirmada remove o registro e o arquivo do navegador de avaliação.

## RF-10 — Moderar discussões

Permitir ao administrador analisar denúncias e ocultar mensagens mediante motivo, preservando registro da decisão.

**Origem** NEC-04 · **Casos de uso** UC-09 · **Regras** RN-01, RN-09 · **Prioridade** Média

**Aceitação** Mensagem ocultada deixa de aparecer no fórum; motivo e responsável ficam registrados para revisão administrativa.

## RF-11 — Consultar materiais de estudo

Listar materiais publicados por tema com título e descrição. Oferecer o download do anexo ou o acesso à referência externa com o domínio de origem identificado.

**Origem** NEC-07 · **Casos de uso** UC-11 · **Regras** RN-02, RN-10 · **Prioridade** Média

**Aceitação** O filtro mostra apenas materiais publicados do tema selecionado. O aluno pode baixar o anexo ou abrir a fonte externa identificada. O catálogo informa quando não há resultados.

## RF-12 — Gerenciar os próprios dados

Permitir consultar os dados da conta e solicitar exclusão; informar o efeito sobre tentativas e mensagens antes da confirmação.

**Origem** NEC-05 · **Casos de uso** UC-01 · **Regras** RN-11 · **Prioridade** Média

**Aceitação** Solicitação exige sessão válida e confirmação; tratamento de retenção deve ser aprovado antes da operação em produção.
