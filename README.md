# Sistema de Apoio ao ENADE

Projeto acadêmico de **Requisitos e Modelagem de Sistemas**, curso de Análise e Desenvolvimento de Sistemas, **Universidade de Fortaleza (UNIFOR) — Grupo 2 — 2026.2**.

Uma proposta de plataforma web para organizar questões, realizar simulados cronometrados e acompanhar o estudo com correção comentada. A entrega reúne especificação, modelagem e prototipação; não representa serviço de produção nem plataforma oficial do Inep.

**[Abrir o protótipo público — sem instalação](https://enade-grupo2-estudo.mario-gmm06.chatgpt.site)**

## Acessos principais

| Leitura | Conteúdo |
| --- | --- |
| [Índice dos artefatos](Requisitos/Artefatos/SistemaApoioENADE/README.md) | Entregas organizadas por P1 e P2 |
| [Documento de Visão](Requisitos/Artefatos/SistemaApoioENADE/DocumentoDeVisao.md) | Problema, público, escopo e limites |
| [SRS](Requisitos/Artefatos/SistemaApoioENADE/SRS.md) | Especificação detalhada do produto |
| [Diagramas UML](Requisitos/Artefatos/SistemaApoioENADE/UML/README.md) | Casos de uso, classes, sequência, atividades, componentes e implantação |
| [Protótipo navegável](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/README.md) | Como abrir e avaliar a interface |
| [Plano de entregas](Requisitos/Artefatos/SistemaApoioENADE/PlanoDeEntregas.md) | Calendário, evidências e pendências |

## Avaliar o protótipo

Abra o endereço público acima. A versão 3.0 reúne telas de alta fidelidade com as cores e a tipografia da UNIFOR, cadastro e login locais, filtros completos, prática, simulados cronometrados, correção, desempenho e curadoria de questões e materiais. Consulte o [roteiro de avaliação](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/README.md) e as [capturas](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/Wireframes.md).

A seleção inicial contém cinco adaptações textuais de questões reais do ENADE, com prova, número e gabarito conferidos. As [fontes e os limites editoriais](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/ConteudoEFontes.md) estão documentados. Não há contas ou resultados de participantes pré-cadastrados; os indicadores são calculados com as respostas feitas no navegador.

Como alternativa local, baixe o repositório e abra [index.html](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/index.html), mantendo seus arquivos e assets juntos. A versão pública HTTPS é a referência para avaliação de todos os fluxos.

## Situação das evidências

A especificação e o protótipo são baseados em análise documental com fontes identificadas. Entrevistas com participantes, revisão pedagógica e validação externa permanecem pendentes até registro de evidências. Não há comprovação de envio ao AVA ou de acesso do professor anexada. A publicação do link permite avaliar a interface, mas não comprova aceite ou envio da atividade.

## Organização

- Requisitos/Artefatos/SistemaApoioENADE: documentação vigente, UML e protótipo.
- Requisitos/Artefatos/Templates e guias de Requisitos: apoio metodológico, separado das entregas preenchidas.
- GestaoConfiguracao: materiais de configuração e orientações de turmas.

Para verificar integridade documental e lógica do protótipo, execute: **node scripts/check.mjs**. Os limites dos testes estão registrados na documentação técnica.
