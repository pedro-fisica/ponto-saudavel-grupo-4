# Ponto Saudável

Projeto acadêmico da disciplina de UX (pós-graduação) sobre acessibilidade.

Site sobre alimentação saudável desenvolvido em **HTML e CSS puro** (sem frameworks), voltado para avaliação de acessibilidade manual e semiautomática (axe, WAVE, Lighthouse, leitores de tela).

## Estrutura de arquivos

```
index.html                  ← Página inicial (Home — estado público/não logado)
home-logada.html            ← Página inicial logada (pós-criação de perfil)
perfil.html                 ← Tela "Meu Perfil" (criação de conta)
receitas.html               ← Tela "Receitas" (grade de receitas com filtros)
receita-bolo-banana.html    ← Detalhe da receita "Bolo de banana sem açúcar"
css/
  styles.css                ← Estilos base (paleta, tipografia, header, footer, cards)
  questionario.css          ← Estilos do questionário (layout 2 colunas, cards de opção, barra de progresso)
  perfil.css                ← Estilos da tela de perfil (card central, campos com ícones, botão submit)
  home-logada.css           ← Estilos da home logada (banner sucesso, cards receita/artigo, atalhos)
  receitas.css              ← Estilos da tela de receitas (hero, filtros pill, grade de cards)
  receita-detalhe.css       ← Estilos da página de detalhe da receita
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

## Home logada (`home-logada.html`) — como acessar localmente

### Como chegar até ela

O fluxo completo é:

```
index.html
  → questionario/passo-1.html
  → questionario/passo-2.html
  → questionario/passo-3.html (botão "Finalizar")
  → perfil.html (botão "Criar perfil")
  → home-logada.html ✓
