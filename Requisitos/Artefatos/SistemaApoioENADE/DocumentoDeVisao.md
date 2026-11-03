# Documento de Visão — Sistema de Apoio ao ENADE

> **Versão 2.1 · 03/11/2026 · Grupo 2**
> Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

## 1. Contexto e problema

O projeto acadêmico da disciplina Requisitos e Modelagem de Sistemas, da UNIFOR, propõe uma plataforma web de preparação para o ENADE. O enunciado descreve dificuldades relacionadas à organização de materiais, à prática de questões e ao acompanhamento do desempenho (FON-01). Essa caracterização é proveniente da atividade; sua frequência e seu impacto entre estudantes ainda precisam ser investigados em campo.

O portal do Inep disponibiliza provas e gabaritos por edição (FON-05). Essa fonte serve para identificar e consultar questões, mas sua existência não comprova, por si só, as necessidades de usuários específicos.

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

Representantes, responsabilidades de validação e situação do aceite estão descritos em [Stakeholders](Stakeholders.md) e [Validação](Validacao.md).

## 4. Escopo e funcionalidades do sistema

O sistema será organizado em módulos para deixar claro o que cada perfil poderá realizar. Os requisitos RF-01 a RF-12 detalham as regras e os critérios de aceitação de cada funcionalidade.

### 4.1 Funcionalidades disponíveis para o estudante

| Módulo | O que o estudante poderá fazer | Requisitos |
| --- | --- | --- |
| **Acesso e conta** | Criar uma conta com nome, e-mail e senha; entrar e sair do sistema; consultar os próprios dados e solicitar a exclusão da conta. | RF-01, RF-12 |
| **Banco de questões** | Consultar questões publicadas e combinar filtros por ano, curso, componente curricular (formação geral ou específico) e tema. Visualizar a origem da questão e limpar os filtros quando não houver resultados. | RF-02 |
| **Prática individual** | Abrir uma questão objetiva, selecionar uma alternativa e enviar a resposta para correção. O sistema não permitirá enviar uma questão sem alternativa selecionada. | RF-03 |
| **Simulados** | Escolher os filtros, a quantidade de questões e a duração do simulado (de 1 a 240 minutos); responder, navegar entre questões, alterar respostas enquanto o tempo estiver ativo e finalizar manualmente ou aguardar o encerramento automático. | RF-04, RF-05 |
| **Correção comentada** | Após concluir uma prática ou um simulado, consultar a alternativa marcada, a resposta correta, a explicação da resposta e a referência da questão. Questões deixadas em branco também serão apresentadas na correção. | RF-06 |
| **Meu desempenho** | Consultar o histórico de tentativas concluídas, a quantidade de acertos, erros e omissões e os percentuais de desempenho geral e por tema, em gráfico e tabela. | RF-07 |
| **Materiais de estudo** | Consultar materiais organizados por tema, visualizar título e descrição e abrir o endereço da fonte de origem. | RF-11 |
| **Discussão por questão** | Ler e publicar mensagens relacionadas a uma questão e denunciar conteúdo inadequado para análise do administrador. | RF-08 |

### 4.2 Funcionalidades disponíveis para o administrador

| Módulo | O que o administrador poderá fazer | Requisitos |
| --- | --- | --- |
| **Curadoria de questões e materiais** | Cadastrar, editar, revisar, publicar e arquivar questões e materiais. Manter os dados de identificação, classificação, fonte, gabarito e comentário pedagógico de cada questão. | RF-09 |
| **Moderação de discussões** | Consultar denúncias, analisar mensagens sinalizadas e decidir por mantê-las ou ocultá-las. Toda ocultação deverá registrar o motivo e o responsável pela decisão. | RF-10 |

O perfil de administrador deverá ser concedido somente por pessoa autorizada. O cadastro comum cria uma conta de estudante e não concede privilégios administrativos.

### 4.3 Como será o uso do sistema

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
2. Cadastrar ou atualizar questões e materiais, conferindo metadados e fontes.
3. Revisar o gabarito e o comentário pedagógico antes de publicar uma questão.
4. Analisar denúncias e registrar a decisão de manter ou ocultar mensagens.

### 4.4 Regras gerais do escopo

- O banco inicial será composto por questões objetivas com cinco alternativas e uma resposta correta, com ano, curso, componente, tema e referência da prova e do gabarito.
- Questões anuladas e questões discursivas não serão utilizadas na correção automática da versão inicial.
- O simulado terá duração inteira configurável entre 1 e 240 minutos. O prazo não será reiniciado ao atualizar a página; ao finalizar ou vencer o prazo, a tentativa será encerrada e não poderá mais ser alterada.
- A correção será liberada após o envio da prática ou o encerramento do simulado. O sistema não apresentará o gabarito de um simulado ainda em andamento.
- O desempenho será calculado a partir das tentativas concluídas do próprio estudante. Os percentuais apresentados não representam a nota oficial do ENADE.
- O histórico individual não será disponibilizado automaticamente a professores, coordenação ou outros estudantes.

