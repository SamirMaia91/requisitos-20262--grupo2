# Sistema de Apoio ao ENADE

[![Capa do Sistema de Apoio ao ENADE, com o símbolo do projeto e a interface do protótipo](images/capa-enade.png)](https://enade-grupo2-estudo.netlify.app)

Projeto acadêmico de **Requisitos e Modelagem de Sistemas**, curso de Análise e Desenvolvimento de Sistemas, **Universidade de Fortaleza (UNIFOR) — Grupo 2 — 2026.2**.

Uma proposta de plataforma web para organizar questões, realizar simulados cronometrados e acompanhar o estudo com correção comentada. A entrega reúne especificação, modelagem e prototipação; não representa serviço de produção nem plataforma oficial do Inep.

**[Abrir o protótipo público — sem instalação](https://enade-grupo2-estudo.netlify.app)**

## Acessos principais

| Leitura | Conteúdo |
| --- | --- |
| [Índice dos artefatos](Requisitos/Artefatos/SistemaApoioENADE/README.md) | Entregas organizadas por P1 e P2 |
| [Documento de Visão](Requisitos/Artefatos/SistemaApoioENADE/DocumentoDeVisao.md) | Problema, público, escopo e limites |
| [SRS](Requisitos/Artefatos/SistemaApoioENADE/SRS.md) | Especificação detalhada do produto |
| [Diagramas UML](Requisitos/Artefatos/SistemaApoioENADE/UML/README.md) | Casos de uso, classes, sequência, atividades, componentes e implantação |
| [Protótipo navegável](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/README.md) | Como abrir e avaliar a interface |

## Avaliar o protótipo

1. Em **Banco de questões**, filtre por **Formação Geral**, escolha uma questão e responda.
2. Na **Correção comentada**, confira o gabarito, o comentário e o link da prova.
3. Em **Meu desempenho**, veja o registro da tentativa e o resultado por tema.
4. Para avaliar materiais, abra **Curadoria de conteúdo**, confirme **Avaliar curadoria** e use **Materiais → Novo material**. Publique um arquivo e confira o download em **Materiais de estudo**.

Mais detalhes em [Guia do protótipo](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/README.md) e [capturas](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/Wireframes.md).

A seleção inicial contém oito adaptações textuais de questões reais de Formação Geral e Componente Específico do ENADE, com prova, número e gabarito conferidos. As [fontes e os limites editoriais](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/ConteudoEFontes.md) estão documentados. Não há contas ou resultados de participantes pré-cadastrados; os indicadores são calculados com as respostas feitas no navegador.

Como alternativa local, baixe o repositório e abra [index.html](Requisitos/Artefatos/SistemaApoioENADE/Prototipos/index.html), mantendo seus arquivos e assets juntos. A versão pública HTTPS é a referência para avaliação de todos os fluxos.

## Organização

- Requisitos/Artefatos/SistemaApoioENADE: documentação vigente, UML e protótipo.
- Requisitos/Artefatos/Templates e guias de Requisitos: apoio metodológico, separado das entregas preenchidas.
- GestaoConfiguracao: materiais de configuração e orientações de turmas.

Para verificar integridade documental e lógica do protótipo, execute: **node scripts/check.mjs**. Os limites dos testes estão registrados na documentação técnica.
