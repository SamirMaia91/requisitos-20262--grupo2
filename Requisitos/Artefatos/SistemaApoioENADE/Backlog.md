# Backlog priorizado

> Versão 2.2 · 06/11/2026 · Grupo 2

A ordem considera o núcleo de estudo, a integridade dos resultados e os recursos complementares.

| Item | Prioridade | Funcionalidade | RF / Casos de uso | Aceitação |
| --- | --- | --- | --- | --- |
| PB-01 | Alta | Cadastrar e autenticar usuários | RF-01 / UC-01 | Cadastro válido cria conta sem privilégio administrativo; acesso inválido não abre sessão; saída invalida a sessão. |
| PB-02 | Alta | Consultar banco de questões | RF-02 / UC-02 | A busca por título funciona em conjunto com os filtros. Sem correspondências, mostrar estado vazio e permitir limpar os filtros. |
| PB-03 | Alta | Responder questões em prática | RF-03 / UC-03 | Envio sem alternativa é impedido; uma resposta enviada mantém vínculo com usuário, questão e versão do gabarito. |
| PB-04 | Alta | Configurar e iniciar simulado | RF-04 / UC-04 | Impedir início com quantidade superior às questões elegíveis ou sem questões; registrar início e prazo de encerramento. |
| PB-05 | Alta | Executar e encerrar simulado | RF-05 / UC-04 | Encerramento único preserva respostas até o prazo; reenvio não cria outro resultado; tentativa encerrada não permite alteração. |
| PB-06 | Alta | Consultar correção e gabarito comentado | RF-06 / UC-05 | Antes do encerramento do simulado, não revelar gabarito; depois, apresentar correção inclusive das questões em branco. |
| PB-07 | Alta | Acompanhar desempenho | RF-07 / UC-06 | Sem tentativas concluídas, não inventar notas; agregações usam somente resultados do próprio estudante e denominador explicitado. |
| PB-08 | Média | Participar da discussão da questão | RF-08 / UC-07 | Mensagem vazia ou acima de 2000 caracteres é rejeitada; manter autoria e data; denúncia gera registro para moderação. |
| PB-09 | Alta | Gerenciar conteúdos de estudo | RF-09 / UC-08, UC-10, UC-12, UC-13 | Somente o administrador altera o catálogo. Questões incompletas ficam em rascunho. Materiais novos exigem arquivo válido. Materiais publicados aparecem na biblioteca e materiais arquivados saem da consulta. A exclusão confirmada remove o registro e o arquivo do navegador de avaliação. |
| PB-10 | Média | Moderar discussões | RF-10 / UC-09 | Mensagem ocultada deixa de aparecer no fórum; motivo e responsável ficam registrados para revisão administrativa. |
| PB-11 | Média | Consultar materiais de estudo | RF-11 / UC-11 | O filtro mostra apenas materiais publicados do tema selecionado. O aluno pode baixar o anexo ou abrir a fonte externa identificada. O catálogo informa quando não há resultados. |
| PB-12 | Média | Gerenciar os próprios dados | RF-12 / UC-01 | Solicitação exige sessão válida e confirmação; tratamento de retenção deve ser aprovado antes da operação em produção. |
