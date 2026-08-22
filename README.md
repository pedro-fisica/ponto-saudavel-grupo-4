# Ponto Saudável

Projeto acadêmico da disciplina de UX (pós-graduação) sobre acessibilidade.

Site sobre alimentação saudável desenvolvido em **HTML e CSS puro** (sem frameworks), voltado para avaliação de acessibilidade manual e semiautomática (axe, WAVE, Lighthouse, leitores de tela).

## Estrutura de arquivos

```
index.html                  ← Página inicial (Home)
css/
  styles.css                ← Estilos base (paleta, tipografia, header, footer, cards)
  questionario.css          ← Estilos do questionário (layout 2 colunas, cards de opção, barra de progresso)
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

Para navegar pelo questionário, clique em **"Fazer meu questionário"** na Home ou acesse diretamente:

- `questionario/passo-1.html` → `questionario/passo-2.html` → `questionario/passo-3.html`

Os botões **Continuar** / **Voltar** / **Finalizar** são links `<a href>` simples — funcionam sem JavaScript e sem servidor.

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

- **`<fieldset>` + `<legend>`**: as opções de cada pergunta estão agrupadas em um `<fieldset>` com `<legend>` descritiva. Leitores de tela anunciam a legend ao entrar no grupo, tornando claro a qual pergunta cada opção pertence — especialmente útil ao navegar com Tab ou setas.
- **`<input type="radio">` + `<label>` associado**: o label envolve o input, tornando toda a área do card clicável (alvo de toque maior, relevante para usuários com dificuldades motoras). O input permanece na árvore de acessibilidade (não usa `display:none`), permitindo navegação por teclado e uso com leitores de tela.
- **Foco visível** (`:focus-visible`): o indicador customizado do radio recebe contorno de foco ao navegar por teclado, sem poluir a interface para usuários de mouse.

### Barra de progresso

- `role="progressbar"` com `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e `aria-label` comunicam o progresso a tecnologias assistivas sem depender de CSS. Os valores são recalculados proporcionalmente para 3 passos: passo 1 ≈ 33 %, passo 2 ≈ 66 %, passo 3 = 100 %.

### Imagens

- Todas as imagens têm atributo `alt` descritivo (conteúdo real da foto).
- A legenda sobreposta à imagem no painel lateral usa `aria-hidden="true"` por ser informação de apoio; a imagem já possui `alt` completo.

### Navegação entre passos

- Os botões Voltar/Continuar/Finalizar são `<a href>` (não `<button>`), pois a ação é navegar para outro documento — semântica correta e comportamento nativo de histórico do navegador.
- O link "Questionário" no menu de navegação recebe `aria-current="page"` nas páginas do questionário, sinalizando ao leitor de tela qual seção está ativa.

### Pontos intencionalmente não otimizados (para avaliação)

O código foi escrito como um desenvolvedor cuidadoso, mas sem revisão de acessibilidade aprofundada. Ferramentas como axe, WAVE e Lighthouse podem apontar oportunidades de melhoria, como contraste de textos secundários ou ordem de foco.

---

## Tecnologias

- HTML5 semântico
- CSS3 (custom properties, grid, flexbox, `:focus-visible`, media queries)
- Sem JavaScript, sem frameworks, sem dependências externas
