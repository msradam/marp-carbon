'use strict';

const { Marp } = require('@marp-team/marp-core');
const mermaidThemes = require('../mermaid');

// Minified Mermaid CDN URL — pinned major to avoid surprise breakage.
const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';

// Detect which Carbon theme a slide is using based on its class list.
// Returns 'dark' for any dark-background variant, 'light' otherwise.
function detectScheme(classList) {
  const dark = ['dark', 'invert', 'g90', 'g100'];
  return classList.some(c => dark.includes(c)) ? 'dark' : 'light';
}

// Build the inline <script> that renders each Mermaid diagram with the correct
// Carbon theme. We avoid startOnLoad and instead call mermaid.render() per
// element, re-initialising with dark or light vars for each group so that
// per-slide theming works reliably in both browser and Puppeteer contexts.
function buildMermaidScript(hasMermaid) {
  if (!hasMermaid) return '';

  const lightVars = JSON.stringify(mermaidThemes.light.themeVariables, null, 0);
  const darkVars  = JSON.stringify(mermaidThemes.dark.themeVariables, null, 0);

  return `
<script src="${MERMAID_CDN}"></script>
<script>
(function () {
  var DARK = new Set(['dark', 'invert', 'g90', 'g100']);
  var BASE = { startOnLoad: false, securityLevel: 'loose' };
  var LIGHT_VARS = ${lightVars};
  var DARK_VARS  = ${darkVars};

  function sectionIsDark(el) {
    var sec = el.closest('section');
    return sec && Array.from(sec.classList).some(function (c) { return DARK.has(c); });
  }

  async function renderAll() {
    if (typeof mermaid === 'undefined') return;
    var divs = Array.from(document.querySelectorAll('.mermaid'));
    var light = [], dark = [];
    divs.forEach(function (div) {
      (sectionIsDark(div) ? dark : light).push(div);
    });

    var uid = 0;
    function nextId() { return 'cm-' + (uid++); }

    if (dark.length) {
      mermaid.initialize(Object.assign({}, BASE, { theme: 'base', themeVariables: DARK_VARS }));
      for (var i = 0; i < dark.length; i++) {
        try {
          var res = await mermaid.render(nextId(), dark[i].textContent.trim());
          dark[i].innerHTML = res.svg;
        } catch (e) {}
      }
    }

    if (light.length) {
      mermaid.initialize(Object.assign({}, BASE, { theme: 'base', themeVariables: LIGHT_VARS }));
      for (var i = 0; i < light.length; i++) {
        try {
          var res = await mermaid.render(nextId(), light[i].textContent.trim());
          light[i].innerHTML = res.svg;
        } catch (e) {}
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
</script>`.trim();
}

class CarbonMarp extends Marp {
  constructor(opts) {
    super(opts);

    // Track whether the current render has any mermaid blocks.
    this._hasMermaid = false;

    // Override the fence renderer to convert ```mermaid blocks to
    // <div class="mermaid"> so Mermaid's auto-init picks them up.
    const md = this.markdown;
    const defaultFence = md.renderer.rules.fence.bind(md.renderer);

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      if (token.info.trim() === 'mermaid') {
        this._hasMermaid = true;
        const diagram = token.content.trim();
        return `<div class="mermaid">${diagram}</div>\n`;
      }
      return defaultFence(tokens, idx, options, env, self);
    };
  }

  render(markdown, env) {
    this._hasMermaid = false;
    const result = super.render(markdown, env);

    if (this._hasMermaid) {
      const script = buildMermaidScript(true);
      result.html = result.html.replace(/(<\/section>\s*<script)/, `${script}\n$1`);

      if (!result.html.includes(MERMAID_CDN)) {
        result.html = result.html.replace('</foreignObject>', `${script}\n</foreignObject>`);
      }
    }

    return result;
  }
}

module.exports = CarbonMarp;
