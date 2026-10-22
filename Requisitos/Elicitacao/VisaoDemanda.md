
# Elaborando a Visão da Demanda (VD)

> **Processo:** LAPIS — Engenharia de Requisitos
> **Versão deste guia:** 2.1 — 12/10/2026
> **Etapa principal:** Elicitação; refinamento nas etapas de Especificação e Validação
> **Artefato produzido:** Visão da Demanda (VD)
> **Modelo de referência (proposta revisada):** [Template de Visão da Demanda v2.1](../Artefatos/Templates/template-visao-demanda.md)

> **Como usar este guia:** leia os objetivos e a sequência de trabalho, copie o template para a pasta da demanda, preencha apenas informações sustentadas por fontes e realize a revisão com as pessoas responsáveis. Adapte a profundidade à complexidade da demanda. Se alguma seção não se aplicar, registre **Não se aplica** e uma justificativa curta. O guia orienta o preenchimento; não deve ser copiado para o documento final.

## O que é?

A **Visão da Demanda (VD)** consolida o entendimento compartilhado de uma demanda: **por que ela existe, quais resultados são esperados, quem é afetado e quais capacidades fazem parte do escopo**. Pode apoiar um novo sistema, uma evolução, uma integração ou uma manutenção.

A VD **não substitui** o documento de viabilidade, as especificações dos casos de uso, as regras de negócio detalhadas, os requisitos de qualidade, os contratos de integração nem a arquitetura técnica. Sua função é oferecer uma referência concisa e rastreável para esses artefatos.

**Exemplo fictício — Portal de Estágios:** a VD explica a necessidade de digitalizar solicitações de estágio, os atores envolvidos, as funcionalidades pretendidas, os sistemas externos afetados e como reconhecer o benefício esperado. O fluxo para cadastrar uma solicitação é especificado em documento próprio.

## Por que realizar?

- Alinhar solicitante, usuários, responsáveis por decisões e equipe de desenvolvimento em torno do problema e dos resultados esperados.
- Delimitar o que está **incluído**, **excluído** e apenas **previsto para evolução futura**.
- Registrar a origem das necessidades e manter vínculos entre fontes, necessidades, funcionalidades e especificações.
- Identificar impactos, premissas, restrições, dependências, riscos e decisões em aberto.
- Apoiar a priorização, a gestão de mudanças e o início seguro da especificação detalhada.
- Oferecer contexto confiável para agentes de IA, sem transferir a eles a aprovação dos requisitos.

## Quem realiza e quem participa?

**Responsável pela elaboração:** profissional ou equipe de requisitos, com apoio de quem conhece o negócio. **Responsável pela validação:** pessoa ou instância autorizada a confirmar o escopo e o entendimento da demanda, registrada na identificação da VD.

Participam conforme a demanda: solicitante/cliente, dono do produto, especialistas no domínio, usuários-chave, representantes de sistemas integrados, desenvolvimento, testes, operação e segurança. **Não é obrigatório que todos participem de todas as atividades.**

## Quando realizar?

- Na **Elicitação**, após reunir elementos suficientes para entender o problema e construir um catálogo inicial de necessidades e funcionalidades.
- Em **evoluções, integrações ou manutenções** cujo escopo ou impactos precisem ser explicitados.
- Sempre que decisões relevantes alterarem objetivo, público, benefícios ou limites da demanda: revisar a VD e seu histórico.
- Na **Especificação**, manter IDs e referências atualizados; na **Validação**, registrar a concordância ou as pendências impeditivas.

### Entradas e saídas

| Entradas usuais                                            | Saídas esperadas                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| Descrição do problema, solicitação ou oportunidade     | Objetivo e contexto da demanda                                     |
| Parecer ou evidências de viabilidade, quando disponíveis | Premissas, restrições, riscos e dependências relevantes         |
| Entrevistas, observações, documentos, normas e exemplos  | Necessidades identificadas e fontes/evidências                    |
| Informações de usuários, sistemas e processos atuais    | Atores, partes interessadas e impactos                             |
| Decisões iniciais de negócio                             | Escopo, catálogo inicial de funcionalidades e questões em aberto |

A ausência de uma entrada não autoriza inventá-la: registre **A definir**, sua fonte esperada e o responsável pelo levantamento.

## Como realizar?

### Passo 1 — Preparar o documento e identificar os responsáveis

Copie o [template v2.1](../Artefatos/Templates/template-visao-demanda.md), nomeie a demanda e preencha os campos de **Identificação e Histórico**: tipo, sistema relacionado, área solicitante, elaborador, validador, situação, versão e data. Mantenha o histórico de mudanças. Os campos de orientação entre colchetes devem ser substituídos antes da aprovação.

