# Estado del proyecto: hugogutierrez-pe.github.io
**Última actualización:** 2026-05-14  
**URL:** https://hugo-gutierrez-pe.github.io  
**Stack:** Hugo + HugoBlox + GitHub Pages

---

## Arquitectura híbrida decidida

### Componentes del sitio
```
hugogutierrez.pe/
├── index.html              ← Landing page (HTML puro, custom design)
├── cursos/                 ← Hugo manejando contenido
│   ├── bloomberg/
│   │   ├── index.html      ← Sílabo virtual (Hugo con CSS custom)
│   │   └── sesiones/       ← S01-S13 (Hugo, estilo blog limpio)
│   ├── finanzas-corporativas/
│   └── analisis-financiero/
└── assets/css/             ← Estilos compartidos
```

### Razones de esta arquitectura

**Homepage (HTML puro):**
- Diseño impactante y único — marca personal
- Control total sobre visual y animaciones
- Fácil de editar sin tocar Hugo

**Páginas de curso (Hugo):**
- Gestión de 39+ sesiones (13 × 3 cursos) automatizada
- Plantillas reutilizables
- Claude Code puede editar masivamente

**Sesiones individuales (Hugo blog-style):**
- Contenido denso — el estilo simple funciona aquí
- Funciones Bloomberg destacadas
- Links a Drive claros

---

## Estado actual: FUNCIONAL — rediseño pendiente

✅ **Lo que funciona:**
- Deploy automático con GitHub Actions
- Estructura de carpetas correcta
- Hugo + HugoBlox instalados

❌ **Lo que falta:**
- Landing page custom (HTML) — próximo paso
- CSS personalizado para páginas de curso
- Contenido: avatar, CV, sesiones S02-S13

---

## Próximos pasos (en orden)

### 1. Landing page impactante (HTML)
- Diseño claro/financiero/profesional
- Hero + cards de cursos + proyectos + tech stack
- Reemplaza index actual

### 2. Mejorar diseño de páginas de curso
- CSS custom en assets/css/
- Sílabo estilo MOOC (visual, no "notepad")
- Tipografía bold, espaciado generoso

### 3. Subir contenido faltante
- Avatar y CV
- Sesiones S02-S13 Bloomberg
- Cursos FinCorp y AnáFi

---

## Configuración técnica

**Tema:** Claro (light mode)  
**Fuente:** Plus Jakarta Sans  
**Base URL:** https://hugo-gutierrez-pe.github.io  
**Deploy:** Automático en cada push a main
