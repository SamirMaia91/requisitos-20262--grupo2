# Regras de negócio

> Versão 2.2 · 06/11/2026 · Grupo 2

Regras do produto derivadas da análise documental.

## RN-01 — Perfis e autorização

Estudantes consultam conteúdo e seus próprios resultados; administradores mantêm conteúdo e moderam mensagens. Autorizações são verificadas no servidor em produção.

**Requisitos relacionados:** RF-01, RF-09, RF-10.

## RN-02 — Identificação e proveniência

Cada questão registra ID, ano, curso, componente, tema, número original e URLs da prova e do gabarito. Material registra título, tema, descrição, situação e origem, representada por anexo ou referência HTTPS já cadastrada.

**Requisitos relacionados:** RF-02, RF-09, RF-11.

## RN-03 — Publicação de questões

Somente questões objetivas com 5 alternativas distintas, uma resposta correta, referência e comentário pedagógico revisado podem ser publicadas. Questões anuladas e discursivas ficam fora da correção automática inicial.

**Requisitos relacionados:** RF-02, RF-04, RF-06, RF-09.

## RN-04 — Respostas

Uma tentativa mantém no máximo uma alternativa por questão; em simulado aberto ela pode ser alterada. Questão sem resposta é omissão.

**Requisitos relacionados:** RF-03, RF-05.

## RN-05 — Prazo do simulado

Duração inteira de 1 a 240 minutos definida antes de iniciar. O prazo absoluto não se reinicia ao atualizar a página. Em produção, o relógio do servidor é a autoridade.

**Requisitos relacionados:** RF-04, RF-05.

## RN-06 — Encerramento

Encerramento manual confirmado ou expiração tornam a tentativa imutável e liberam o gabarito. A operação é idempotente.

**Requisitos relacionados:** RF-05, RF-06.

## RN-07 — Cálculo do desempenho

Cada acerto vale 1; erro e omissão valem 0. Percentual = 100 × acertos / quantidade de questões elegíveis da tentativa, arredondado para uma casa decimal. Sem denominador, exibir ausência de dados. Não equivale à nota oficial do ENADE.

**Requisitos relacionados:** RF-06, RF-07.

## RN-08 — Histórico e privacidade

Somente tentativas concluídas entram nas estatísticas. Cada usuário acessa apenas seu histórico; a versão de questão e gabarito da tentativa não muda com edições futuras.

**Requisitos relacionados:** RF-07, RF-09.

## RN-09 — Discussão e moderação

Mensagens de 1 a 2000 caracteres, sem interpretação de HTML. Denúncia identifica mensagem e motivo; ocultação exige decisão administrativa registrada.

**Requisitos relacionados:** RF-08, RF-10.

## RN-10 — Materiais e arquivamento

O catálogo mostra apenas materiais publicados. Novos materiais são cadastrados por anexo e as referências externas existentes usam HTTPS. O protótipo mantém os anexos no navegador. Arquivar uma questão preserva o histórico de tentativas. Arquivar um material retira-o da biblioteca e mantém no histórico da curadoria o cadastro, a origem e a data do arquivamento. O grupo deve usar arquivos próprios ou autorizados para o uso pretendido. A exclusão de material exige confirmação e remove o registro e o arquivo associado.

**Requisitos relacionados:** RF-09, RF-11.

## RN-11 — Exclusão de dados

Exclusão depende de solicitação confirmada e de política de retenção aprovada. O protótipo oferece apagar todos os dados locais deste navegador; isso não representa exclusão em serviço institucional.

**Requisitos relacionados:** RF-12.
