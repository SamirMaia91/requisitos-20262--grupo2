# Sistema de Apoio ao ENADE

Projeto acadêmico de **Requisitos e Modelagem de Sistemas**, curso de Análise e Desenvolvimento de Sistemas, **Universidade de Fortaleza (UNIFOR) — Grupo 2 — 2026.2**.

Uma proposta de plataforma web para organizar questões, realizar simulados cronometrados e acompanhar o estudo com correção comentada. A entrega reúne especificação, modelagem e prototipação; não representa serviço de produção nem plataforma oficial do Inep.

## Acessos principais

| Leitura | Conteúdo |
| --- | --- |
| [Índice dos artefatos](Requisitos/Artefatos/SistemaApoioENADE/README.md) | Entregas organizadas por P1 e P2 |
| [Documento de Visão](Requisitos/Artefatos/SistemaApoioENADE/DocumentoDeVisao.md) | Problema, público, escopo e limites |
| [SRS](Requisitos/Artefatos/SistemaApoioENADE/SRS.md) | Especificação detalhada do produto |
| [Diagramas UML](Requisitos/Artefatos/SistemaApoioENADE/UML/README.md) | Casos de uso, classes, sequência, atividades, componentes e implantação |
| [Protótipo navegável](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/README.md) | Como abrir e avaliar a interface |
| [Plano de entregas](Requisitos/Artefatos/SistemaApoioENADE/PlanoDeEntregas.md) | Calendário, evidências e pendências |

## Executar o protótipo

Baixe o repositório e abra [index.html](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/index.html) em um navegador moderno. Não há dependências de execução nem instalação. O GitHub apresenta o código HTML; a navegação interativa acontece no arquivo aberto localmente.

O catálogo começa vazio. Fontes oficiais estão disponíveis na tela de materiais. Questões podem ser inseridas pelo formulário de curadoria após conferência da prova, do gabarito e do comentário; resultados são calculados a partir das respostas dadas no navegador.

## Situação das evidências

A versão 2.0 é baseada em análise documental com fontes identificadas. Entrevistas com participantes, revisão pedagógica e validação externa permanecem pendentes até registro de evidências. Não há comprovação de envio ao AVA ou de acesso do professor anexada.

## Organização

- Requisitos/Artefatos/SistemaApoioENADE: documentação vigente, UML e protótipo.
- Requisitos/Artefatos/Templates e guias de Requisitos: apoio metodológico, separado das entregas preenchidas.
- GestaoConfiguracao: materiais de configuração e orientações de turmas.

Para verificar integridade documental e lógica do protótipo, execute: **node scripts/check.mjs**. Os limites dos testes estão registrados na documentação técnica.
