# Ponto Saudável — versão HTML/CSS puro

Projeto acadêmico da disciplina de UX (pós-graduação) sobre **acessibilidade em HTML/CSS puro**.

Esta branch (`html-css-puro/home`) contém a página inicial do site "Ponto Saudável" recriada em **HTML5 e CSS3 puro**, sem nenhum framework ou biblioteca. O objetivo didático é estudar semântica HTML e propriedades CSS diretamente, sem as camadas de abstração de frameworks como Angular.

> **Nota:** A versão Angular da mesma página está na branch `copilot/create-initial-angular-structure` (PR #1). As duas versões são independentes.

---

## Como visualizar localmente

Basta abrir o arquivo `index.html` diretamente no navegador:

```bash
# Opção 1 — abrir pelo sistema de arquivos
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Opção 2 — servidor estático simples (Python)
python3 -m http.server 8080
# Depois acesse: http://localhost:8080

# Opção 3 — Live Server (extensão do VS Code)
# Botão direito em index.html → "Open with Live Server"
```

Não há build step, instalação de dependências nem compilação — é HTML/CSS estático.

---

## Estrutura de arquivos

```
.
├── index.html        # Página principal (toda a estrutura semântica)
└── css/
    └── styles.css    # Todos os estilos (paleta, layout, responsividade)
```

---

## Decisões de acessibilidade comentadas no código

O código contém comentários explicando cada escolha. O resumo é:

| Elemento / Técnica | Por que foi usado |
|---|---|
| `<header>`, `<main>`, `<nav>`, `<footer>` | Landmarks HTML5: leitores de tela permitem saltar diretamente para essas regiões |
| `aria-label` nos dois `<nav>` | Diferencia "Menu principal" de "Links do rodapé" quando há mais de um `<nav>` |
| `<section aria-labelledby="features-title">` | Associa o título `h2` à seção, anunciado pelo leitor de tela ao entrar na região |
| `role="search"` na `<div>` do campo de busca | Cria um landmark de pesquisa reconhecido por leitores de tela |
| `<label for="busca">` + `.sr-only` | Label associado ao input é lido pelo leitor de tela mesmo estando oculto visualmente |
| `alt` descritivo na imagem | Comunica o conteúdo visual para usuários que não enxergam |
| `aria-hidden="true"` em ícones decorativos | Evita que o leitor de tela verbalize emojis que não acrescentam informação |
| Hierarquia de headings: `h1` → `h2` → `h3` | Estrutura lógica do documento; leitores de tela usam headings como índice de navegação |
| `:focus-visible` | Indicador de foco visível para navegação por teclado, sem poluir a interface para mouse |
| `width`/`height` nas imagens | Evitam Cumulative Layout Shift (CLS) durante o carregamento |
| `<ul role="list">` nos cards | Corrige bug do VoiceOver/Safari que remove semântica de lista quando `list-style: none` |
| `type="button"` no `<button>` | Evita submissão acidental de formulário |

---

## Ferramentas sugeridas para avaliação de acessibilidade

- **axe DevTools** (extensão para Chrome/Firefox)
- **WAVE** — https://wave.webaim.org
- **Lighthouse** (aba do Chrome DevTools)
- **NVDA** (Windows) ou **VoiceOver** (macOS/iOS) para teste com leitor de tela
