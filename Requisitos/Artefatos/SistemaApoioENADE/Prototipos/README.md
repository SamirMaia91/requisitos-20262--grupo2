# Protótipo navegável — Espaço de estudo ENADE

Versão 3.0 · 03/11/2026 · UNIFOR · ADS · Grupo 2.

**[Abrir o protótipo público](https://enade-grupo2-estudo.netlify.app)**

O professor pode navegar diretamente pelo endereço, sem baixar arquivos ou instalar pacotes. O código versionado está em [index.html](index.html). Como alternativa local, abra esse arquivo mantendo os demais arquivos e a pasta assets ao lado. Acesse a versão HTTPS para avaliar o cadastro se o navegador restringir criptografia em arquivos locais.

[Telas e wireframes de alta fidelidade](Wireframes.md) · [Identidade visual](IdentidadeVisual.md) · [Conteúdo e fontes](ConteudoEFontes.md) · [SRS](../SRS.md).

## Conteúdo disponível

A seleção inicial contém cinco adaptações textuais de questões reais do ENADE, das edições 2017 e 2021, nas áreas de Análise e Desenvolvimento de Sistemas e Sistemas de Informação. Provas, números e respostas foram confrontados com os documentos oficiais do Inep. Cada questão identifica a adaptação, a prova e o gabarito; os hashes dos arquivos consultados estão em [content.json](content.json).

Os comentários são análise técnica do projeto. A revisão pedagógica externa permanece pendente. Não há contas, mensagens ou notas de participantes pré-cadastradas. Os indicadores são calculados exclusivamente com as respostas realizadas por quem navega.

## Fluxos e limites

| Caso de uso | Disponível | Limite do protótipo |
| --- | --- | --- |
| UC-01 — Acesso e dados | Cadastro, confirmação de senha, login, saída, separação de histórico por conta, exclusão de conta e limpeza de dados com confirmação | Contas locais ao navegador; sem recuperação por e-mail, servidor de identidade ou autorização institucional. |
| UC-02 — Consulta | Busca e quatro filtros combinados: ano, curso, componente e tema; filtro de materiais; fontes e estados vazios | A seleção inicial cobre dois anos, dois cursos e somente componente específico. |
| UC-03 — Prática | Questão com cinco alternativas, bloqueio de envio vazio, correção e histórico | Registros locais; não é aplicação de avaliação oficial. |
| UC-04 — Simulado | Quatro filtros, contagem de questões disponíveis, quantidade, duração, navegação, retomada, prazo persistente e encerramento manual ou automático | Seleção determinística das primeiras questões filtradas; relógio do dispositivo. |
| UC-05 — Correção | Acertos, erros e omissões; comentários, fonte e fotografia da versão respondida | Gabarito acessível no código local; não é ambiente de prova protegida. |
| UC-06 — Desempenho | Histórico por perfil, gráfico e tabela por tema com denominadores | Nenhum indicador de turma ou integração institucional. |
| UC-07 — Discussão | Mensagem por questão e sinalização com motivo | Mensagens locais, sem comunicação entre pessoas. |
| UC-08 — Curadoria | Cadastro e edição de questões com incremento de versão; rascunho, publicação após conferência e arquivamento; cadastro, edição e arquivamento de materiais | Modo de avaliação explicitamente ativado. Não equivale a permissão administrativa de produção. |
| UC-09 — Moderação | Sinalizações, decisão de manter/ocultar e justificativa | Fila local, sem equipe de moderação conectada. |

## Roteiro de avaliação

1. Acesse o endereço público e confira as cinco questões e o histórico inicialmente vazio.
2. Abra o banco e combine os filtros. Consulte a prova e o gabarito de uma questão.
3. Responda a uma questão e leia a correção. Confira a atribuição do comentário e a identificação da adaptação.
4. Prepare um simulado: ajuste os quatro filtros, a quantidade disponível e a duração, de 1 a 240 minutos inteiros.
5. Responda, atualize a página e retome. O prazo original e as respostas permanecem. Encerre e confira também as omissões.
6. Em Meu desempenho, compare o histórico, o total praticado e os indicadores por tema.
7. Crie uma conta local pela opção de entrada. Confira confirmação de senha, saída e novo acesso. O histórico do visitante permanece separado.
8. Abra Curadoria de conteúdo e confirme Avaliar curadoria. Edite uma questão e marque a conferência para publicar a nova versão. Sem a marcação, ela fica em rascunho.
9. Confira que a edição não mudou a correção de uma tentativa anterior. Cadastre, edite e arquive um material com origem identificada.
10. Na correção, abra a discussão. Registre uma mensagem, sinalize e examine a fila de moderação.
11. Em Conta e privacidade, encerre a sessão ou apague os dados locais, conforme necessário.

## Dados e manutenção

Contas e conteúdos de avaliação usam localStorage; a sessão usa sessionStorage. A senha é derivada com PBKDF2/SHA-256, 120 mil iterações e sal aleatório, sem armazenamento da senha em texto simples. Isso permite avaliar o fluxo e não substitui autenticação e autorização de servidor. Perfis compartilham o catálogo local e mantêm seus históricos separados.

Limpeza do navegador, navegação privada e restrições de armazenamento podem remover os registros. A interface informa falha de gravação. Não há sincronização entre dispositivos. O modo de curadoria não protege dados contra quem utiliza o mesmo navegador.

O conteúdo inicial é mantido em content.json; **node scripts/build-content.mjs**, na raiz do repositório, atualiza content.js. O pacote não precisa de build para executar. Confira [Verificação técnica](../VerificacaoTecnica.md) e [Publicação](Publicacao.md) para os procedimentos de manutenção.

## Prévia

![Visão geral com identidade UNIFOR](capturas/01-inicio.png)

![Cadastro em celular](capturas/17-cadastro-mobile.png)

Todas as telas estão em [Wireframes.md](Wireframes.md). Capturas de correção e desempenho documentam ações executadas durante a verificação técnica; não representam resultados de alunos ou aceite externo.
