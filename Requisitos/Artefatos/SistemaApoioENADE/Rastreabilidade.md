# Matriz de rastreabilidade

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

| RF | Necessidade | Caso de uso | Regras | Backlog | Tela do protótipo |
| --- | --- | --- | --- | --- | --- |
| RF-01 | NEC-05 | UC-01 | RN-01 | PB-01 | Cadastro / login / conta local |
| RF-02 | NEC-01 | UC-02 | RN-02, RN-03 | PB-02 | Banco / materiais |
| RF-03 | NEC-02 | UC-03 | RN-04 | PB-03 | Questão |
| RF-04 | NEC-02 | UC-04 | RN-03, RN-05 | PB-04 | Simulado |
| RF-05 | NEC-02 | UC-04 | RN-04, RN-05, RN-06 | PB-05 | Simulado |
| RF-06 | NEC-03 | UC-05 | RN-03, RN-06, RN-07 | PB-06 | Resultado |
| RF-07 | NEC-03 | UC-06 | RN-07, RN-08 | PB-07 | Desempenho |
| RF-08 | NEC-04 | UC-07 | RN-09 | PB-08 | Discussão |
| RF-09 | NEC-05 | UC-08 | RN-01, RN-02, RN-03, RN-10 | PB-09 | Curadoria / edição e versões de questões / manutenção de materiais |
| RF-10 | NEC-04 | UC-09 | RN-01, RN-09 | PB-10 | Moderação |
| RF-11 | NEC-05 | UC-02 | RN-02, RN-10 | PB-11 | Banco / materiais |
| RF-12 | NEC-05 | UC-01 | RN-11 | PB-12 | Conta e privacidade / exclusão de conta e dados locais |

## Modelos

- Casos de uso: AT-01 e AT-02, UC-01 a UC-09.
- Classes: usuário, questão, alternativa, material, tentativa, resposta, mensagem e denúncia.
- Sequência e atividades: UC-04/UC-05, incluindo expiração e encerramento único.
- Componentes: identidade, catálogo, avaliação e colaboração.
- Implantação: navegador, servidor da aplicação, banco de dados e referência externa Inep.

## Verificação de consistência

A revisão documental verifica IDs únicos, referências RF/UC/RN existentes, cobertura dos RF por casos de uso e telas, e diferença explícita entre produto e protótipo. Os resultados da verificação automatizada constam em [Verificação técnica](VerificacaoTecnica.md). Trata-se de verificação de artefatos; aceite pedagógico e avaliação de usabilidade com participantes permanecem em [Validação](Validacao.md).
