#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { white, g10, g90, g100 } = require('@carbon/themes');
const colors = require('@carbon/colors');
const { version: themeVersion } = require('@carbon/themes/package.json');
const { version: colorsVersion } = require('@carbon/colors/package.json');

const OUT_DIR = path.join(__dirname, '..', 'themes');

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;600&display=swap');`;

function tokens(t) {
  return {
    bg:               t.background,
    layer:            t.layer01,
    layerAccent:      t.layer02,
    border:           t.borderSubtle00 ?? t.borderSubtle01,
    borderStrong:     t.borderStrong01,
    text:             t.textPrimary,
    textSecondary:    t.textSecondary,
    textHelper:       t.textHelper,
    textPlaceholder:  t.textPlaceholder,
    textOnColor:      t.textOnColor,
    accent:           t.interactive,
    accentHover:      t.interactiveHover ?? t.hoverPrimary ?? t.interactive,
    link:             t.linkPrimary,
    linkVisited:      t.linkVisited,
    error:            t.supportError,
    success:          t.supportSuccess,
    warning:          t.supportWarning,
    info:             t.supportInfo,
    codeBg:           t.layer01,
    codeText:         t.textPrimary,
    codeKeyword:      t.syntaxKeyword,
    codeString:       t.syntaxString,
    codeComment:      t.syntaxComment ?? t.syntaxLineComment,
    codeNumber:       t.syntaxNumber,
    codeFn:           t.syntaxFunction,
    codeType:         t.syntaxTypeName ?? t.syntaxClassName,
    codeAttr:         t.syntaxAttribute ?? t.syntaxAttributeName,
    codeDeletion:     t.supportError,
    codeInsertion:    t.supportSuccess,
  };
}

function cssVars(tok, scheme) {
  return `
  --carbon-font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --carbon-font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --carbon-font-serif: 'IBM Plex Serif', Georgia, 'Times New Roman', serif;

  --carbon-bg: ${tok.bg};
  --carbon-layer: ${tok.layer};
  --carbon-layer-accent: ${tok.layerAccent};
  --carbon-border: ${tok.border};
  --carbon-border-strong: ${tok.borderStrong};

  --carbon-text: ${tok.text};
  --carbon-text-secondary: ${tok.textSecondary};
  --carbon-text-helper: ${tok.textHelper};
  --carbon-text-placeholder: ${tok.textPlaceholder};
  --carbon-text-on-color: ${tok.textOnColor};

  --carbon-accent: ${tok.accent};
  --carbon-accent-hover: ${tok.accentHover};
  --carbon-link: ${tok.link};
  --carbon-link-visited: ${tok.linkVisited};

  --carbon-error: ${tok.error};
  --carbon-success: ${tok.success};
  --carbon-warning: ${tok.warning};
  --carbon-info: ${tok.info};

  --carbon-code-bg: ${tok.codeBg};
  --carbon-code-text: ${tok.codeText};
  --carbon-code-keyword: ${tok.codeKeyword};
  --carbon-code-string: ${tok.codeString};
  --carbon-code-comment: ${tok.codeComment};
  --carbon-code-number: ${tok.codeNumber};
  --carbon-code-fn: ${tok.codeFn};
  --carbon-code-type: ${tok.codeType};
  --carbon-code-attr: ${tok.codeAttr};
  --carbon-code-deletion: ${tok.codeDeletion};
  --carbon-code-insertion: ${tok.codeInsertion};

  --carbon-pad: 64px;
  --carbon-rule: 4px;

  color-scheme: ${scheme};`.trim();
}

