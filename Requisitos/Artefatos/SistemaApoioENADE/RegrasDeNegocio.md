# Regras de Negócio — Sistema de Apoio ao ENADE

**Projeto:** Sistema de Apoio ao ENADE  
**Equipe:** Grupo 2  
**Data:** 27/10/2026  
**Versão:** 1.0  
**Status:** Rascunho para revisão do grupo

## 1. Objetivo

Definir regras que orientem o funcionamento do Sistema de Apoio ao ENADE, estabelecendo condições para a realização de exercícios, a apresentação de resultados e a organização dos materiais de estudo.

As regras descritas são propostas acadêmicas iniciais e deverão ser revisadas e validadas pelo Grupo 2.

## 2. Lista de regras de negócio

### RN-01 — Organização dos materiais
Os materiais de estudo deverão ser organizados por assunto ou categoria para facilitar a localização pelo estudante.

**Justificativa:** Facilitar o acesso aos conteúdos de preparação.

**Requisito relacionado:** RF-01 e RF-02.

### RN-02 — Registro das respostas
Cada resposta selecionada pelo estudante deverá ser associada à questão correspondente durante a realização da atividade.

**Justificativa:** Permitir a avaliação das respostas e a apresentação dos resultados.

**Requisito relacionado:** RF-04 e RF-05.

### RN-03 — Cálculo do resultado
O resultado de uma atividade deverá ser calculado com base nas respostas corretas e incorretas, conforme o gabarito definido para as questões.

**Justificativa:** Apresentar resultados coerentes com as respostas fornecidas.

**Requisito relacionado:** RF-05 e RNF-06.

### RN-04 — Conclusão da atividade
Uma atividade de exercícios deverá ser considerada concluída quando o estudante finalizar o preenchimento das respostas e solicitar seu encerramento, conforme o fluxo definido pelo sistema.

**Justificativa:** Estabelecer um momento claro para calcular e apresentar o resultado.

**Requisito relacionado:** RF-04 e RF-05.

### RN-05 — Apresentação dos resultados
Após a conclusão de uma atividade, o sistema deverá apresentar o resultado correspondente ao desempenho do estudante.

**Justificativa:** Permitir que o estudante identifique seu desempenho nas questões realizadas.

**Requisito relacionado:** RF-05 e RF-06.

### RN-06 — Associação das questões aos assuntos
As questões disponibilizadas deverão estar associadas a um assunto ou categoria de estudo.

**Justificativa:** Facilitar a organização e a localização das questões.

**Requisito relacionado:** RF-02 e RF-03.

### RN-07 — Consistência dos resultados
O sistema deverá utilizar as respostas registradas e os gabaritos correspondentes para calcular os resultados, evitando divergências entre as respostas e a pontuação apresentada.

**Justificativa:** Manter a confiabilidade das informações exibidas ao estudante.

**Requisito relacionado:** RF-05, RF-06 e RNF-06.

## 3. Resumo das regras

| Código | Regra | Requisitos relacionados |
|---|---|---|
| RN-01 | Organização dos materiais | RF-01, RF-02 |
| RN-02 | Registro das respostas | RF-04, RF-05 |
| RN-03 | Cálculo do resultado | RF-05, RNF-06 |
| RN-04 | Conclusão da atividade | RF-04, RF-05 |
| RN-05 | Apresentação dos resultados | RF-05, RF-06 |
| RN-06 | Associação das questões aos assuntos | RF-02, RF-03 |
| RN-07 | Consistência dos resultados | RF-05, RF-06, RNF-06 |

## 4. Observações

- As regras são propostas iniciais e não representam decisões já validadas por usuários reais.
- A forma de pontuação deverá ser definida pelo grupo durante a especificação do sistema.
- A persistência do histórico de atividades e resultados dependerá das funcionalidades efetivamente incluídas no escopo.
- As regras deverão ser revisadas para manter coerência com os requisitos funcionais e com os casos de uso.

## 5. Pendências para revisão

- [ ] Validar as regras com a equipe.
- [ ] Definir a forma de pontuação das atividades.
- [ ] Confirmar o fluxo de início e conclusão dos exercícios.
- [ ] Verificar a coerência entre as regras e os requisitos funcionais.
- [ ] Utilizar as regras aprovadas na especificação dos casos de uso e nos testes.
