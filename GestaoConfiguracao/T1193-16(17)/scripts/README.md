# Scripts de configuração do projeto

Esta pasta contém o backlog inicial e scripts para criar issues e organizar um GitHub Project com sprints.

## Pré-requisitos

- Windows com Windows PowerShell ou PowerShell 7.
- Repositório GitHub do grupo e um GitHub Project v2 criado.
- Personal Access Token com permissões `repo` e `project`.
- A conta proprietária do Project deve ser informada em `-ProjectOwner`. O script consulta Projects de usuário.

Defina o token na sessão do PowerShell antes de executar os scripts:

```powershell
$env:GITHUB_TOKEN = "SEU_TOKEN_GITHUB"
```

Não coloque o token no arquivo JSON, nos scripts, em capturas de tela ou em commits.

## Arquivos

- [issues_github.json](issues_github.json): backlog inicial, com títulos, descrições, labels, milestones e sprint planejada.
- [import-github-issues.ps1](import-github-issues.ps1): cria labels, milestones e issues no repositório.
- [sync-project-sprints.ps1](sync-project-sprints.ps1): adiciona issues existentes ao Project e associa cada uma à sprint correspondente.
- [setup-project.ps1](setup-project.ps1): fluxo combinado que importa o backlog e sincroniza o Project.

## Configuração inicial recomendada

1. Crie o repositório e o GitHub Project v2 do grupo.
2. No PowerShell, navegue até esta pasta:

   ```powershell
   Set-Location "CAMINHO\PARA\LAPIS\GestaoConfiguracao\T1193-16(17)\scripts"
   ```
3. Defina `GITHUB_TOKEN` conforme a seção de pré-requisitos.
4. Execute o script combinado, substituindo os valores entre `< >`:

   ```powershell
   .\setup-project.ps1 `
     -Owner "samirmaia91" `
     -Repo "requisitos-20262--grupo2" `
     -ProjectOwner "samirmaia91" `
     -ProjectNumber 1 `
     -JsonPath ".\issues_github.json" `
     -IterationStartDate "2026-10-20" `
     -IterationCount 3 `
     -IterationDurations 14,21,7 `
     -AutoCreateIterationField
   ```

O ProjectNumber é o número presente na URL do Project. Por exemplo, em `https://github.com/users/exemplo/projects/8/views/1`, o número é `8`.

O backlog e os parâmetros padrão configuram três sprints:

| Sprint   | Período planejado | Entrega                                     | Duração |
| -------- | ------------------ | ------------------------------------------- | --------: |
| Sprint 1 | 20/10–02/11/2026  | P1 — elicitação e modelagem inicial      |   14 dias |
| Sprint 2 | 03/11–23/11/2026  | P2 — SRS e protótipo                      |   21 dias |
| Sprint 3 | 24/11–30/11/2026  | Preparação do pitch, apresentado em 01/12 |    7 dias |

O script cria o campo Iteration com essas datas se o Project ainda não tiver um campo de iteração. Se já existir, ele reutiliza as iterações existentes e **não altera suas datas ou durações**. Para usar este calendário em um Project já configurado, ajuste suas iterações no GitHub e execute a sincronização descrita abaixo.

## Uso dos scripts individualmente

Use o importador quando quiser criar o backlog sem sincronizar as issues a um Project:

```powershell
.\import-github-issues.ps1 `
  -Owner "<usuario-ou-organizacao-do-repositorio>" `
  -Repo "<nome-do-repositorio>" `
  -JsonPath ".\issues_github.json"
```

Depois de criar ou ajustar manualmente o campo Sprint/Iteration no Project, sincronize as issues:

```powershell
.\sync-project-sprints.ps1 `
  -Owner "<usuario-ou-organizacao-do-repositorio>" `
  -Repo "<nome-do-repositorio>" `
  -ProjectOwner "<usuario-proprietario-do-project>" `
  -ProjectNumber <numero-do-project> `
  -JsonPath ".\issues_github.json"
```

`setup-project.ps1` combina essas etapas. Não é necessário executar primeiro o importador e depois o script combinado: escolha o fluxo combinado ou execute os scripts individuais conforme a necessidade.

## Segurança e comportamento

- Os scripts usam `GITHUB_TOKEN` automaticamente se `-Token` não for informado.
- O importador cria milestones, labels e issues que ainda não existam. Issues com título já existente são ignoradas; o script não atualiza o conteúdo dessas issues.
- A sincronização localiza as issues pelo título no repositório. Issues ausentes são ignoradas e informadas na saída.
- O parâmetro `-DryRun` simula operações de escrita. Na configuração combinada, se o campo Iteration ainda não existir, a simulação termina depois de mostrar a criação planejada desse campo; execute sem `-DryRun` para concluir a configuração.
- Confira o repositório, o proprietário e o número do Project antes da execução, pois os scripts podem criar issues e alterar itens do Project.
