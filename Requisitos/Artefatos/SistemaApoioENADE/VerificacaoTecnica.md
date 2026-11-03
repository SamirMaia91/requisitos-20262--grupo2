# Verificação técnica dos artefatos

Protótipo 3.0 · 03/11/2026.

## Verificação reproduzível no repositório

**node scripts/check.mjs**, na raiz, verifica IDs, referências, cobertura de requisitos nos casos de uso e backlog, links locais, imagens UML, regras de pontuação e agregação, omissões, prazo, finalização única, preservação de histórico, filtros combinados, edição com incremento de versão, validação de materiais e integridade do catálogo publicado. Confere também que content.js corresponde ao content.json.

Os registros mínimos de ensaio dessa rotina ficam em memória; não entram no catálogo distribuído. A seleção inicial possui apenas as cinco adaptações documentadas em [Conteúdo e fontes](Prototipos/ConteudoEFontes.md). A conferência editorial dos documentos oficiais é distinta da validação estrutural automatizada.

Na execução desta versão, o comando concluiu 763 verificações com sucesso.

## Ensaio de navegador

Executado em 03/11/2026 no Chrome Headless Shell 156.0.8078.4. Foram concluídas 97 verificações: 37 condições de interface e funcionamento e 60 combinações de 15 rotas nas larguras 360, 768, 1440 e 1920 pixels. Não foram observados erros JavaScript ou rolagem horizontal no documento nessas combinações.

O roteiro cobriu consulta com filtros e sem correspondências; bloqueio de resposta vazia; correção conforme o gabarito; cadastro e edição de materiais; publicação e rascunho de questões; incremento de versão; preservação de fotografia da tentativa; mensagem com marcação HTML exibida como texto; sinalização e moderação; simulado com preservação de prazo e respostas após recarga; cancelamento e confirmação do encerramento; omissões; finalização por prazo sem duplicação; cadastro com confirmação de senha; login incorreto e correto; ausência de senha em texto simples; separação de histórico de visitante e conta; exclusão de conta.

O ensaio de prazo adiantou o relógio controlado do navegador em 61 segundos; não aguardou um minuto real. O ajuste de leitura e layout também foi conferido em janela de 720 × 500 pixels. Isso não substitui teste manual de zoom em todos os navegadores.

As [18 capturas](Prototipos/Wireframes.md) mostram telas reais do executável. Correção e desempenho foram capturados após ações do ensaio técnico. Não representam resultados de alunos ou aceite externo. Os seis diagramas UML permanecem renderizados em SVG, com fontes PlantUML preservadas.

## Limites

O ensaio automatizado de navegador foi executado no ambiente de desenvolvimento com Playwright. O repositório distribui o verificador sem dependências scripts/check.mjs; Playwright e o navegador não são necessários para abrir o protótipo. As capturas e o roteiro registram a cobertura efetivamente observada.

Não foram realizados testes de carga, autenticação de servidor, integração institucional, recuperação de desastre ou avaliação com participantes. Leitor de tela, múltiplos navegadores e revisão pedagógica continuam pendentes. Dados, contas e mensagens são locais ao navegador. A publicação HTTPS comprova disponibilização técnica, não envio ao AVA, acesso concedido ao professor ou aprovação acadêmica.
