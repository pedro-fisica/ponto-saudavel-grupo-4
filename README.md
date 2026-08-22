# Ponto Saudável

Projeto acadêmico da disciplina de UX (pós-graduação) sobre acessibilidade.

Site sobre alimentação saudável desenvolvido em **HTML e CSS puro** (sem frameworks), voltado para avaliação de acessibilidade manual e semiautomática (axe, WAVE, Lighthouse, leitores de tela).

## Estrutura de arquivos

```
index.html                  ← Página inicial (Home)
perfil.html                 ← Tela "Meu Perfil" (criação de conta)
css/
  styles.css                ← Estilos base (paleta, tipografia, header, footer, cards)
  questionario.css          ← Estilos do questionário (layout 2 colunas, cards de opção, barra de progresso)
  perfil.css                ← Estilos da tela de perfil (card central, campos com ícones, botão submit)
questionario/
  passo-1.html              ← Passo 1/3: Hábitos alimentares
  passo-2.html              ← Passo 2/3: Objetivo com alimentação saudável
  passo-3.html              ← Passo 3/3: Nível de atividade física
```

## Como abrir localmente

Basta abrir `index.html` diretamente no navegador (sem servidor necessário):

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows (PowerShell)
start index.html
```

Para navegar pelo questionário até o perfil, clique em **"Fazer meu questionário"** na Home ou acesse diretamente:

- `questionario/passo-1.html` → `questionario/passo-2.html` → `questionario/passo-3.html` → `perfil.html`

O botão **Finalizar** no passo 3 redireciona para `perfil.html`. Todos os links são `<a href>` simples — funcionam sem JavaScript e sem servidor.

---

## Tela "Meu Perfil" — como acessar localmente

Abra `perfil.html` diretamente no navegador, ou clique em **Finalizar** no último passo do questionário (`questionario/passo-3.html`). O item **"Meu Perfil"** no menu de navegação também leva a essa tela.

### Decisões de acessibilidade

| Elemento / Técnica | Motivo |
|---|---|
| `<h1>` "Crie seu perfil" | Título principal da página — único `<h1>` por documento; define o tópico anunciado ao carregar a página por leitores de tela |
| `<label for="...">` acima de cada `<input id="...">` | Associação explícita via `for`/`id` garante que leitores de tela anunciem o rótulo correto ao focar o campo, independentemente do `placeholder` (que não é exposto de forma consistente por todas as tecnologias assistivas) |
| `<form action="#" novalidate>` | Semântica correta de formulário; `novalidate` desativa a validação nativa do navegador para permitir avaliação do fluxo estático |
| `type="email"` e `type="password"` | Ativam o teclado virtual correto em mobile e comunicam o tipo de dado esperado a tecnologias assistivas |
| `autocomplete` nos campos | Facilita o preenchimento para usuários com dificuldades motoras ou cognitivas |
| Ícones dentro dos campos com `aria-hidden="true"` | Ícones de envelope, cadeado e olho são puramente decorativos; `aria-hidden` os remove da árvore de acessibilidade, evitando que o leitor de tela verbalize o emoji antes do valor do campo |
| `<button type="submit">` | Tipo correto para envio de formulário; ativado por Enter em qualquer campo do form sem JavaScript |
| `aria-current="page"` no item "Meu Perfil" do menu | Sinaliza ao leitor de tela qual seção está ativa, evitando que o usuário navegue desnecessariamente para onde já está |
| `:focus-visible` (herdado de `styles.css`) | Contorno de foco visível em campos e botão ao navegar por teclado, sem poluir a interface para usuários de mouse |
| `<main>` | Landmark central; leitores de tela oferecem atalho direto para cá (`Main` no NVDA, `m` no VoiceOver) |

---

## Tela de Questionário — decisões de acessibilidade

### Estrutura semântica e landmarks

| Elemento | Motivo |
|----------|--------|
| `<header>` com `<nav aria-label="Menu principal">` | Cria um landmark de navegação nomeado; `aria-label` diferencia do `<nav aria-label="Links do rodapé">` no footer, evitando ambiguidade para leitores de tela |
| `<main>` | Landmark central da página; leitores de tela oferecem atalho direto para cá |
| `<aside aria-label="Painel do questionário">` | Conteúdo complementar (título, progresso, imagem) separado semanticamente da pergunta principal |
| `<section aria-labelledby="question-title">` | Associa o título da pergunta à seção, anunciado pelo leitor de tela ao entrar na região |
| `<footer>` | Landmark de rodapé; mantido em todas as páginas para consistência |

### Hierarquia de headings

- `<h1>` — "Questionário" no painel lateral (título principal da página)
- `<h2>` — texto da pergunta atual (hierarquicamente abaixo do h1)

### Formulário acessível

- **`<fieldset>` + `<legend>`**: as opções de cada pergunta estão agrupadas em um `<fieldset>` com `<legend>` descritiva. Leitores de tela anunciam a legend ao entrar no grupo, tornando claro a qual pergunta cada opção pertence.
- **`<input type="radio">` + `<label>` associado**: o label envolve o input, tornando toda a área do card clicável. O input permanece na árvore de acessibilidade (não usa `display:none`), permitindo navegação por teclado.
- **Foco visível** (`:focus-visible`): o indicador customizado do radio recebe contorno de foco ao navegar por teclado.

### Barra de progresso

- `role="progressbar"` com `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e `aria-label` comunicam o progresso a tecnologias assistivas. Valores: passo 1 ≈ 33 %, passo 2 ≈ 66 %, passo 3 = 100 %.

---

## Tecnologias

- HTML5 semântico
- CSS3 (custom properties, grid, flexbox, `:focus-visible`, media queries)
- Sem JavaScript, sem frameworks, sem dependências externas

