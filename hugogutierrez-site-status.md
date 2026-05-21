# Estado del proyecto: hugogutierrez-pe.github.io
**Última actualización:** 2026-05-15 (noche — v2)  
**URL en producción:** https://hugo-gutierrez-pe.github.io  
**Repo GitHub:** https://github.com/hugo-gutierrez-pe/hugo-gutierrez-pe.github.io  
**Stack:** Hugo v0.161.1 + HugoBlox Kit 0.12.0 + GitHub Actions + GitHub Pages

---

## Estado actual: FUNCIONAL — landing + página de curso con theme switcher unificado

- Homepage con diseño pixel-perfect (Claude Design spec) + switcher de tema persistente
- Página `/cursos/bloomberg/` rediseñada: visualmente alineada con la landing, mismo switcher white/beige
- Ambas páginas son templates standalone (sin HugoBlox baseof), comparten sistema de temas vía `data-theme` + `localStorage`
- Modo oscuro desactivado globalmente (siempre light)
- Foto de perfil (`/img/hugo.jpg`) y CV subidos al repo

---

## Arquitectura híbrida

```
https://hugo-gutierrez-pe.github.io/
├── /                        ← HTML puro custom (layouts/landing/list.html)
├── /cursos/bloomberg/       ← Template MOOC custom (layouts/cursos/list.html)
│   └── /sesiones/s01-intro/ ← Hugo + HugoBlox
└── /cursos/...              ← Hugo + HugoBlox (pendiente)
```

**Homepage:** HTML standalone con diseño propio. No usa HugoBlox.  
**Página de curso:** Template custom con hero, badges, tablas de sesiones y blockquotes estilizados.  
**Páginas internas de sesión:** Hugo + HugoBlox estándar.

---

## Estructura del repo

```
hugo-gutierrez-pe.github.io/
├── .github/workflows/
│   ├── build.yml              ← workflow oficial HugoBlox
│   └── deploy.yml             ← workflow oficial HugoBlox
├── config/_default/
│   ├── hugo.toml              ← baseURL, outputs (home = ["HTML"])
│   ├── params.toml            ← hugoblox.theme.mode=light, fuente Plus Jakarta Sans
│   ├── menus.toml             ← navegación
│   └── module.yaml            ← imports HugoBlox kit
├── layouts/
│   ├── index.html             ← homepage custom (copia de referencia)
│   ├── landing/
│   │   └── list.html          ← ⭐ override que sirve la homepage (rediseñado 2026-05-15)
│   └── cursos/
│       ├── list.html          ← ⭐ template MOOC custom (rediseñado 2026-05-15)
│       └── list-backup.html   ← backup del template anterior
├── content/
│   ├── _index.md              ← type: landing (bloques HugoBlox — no visible en /)
│   ├── sobre-mi.md            ← STUB
│   ├── authors/admin/
│   │   ├── _index.md          ← perfil, bio, educación
│   │   └── avatar.jpg         ← ✅ subida 2026-05-15
│   └── cursos/
│       ├── _index.md
│       ├── bloomberg/
│       │   ├── _index.md      ← front matter: codigo, ciclo, tags, featured
│       │   └── sesiones/
│       │       └── s01-intro.md   ← única sesión existente (de 13)
│       ├── finanzas-corporativas/ ← PENDIENTE
│       └── analisis-financiero/   ← PENDIENTE
├── static/
│   ├── cv/hugo-gutierrez-cv.pdf   ← ✅ subido 2026-05-15
│   └── img/
│       └── hugo.jpg               ← ✅ foto de perfil (2026-05-15)
├── archetypes/sesion.md
├── go.mod / go.sum
├── hugoblox.yaml
├── package.json / pnpm-lock.yaml
└── .npmrc
```

---

## Landing page: diseño y theme switcher (rediseño 2026-05-15)

`layouts/landing/list.html` es un HTML standalone (sin `{{ define "main" }}` — no hay baseof.html en el repo) que implementa el diseño pixel-perfect entregado por Claude Design.

### Temas disponibles

| Token | Tema White (default) | Tema Beige |
|---|---|---|
| `--bg-paper` | `#FFFFFF` | `#FBF8F2` |
| `--bg-cream` | `#FFFFFF` | `#F5F1EA` |
| `--bg-cream-deep` | `#F1F3F5` | `#EDE6D8` |
| `--bg-alt` | `#F7F8FA` | `#F5F1EA` |
| `--ink` | `#0A0D12` | `#14181F` |
| `--ink-2` | `#3D4351` | `#4A5160` |
| `--ink-3` | `#7C8597` | `#8A8F9A` |
| `--rule` | `rgba(10,13,18,0.10)` | `rgba(20,24,31,0.10)` |
| `--blue-tint` | `rgba(24,95,165,0.07)` | `rgba(24,95,165,0.08)` |