### 4.5 Funcionalidades fora da versão inicial

Não fazem parte do escopo inicial: inscrição oficial no ENADE; cálculo ou previsão da nota oficial; integração com sistemas acadêmicos ou com o Gov.br; importação automática de provas em PDF; correção automática de questões discursivas; recomendações por inteligência artificial; aplicativo nativo para celular; painel de desempenho de turma ou acesso institucional ao histórico individual.

A proposta 5 do material de apoio FON-04 é a referência temática mais próxima. Importação automática e integração curricular são possibilidades para estudo futuro, não funcionalidades aprovadas.

## 5. Necessidades documentais e funcionalidades

A tabela apresenta as necessidades identificadas nas fontes do projeto e mostra, de forma objetiva, como o Sistema de Apoio ao ENADE deverá atendê-las. Cada funcionalidade está vinculada aos requisitos que detalham seu comportamento: **RF** para requisitos funcionais e **RNF** para requisitos não funcionais.

| ID | Necessidade identificada | Como o sistema atende à necessidade | Fonte |
| --- | --- | --- | --- |
| **NEC-01** | Encontrar questões por edição, curso, componente curricular e tema. | **Consulta ao banco de questões (RF-02):** permite listar questões publicadas e combinar filtros por ano/edição, curso, componente (formação geral ou específico) e tema. Também identifica a origem da questão e informa quando não houver resultados. | FON-01, FON-05 |
| **NEC-02** | Responder questões e realizar simulados com tempo definido e encerramento previsível. | **Prática individual (RF-03):** permite selecionar e enviar uma alternativa para correção. **Configuração do simulado (RF-04):** permite definir filtros, quantidade de questões e duração de 1 a 240 minutos. **Execução do simulado (RF-05):** permite navegar pelas questões, alterar respostas enquanto o tempo estiver ativo e encerrar manualmente ou automaticamente quando o prazo terminar. | FON-01 |
| **NEC-03** | Compreender as respostas e acompanhar o desempenho por tema. | **Correção comentada (RF-06):** apresenta a resposta selecionada, o gabarito correto, a justificativa e a referência da questão após a conclusão. **Acompanhamento de desempenho (RF-07):** apresenta o histórico pessoal, os acertos, erros e omissões e os percentuais gerais e por tema, em gráfico e tabela. | FON-01 |
| **NEC-04** | Esclarecer dúvidas relacionadas às questões, com organização e moderação. | **Discussão por questão (RF-08):** permite consultar e publicar mensagens vinculadas a uma questão e denunciar conteúdo inadequado. **Moderação (RF-10):** permite ao administrador analisar denúncias, manter ou ocultar mensagens e registrar o motivo e o responsável pela decisão. | FON-01 |
| **NEC-05** | Controlar o acesso e preservar a qualidade, a identificação e a origem dos conteúdos. | **Contas e autenticação (RF-01):** permite cadastro, entrada e saída, atribuindo perfil de estudante por padrão e restringindo o perfil administrativo a pessoas autorizadas. **Administração do catálogo (RF-09):** permite cadastrar, revisar, publicar e arquivar questões e materiais, mantendo seus dados e referências. **Consulta de materiais (RF-11):** apresenta materiais por tema, com título, descrição e link para a fonte. **Dados pessoais (RF-12):** permite consultar os dados da própria conta e solicitar sua exclusão. | FON-01, FON-04 |
| **NEC-06** | Utilizar o sistema com acessibilidade em computadores e celulares. | **Acessibilidade (RNF-01):** prevê navegação por teclado, foco visível, rótulos adequados e alternativas textuais para gráficos. **Responsividade (RNF-02):** prevê adaptação a diferentes larguras de tela e uso com ampliação de 200%. **Compatibilidade (RNF-03):** prevê funcionamento nas versões estáveis mais recentes dos navegadores Chrome, Edge e Firefox, conforme os critérios definidos no requisito. | FON-01, FON-02, FON-03 |

As necessidades desta seção foram derivadas da análise documental. A confirmação com estudantes, professores e responsáveis ainda está pendente; portanto, elas permanecem propostas para validação. Os critérios completos de cada requisito estão descritos em [Requisitos Funcionais](RequisitosFuncionais.md) e [Requisitos Não Funcionais](RequisitosNaoFuncionais.md). A relação com casos de uso, regras de negócio e backlog está registrada na [Matriz de Rastreabilidade](Rastreabilidade.md).

## 6. Protótipo e limites da demonstração

