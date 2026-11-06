# Especificação de Requisitos de Software (SRS)

> Versão 2.2 · 06/11/2026 · Grupo 2

## 1. Introdução

### 1.1 Finalidade

Especificar o Sistema de Apoio ao ENADE para a atividade P2. Organização em introdução, descrição geral e requisitos específicos, conforme a estrutura solicitada com referência à IEEE 830. Não representa certificação de conformidade com norma.

### 1.2 Escopo

Plataforma web de questões objetivas, simulados, correção comentada, histórico e discussão, com administração de conteúdo. O escopo e as exclusões estão em [Documento de Visão](DocumentoDeVisao.md).

### 1.3 Definições e referências

Consultar [Glossário](Glossario.md) e [Fontes](Fontes.md). Os documentos vinculados nesta SRS compõem a especificação versionada e devem evoluir juntos.

### 1.4 Organização

Esta SRS estabelece contexto, interfaces, dados e restrições. O detalhamento normativo está nos catálogos RF, RNF, RN e casos de uso referenciados na seção 3. As necessidades e suas fontes estão na [elicitação documental](Elicitacao.md) e na [Visão](DocumentoDeVisao.md).

## 2. Descrição geral

### 2.1 Perspectiva do produto

Produto independente para apoio ao estudo; não substitui o exame, inscrição ou serviços oficiais. O Inep é fonte documental externa. Integrações institucionais e extração automática de PDFs ficam fora da versão inicial.

### 2.2 Funções

Identidade e acesso, busca de questões, prática e simulado, correção e desempenho, discussão e moderação. Gestão de conteúdos inclui cadastro e manutenção de materiais. A biblioteca oferece consulta por tema, anexos e referências externas.

### 2.3 Usuários

AT-01 Estudante utiliza os recursos de estudo. AT-02 Administrador publica conteúdo e modera mensagens. Professores e coordenação são partes interessadas na qualidade acadêmica. O acesso ao histórico individual cabe ao estudante.

### 2.4 Ambiente e restrições

Navegador em computador ou dispositivo móvel, servidor de aplicação e banco de dados em produção. A infraestrutura é uma arquitetura proposta. A entrega executável atual é um protótipo de alta fidelidade com hospedagem HTTPS pública e dados locais ao navegador. Cadastro, login e separação de histórico permitem avaliar o fluxo; não há servidor de identidade, correio, banco institucional ou comunidade compartilhada.

### 2.5 Premissas e dependências

Questões registram prova, gabarito e comentário. Materiais registram os dados de identificação e a origem. Em produção, autorização e retenção dependem da infraestrutura e das regras do produto.

## 3. Requisitos específicos

### 3.1 Interfaces externas

**Usuário:** navegação por início, cadastro, login, conta, banco, simulado, resultado, desempenho, materiais, discussão, curadoria e moderação. Busca por título no banco e filtros combináveis por ano, curso, componente e tema no banco e na preparação do simulado; estados vazios; erros próximos aos campos; confirmação de encerramento e exclusão. Curadoria permite editar questões com incremento de versão. Em Materiais, Novo material recebe título, tema, descrição, arquivo e situação. A curadoria preserva cadastro, anexo e data no histórico ao arquivar. A exclusão exige confirmação. A biblioteca permite baixar o anexo ou abrir a referência externa identificada. A identidade visual segue a [referência UNIFOR](Prototipos/IdentidadeVisual.md).

**Software:** produção terá interfaces de identidade, catálogo, tentativas e discussão com verificação de acesso no servidor. Os nomes dos componentes estão no diagrama correspondente; endpoints e tecnologia não foram impostos como requisito.

**Comunicação:** HTTPS em produção. Navegação externa para fontes do Inep é feita por links identificados. Não há integração com conta Gov.br.

**Hardware:** navegador sem equipamento específico.

### 3.2 Requisitos funcionais

[RF-01 a RF-12](RequisitosFuncionais.md), com origem, prioridade, caso de uso, regras e critérios de aceitação.

### 3.3 Comportamento e regras

[UC-01 a UC-13](CasosDeUso.md) definem fluxos principais e exceções. [RN-01 a RN-11](RegrasDeNegocio.md) definem publicação, tempo, pontuação, histórico e moderação.

### 3.4 Requisitos não funcionais

[RNF-01 a RNF-10](RequisitosNaoFuncionais.md) estabelecem metas de acessibilidade, responsividade, compatibilidade, desempenho, segurança, integridade, recuperação, privacidade, manutenção e disponibilidade. Metas de produção não foram comprovadas pela entrega do protótipo.

### 3.5 Modelo de dados

| Entidade | Dados essenciais | Integridade |
| --- | --- | --- |
| Usuário | ID, nome, e-mail, hash de senha, perfil | E-mail único; senha nunca armazenada em texto aberto em produção. |
| Questão / versão | ID, origem, número, ano, curso, componente, tema, enunciado, alternativas, gabarito, comentário, situação | Exatamente uma alternativa correta; publicação sujeita a RN-03. |
| Material de estudo | ID, título, tema, descrição, situação, referência HTTPS ou dados do anexo | Uma origem por material. Apenas itens publicados aparecem na biblioteca. |
| Tentativa | ID, usuário, tipo, início, prazo, término, estado, fotografia das questões | Finalização única e imutável. |
| Resposta | Tentativa, questão, alternativa selecionada ou omissão | Uma resposta por questão da tentativa. |
| Mensagem | ID, usuário, questão, texto, data, situação | Texto limitado; HTML não executado. |
| Denúncia | ID, mensagem, motivo, estado, decisão, responsável, data | Decisão e justificativa rastreáveis. |

### 3.6 Estados e consistência

Tentativa: aberta → concluída manualmente ou concluída por prazo. Não retorna a aberta. Material: publicado ou arquivado, conforme a situação escolhida na curadoria. Questão: rascunho → publicada → arquivada; alteração gera versão para novas tentativas. Denúncia: aguardando análise → analisada, com decisão de manter ou ocultar.

### 3.7 Verificação

A [matriz](Rastreabilidade.md) relaciona necessidades, requisitos, casos de uso, regras e telas. Os procedimentos de verificação estão em [Verificação técnica](VerificacaoTecnica.md).

## 4. Modelagem e interface

[Índice de diagramas](UML/README.md), [wireframes](Prototipos/Wireframes.md) e [protótipo navegável](Prototipos/README.md).

## 5. Controle de mudanças

Alterações registram data e motivo, preservam IDs existentes e atualizam os vínculos entre os artefatos.

Em 06/11/2026, a versão 2.2 separou consulta e cadastro de materiais, revisou a UML e alinhou a especificação ao protótipo 3.1. A implantação está descrita em [Diagrama de Implantação](DiagramaImplantacao.md).