**Cuidados:** diferencie a **versão do template** da **versão da VD preenchida**. O documento pode começar em `1.0`, mesmo quando o template utilizado é o `2.1`.

### Passo 2 — Entender o problema e o objetivo (seções 1 e 2)

Descreva o resultado desejado em linguagem de negócio, sem antecipar tecnologia ou solução de implementação. Registre situação atual, problema/oportunidade, públicos afetados, evidências e descrição sumária da mudança.

**Exemplo fictício:**

- **Situação atual:** alunos encaminham solicitações de estágio por mensagens e acompanham a tramitação por consultas manuais.
- **Problema:** faltam visibilidade de andamento e padronização dos dados.
- **Objetivo:** permitir que alunos acompanhem digitalmente suas solicitações de estágio.
- **Descrição sumária:** disponibilizar registro e consulta de solicitações com acompanhamento de situação.

Se os dados forem suposições, identifique-os como hipóteses e registre o levantamento necessário.

### Passo 3 — Definir valor e sucesso (seção 3)

Para cada benefício, registre um **indicador ou evidência**, o **resultado desejado** e **como/quando será avaliado**. Utilize linha de base e meta quando conhecidas; não crie metas numéricas sem validação.

**Exemplo fictício:** benefício: aumentar a transparência; evidência: disponibilidade de consulta do andamento pelo aluno; resultado desejado: solicitação consultável durante seu ciclo; avaliação: verificação com usuários após a entrega. Se for exigida uma meta quantitativa, marque **A definir** até confirmar a linha de base e a meta.

Os indicadores aqui avaliam o **sucesso global da demanda**. Critérios de aceitação de uma funcionalidade pertencem à especificação dessa funcionalidade.

### Passo 4 — Mapear envolvidos, usuários e atores externos (seções 4 e 5)

Na **seção 4**, identifique quem solicita, decide, valida, desenvolve ou opera e suas responsabilidades. Na **seção 5**, identifique quem ou o que interage com a solução, com IDs estáveis `AT-01`, `AT-02` etc.

| Conceito          | Como registrar                                                            | Exemplo fictício                                        |
| ----------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| Parte interessada | Papel, interesse, responsabilidade e representante                        | Coordenação de Estágios: valida as regras do processo |
| Ator humano       | Perfil que interage com a solução                                       | `AT-01`: Aluno                                         |
| Ator sistema      | Sistema externo com interação identificável                            | `AT-02`: Sistema Acadêmico                            |
| Persona           | Descrição contextual (opcional), vinculada em documento próprio | Aluno que usa predominantemente celular                  |

**Não há exigência mínima de duas personas.** Crie personas somente se suas características auxiliarem decisões de experiência ou escopo. Não duplique a descrição dos atores no catálogo: referencie seus IDs.

### Passo 5 — Delimitar escopo e entregas (seção 6)

Separe rigorosamente:

- **Incluído na demanda:** capacidades e resultados comprometidos para o escopo em análise.
- **Fora do escopo:** capacidades expressamente não atendidas.
- **Evoluções futuras:** possibilidades sem compromisso de implementação nesta demanda.
- **Entregas e marcos:** resultados e datas/condições quando conhecidos, indicando se o prazo é obrigatório, estimado ou a definir.

**Exemplo fictício:** incluído: solicitar e consultar estágio; fora do escopo: processamento financeiro de bolsas; evolução futura: notificações por aplicativo. Não classifique automaticamente uma ideia futura como entrega aprovada.

### Passo 6 — Identificar necessidades e catalogar funcionalidades (seção 7)

Primeiro registre as **necessidades**, com IDs `NEC-01`, descrição, **fonte/evidência** e atores relacionados. Depois registre as **funcionalidades** com IDs `F-01`, resultado esperado, necessidade de origem, IDs de atores, prioridade, valor, frequência, escopo/entrega e referência à especificação.

**Exemplo fictício:**

| Necessidade                                                            | Fonte/evidência                                | Atores    |
| ---------------------------------------------------------------------- | ----------------------------------------------- | --------- |
| `NEC-01` — Consultar situação da solicitação sem contato manual | Entrevista com alunos (referência a registrar) | `AT-01` |

| Funcionalidade                                   | Necessidade | Atores    | Prioridade | Valor | Frequência | Especificação          |
| ------------------------------------------------ | ----------- | --------- | ---------- | ----- | ----------- | ------------------------ |
| `F-01` — Consultar andamento da solicitação | `NEC-01`  | `AT-01` | Essencial  | Alto  | Média      | `CDU-01` — a elaborar |

**Como classificar:**

- **Prioridade:** essencial (necessária para cumprir o objetivo), importante (agrega valor e admite alternativa temporária), desejável (pode ser adiada sem comprometer o objetivo).
- **Valor:** benefício relativo — alto, médio, baixo ou **A definir**.
- **Frequência:** recorrência estimada — alta, média, baixa ou **A definir**.

