# Diagrama de Casos de Uso — Sistema de Apoio ao ENADE

## Objetivo
Representar as funcionalidades do sistema do ponto de vista dos seus usuários.

## Diagrama UML

```plantuml
@startuml
left to right direction

actor "Estudante" as Estudante

rectangle "Sistema de Apoio ao ENADE" {
    usecase "Consultar materiais\nde estudo" as UC1
    usecase "Consultar questões" as UC2
    usecase "Responder questões" as UC3
    usecase "Visualizar resultados" as UC4
    usecase "Acompanhar desempenho" as UC5
}

Estudante --> UC1
Estudante --> UC2
Estudante --> UC3
Estudante --> UC4
Estudante --> UC5

@enduml
```

## Descrição
O estudante interage com o sistema para consultar materiais de estudo, acessar e responder questões, visualizar resultados e acompanhar seu desempenho.

**Observação:** o diagrama apresenta uma proposta inicial dos casos de uso, que deverá ser validada pelo grupo.