# Backlog priorizado

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

Priorização proposta por dependências e cobertura do enunciado. Ainda não houve ordenação aprovada com estudantes. Alta = núcleo de prática e integridade; Média = colaboração e funções complementares. Desempate pela ordem abaixo.

| Item | Prioridade | Funcionalidade | RF / UC | Aceitação |
| --- | --- | --- | --- | --- |
| PB-01 | Alta | Cadastrar e autenticar usuários | RF-01 / UC-01 | Cadastro válido cria conta sem privilégio administrativo; acesso inválido não abre sessão; saída invalida a sessão. |
| PB-02 | Alta | Consultar banco de questões | RF-02 / UC-02 | Cada filtro reduz o conjunto conforme os metadados; sem correspondência, exibir estado vazio e opção de limpar filtros. |
| PB-03 | Alta | Responder questões em prática | RF-03 / UC-03 | Envio sem alternativa é impedido; uma resposta enviada mantém vínculo com usuário, questão e versão do gabarito. |
| PB-04 | Alta | Configurar e iniciar simulado | RF-04 / UC-04 | Impedir início com quantidade superior às questões elegíveis ou sem questões; registrar início e prazo de encerramento. |
| PB-05 | Alta | Executar e encerrar simulado | RF-05 / UC-04 | Encerramento único preserva respostas até o prazo; reenvio não cria outro resultado; tentativa encerrada não permite alteração. |
| PB-06 | Alta | Consultar correção e gabarito comentado | RF-06 / UC-05 | Antes do encerramento do simulado, não revelar gabarito; depois, apresentar correção inclusive das questões em branco. |
| PB-07 | Alta | Acompanhar desempenho | RF-07 / UC-06 | Sem tentativas concluídas, não inventar notas; agregações usam somente resultados do próprio estudante e denominador explicitado. |
| PB-08 | Média | Participar da discussão da questão | RF-08 / UC-07 | Mensagem vazia ou acima de 2000 caracteres é rejeitada; manter autoria e data; denúncia gera registro para moderação. |
| PB-09 | Alta | Administrar questões e materiais | RF-09 / UC-08 | Estudante não altera catálogo; questão sem metadados, gabarito ou comentário revisado permanece em rascunho. |
| PB-10 | Média | Moderar discussões | RF-10 / UC-09 | Mensagem ocultada deixa de aparecer no fórum; motivo e responsável ficam registrados para revisão administrativa. |
| PB-11 | Média | Consultar materiais e respectivas fontes | RF-11 / UC-02 | Link mostra sua origem; catálogo vazio informa ausência de materiais sem preencher registros fictícios. |
| PB-12 | Média | Gerenciar os próprios dados | RF-12 / UC-01 | Solicitação exige sessão válida e confirmação; tratamento de retenção deve ser aprovado antes da operação em produção. |

## Trabalho acadêmico

M1 concentra elicitação e modelagem inicial; M2 concentra especificação, revisão e prototipação. Esses marcos representam entregas de documentação e não sprints de implementação de um sistema completo. Status real e pendências estão em [Plano de entregas](PlanoDeEntregas.md). Não há estimativas de esforço aprovadas.