Essas três dimensões são diferentes; não deduza prioridade apenas de frequência. Indique a evidência disponível e obtenha confirmação dos envolvidos.

**Rastreabilidade esperada:** `Fonte/evidência → NEC-01 → F-01 → CDU-01 → testes`. A VD registra os vínculos até a especificação; fluxos e testes ficam em documentos próprios. Uma funcionalidade pode originar mais de um caso de uso. Não renumere identificadores já referenciados sem avaliar os impactos.

### Passo 7 — Descrever a solução em alto nível e seus impactos (seção 8)

Registre responsabilidades gerais da solução, sistemas/dispositivos externos, integrações principais e impactos em processos ou sistemas existentes. Diferencie **impacto confirmado**, **hipótese** e **A definir**.

**Exemplo fictício:** Sistema Acadêmico — provável consulta de vínculo do aluno; situação: **hipótese**, dependendo de confirmação pela equipe responsável.

**Representações visuais são opcionais.** Use mapa de histórias, diagrama geral de casos de uso, diagrama de contexto ou protótipo de baixa fidelidade quando ajudarem a esclarecer limites ou interações. Diagramas de componentes e implantação, se já existentes, podem ser **referenciados**, mas não são obrigatórios nem devem transformar a VD em arquitetura técnica.

**Diagramas de atividades UML com raias por ator e um diagrama por fluxo** devem ser elaborados nas especificações dos casos de uso, não na VD. O detalhamento técnico de componentes, APIs e contratos pertence aos documentos correspondentes.

### Passo 8 — Registrar condições, riscos e dúvidas (seções 9 e 10)

Na **seção 9**, sintetize premissas (hipóteses a confirmar), restrições (limites conhecidos), dependências, condições gerais de qualidade e regras gerais relevantes ao escopo, indicando fonte ou responsável.

Na **seção 10**, registre riscos, dúvidas e decisões pendentes com ID `PQ-01`, impacto, próxima ação, responsável, prazo e situação. Não deixe lacunas importantes apenas em comentários informais.

**Exemplo fictício:** `PQ-01` — A integração permite consultar matrícula ativa? Impacto: escopo da integração; ação: validar com a equipe acadêmica; situação: aberto.

### Passo 9 — Vincular artefatos relacionados (seção 11)

Mantenha links para documentos **compartilhados**, como glossário, regras de negócio comuns, requisitos de qualidade, arquitetura e contratos de integração. Registre se estão disponíveis, a elaborar ou não se aplicam.

**Evite duplicações:** casos de uso específicos são relacionados no catálogo da seção 7. Passos, precondições, exceções, fluxos alternativos, critérios de aceitação e regras particulares ficam na especificação dos respectivos casos de uso.

### Passo 10 — Revisar, classificar e validar (seção 12)

Execute o **checklist do próprio template v2.1** e faça uma revisão com os responsáveis. Verifique clareza do objetivo, escopo e exclusões, fontes das necessidades, consistência de IDs e links, separação entre fatos e hipóteses e ausência de detalhamento indevido.

Após a revisão, registre **uma das condições de encaminhamento**:

| Condição                                    | Quando usar                                                                                                                                 | Próximo encaminhamento                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Apta para iniciar a especificação** | Objetivo, envolvidos, limites, necessidades e catálogo inicial estão suficientemente claros; pendências remanescentes têm responsáveis | Detalhar casos de uso e requisitos relacionados; ainda não equivale a aprovação final da VD |
| **Validada pelas partes interessadas**  | Responsáveis confirmaram o entendimento geral e o escopo; ressalvas aceitas estão explícitas                                             | Registrar aprovação/ressalvas e manter a VD como referência                                 |
| **Com pendências impeditivas**         | Ausências ou decisões não resolvidas impedem delimitar o escopo ou especificar com segurança                                            | Tratar questões da seção 10 antes de avançar na parte afetada                              |

Registre versão, responsável e papel, data, condição, decisões e ressalvas na seção 12.3. **Não é necessário finalizar todos os casos de uso para validar a Visão.** A especificação de cada funcionalidade deve ser validada antes de sua implementação; a aceitação do software é verificada separadamente.

## Exemplo de encadeamento entre documentos

```text
Entrevista com alunos (evidência)
    ↓
NEC-01  Consultar situação da solicitação
    ↓
F-01    Consultar andamento
    ↓
CDU-01  Consultar andamento da solicitação
        ├── fluxo principal e fluxos alternativos
        ├── diagramas de atividades UML por fluxo, com raias por ator
        ├── regras aplicáveis
        └── critérios de aceitação
    ↓
Casos e evidências de teste (artefatos próprios)
```

