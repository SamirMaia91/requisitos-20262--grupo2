# Documento de Visão — Sistema de Apoio ao ENADE

> Versão 2.2 · 06/11/2026 · Grupo 2

## 1. Contexto e problema

O projeto acadêmico da disciplina Requisitos e Modelagem de Sistemas, da UNIFOR, propõe uma plataforma web de preparação para o ENADE. O enunciado descreve dificuldades relacionadas à organização de materiais, à prática de questões e ao acompanhamento do desempenho (FON-01). Essa caracterização vem do enunciado da disciplina.

O portal do Inep disponibiliza provas e gabaritos por edição (FON-05). O projeto usa esse catálogo para identificar e referenciar questões.

## 2. Objetivo e valor esperado

Especificar um ambiente web que concentre as principais atividades de preparação para o ENADE: localizar questões e materiais, praticar, realizar simulados cronometrados, consultar correções comentadas e acompanhar o próprio desempenho.

O valor esperado é facilitar o acesso a conteúdos com origem identificada e ajudar o estudante a reconhecer assuntos que merecem revisão. Ganhos de aprendizagem e satisfação ainda não foram medidos. O trabalho é acadêmico e conceitual; não há obrigação de entregar um sistema de produção.

## 3. Partes interessadas e atores

| Ator / parte interessada | Papel no projeto |
| --- | --- |
| **AT-01 — Estudante** | Consulta questões e materiais, pratica, realiza simulados, acompanha seus resultados e participa das discussões. |
| **AT-02 — Administrador** | Mantém o catálogo de questões e materiais e realiza a moderação das discussões. |
| **Professores e coordenação** | Partes interessadas na qualidade pedagógica e na adequação acadêmica. Não recebem acesso automático ao histórico individual dos estudantes. |
| **Grupo 2** | Elabora, documenta e revisa os artefatos do projeto. |
| **Professor da disciplina** | Avalia e orienta a atividade acadêmica; não se confunde com o administrador do produto. |

Os papéis de cada parte interessada estão descritos em [Stakeholders](Stakeholders.md).

## 4. Necessidades

As necessidades descrevem os resultados esperados pelos perfis do projeto. As fontes da análise documental estão no [registro de elicitação](Elicitacao.md).

| ID | Necessidade | Fonte |
| --- | --- | --- |
| NEC-01 | Encontrar questões por edição, curso, componente e tema | FON-01, FON-05 |
| NEC-02 | Praticar com tempo definido e encerramento previsível | FON-01 |
| NEC-03 | Compreender respostas e acompanhar desempenho por tema | FON-01 |
| NEC-04 | Discutir dúvidas por questão com organização e moderação | FON-01 |
| NEC-05 | Acessar a própria conta e controlar os dados pessoais | FON-01 |
| NEC-06 | Usar interfaces acessíveis em computador e celular | FON-01, FON-02, FON-03 |
| NEC-07 | Encontrar materiais de estudo por tema e acessar o conteúdo de origem | FON-01, FON-04, FON-05 |
| NEC-08 | Manter questões e materiais identificados, atualizados e disponíveis para consulta | FON-01, FON-04 |

## 5. Funcionalidades e escopo

### 5.1 Funcionalidades do estudante

| Módulo | Funcionalidade | Necessidade | Requisitos | Casos de uso |
| --- | --- | --- | --- | --- |
| Acesso e conta | Criar conta, entrar, sair e gerenciar os próprios dados. | NEC-05 | RF-01, RF-12 | UC-01 |
| Banco de questões | Buscar por título ou termo e combinar os filtros de ano, curso, componente e tema. | NEC-01 | RF-02 | UC-02 |
| Prática individual | Responder uma questão e enviar a alternativa para correção. | NEC-02 | RF-03 | UC-03 |
| Simulados | Configurar filtros, quantidade e duração. Responder até a confirmação ou o vencimento do prazo. | NEC-02 | RF-04, RF-05 | UC-04 |
| Correção comentada | Consultar a alternativa correta, o comentário e a referência após concluir. | NEC-03 | RF-06 | UC-05 |
| Meu desempenho | Acompanhar histórico, acertos, erros, omissões e indicadores por tema. | NEC-03 | RF-07 | UC-06 |
| Discussão por questão | Ler, publicar e sinalizar mensagens vinculadas à questão. | NEC-04 | RF-08 | UC-07 |
| Materiais de estudo | Encontrar materiais publicados por tema, baixar anexos ou abrir as fontes externas identificadas. | NEC-07 | RF-11 | UC-11 |

