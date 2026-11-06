# Modelagem UML

Versão 2.2 · 06/11/2026. Os modelos usam a paleta da UNIFOR e seguem a [Visão](../DocumentoDeVisao.md), a [SRS](../SRS.md) e a [matriz de rastreabilidade](../Rastreabilidade.md).

- [Casos de uso](../DiagramaCasosDeUso.md) · Ações do estudante e do administrador
- [Classes](../DiagramaClasses.md) · Modelo de domínio do sistema proposto
- [Componentes](../DiagramaComponentes.md) · Responsabilidades e dependências da arquitetura proposta
- [Implantação](../DiagramaImplantacao.md) · Protótipo publicado e arquitetura de produção proposta
- [Sequência](../DiagramaSequencia.md) · Simulado cronometrado e correção · UC-04 e UC-05
- [Atividades](../DiagramaAtividades.md) · Simulado cronometrado · UC-04 e UC-05

Sequência e atividades têm visões separadas para simulado e materiais. Implantação tem vistas do protótipo publicado e da arquitetura proposta. Cada vista tem uma imagem SVG e sua fonte PlantUML.

Para renderizar a partir da pasta de artefatos, use Java e PlantUML 1.2026.8.

```shell
java -jar plantuml.jar -charset UTF-8 -tsvg UML/*.puml
```
