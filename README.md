# Carbon for Marp

A [Marp](https://marp.app) theme based on the [IBM Carbon Design System](https://carbondesignsystem.com/).

## Disclaimer

I work at IBM, but this is a personal project. It is **not** an official IBM product and is not endorsed by IBM or the Carbon team. For anything design-system related, the source of truth is the official Carbon site:

https://carbondesignsystem.com/

The tokens, type scale, and color values here are taken from the public `@carbon/colors` and `@carbon/themes` packages, but this repo will drift from upstream Carbon over time. If you need an accurate, current reference, go to the official docs.

"IBM", "Carbon", and "IBM Plex" are trademarks of IBM.

## Install

There is no build step. Point Marp at the CSS file:

```bash
marp --theme themes/carbon.css examples/deck.md -o deck.html
marp --theme themes/carbon.css examples/deck.md -o deck.pdf
```

For the [VS Code Marp extension](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode), add to `.vscode/settings.json`:

```json
{
  "markdown.marp.themes": [
    "./themes/carbon.css",
    "./themes/carbon-dark.css"
  ]
}
```

Then in your deck front matter:

```yaml
---
marp: true
theme: carbon         # or: carbon-dark
paginate: true
---
```

## What's in the box

- IBM Plex Sans, Serif, and Mono (loaded from Google Fonts)
- Carbon color tokens for the four Carbon themes: `white`, `g10`, `g90`, `g100`
- Light default (`carbon`) and dark default (`carbon-dark`)
- Heading scale tuned for 16:9 1280x720 slides
- Code blocks with a Carbon-flavored highlight.js token map
- Tables, blockquotes, lists, header, footer, pagination

## Per-slide variants

Apply with `<!-- _class: NAME -->` on a single slide, or with `class:` in front matter for the whole deck.

| Class             | Effect                                              |
| ----------------- | --------------------------------------------------- |
| `lead`            | Title slide, oversized Plex Light h1                |
| `split`           | Two-column grid                                     |
| `invert` / `dark` | Flip to Carbon g100 dark tokens                     |
| `g10`             | Light tonal layer (gray-10 background)              |
| `g90`             | Dark tonal layer (gray-90 background)               |
| `white` / `light` | Force light tokens inside a `carbon-dark` deck      |

```markdown
<!-- _class: lead -->
# Carbon **for Marp**

---

<!-- _class: dark split -->
## Dark side-by-side
```

## Customizing colors

Every color is a CSS custom property. Override with the `style:` directive:

```yaml
---
marp: true
theme: carbon
style: |
  section {
    --carbon-accent: #8a3ffc;
    --carbon-bg: #f4f4f4;
    --carbon-font-sans: 'Inter', sans-serif;
  }
---
```

### Tokens

| Token                       | Purpose                              |
| --------------------------- | ------------------------------------ |
| `--carbon-bg`               | Slide background                     |
| `--carbon-layer`            | Inline code, table header surface    |
| `--carbon-layer-accent`     | Deeper layer                         |
| `--carbon-border`           | Subtle borders                       |
| `--carbon-border-strong`    | Strong borders                       |
| `--carbon-text`             | Primary text                         |
| `--carbon-text-secondary`   | Secondary text, captions             |
| `--carbon-text-helper`      | Page numbers, header, footer         |
| `--carbon-accent`           | Brand accent (IBM blue)              |
| `--carbon-link`             | Link color                           |
| `--carbon-error`, `--carbon-success`, `--carbon-warning`, `--carbon-info` | Support colors |
| `--carbon-code-bg`          | Code block background                |
| `--carbon-code-keyword`, `--carbon-code-string`, `--carbon-code-comment`, `--carbon-code-number`, `--carbon-code-fn` | Syntax tokens |
| `--carbon-font-sans`, `--carbon-font-serif`, `--carbon-font-mono` | Font stacks |
| `--carbon-pad`              | Slide padding (default `64px`)       |
| `--carbon-rule`             | Left accent rule thickness           |

## Color reference

Pulled from `@carbon/colors`:

- **white**: bg `#ffffff`, text `#161616`, accent `#0f62fe` (blue-60), layer `#f4f4f4`
- **g10**: bg `#f4f4f4`, text `#161616`, layer `#ffffff`
- **g90**: bg `#262626`, text `#f4f4f4`, accent `#4589ff` (blue-50), layer `#393939`
- **g100**: bg `#161616`, text `#f4f4f4`, accent `#4589ff`, layer `#262626`

## Feature support

| Feature                                  | Status | Notes                                               |
| ---------------------------------------- | :----: | --------------------------------------------------- |
| Headings, paragraphs, nested lists       |   Yes  |                                                     |
| Bold, italic, links                      |   Yes  |                                                     |
| Tables                                   |   Yes  |                                                     |
| Inline `code` and fenced blocks          |   Yes  | highlight.js token map                              |
| Blockquotes                              |   Yes  | Plex Serif                                          |
| Header, footer, pagination               |   Yes  |                                                     |
| `color:` and `backgroundColor:` directives | Yes  |                                                     |
| Class variants (`lead`, `split`, `dark`, `g10`, `g90`) | Yes |                                            |
| Marp auto-scaling                        |   Yes  |                                                     |
| Background images (`![bg]`, `![bg left/right/fit/cover]`) | Yes | Handled by Marpit engine                  |
| Image filters (`blur`, `brightness`)     |   Yes  | Marpit engine                                       |
| KaTeX math (`math: katex`)               |   Yes  |                                                     |
| `<mark>` and `==highlight==`             |   Yes  |                                                     |
| Emoji                                    |   Yes  | Marp core                                           |
| Mermaid diagrams                         | Partial | Marp core does not render Mermaid. `.mermaid` selectors here apply only if you wire up a Marp engine plugin. Otherwise, pre-render to SVG and use `![](diagram.svg)`. |
| Embedded video / iframes                 | Partial | Requires `--html`                                   |

## Files

```
themes/
  carbon.css        # main theme, light default
  carbon-dark.css   # dark default variant
examples/
  deck.md           # demo deck
```

## Development

This project was built with AI-assisted development.

## License

MIT. IBM Plex is licensed under the SIL Open Font License 1.1.