O repositório contém um protótipo navegável de alta fidelidade (versão 3.0, de 03/11/2026), utilizado para demonstrar os principais fluxos e avaliar a interface. **O protótipo não equivale a uma versão de produção do sistema especificado.**

| Área demonstrada | O que é possível avaliar no protótipo | Limite atual da demonstração |
| --- | --- | --- |
| Acesso e conta (UC-01) | Cadastro, confirmação de senha, login, saída e separação do histórico por conta. | Contas e sessões são locais ao navegador; não há servidor de identidade, recuperação por e-mail ou autorização institucional. |
| Consulta (UC-02) | Busca, quatro filtros combinados e consulta de materiais e fontes. | O catálogo inicial contém cinco questões adaptadas, de dois anos e dois cursos; somente componente específico. |
| Prática (UC-03) | Resposta de questão, bloqueio de envio vazio, correção e histórico. | Os registros são locais e não constituem avaliação oficial. |
| Simulado (UC-04) | Configuração, contagem de questões disponíveis, cronômetro, navegação, retomada e encerramento manual ou automático. | A seleção é determinística e utiliza as primeiras questões filtradas; o relógio é o do dispositivo. |
| Correção (UC-05) | Acertos, erros, omissões, comentários, fontes e versão da questão respondida. | O gabarito fica acessível no código local; não é um ambiente de prova protegida. |
| Desempenho (UC-06) | Histórico local, gráfico e tabela por tema. | Não há indicadores de turma nem integração institucional. |
| Discussão (UC-07) | Publicação de mensagem por questão e sinalização com motivo. | As mensagens ficam no navegador; não há comunicação compartilhada entre estudantes. |
| Curadoria (UC-08) | Cadastro, edição, versionamento, revisão, publicação e arquivamento de questões e materiais. | O modo de avaliação precisa ser ativado e não equivale a autorização administrativa em produção. |
| Moderação (UC-09) | Consulta às sinalizações e decisão de manter ou ocultar com justificativa. | A fila é local e não existe equipe de moderação conectada. |

As telas, capturas e instruções para navegar estão em [Protótipo navegável](Prototipos/README.md) e [Wireframes](Prototipos/Wireframes.md). As limitações técnicas e os dados utilizados estão descritos nesses artefatos.

## 7. Entregas e calendário

| Etapa | Período conforme os enunciados das atividades | Entregas |
| --- | --- | --- |
| M1 / Sprint 1 — P1 | 20/10 a 02/11/2026 | Visão, stakeholders, elicitação, RF, RNF, RN, backlog e UML inicial. |
| M2 / Sprint 2 — P2 | 03/11 a 23/11/2026 | SRS, casos de uso detalhados, consistência, UML atualizada, wireframes e protótipo. |

A versão 2.1 foi elaborada em 03/11/2026; não representa entrega retroativa nem aprovação ocorrida na Sprint 1. Outros calendários presentes em materiais de turmas distintas não substituem os enunciados da P1 e da P2.

## 8. Premissas, dependências e riscos

| Tema | Condição / tratamento |
| --- | --- |
| Conteúdo | Questões e comentários precisam de conferência da origem e revisão pedagógica antes da publicação. A conferência documental existente não substitui a aprovação de um professor. |
| Participação | Entrevistas dependem de voluntários e autorização para registro; não há resultados de campo anexados. |
| Produção | Hospedagem, autenticação segura no servidor e persistência institucional dependem de projeto e implementação futuros. |
| Dados | Não há importação de cadastros acadêmicos nem autorização presumida para acesso institucional aos dados dos estudantes. |
| Escopo | Mudanças devem atualizar RF, RN, casos de uso, UML, matriz de rastreabilidade e protótipo. |
| Privacidade | Acesso ao histórico deve ser restrito ao próprio estudante, conforme regras a validar antes de qualquer implantação. |

## 9. Condições de aceitação

A proposta será considerada documentalmente consistente quando os artefatos mantiverem IDs e referências compatíveis; as funcionalidades estiverem cobertas por requisitos, casos de uso, regras, modelos e telas; o protótipo permitir percorrer os fluxos previstos, inclusive estados vazios; e as verificações técnicas estiverem registradas.

A aprovação acadêmica e a validação com representantes do domínio deverão ser registradas por seus responsáveis quando ocorrerem. **Não existe aceite externo registrado nesta versão.**

## 10. Histórico

| Versão | Data | Descrição |
| --- | --- | --- |
| 1.0 | 27/10/2026 | Versão inicial mantida no histórico Git. |
| 2.0 | 03/11/2026 | Consolidação documental de escopo, rastreabilidade e critérios de aceitação. |
| 2.1 | 03/11/2026 | Reorganização das funcionalidades por perfil, explicitação dos fluxos de uso e distinção entre o produto especificado e os limites do protótipo. IDs dos requisitos preservados. |