# Requisitos Não Funcionais — Sistema de Apoio ao ENADE

**Projeto:** Sistema de Apoio ao ENADE  
**Equipe:** Grupo 2  
**Data:** 27/10/2026  
**Versão:** 1.0  
**Status:** Rascunho para revisão do grupo

## 1. Objetivo

Definir critérios de qualidade e restrições que deverão orientar o desenvolvimento do Sistema de Apoio ao ENADE, considerando usabilidade, desempenho, segurança, compatibilidade e confiabilidade.

Os requisitos abaixo são propostas iniciais e deverão ser revisados pela equipe.

## 2. Lista de requisitos não funcionais

### RNF-01 — Usabilidade
A interface deverá apresentar textos claros, menus organizados e navegação intuitiva, facilitando a utilização por estudantes.

**Categoria:** Usabilidade.  
**Prioridade:** Alta.  
**Origem:** NEC-04 e NEC-08.

### RNF-02 — Compatibilidade
O sistema deverá funcionar nas versões recentes dos principais navegadores, como Google Chrome, Microsoft Edge e Mozilla Firefox.

**Categoria:** Compatibilidade.  
**Prioridade:** Alta.  
**Origem:** Necessidade de acesso ao sistema por diferentes usuários.

### RNF-03 — Design responsivo
A interface deverá adaptar sua apresentação a diferentes tamanhos de tela, incluindo computadores, tablets e celulares.

**Categoria:** Usabilidade e compatibilidade.  
**Prioridade:** Alta.  
**Origem:** NEC-04.

### RNF-04 — Desempenho
As páginas e funcionalidades principais deverão responder em até 3 segundos em condições normais de uso e conexão estável, considerando a infraestrutura definida para o projeto.

**Categoria:** Desempenho.  
**Prioridade:** Média.  
**Origem:** Proposta inicial da equipe.

### RNF-05 — Segurança
Caso o sistema armazene dados pessoais ou informações de desempenho, deverá adotar medidas adequadas para impedir o acesso não autorizado a essas informações.

**Categoria:** Segurança.  
**Prioridade:** Alta.  
**Origem:** Proposta inicial da equipe.

### RNF-06 — Integridade dos dados
O sistema deverá preservar a consistência dos dados armazenados, evitando que resultados de atividades sejam registrados ou apresentados incorretamente.

**Categoria:** Confiabilidade.  
**Prioridade:** Alta.  
**Origem:** Necessidade de apresentar resultados confiáveis.

### RNF-07 — Manutenibilidade
O código deverá ser organizado e dividido em componentes ou módulos de acordo com a arquitetura adotada, facilitando correções e futuras melhorias.

**Categoria:** Manutenibilidade.  
**Prioridade:** Média.  
**Origem:** Proposta inicial da equipe.

## 3. Resumo

| Código | Categoria | Requisito | Prioridade |
|---|---|---|---|
| RNF-01 | Usabilidade | Interface intuitiva | Alta |
| RNF-02 | Compatibilidade | Navegadores recentes | Alta |
| RNF-03 | Responsividade | Adaptação a telas | Alta |
| RNF-04 | Desempenho | Resposta em até 3 segundos | Média |
| RNF-05 | Segurança | Proteção contra acesso não autorizado | Alta |
| RNF-06 | Confiabilidade | Consistência dos dados | Alta |
| RNF-07 | Manutenibilidade | Código organizado e modular | Média |

## 4. Observações

- Os requisitos não funcionais deverão ser avaliados conforme a arquitetura e as tecnologias escolhidas.
- O limite de 3 segundos é uma meta proposta para o projeto, não um resultado de teste já comprovado.
- As medidas de segurança dependerão das funcionalidades implementadas e dos dados efetivamente armazenados.
- Os critérios deverão ser revisados para que possam ser verificados durante os testes.

## 5. Pendências para revisão

- [ ] Confirmar o limite de desempenho proposto.
- [ ] Definir como será verificada a compatibilidade com navegadores.
- [ ] Revisar os critérios de segurança e integridade.
- [ ] Verificar a viabilidade de cada requisito no prazo do projeto.
