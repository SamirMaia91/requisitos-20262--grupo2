# Verificação técnica dos artefatos

Versão 2.0 · 03/11/2026.

## Procedimento

O comando **node scripts/check.mjs**, executado na raiz, verifica IDs e referências, cobertura dos requisitos nos casos de uso e no backlog, links locais da documentação vigente, presença de imagens UML e regras de pontuação, omissão, prazo, encerramento e preservação do histórico.

Os testes de lógica usam entradas mínimas de ensaio em memória. Essas entradas não são carregadas pela interface nem incluídas como questões, usuários ou resultados do produto.

## Registro de execução

Em 03/11/2026, o verificador concluiu 690 verificações de referências, cobertura, links, imagens e regras de cálculo, prazo e histórico. Os seis diagramas foram renderizados com PlantUML 1.2026.8 e inspecionados visualmente, assim como os sete wireframes e as capturas de interface.

No Chrome Headless Shell 156.0.8078.4, foram verificadas 24 combinações das oito rotas principais nas larguras 360, 768 e 1440 pixels, sem rolagem horizontal. O ensaio de navegação também cobriu: bloqueio de resposta vazia; resposta e correção; rejeição de quantidade indisponível; preservação do prazo após recarga; encerramento com omissão; expiração; mensagem e denúncia; decisão de moderação; arquivamento sem alterar histórico; exclusão dos dados locais. Não foram observados erros JavaScript no ensaio final.

Uma entrada de texto contendo marcação HTML foi exibida como texto e não criou imagem executável. As capturas distribuídas foram feitas antes do cadastro das entradas técnicas de ensaio, mostrando apenas o estado inicial vazio. A existência desses resultados não constitui aceite externo.

## Limites

Não foram executados testes de carga, restauração, disponibilidade de produção, autenticação de servidor ou integração institucional. A conferência de acessibilidade por leitor de tela, a cobertura de todos os navegadores e as sessões com participantes dependem de verificações posteriores. Os dados do protótipo são locais; não há avaliação pedagógica de questões previamente cadastradas.