```

Você também pode abrir `home-logada.html` diretamente no navegador para visualizá-la de forma isolada.

### Decisões de acessibilidade

| Elemento / Técnica | Motivo |
|---|---|
| `role="status"` no banner verde | A confirmação "Perfil criado com sucesso!" é uma mensagem transitória positiva — `role="status"` faz com que o leitor de tela a anuncia sem interromper abruptamente o que o usuário está fazendo. `role="alert"` seria mais adequado para erros ou situações urgentes |
| Avatar circular com `alt="Foto de perfil de Lucas"` | O `alt` descritivo transmite o conteúdo real da imagem; o `aria-label` no `<a>` que envolve o avatar detalha a ação ("Perfil de Lucas — acessar minha conta"), evitando ambiguidade para leitores de tela |
| `<a>` para avatar (link) vs `<button>` para favoritar | O avatar leva para outra página (ação de navegação) → `<a>`; o coração favorita sem navegar (ação na página) → `<button>`. Semântica correta comunica a intenção a tecnologias assistivas |
| `aria-current="page"` em "Home" no menu | Sinaliza ao leitor de tela qual item representa a página atual sem depender apenas do estilo visual |
| `<article>` nos cards de receita e artigo | Conteúdo autocontido que faz sentido fora do contexto da página; `aria-label` no `<article>` nomeia cada um para leitores de tela que navegam por landmarks |
| Ícones de metadados com `aria-hidden="true"` | Emojis de relógio e estrela são decorativos; o texto adjacente ("20 min", "Fácil") já comunica a informação completa — `aria-hidden` evita verbalização redundante |
| `aria-label` nos links de atalho | Garante que o destino seja anunciado claramente mesmo quando o texto visível for curto (ex: "Todas Receitas", "Favoritos") |
| Hierarquia de headings: `h1` → `h2` → `h3` | `h1`: "Olá, Lucas!" (título principal da página); `h2`: "Para Você Hoje" e "Acesso Rápido" (títulos de seção); `h3`: títulos dos cards de receita e artigo |
| `:focus-visible` herdado de `styles.css` | Indicador de foco visível em todos os links e botões ao navegar por teclado |

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

## Tela "Receitas" (`receitas.html`) — como acessar localmente

Abra `receitas.html` diretamente no navegador, ou navegue pelo fluxo completo:

```
index.html → questionario → perfil.html → home-logada.html → Todas Receitas (atalho)
```

O item **"Receitas"** no menu de navegação de todas as páginas também leva a essa tela.

### Decisões de acessibilidade

| Elemento / Técnica | Motivo |
|---|---|
| `aria-current="page"` no item "Receitas" do menu | Comunica a página ativa a tecnologias assistivas sem depender apenas do estilo visual (cor ou negrito). Usuários de leitor de tela que navegam pelos links do menu precisam de sinalização programática para saber onde estão |
| `<label for="busca-receitas" class="sr-only">` | Associação explícita label→input obrigatória pela WCAG 1.3.1 e 4.1.2. Visualmente oculto via `.sr-only`, mas presente na árvore de acessibilidade — o leitor de tela anuncia "Buscar receitas" ao focar o campo, o que não é garantido com `placeholder` sozinho |
| `<select>` nativo para categorias | Acessível nativamente: funciona com teclado (setas, Enter, Esc), anunciado por todos os leitores de tela sem ARIA adicional, e abre o seletor nativo do SO em mobile. Um dropdown customizado com `<div>` exigiria `role="listbox"`, `role="option"`, `aria-expanded`, `aria-activedescendant` e gerenciamento de foco via JS para atingir o mesmo nível de acessibilidade |
| `<button type="button">` com `aria-pressed` para filtros pill | Os filtros são alternáveis (toggle) — cada um pode estar ativo ou inativo. `aria-pressed="true/false"` comunica esse estado a leitores de tela sem depender apenas da cor verde, que seria inacessível para usuários com daltonismo ou em modo de alto contraste |
| CSS usa tanto `.pill[aria-pressed="true"]` quanto `.pill--ativo` | Robustez: se JS não atualizar `aria-pressed`, a classe visual ainda funciona; se a classe for removida, o estilo baseado em atributo ainda cobre o estado |
| `<article>` para cada card de receita | Conteúdo autocontido: cada receita faz sentido por si mesma, desacoplada do contexto da página. Leitores de tela anunciam "artigo" ao entrar em cada card, contextualizando o tipo de conteúdo |
| `aria-label` nos botões de favoritar com nome da receita | Sem o nome da receita, todos os botões soariam idênticos ("Favoritar") ao navegar por botões no NVDA (tecla B) ou VoiceOver, impossibilitando distinguir qual receita cada botão afeta |
| `aria-pressed="false"` nos botões de favoritar (versão estática) | Mesmo sem JS, declarar `aria-pressed` comunica a intenção do controle (alternador de estado) e facilita a implementação futura. Ferramentas como axe verificam a presença do atributo em botões de toggle |
| Ícones de metadados (⏱, 🍴) com `aria-hidden="true"` | Os emojis são DECORATIVOS: o texto adjacente ("30 min", "Fácil") já comunica a informação completa. `aria-hidden` evita que o leitor de tela verbalize "relógio" ou "garfo e faca", que seriam ruído sem agregar significado |
| Imagens de receita com `alt` descritivo do prato | As imagens são INFORMATIVAS (apresentam o prato visualmente). O `alt` descreve o conteúdo real da foto, evitando redundância com o título da receita (h3) — ex: alt="Fatias de bolo de banana com casca dourada" em vez de alt="Bolo de banana sem açúcar" |
| `loading="lazy"` nas imagens dos cards | Melhora o desempenho (Lighthouse) sem impacto em acessibilidade: imagens fora da viewport são carregadas só quando necessário |
| Hierarquia de headings: `h1` → `h2` (sr-only) → `h3` | `h1`: "Receitas" (título da página); `h2` invisível: "Receitas disponíveis" (nomeia a seção para leitores de tela mantendo a hierarquia sem exibir redundância visual); `h3`: título de cada receita individual. Pular níveis seria apontado por axe/Lighthouse como erro |
| `h2 .sr-only` "Busca e filtros de receitas" | Cria um landmark nomeado para a seção de filtros sem poluir o layout visual. Garante que a hierarquia h1 → h2 → h3 esteja íntegra — ferramentas verificam isso automaticamente |
| `role="search"` no wrapper do campo de busca do header | Cria um landmark "área de pesquisa" reconhecido por leitores de tela, permitindo navegar diretamente para o campo de busca |
| `:focus-visible` herdado de `styles.css` | Indicador de foco visível em todos os links, botões e campos ao navegar por teclado, sem poluir a interface para usuários de mouse |
| Botão "Carregar Mais Receitas" sem aria-live | Nesta versão estática não há paginação real; quando JS for adicionado, o ideal é associar uma região `aria-live="polite"` que anuncie o número de novos cards carregados |

---

## Página de detalhe da receita (`receita-bolo-banana.html`) — como acessar localmente

Abra `receita-bolo-banana.html` diretamente no navegador, ou siga pelo fluxo:

```
home-logada.html → receitas.html → card "Bolo de banana sem açúcar" → detalhe da receita
```

Nesta etapa, apenas o card **"Bolo de banana sem açúcar"** tem link funcional para página própria; os demais cards de receita seguem como conteúdo estático.

### Decisões de acessibilidade

| Elemento / Técnica | Motivo |
|---|---|
| `<article>` envolvendo o conteúdo da receita | A receita é uma unidade autocontida (título, metadados, ingredientes, preparo e nutrição) e faz sentido isoladamente; leitores de tela anunciam a região como artigo |
| Link "Voltar para receitas" como `<a href>` | É uma ação de navegação para outra página, então usamos link semântico em vez de botão |
| Botão de compartilhar só com ícone e `aria-label` | Sem rótulo explícito, o leitor de tela anunciaria apenas "botão"; o `aria-label` define a ação de forma clara |
| Ícones de metadados com `aria-hidden="true"` | Relógio/talheres/pessoas funcionam como apoio visual; o texto de cada card já comunica totalmente o dado |
| Lista de preparo como `<ol>` mesmo com círculos customizados | Preserva a semântica de sequência obrigatória dos passos; tecnologias assistivas anunciam ordem e total de etapas |
| Informações nutricionais em `<table>` com cabeçalhos de coluna | Dados comparáveis por categoria (calorias, carboidratos, proteínas, gorduras) têm estrutura tabular; isso melhora a associação cabeçalho→valor para leitores de tela |
| Hierarquia de títulos (`h1` na receita, `h2` nas seções) | Mantém navegação por headings previsível para auditoria (axe/WAVE/Lighthouse) e para usuários de leitores de tela |

---



- HTML5 semântico
- CSS3 (custom properties, grid, flexbox, `:focus-visible`, media queries)
- Sem JavaScript, sem frameworks, sem dependências externas