function sharedStyles() {
  return `
background: var(--carbon-bg);
  color: var(--carbon-text);
  font-family: var(--carbon-font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.4;
  letter-spacing: 0;
  padding: var(--carbon-pad);
  justify-content: flex-start;
  align-items: stretch;
  text-align: left;

  border-left: var(--carbon-rule) solid var(--carbon-accent);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--carbon-font-sans);
  color: var(--carbon-text);
  margin: 0 0 0.5em;
  letter-spacing: -0.005em;
  line-height: 1.15;
}

h1::part(auto-scaling),
h2::part(auto-scaling),
h3::part(auto-scaling),
h4::part(auto-scaling),
h5::part(auto-scaling),
h6::part(auto-scaling) {
  max-height: calc(720px - var(--carbon-pad) * 2);
}
pre::part(auto-scaling) {
  max-height: calc(720px - var(--carbon-pad) * 2 - 4em);
}

h1 {
  font-size: 54px;
  font-weight: 300;
  letter-spacing: -0.01em;
  margin-top: 0;
}
h2 { font-size: 36px; font-weight: 300; }
h3 { font-size: 28px; font-weight: 400; }
h4 { font-size: 22px; font-weight: 600; }
h5 { font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--carbon-text-secondary); }
h6 { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; color: var(--carbon-text-helper); }

h1 strong, h2 strong, h3 strong {
  font-weight: inherit;
  color: var(--carbon-accent);
}

p, ul, ol, blockquote, table, pre, figure {
  margin: 0 0 0.75em;
}

strong { font-weight: 600; }
em { font-style: italic; }

a, a:visited {
  color: var(--carbon-link);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
a:hover { color: var(--carbon-accent-hover); }

small, .caption {
  font-size: 14px;
  color: var(--carbon-text-secondary);
  letter-spacing: 0.16px;
}

ul, ol { padding-left: 1.5em; }
li { margin: 0.25em 0; }
li::marker { color: var(--carbon-accent); }

blockquote {
  border-left: 2px solid var(--carbon-accent);
  padding: 0.25em 0 0.25em 1em;
  margin-left: 0;
  color: var(--carbon-text-secondary);
  font-style: normal;
  font-family: var(--carbon-font-serif);
  font-size: 1.1em;
}
blockquote > *:first-child { margin-top: 0; }
blockquote > *:last-child { margin-bottom: 0; }

hr {
  border: 0;
  border-top: 1px solid var(--carbon-border);
  height: 0;
  margin: 1em 0;
}

code, kbd, samp {
  font-family: var(--carbon-font-mono);
  font-size: 0.9em;
}
:not(pre) > code {
  background: var(--carbon-layer);
  color: var(--carbon-code-text);
  padding: 0.1em 0.35em;
  border-radius: 2px;
  border: 1px solid var(--carbon-border);
}
pre {
  background: var(--carbon-code-bg);
  color: var(--carbon-code-text);
  border: 1px solid var(--carbon-border);
  border-left: 3px solid var(--carbon-accent);
  padding: 1em 1.25em;
  overflow: auto;
  font-size: 18px;
  line-height: 1.45;
  border-radius: 0;
}
pre code {
  background: transparent;
  border: 0;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.hljs { background: transparent; color: var(--carbon-code-text); }
.hljs-keyword, .hljs-selector-tag, .hljs-built_in { color: var(--carbon-code-keyword); }
.hljs-string, .hljs-attr, .hljs-template-tag, .hljs-addition { color: var(--carbon-code-string); }
.hljs-comment, .hljs-quote, .hljs-meta { color: var(--carbon-code-comment); font-style: italic; }
.hljs-number, .hljs-literal, .hljs-symbol { color: var(--carbon-code-number); }
.hljs-title, .hljs-title.function_, .hljs-section, .hljs-name { color: var(--carbon-code-fn); }
.hljs-type, .hljs-title.class_, .hljs-class .hljs-title { color: var(--carbon-code-type); }
.hljs-variable, .hljs-attribute, .hljs-tag { color: var(--carbon-code-attr); }
.hljs-deletion { color: var(--carbon-code-deletion); }
.hljs-addition { color: var(--carbon-code-insertion); }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}
th, td {
  padding: 0.6em 1em;
  text-align: left;
  border-bottom: 1px solid var(--carbon-border);
}
th {
  background: var(--carbon-layer);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.16px;
  color: var(--carbon-text);
  border-bottom: 1px solid var(--carbon-border-strong);
}
tr:hover td { background: var(--carbon-layer); }

/* Images, Marp canonical embedding (inline, ![bg], ![bg left/right]) */
img {
  max-width: 100%;
  height: auto;
  background: transparent;
}
p img { display: inline-block; vertical-align: middle; }
p img + img { margin-left: 0.5em; }
figure {
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
figure img { display: block; }
figcaption {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  color: var(--carbon-text-secondary);
  margin-top: 0.5em;
  line-height: 1.4;
}

.katex { color: var(--carbon-text); font-size: 1em; }
.katex-display {
  margin: 0.75em 0;
  padding: 0.5em 0;
  overflow-x: auto;
  overflow-y: hidden;
}
.katex-display > .katex { color: var(--carbon-text); }

mark {
  background: transparent;
  color: inherit;
}

.mermaid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.75em 0;
}
.mermaid svg {
  max-width: 100%;
  height: auto;
  font-family: var(--carbon-font-sans) !important;
}

header, footer {
  position: absolute;
  left: var(--carbon-pad);
  right: var(--carbon-pad);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.32px;
  text-transform: uppercase;
  color: var(--carbon-text-helper);
  font-family: var(--carbon-font-sans);
  padding: 0;
  height: auto;
  line-height: 1.4;
}
header { top: 24px; }
footer { bottom: 24px; }

section::after {
  position: absolute;
  right: var(--carbon-pad);
  bottom: 24px;
  left: auto;
  top: auto;
  width: auto;
  height: auto;
  padding: 0;
  font-family: var(--carbon-font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--carbon-text-helper);
  letter-spacing: 0.16px;
}

section.lead {
  justify-content: center;
  text-align: left;
  padding-left: calc(var(--carbon-pad) + 24px);
}
section.lead h1 {
  font-size: 76px;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.02em;
  max-width: 18ch;
}
section.lead h1 strong { color: var(--carbon-accent); }
section.lead h2 {
  font-size: 28px;
  font-weight: 400;
  color: var(--carbon-text-secondary);
  margin-top: 0.5em;
  max-width: 40ch;
}
section.lead p,
section.lead ul {
  font-size: 18px;
  color: var(--carbon-text-secondary);
  max-width: 60ch;
}
section.lead hr {
  width: 64px;
  border-top: 4px solid var(--carbon-accent);
  margin: 1.5em 0 1em;
}

section.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 48px;
  align-content: start;
}
section.split > h1,
section.split > h2,
section.split > header,
section.split > footer { grid-column: 1 / -1; }

@media print {
  section { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`.trim();
}

