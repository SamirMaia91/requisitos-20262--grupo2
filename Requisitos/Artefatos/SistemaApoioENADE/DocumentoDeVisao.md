# Documento de Visão — Sistema de Apoio ao ENADE

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

## 1. Contexto e problema

O projeto acadêmico da disciplina Requisitos e Modelagem de Sistemas, da UNIFOR, propõe uma plataforma web de preparação para o ENADE. O enunciado descreve dificuldades relacionadas à organização de materiais, prática e acompanhamento de desempenho (FON-01). Trata-se da caracterização fornecida pela atividade; sua frequência e impacto entre estudantes ainda precisam de investigação de campo. O portal do Inep oferece provas e gabaritos por edição (FON-05). A existência dessa fonte não comprova as necessidades de usuários específicos.

## 2. Objetivo e valor esperado

Especificar um ambiente que reúna consulta a questões, prática, simulados cronometrados, correção comentada e acompanhamento pessoal. Os benefícios esperados são facilitar o acesso a conteúdo rastreável e apoiar a identificação de temas a revisar. Ganhos de aprendizagem e satisfação não foram medidos. O trabalho é conceitual, sem obrigação de entregar sistema de produção.

## 3. Partes interessadas e atores

| Ator | Papel |
| --- | --- |
| AT-01 — Estudante | Consulta conteúdo, pratica, realiza simulados, consulta resultados e discute questões. |
| AT-02 — Administrador | Mantém catálogo e modera discussões. |
| Professor e coordenação | Partes interessadas na qualidade pedagógica e no acompanhamento acadêmico; não recebem acesso automático ao histórico individual. |
| Grupo 2 | Elabora e revisa os artefatos. |
| Professor da disciplina | Avalia e orienta a atividade; não se confunde com administrador do produto. |

Representantes e aceite: ver [Stakeholders](Stakeholders.md) e [Validação](Validacao.md).

## 4. Escopo inicial

- Cadastro e autenticação de estudantes e administradores.
- Banco de questões objetivas por ano, curso, componente e tema, com origem identificada.
- Prática individual e simulados com duração configurável e encerramento por prazo.
- Gabarito comentado após conclusão e estatísticas pessoais por tema.
- Discussão por questão, denúncias e moderação.
- Catálogo de materiais e manutenção administrativa.

Ficam fora do produto inicial: inscrição oficial no ENADE, cálculo da nota oficial, integração institucional, extração automática de PDF, correção automática de discursivas, recomendações por IA e aplicativo nativo. Questões anuladas não entram na pontuação. A proposta 5 do material de apoio FON-04 é a referência temática mais próxima; importação automática e integração curricular são evoluções a investigar, não funcionalidades aprovadas.

## 5. Necessidades documentais e funcionalidades

| ID | Necessidade | Fonte | Cobertura |
| --- | --- | --- | --- |
| NEC-01 | Encontrar questões por edição, curso, componente e tema | FON-01, FON-05 | RF-02 |
| NEC-02 | Praticar com tempo definido e encerramento previsível | FON-01 | RF-03, RF-04, RF-05 |
| NEC-03 | Compreender respostas e acompanhar desempenho por tema | FON-01 | RF-06, RF-07 |
| NEC-04 | Discutir dúvidas por questão com organização e moderação | FON-01 | RF-08, RF-10 |
| NEC-05 | Controlar acesso e manter a qualidade e a origem dos conteúdos | FON-01, FON-04 | RF-01, RF-09, RF-11, RF-12 |
| NEC-06 | Usar interfaces acessíveis em computador e celular | FON-01, FON-02, FON-03 | RNF-01, RNF-02, RNF-03 |

Esses IDs são únicos em todos os documentos. As necessidades foram derivadas das fontes; aprovação com estudantes e responsáveis ainda está pendente.

## 6. Entregas e calendário

| Etapa | Período conforme TXT fornecidos | Entregas |
| --- | --- | --- |
| M1 / Sprint 1 — P1 | 20/10 a 02/11/2026 | Visão, stakeholders, elicitação, RF, RNF, RN, backlog e UML inicial. |
| M2 / Sprint 2 — P2 | 03/11 a 23/11/2026 | SRS, casos de uso detalhados, consistência, UML atualizada, wireframes e protótipo. |

A versão 2.0 foi elaborada em 03/11/2026; não representa entrega retroativa nem aprovação ocorrida na Sprint 1. Outros calendários presentes em materiais de turmas distintas não substituem os TXT fornecidos.

## 7. Premissas, dependências e riscos

| Tema | Condição / tratamento |
| --- | --- |
| Conteúdo | Questões e comentários precisam de conferência de origem e revisão pedagógica antes de publicação. |
| Participação | Entrevistas dependem de voluntários e autorização para registro; não há resultados de campo anexados. |
| Produção | Hospedagem, autenticação e persistência institucional dependem de projeto e implementação futuros. |
| Dados | Não há importação de cadastros acadêmicos nem autorização presumida para acesso institucional. |
| Escopo | Mudanças devem atualizar RF, RN, casos de uso, UML, matriz e protótipo. |

## 8. Condições de aceitação

Artefatos com IDs consistentes; cobertura dos requisitos nos modelos; protótipo navegável com estados vazios; verificações técnicas documentadas; aprovação acadêmica e de domínio registrada por pessoas responsáveis quando ocorrer. Não existe aceite externo registrado nesta versão.

## 9. Histórico

| Versão | Data | Descrição |
| --- | --- | --- |
| 1.0 | 27/10/2026 | Versão inicial mantida no histórico Git. |
| 2.0 | 03/11/2026 | Consolidação documental de escopo, rastreabilidade e critérios de aceitação. |
