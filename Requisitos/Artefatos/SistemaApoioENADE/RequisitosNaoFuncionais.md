# Requisitos não funcionais

> Versão 2.0 · 03/11/2026 · Grupo 2 · Especificação proposta para revisão acadêmica. Aprovação com usuários: pendente.

São metas de aceitação propostas. A execução do protótipo não comprova os requisitos de produção.

## RNF-01 — Acessibilidade

Todas as ações principais devem ser executáveis por teclado, com foco visível, rótulos associados, avisos anunciados e alternativa textual para gráficos.

**Verificação:** Percorrer UC-01 a UC-09 com teclado; conferir rótulos e foco; testar leitor de tela antes da homologação.

**Prioridade:** Alta.

## RNF-02 — Responsividade

Não apresentar rolagem horizontal no conteúdo principal a 360, 768 e 1440 pixels; controles devem permanecer utilizáveis com zoom de 200%.

**Verificação:** Capturar telas nas três larguras e executar busca, resposta e encerramento com zoom.

**Prioridade:** Alta.

## RNF-03 — Compatibilidade

Atender às duas versões estáveis mais recentes de Chrome, Edge e Firefox na data da homologação.

**Verificação:** Registrar versões efetivamente ensaiadas e repetir os fluxos críticos em cada navegador; não alegar cobertura sem execução.

**Prioridade:** Alta.

## RNF-04 — Desempenho

Em produção, 95% das consultas e salvamentos devem responder em até 3 segundos com 100 usuários simultâneos, catálogo de 10000 questões e conexão de 10 Mbps.

**Verificação:** Ensaio de carga com ambiente e massa documentados; meta proposta, sem resultado de produção comprovado.

**Prioridade:** Média.

## RNF-05 — Proteção de acesso

Em produção, proteger tráfego com HTTPS, armazenar senhas somente com hash resistente e sal individual, verificar autorização no servidor e limitar tentativas de autenticação.

**Verificação:** Revisão de configuração, armazenamento e testes de acesso entre contas. O protótipo não recebe senhas.

**Prioridade:** Alta.

## RNF-06 — Integridade

Não duplicar tentativa ao reenviar encerramento; resultado deve coincidir com respostas e versão do gabarito da tentativa.

**Verificação:** Encerrar duas vezes e comparar o identificador e resultado; editar catálogo e conferir preservação do histórico.

**Prioridade:** Alta.

## RNF-07 — Recuperação

Em produção, manter cópia diária e demonstrar restauração com perda máxima de 24 horas e recuperação em até 4 horas.

**Verificação:** Exercício de restauração registrado em ambiente de homologação; dependente de infraestrutura futura.

**Prioridade:** Média.

## RNF-08 — Minimização de dados

Coletar apenas dados necessários à conta e estudo, documentar finalidade e retenção, e não publicar identificadores pessoais no repositório.

**Verificação:** Revisão dos campos, política de dados e arquivos da entrega; aprovação institucional pendente.

**Prioridade:** Alta.

## RNF-09 — Manutenibilidade

Manter documentação e modelo de domínio com IDs estáveis, fontes e rastreabilidade; separar lógica de cálculo da apresentação.

**Verificação:** Executar verificador de referências e testes da lógica; alterações funcionais atualizam os artefatos relacionados.

**Prioridade:** Média.

## RNF-10 — Disponibilidade

Meta proposta de 99% ao mês em produção, excluindo manutenção comunicada; falhas devem informar possibilidade de retomada.

**Verificação:** Medição de disponibilidade por monitoramento em produção; não aplicável como garantia do protótipo local.

**Prioridade:** Média.