function buildLight() {
  const wTok = tokens(white);
  const g10Tok = tokens(g10);
  const g90Tok = tokens(g90);
  const g100Tok = tokens(g100);

  return `/*!
 * @theme carbon
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Unofficial Marp theme based on the IBM Carbon Design System.
 * Not affiliated with IBM. See README for details.
 *
 * Generated from @carbon/themes@${themeVersion} and @carbon/colors@${colorsVersion}
 * Run \`npm run build\` to regenerate from updated Carbon packages.
 */

${FONTS}

section {
  ${cssVars(wTok, 'light')}
  ${sharedStyles()}

section.g10 {
  --carbon-bg: ${g10Tok.bg};
  --carbon-layer: ${g10Tok.layer};
  --carbon-layer-accent: ${g10Tok.layerAccent};
  --carbon-border: ${g10Tok.border};
  --carbon-code-bg: ${g10Tok.layer};
}

section.invert,
section.dark,
section.g100 {
  ${cssVars(g100Tok, 'dark')}
}

section.g90 {
  ${cssVars(g90Tok, 'dark')}
}

section.white,
section.light {
  ${cssVars(wTok, 'light')}
}
`;
}

function buildDark() {
  const wTok = tokens(white);
  const g10Tok = tokens(g10);
  const g90Tok = tokens(g90);
  const g100Tok = tokens(g100);

  return `/*!
 * @theme carbon-dark
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Unofficial Marp theme based on the IBM Carbon Design System, dark (g100) default.
 * Not affiliated with IBM. See README for details.
 *
 * Generated from @carbon/themes@${themeVersion} and @carbon/colors@${colorsVersion}
 * Run \`npm run build\` to regenerate from updated Carbon packages.
 */

${FONTS}

section {
  ${cssVars(g100Tok, 'dark')}
  ${sharedStyles()}

section.g10 {
  --carbon-bg: ${g10Tok.bg};
  --carbon-layer: ${g10Tok.layer};
  --carbon-layer-accent: ${g10Tok.layerAccent};
  --carbon-border: ${g10Tok.border};
  --carbon-code-bg: ${g10Tok.layer};
  color-scheme: light;
}

section.g90 {
  ${cssVars(g90Tok, 'dark')}
}

section.white,
section.light {
  ${cssVars(wTok, 'light')}
}

section.invert,
section.dark,
section.g100 {
  ${cssVars(g100Tok, 'dark')}
}
`;
}

const light = buildLight();
const dark = buildDark();

fs.writeFileSync(path.join(OUT_DIR, 'carbon.css'), light);
fs.writeFileSync(path.join(OUT_DIR, 'carbon-dark.css'), dark);

console.log('Built themes/carbon.css and themes/carbon-dark.css');
console.log('  @carbon/themes:', themeVersion);
console.log('  @carbon/colors:', colorsVersion);
