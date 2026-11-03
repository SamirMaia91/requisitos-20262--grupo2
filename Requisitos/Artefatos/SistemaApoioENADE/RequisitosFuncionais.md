# Requisitos funcionais

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

As funcionalidades abaixo especificam o produto conceitual. Implementação no protótipo e limitações estão em [Protótipos](Prototipos/README.md). As fontes são documentais, não resultados de entrevistas.

## RF-01 — Cadastrar e autenticar usuários

Permitir cadastro com nome, e-mail e senha, entrada e saída de sessão. Atribuir estudante por padrão; conceder administração somente por responsável autorizado.

**Origem:** NEC-05. **Caso de uso:** UC-01. **Regras:** RN-01. **Prioridade:** Alta.

**Aceitação:** Cadastro válido cria conta sem privilégio administrativo; acesso inválido não abre sessão; saída invalida a sessão.

## RF-02 — Consultar banco de questões

Listar questões publicadas e filtrar por ano, curso, componente (formação geral ou específico) e tema, combinando filtros e indicando ausência de resultados.

**Origem:** NEC-01. **Caso de uso:** UC-02. **Regras:** RN-02, RN-03. **Prioridade:** Alta.

**Aceitação:** Cada filtro reduz o conjunto conforme os metadados; sem correspondência, exibir estado vazio e opção de limpar filtros.

## RF-03 — Responder questões em prática

Abrir questão objetiva, registrar uma alternativa por questão e confirmar o envio para correção.

**Origem:** NEC-02. **Caso de uso:** UC-03. **Regras:** RN-04. **Prioridade:** Alta.

**Aceitação:** Envio sem alternativa é impedido; uma resposta enviada mantém vínculo com usuário, questão e versão do gabarito.

## RF-04 — Configurar e iniciar simulado

Selecionar filtros, quantidade de questões e duração entre 1 e 240 minutos; criar tentativa com uma fotografia das questões e do gabarito vigente.

**Origem:** NEC-02. **Caso de uso:** UC-04. **Regras:** RN-03, RN-05. **Prioridade:** Alta.

**Aceitação:** Impedir início com quantidade superior às questões elegíveis ou sem questões; registrar início e prazo de encerramento.

## RF-05 — Executar e encerrar simulado

Permitir navegar entre questões, alterar respostas enquanto a tentativa estiver aberta e finalizar manualmente com confirmação ou automaticamente ao vencer o prazo.

**Origem:** NEC-02. **Caso de uso:** UC-04. **Regras:** RN-04, RN-05, RN-06. **Prioridade:** Alta.

**Aceitação:** Encerramento único preserva respostas até o prazo; reenvio não cria outro resultado; tentativa encerrada não permite alteração.

## RF-06 — Consultar correção e gabarito comentado

Após o envio de prática ou encerramento de simulado, exibir alternativa selecionada, resposta correta, justificativa revisada e referência da questão.

**Origem:** NEC-03. **Caso de uso:** UC-05. **Regras:** RN-03, RN-06, RN-07. **Prioridade:** Alta.

**Aceitação:** Antes do encerramento do simulado, não revelar gabarito; depois, apresentar correção inclusive das questões em branco.

## RF-07 — Acompanhar desempenho

Apresentar histórico pessoal de tentativas concluídas, acertos, erros, omissões e percentual global e por tema, com representação gráfica e tabela equivalente.

**Origem:** NEC-03. **Caso de uso:** UC-06. **Regras:** RN-07, RN-08. **Prioridade:** Alta.

**Aceitação:** Sem tentativas concluídas, não inventar notas; agregações usam somente resultados do próprio estudante e denominador explicitado.

## RF-08 — Participar da discussão da questão

Permitir publicar e consultar mensagens de texto ligadas a uma questão; oferecer denúncia de conteúdo inadequado.

**Origem:** NEC-04. **Caso de uso:** UC-07. **Regras:** RN-09. **Prioridade:** Média.

**Aceitação:** Mensagem vazia ou acima de 2000 caracteres é rejeitada; manter autoria e data; denúncia gera registro para moderação.

## RF-09 — Administrar questões e materiais

Permitir ao administrador cadastrar, revisar, publicar e arquivar questões e links de materiais, mantendo metadados, referência e comentário pedagógico.

**Origem:** NEC-05. **Caso de uso:** UC-08. **Regras:** RN-01, RN-02, RN-03, RN-10. **Prioridade:** Alta.

**Aceitação:** Estudante não altera catálogo; questão sem metadados, gabarito ou comentário revisado permanece em rascunho.

## RF-10 — Moderar discussões

Permitir ao administrador analisar denúncias e ocultar mensagens mediante motivo, preservando registro da decisão.

**Origem:** NEC-04. **Caso de uso:** UC-09. **Regras:** RN-01, RN-09. **Prioridade:** Média.

**Aceitação:** Mensagem ocultada deixa de aparecer no fórum; motivo e responsável ficam registrados para revisão administrativa.

## RF-11 — Consultar materiais e respectivas fontes

Listar materiais por tema com título, endereço de origem e descrição; abrir fonte externa identificada.

**Origem:** NEC-05. **Caso de uso:** UC-02. **Regras:** RN-02, RN-10. **Prioridade:** Média.

**Aceitação:** Link mostra sua origem; catálogo vazio informa ausência de materiais sem preencher registros fictícios.

## RF-12 — Gerenciar os próprios dados

Permitir consultar os dados da conta e solicitar exclusão; informar o efeito sobre tentativas e mensagens antes da confirmação.

**Origem:** NEC-05. **Caso de uso:** UC-01. **Regras:** RN-11. **Prioridade:** Média.

**Aceitação:** Solicitação exige sessão válida e confirmação; tratamento de retenção deve ser aprovado antes da operação em produção.