### 5.2 Funcionalidades do administrador

| Módulo | Funcionalidade | Necessidade | Requisitos | Casos de uso |
| --- | --- | --- | --- | --- |
| Acesso administrativo | Entrar com perfil autorizado e gerenciar os próprios dados da conta. | NEC-05 | RF-01, RF-12 | UC-01 |
| Gestão de conteúdos | Gerenciar questões, cadastrar arquivos de estudo e atualizar, arquivar ou excluir materiais. | NEC-07, NEC-08 | RF-09 | UC-08, UC-10, UC-12, UC-13 |
| Moderação de discussões | Analisar denúncias e registrar decisão e justificativa. | NEC-04 | RF-10 | UC-09 |

O perfil administrativo é concedido por pessoa autorizada no produto. O protótipo demonstra essas ações no modo **Avaliar curadoria**.

**Exemplo de rastreabilidade** · Encontrar materiais por tema (NEC-07) → Gestão de conteúdos (RF-09) → Cadastrar material de estudo (UC-10) → Novo material. O estudante usa Consultar materiais de estudo (UC-11, RF-11) na tela Materiais de estudo.

Para acessibilidade em computador e celular, NEC-06 é coberta por RNF-01, RNF-02 e RNF-03. Consulte a [matriz](Rastreabilidade.md) para os vínculos com regras, backlog e telas.

### 5.3 Como será o uso do sistema

**Fluxo principal do estudante**

1. **Acessar:** criar uma conta ou entrar no sistema.
2. **Encontrar conteúdo:** pesquisar questões no banco ou consultar materiais por tema.
3. **Escolher como estudar:** responder questões individualmente ou configurar um simulado com filtros, quantidade e tempo.
4. **Responder:** selecionar alternativas; durante o simulado, acompanhar o prazo e navegar entre as questões.
5. **Conferir o resultado:** visualizar a correção comentada depois do envio da prática ou do encerramento do simulado.
6. **Acompanhar a evolução:** consultar acertos, erros, omissões e desempenho por tema.
7. **Interagir:** publicar dúvidas ou denunciar mensagens na discussão vinculada à questão.

**Fluxo principal do administrador**

1. Acessar as funções administrativas com perfil autorizado.
2. Cadastrar ou atualizar questões com suas fontes. Em **Materiais**, escolher **Novo material**, preencher os dados, anexar o arquivo e publicar.
3. Revisar o gabarito e o comentário pedagógico antes de publicar uma questão.
4. Analisar denúncias e registrar a decisão de manter ou ocultar mensagens.

### 5.4 Regras gerais do escopo

- O banco inicial será composto por questões objetivas com cinco alternativas e uma resposta correta, com ano, curso, componente, tema e referência da prova e do gabarito.
- Questões anuladas e questões discursivas não serão utilizadas na correção automática da versão inicial.
- O simulado terá duração inteira configurável entre 1 e 240 minutos. O prazo não será reiniciado ao atualizar a página; ao finalizar ou vencer o prazo, a tentativa será encerrada e não poderá mais ser alterada.
- A correção será liberada após o envio da prática ou o encerramento do simulado. O sistema não apresentará o gabarito de um simulado ainda em andamento.
- O desempenho será calculado a partir das tentativas concluídas do próprio estudante. Os percentuais apresentados não representam a nota oficial do ENADE.
- O histórico individual não será disponibilizado automaticamente a professores, coordenação ou outros estudantes.

### 5.5 Funcionalidades fora da versão inicial

Não fazem parte do escopo inicial: inscrição oficial no ENADE; cálculo ou previsão da nota oficial; integração com sistemas acadêmicos ou com o Gov.br; importação automática de provas em PDF; correção automática de questões discursivas; recomendações por inteligência artificial; aplicativo nativo para celular; painel de desempenho de turma ou acesso institucional ao histórico individual.

A proposta 5 do material de apoio FON-04 orienta a gestão do conhecimento e a organização do estudo.

