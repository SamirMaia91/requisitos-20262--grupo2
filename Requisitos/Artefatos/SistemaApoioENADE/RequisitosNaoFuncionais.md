# Requisitos não funcionais

> Versão 2.2 · 06/11/2026 · Grupo 2

Os critérios de produção aplicam-se à arquitetura proposta. A verificação do protótipo é descrita em [Verificação técnica](VerificacaoTecnica.md).

## RNF-01 — Acessibilidade

Todas as ações principais devem ser executáveis por teclado, com foco visível, rótulos associados, avisos anunciados e alternativa textual para gráficos.

**Prioridade** Alta

**Verificação** Percorrer os casos de uso com teclado e conferir rótulos, foco visível e ordem de navegação, inclusive no cadastro.

## RNF-02 — Responsividade

Não apresentar rolagem horizontal no conteúdo principal a 360, 768 e 1440 pixels; controles devem permanecer utilizáveis com zoom de 200%.

**Prioridade** Alta

**Verificação** Capturar telas nas três larguras e executar busca, resposta e encerramento com zoom.

## RNF-03 — Compatibilidade

Atender às duas versões estáveis mais recentes de Chrome, Edge e Firefox na data da homologação.

**Prioridade** Alta

**Verificação** Registrar versões efetivamente ensaiadas e repetir os fluxos críticos em cada navegador; não alegar cobertura sem execução.

## RNF-04 — Desempenho

Em produção, 95% das consultas e salvamentos devem responder em até 3 segundos com 100 usuários simultâneos, catálogo de 10000 questões e conexão de 10 Mbps.

**Prioridade** Média

**Verificação** Ensaio de carga com ambiente e massa documentados; meta proposta, sem resultado de produção comprovado.

## RNF-05 — Proteção de acesso

Em produção, proteger tráfego com HTTPS, armazenar senhas somente com hash resistente e sal individual, verificar autorização no servidor e limitar tentativas de autenticação.

**Prioridade** Alta

**Verificação** O protótipo recebe a senha no navegador e armazena apenas o resultado da derivação PBKDF2/SHA-256 com 120 mil iterações e sal aleatório individual. A senha em texto simples não é persistida nem transmitida. A avaliação de autorização e limitação de tentativas no servidor aplica-se ao ambiente de produção.

## RNF-06 — Integridade

Não duplicar tentativa ao reenviar encerramento; resultado deve coincidir com respostas e versão do gabarito da tentativa.

**Prioridade** Alta

**Verificação** Encerrar duas vezes e comparar o identificador e resultado; editar catálogo e conferir preservação do histórico.

## RNF-07 — Recuperação

Em produção, manter cópia diária e demonstrar restauração com perda máxima de 24 horas e recuperação em até 4 horas.

**Prioridade** Média

**Verificação** Exercício de restauração registrado em ambiente de homologação; dependente de infraestrutura futura.

## RNF-08 — Minimização de dados

Coletar apenas dados necessários à conta e estudo, documentar finalidade e retenção, e não publicar identificadores pessoais no repositório.

**Prioridade** Alta

**Verificação** Revisar os campos, a finalidade e a retenção dos dados. No protótipo, conferir a exclusão dos dados locais e dos anexos.

## RNF-09 — Manutenibilidade

Manter documentação e modelo de domínio com IDs estáveis, fontes e rastreabilidade; separar lógica de cálculo da apresentação.

**Prioridade** Média

**Verificação** Executar verificador de referências e testes da lógica; alterações funcionais atualizam os artefatos relacionados.

## RNF-10 — Disponibilidade

Meta proposta de 99% ao mês em produção, excluindo manutenção comunicada; falhas devem informar possibilidade de retomada.

**Prioridade** Média

**Verificação** Medição de disponibilidade por monitoramento em produção; não aplicável como garantia do protótipo local.
