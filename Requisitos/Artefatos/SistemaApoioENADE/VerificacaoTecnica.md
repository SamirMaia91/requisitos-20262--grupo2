# Verificação técnica dos artefatos

Protótipo 3.1 · 06/11/2026.

## Verificação reproduzível

Na raiz do repositório, execute `node scripts/check.mjs`. A execução desta versão concluiu **1.169 verificações**.

- Conferência de identificadores e vínculos nos dois sentidos entre necessidades, requisitos e casos de uso.
- Correspondência entre casos detalhados, atores, matriz, backlog, fonte PlantUML e SVG do diagrama de casos de uso.
- Verificação dos links locais, das rotas registradas no protótipo e dos arquivos SVG.
- Regras de correção, omissões, prazo, encerramento único e preservação das versões no histórico.
- Busca por título combinada aos filtros, formatos e metadados de anexo, proveniência das oito questões e igualdade entre content.json e content.js.

A documentação da seleção está em [Conteúdo e fontes](Prototipos/ConteudoEFontes.md).

## Ensaio de navegador

Em 06/11/2026, foram concluídas **144 verificações** com Chrome Headless Shell 156.0.8078.4 e Playwright, a partir de um servidor HTTP local e de um contexto isolado.

- Cadastro e login locais, separação do histórico por perfil e exclusão de dados.
- Busca com filtros combinados, correção de questões dos dois componentes e simulado com encerramento manual e por prazo. O teste de expiração usou o relógio controlado do navegador.
- Cadastro de PDF, download com comparação SHA-256, edição sem trocar arquivo, substituição por imagem e preservação dos links oficiais.
- Rejeição de arquivo incompatível e de gravação incompleta. Arquivamento com data e retenção do anexo. Cancelamento da exclusão e remoção confirmada do registro e do arquivo.
- Atualização de um catálogo local anterior sem sobrescrever as alterações ou tentativas já registradas.
- Verificação de rotas em 360, 768, 1440 e 1920 pixels. Navegação por teclado no cadastro em 320, 360, 390 e 768 pixels, incluindo foco visível e acionamento do controle de senha com uma sobreposição de ensaio.

O ensaio concluiu sem erros JavaScript ou rolagem horizontal do documento nas combinações verificadas. As [18 capturas](Prototipos/Wireframes.md) foram atualizadas a partir da interface executável. Os seis tipos UML têm nove vistas em [PlantUML e SVG](UML/README.md).

## Escopo técnico

O protótipo guarda contas, histórico, metadados e anexos no navegador. O ensaio cobre a interface e a lógica local. Carga, autenticação de servidor e armazenamento compartilhado pertencem à arquitetura de produção.