## 6. Protótipo e limites da demonstração

O repositório contém um protótipo navegável de alta fidelidade (versão 3.1, de 06/11/2026), utilizado para demonstrar os principais fluxos e avaliar a interface. **O protótipo não equivale a uma versão de produção do sistema especificado.**

| Área demonstrada | O que é possível avaliar no protótipo | Limite atual da demonstração |
| --- | --- | --- |
| Acesso e conta (UC-01) | Cadastro, confirmação de senha, login, saída e separação do histórico por conta. | Contas e sessões são locais ao navegador; não há servidor de identidade, recuperação por e-mail ou autorização institucional. |
| Banco de questões (UC-02) | Busca por título e quatro filtros combináveis. | A seleção reúne oito questões adaptadas de dois cursos e dois anos, com Formação Geral e Componente Específico. |
| Prática (UC-03) | Resposta de questão, bloqueio de envio vazio, correção e histórico. | Os registros são locais e não constituem avaliação oficial. |
| Simulado (UC-04) | Configuração, contagem de questões disponíveis, cronômetro, navegação, retomada e encerramento manual ou automático. | A seleção é determinística e utiliza as primeiras questões filtradas; o relógio é o do dispositivo. |
| Correção (UC-05) | Acertos, erros, omissões, comentários, fontes e versão da questão respondida. | O gabarito fica acessível no código local; não é um ambiente de prova protegida. |
| Desempenho (UC-06) | Histórico local, gráfico e tabela por tema. | Não há indicadores de turma nem integração institucional. |
| Discussão (UC-07) | Publicação de mensagem por questão e sinalização com motivo. | As mensagens ficam no navegador; não há comunicação compartilhada entre estudantes. |
| Gestão de questões (UC-08) | Cadastro, edição, versionamento, publicação e arquivamento. | Disponível no modo Avaliar curadoria. |
| Gestão de materiais (UC-10, UC-12, UC-13) | Anexar arquivos, publicar, editar, arquivar e excluir materiais. | Anexos e catálogo persistem no mesmo navegador. |
| Materiais de estudo (UC-11) | Filtrar por tema, baixar anexos e abrir referências externas. | A biblioteca local reflete o conteúdo do mesmo navegador. |
| Moderação (UC-09) | Consulta às sinalizações e decisão de manter ou ocultar com justificativa. | A fila é local e não existe equipe de moderação conectada. |

As telas, capturas e instruções para navegar estão em [Protótipo navegável](Prototipos/README.md) e [Wireframes](Prototipos/Wireframes.md). As limitações técnicas e os dados utilizados estão descritos nesses artefatos.

## 7. Entregas e calendário

| Etapa | Período conforme os enunciados das atividades | Entregas |
| --- | --- | --- |
| M1 / Sprint 1 — P1 | 20/10 a 02/11/2026 | Visão, stakeholders, elicitação, RF, RNF, RN, backlog e UML inicial. |
| M2 / Sprint 2 — P2 | 03/11 a 23/11/2026 | SRS, casos de uso detalhados, consistência, UML atualizada, wireframes e protótipo. |

## 8. Premissas e restrições

As questões e os materiais registram sua origem. Arquivos anexados no protótipo ficam no navegador. Autorização, persistência compartilhada e políticas de acesso do produto são definidas na [SRS](SRS.md) e na [implantação proposta](DiagramaImplantacao.md).

## 9. Critérios de consistência

Manter identificadores estáveis, relacionar as necessidades a requisitos e casos de uso e conferir a cobertura de telas, regras e diagramas. O processo reproduzível está em [Verificação técnica](VerificacaoTecnica.md).

## 10. Histórico

| Versão | Data | Descrição |
| --- | --- | --- |
| 1.0 | 27/10/2026 | Versão inicial mantida no histórico Git. |
| 2.0 | 03/11/2026 | Consolidação documental de escopo, rastreabilidade e critérios de aceitação. |
| 2.1 | 03/11/2026 | Reorganização das funcionalidades por perfil, explicitação dos fluxos de uso e distinção entre o produto especificado e os limites do protótipo. IDs dos requisitos preservados. |
| 2.2 | 06/11/2026 | Necessidades antes das funcionalidades, rastreabilidade por perfil, gestão de materiais e atualização da UML. |