A cadeia é um **exemplo fictício**, não uma exigência de que cada necessidade corresponda a exatamente uma funcionalidade ou a um único caso de uso.

## Boas práticas para uso de IA e SDD

Neste guia, **SDD** significa *Spec-Driven Development* (desenvolvimento orientado a especificações): requisitos e especificações revisados orientam o planejamento, a geração de código e a verificação. A VD fornece contexto de negócio e limites de escopo para a etapa de especificação; cada funcionalidade deve ser detalhada e validada em um caso de uso ou artefato equivalente antes de servir de base à implementação. **A VD, isoladamente, não é especificação suficiente para gerar código.**

A IA pode ajudar a entrevistar de forma estruturada, sugerir perguntas, identificar lacunas, revisar consistência, checar referências e elaborar rascunhos. Ela **não é fonte de aprovação** e não deve converter inferências em requisitos confirmados.

**Regras para o agente:**

1. Ler o template v2.1 e o contexto disponível antes de preencher a VD.
2. Distinguir **informação confirmada**, **hipótese**, **pendência** e **proposta**; preservar a origem das afirmações.
3. Não inventar entrevistados, fatos, métricas, datas, decisões ou aprovações.
4. Usar e verificar os IDs `AT-`, `NEC-`, `F-`, `CDU-` e `PQ-`, preservando vínculos existentes.
5. Não detalhar fluxos, arquitetura ou contratos na VD; criar ou referenciar artefatos adequados.
6. Apontar inconsistências e pedir revisão humana antes de classificar um documento como validado.
7. Não implementar comportamento não especificado ou aprovado apenas com base na VD.

**Exemplo de instrução ao Codex:**

> Leia `Requisitos/Elicitacao/VisaoDemanda.md`, `Requisitos/Artefatos/Templates/template-visao-demanda.md` e a VD da demanda em `<caminho-da-demanda>/VisaoDemanda.md` (substitua pelo caminho real do arquivo). Revise a VD sem editar arquivos nem alterar requisitos confirmados. Identifique lacunas, contradições, IDs inválidos e referências quebradas. Apresente os achados sustentados pelos documentos separadamente das sugestões e incertezas. Não invente informações nem marque a VD como validada.

## Ferramentas e artefatos

**Edição e versionamento:** [Markdown](https://www.markdownguide.org/getting-started/), [Visual Studio Code](https://code.visualstudio.com/), [GitHub](https://docs.github.com/pt).
**Visuais opcionais:** [Diagrams.net](https://app.diagrams.net/), [Mermaid](https://mermaid.js.org/), [Visual Paradigm Online](https://online.visual-paradigm.com/pt/), PlantUML quando apropriado.

**Artefato produzido:** [Visão da Demanda preenchida conforme o template v2.1](../Artefatos/Templates/template-visao-demanda.md).
**Insumos e referências:** solicitação do negócio, parecer de viabilidade (se houver), evidências de elicitação, [glossário](../Artefatos/Templates/template-glossario.md), protótipos e documentos de processos/sistemas existentes.

## Revisão rápida antes de encaminhar

- [ ] A VD comunica **o problema e o valor**, sem antecipar implementação?
- [ ] Os atores da seção 5 e as referências `AT-` da seção 7 correspondem?
- [ ] Cada `NEC-` tem fonte/evidência ou pendência explicitada?
- [ ] Cada `F-` aponta para uma necessidade e uma especificação existente ou futura?
- [ ] Prioridade, valor e frequência estão separados e coerentes?
- [ ] Escopo atual, exclusões e ideias futuras estão distintos?
- [ ] Riscos, hipóteses e pendências têm próximos passos e responsáveis?
- [ ] Diagramas e personas só aparecem quando úteis?
- [ ] Foi registrada a condição **apta**, **validada** ou **com pendências impeditivas**, com responsável e ressalvas?

> Este resumo **não substitui** o checklist completo da seção 12.1 do template.

## Referências

- [Template de Visão da Demanda — LAPIS v2.1](../Artefatos/Templates/template-visao-demanda.md)
- [Glossário — template LAPIS](../Artefatos/Templates/template-glossario.md)
- [Documentação do GitHub](https://docs.github.com/pt)

---

**Histórico do guia**

| Data       | Versão        | Alterações                                                                                                                                                                                                                                                                           |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12/10/2026 | 2.1 (proposta) | Alinhamento ao template VD v2.1: 12 seções, fontes, rastreabilidade, distinção entre prioridade/valor/frequência, visuais opcionais, critérios de encaminhamento e orientações para IA/SDD. Substitui obrigatoriedade anterior de duas personas e de diagramas de arquitetura. |
