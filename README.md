# Ponto Saudável — Grupo 4

Site sobre alimentação saudável desenvolvido em Angular, criado para a disciplina de UX/Acessibilidade da pós-graduação. O objetivo é ter um código funcional para posterior avaliação com ferramentas como **axe**, **WAVE**, **Lighthouse** e leitores de tela.

## Estrutura do projeto

```
src/
├── app/
│   ├── app.component.ts       # Componente raiz
│   └── components/
│       ├── header/            # Navbar com logo, busca e menu
│       ├── hero/              # Seção de destaque (banner)
│       ├── feature-cards/     # Cards "Receitas", "Artigos", "Seu Perfil"
│       ├── footer/            # Rodapé com links institucionais
│       └── home/              # Página Home (agrega os componentes acima)
├── index.html
├── main.ts
└── styles.css
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Angular CLI](https://angular.io/cli) 17+

```bash
npm install -g @angular/cli
```

### Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (http://localhost:4200)
npm start
# ou
ng serve
```

### Build de produção

```bash
ng build
```

## Decisões de acessibilidade no código

O código inclui comentários HTML explicando as principais escolhas:

- Uso de elementos semânticos: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Hierarquia de headings: `h1` (título da hero) → `h2` (título da seção) → `h3` (títulos dos cards)
- `alt` descritivos nas imagens
- `<label>` associado ao campo de busca via `for`/`id`
- `aria-label` nos elementos `<nav>` para diferenciá-los
- `aria-hidden="true"` em ícones e emojis decorativos
- Foco visível estilizado no `styles.css` via `:focus-visible`
- `lang="pt-BR"` no `<html>` para leitores de tela

## Tecnologias

- Angular 17 (standalone components, sem NgModules)
- CSS puro (Flexbox / CSS Grid)
- TypeScript