Variables adicionales por tema: `--nav-bg`, `--nav-blur`, `--hero-pt/pb`, `--border-w` (1px vs 0.5px), `--card-hover-border`, `--card-shadow`, `--avatar-ring`, `--stack-hover-shadow`.

### Cómo funciona el switcher

```html
<!-- Anti-FOUC: en <head> antes de los estilos -->
<script>(function(){var t=localStorage.getItem('theme')||'white';document.documentElement.setAttribute('data-theme',t);})();</script>
```

```js
// Al final del <body>
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'white' ? 'beige' : 'white';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

El botón `#theme-toggle` (ícono `ti-palette` de Tabler Icons) vive en la nav entre Stack y Contacto.

### Diferencias visuales entre temas que no son solo color

- **Hero fondo:** white usa `bg-alt` (#F7F8FA) con grid pattern animado (CSS `background-image` + `mask-image`); beige usa `bg-cream` (#F5F1EA) con gradiente radial suave
- **Nav blur:** white `blur(14px)`, beige `blur(12px)`
- **Course cards y stack items:** white `border: 1px`, beige `border: 0.5px`
- **Hover border cards:** white → `var(--ink)` (negro puro), beige → `rgba(20,24,31,0.18)` (hairline)
- **Stack hover shadow:** white tiene sombra, beige no

### Stack visual de la landing

- **Fuentes:** Plus Jakarta Sans (400/500/600/700 + itálicas) + JetBrains Mono (400/500) — Google Fonts CDN
- **Iconos:** Tabler Icons Webfont CDN (`ti-palette`, `ti-chart-candle`, `ti-building-bank`, etc.)
- **Animaciones:** IntersectionObserver fade-in (`.reveal` → `.reveal.in`) con delays `.d1`–`.d5`
- **Hover en course cards:** `translateY(-3px)` + sombra + barra azul inferior (`::after scaleX`) + icono invertido a azul/blanco + flecha `translate(2px,-2px)`

---

## Cómo funciona el template de curso (layouts/cursos/list.html)

`content/cursos/bloomberg/_index.md` tiene el front matter y el contenido Markdown.  
`layouts/cursos/list.html` lo renderiza con el diseño MOOC. Hugo los combina automáticamente.

**Importante:** el template es ahora **standalone** (HTML completo, sin `{{ define "main" }}`), igual que la landing. El archivo entregado por diseño traía `{{ define "main" }}`/`{{ end }}` envolviendo HTML completo — eso produciría HTML anidado inválido dentro del `baseof.html` de HugoBlox. Se eliminaron esos wrappers antes de copiar al repo.

El template incluye:
- **Nav:** logo "Hugo Gutierrez" con link a `/`, links de sección, botón `#theme-toggle` con `ti-palette`
- **Hero:** badges de color (azul Terminal, gris código/ciclo, verde Acceso libre), título 38px/600, summary, stats con iconos Tabler
- **Contenido:** `{{ .Content }}` — renderiza el Markdown del `_index.md`
- **CSS variables por tema:** `--bg-primary/secondary/tertiary`, `--text-*`, `--border-*`, `--badge-*-bg/text`, `--exam-bg/border` — todos reactivos al `data-theme`
- **Tablas:** `border-radius: 8px`, headers uppercase con `letter-spacing`, primera columna azul
- **Blockquotes:** usan `--exam-bg` / `--exam-border` (tema-aware, no hardcodeados)
- **Anti-FOUC:** script inline en `<head>` aplica tema de localStorage antes de pintar

### Tokens CSS del template de curso

| Variable | White | Beige |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | `#FAF8F3` |
| `--bg-secondary` | `#F7F7F5` | `#F1EFE8` |
| `--exam-bg` | `#FAEEDA` | `#F5EBDB` |
| `--exam-border` | `#BA7517` | `#BA7517` |
| `--badge-blue-bg` | `#E6F1FB` | `#DDE9F5` |
| `--badge-green-bg` | `#EAF3DE` | `#E2EDD6` |

Front matter relevante del `_index.md`:
```yaml
codigo: "1FIN39"
ciclo: "2026-1"
tipo: "curso"
tags: [...]
featured: true
```

---

## Aprendizaje técnico: overrides de template y standalone vs define

Hugo busca templates en el proyecto antes que en el módulo. Para la sección `cursos`:
- `layouts/cursos/list.html` → aplica a `/cursos/bloomberg/` y cualquier subsección de `cursos`

Para la homepage (type: landing):
- `layouts/landing/list.html` → override del template HugoBlox para type=landing

### Standalone vs `{{ define "main" }}`

| Enfoque | Cuándo usarlo |
|---|---|
| **Standalone** (HTML completo sin `define`) | Cuando la página necesita control total sobre `<head>`, fuentes, scripts anti-FOUC, tema propio. Usado en landing y curso. |
| **`{{ define "main" }}`** | Cuando se quiere inyectar solo el contenido dentro del baseof de HugoBlox (head, nav, footer los provee HugoBlox). Usado en sesiones individuales. |

**Trampa frecuente:** un archivo con `{{ define "main" }}` que contiene `<!DOCTYPE html>` adentro produce HTML anidado inválido — HugoBlox inserta el bloque "main" dentro de su propio `<body>`. Si el diseño requiere `<head>` propio, usar standalone.

---

## Aprendizaje técnico importante: cómo forzar light mode en HugoBlox Kit

**El parámetro correcto es `hugoblox.theme.mode`**, no `appearance.theme_day/theme_night`.

El `baseof.html` de HugoBlox Kit hace:
```html
data-wc-theme-default="{{ (lower site.Params.hugoblox.theme.mode) | default "system" }}"
```

Con `mode = "light"` en params.toml, el HTML se genera con `data-wc-theme-default="light"` y `hb-head.min.js` nunca aplica dark mode desde la primera pintura.

**Por qué fallaron los enfoques anteriores:**
1. `appearance.theme_day/theme_night` — parámetros de HugoBlox v1 (legacy), ignorados por Kit 0.12.0
2. Script JS en `<body>` para remover clase `dark` — llega tarde: `hb-head.min.js` ya corrió en `<head>`
3. CSS variable override con `!important` en `<body>` — llega tarde, mismo problema
4. `MutationObserver` — mejora (previene que el script deferred re-agregue `dark`) pero no evita el flash inicial

**El fix correcto:**
```toml
# config/_default/params.toml
[hugoblox]
  [hugoblox.theme]
    mode = "light"
```

---

## Configuración técnica actual

### params.toml
```toml
[hugoblox]
  [hugoblox.theme]
    mode = "light"

[appearance]
  theme_day   = "light"
  theme_night = "light"
  font        = "plus-jakarta-sans"
```

### hugo.toml
```toml
baseURL = "https://hugo-gutierrez-pe.github.io/"
languageCode = "es-PE"
title = "Hugo Gutierrez"

[outputs]
  home    = ["HTML"]
  section = ["HTML", "RSS"]
```

### go.mod — módulos HugoBlox
```
github.com/HugoBlox/kit/modules/blox v0.0.0-20260502203050-b8ad5540288a
github.com/HugoBlox/kit/modules/integrations/netlify v0.0.0-20260327032542-ef8ed449c7e8
```
> Módulo cambió de `github.com/HugoBlox/hugo-theme-developer-portfolio` al nuevo path en 2026.

### Bloques renombrados en HugoBlox v2
| Nombre viejo | Nombre nuevo |
|---|---|
| `contact` | `contact-info` |
| `hero` | `dev-hero` |

---

## Workflow de deploy
1. Push a `main` → GitHub Actions arranca automáticamente
2. `build.yml`: pnpm install → Tailwind → Hugo --minify
3. `deploy.yml`: publica artefacto en GitHub Pages
4. Tiempo total: ~45–60 segundos
5. Verificar con: `gh run list --repo hugo-gutierrez-pe/hugo-gutierrez-pe.github.io --limit 1`

---

## Pendientes por prioridad

### Alta — archivos estáticos faltantes
- [x] `content/authors/admin/avatar.jpg` — foto de perfil (434 KB, subida 2026-05-15)
- [x] `static/cv/hugo-gutierrez-cv.pdf` — CV descargable (402 KB, subido 2026-05-15)
- [x] `static/img/hugo.jpg` — foto para landing page (subida 2026-05-15)

### Media — contenido de cursos
- [ ] Sesiones S02–S13 Bloomberg (1FIN39) — solo existe s01-intro.md
- [ ] Links de Drive reales en `_index.md` de Bloomberg (actualmente todos dicen `href=#`)
- [ ] `content/cursos/finanzas-corporativas/_index.md` — curso 1FIN55
- [ ] `content/cursos/analisis-financiero/_index.md` — curso 1FIN02

### Baja — mejoras
- [ ] `content/sobre-mi.md` — completar bio extendida
- [ ] LinkedIn y GitHub reales en `authors/admin/_index.md` (hay `TODO`)
- [ ] Dominio `hugogutierrez.pe` — cambiar `baseURL` y DNS cuando esté listo
- [ ] SEO: meta description, og:image, favicon para la landing

---

## Entorno local
- **Repo:** `~/hugo-migration/hugo-gutierrez-pe.github.io/`
- **SSH GitHub:** configurado como `hugo-gutierrez-pe`
- **Hugo:** no instalado en el sistema (build corre en GitHub Actions)
- **gh CLI:** `~/bin/gh` v2.72.0
- **Claude Code:** `~/.npm-global/bin/claude` v2.1.141
