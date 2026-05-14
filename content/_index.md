---
# ─── Homepage de Hugo Gutierrez ───────────────────────────────────────────────
title: ""
type: landing

sections:

  # ── HERO / BIO ──────────────────────────────────────────────────────────────
  - block: resume-biography
    id: bio
    content:
      username: admin
      text: ""
    design:
      css_class: "dark"
      background:
        color: black
        text_color_light: true

  # ── TECH STACK ──────────────────────────────────────────────────────────────
  - block: resume-skills
    id: stack
    content:
      title: "Herramientas y plataformas"
      username: admin
      skills:
        - name: "Bloomberg Terminal"
          description: "Renta variable, renta fija, FX, commodities, portafolios"
        - name: "Excel / VBA"
          description: "Modelos financieros, automatización de reportes"
        - name: "Python"
          description: "Análisis de datos, automatización"
        - name: "Capital IQ"
          description: "Screener, M&A, comparables"
        - name: "HDM-4"
          description: "Modelamiento de carreteras — costos operativos y beneficios"
        - name: "GitHub"
          description: "Control de versiones y proyectos"
    design:
      css_class: ""

  # ── CURSOS ──────────────────────────────────────────────────────────────────
  - block: collection
    id: cursos
    content:
      title: "Cursos · PUCP 2026-1"
      filters:
        folders:
          - cursos
    design:
      view: card
      columns: "3"

  # ── EXPERIENCIA EN PROYECTOS ─────────────────────────────────────────────────
  - block: resume-experience
    id: proyectos
    content:
      title: "Experiencia en proyectos"
      username: admin
      experience:
        - title: "Analista de inversión"
          company: "Ciencia Constructiva — Concesionaria IIRSA Norte"
          location: "Lima, Perú"
          date_start: "2025-08-01"
          date_end: ""
          description: |
            Estudio de inversión vial por más de S/ 170 millones.
            Modelos de flujos, VAN/TIR, matrices de riesgo.
            Modelación HDM-4: tiempos de viaje, costos operativos y seguridad vial.

        - title: "Especialista en inversión"
          company: "OHLA — Obrascon Huarte Lain"
          location: "Lima, Perú"
          date_start: "2025-04-01"
          date_end: "2025-07-31"
          description: |
            Proyectos de infraestructura por más de S/ 600 millones.
            Informe de Consistencia — Defensas Ribereñas (ríos Huaura y Cañete).
            Presentaciones ejecutivas ante PCM – ANIN.

        - title: "Analista de inversión"
          company: "Ciencia Constructiva — PMO Vías / Vía Expresa Santa Rosa"
          location: "Lima, Perú"
          date_start: "2024-09-01"
          date_end: "2025-04-30"
          description: |
            Evaluación financiera del megaproyecto Vía Expresa Santa Rosa (PE-20I).
            Proyecciones de flujos, VAN/TIR, análisis de escenarios.
            Coordinación con MTC, OHLA y TYPSA.

        - title: "Instructor de finanzas"
          company: "Pontificia Universidad Católica del Perú"
          location: "Lima, Perú"
          date_start: "2020-08-01"
          date_end: ""
          description: |
            Bloomberg Terminal (1FIN39), Finanzas Corporativas (1FIN55), Análisis Financiero I (1FIN02).
            Valorización: Leche Gloria, InRetail, Aceros Arequipa, MercadoLibre.
            Director PUCP — CFA Research Challenge, primera victoria nacional.
    design:
      css_class: ""

  # ── CERTIFICACIONES Y EXÁMENES ───────────────────────────────────────────────
  - block: resume-awards
    id: cert
    content:
      title: "Certificaciones y exámenes"
      username: admin
      awards:
        - title: "CFA Nivel 1 — Aprobado"
          awarder: "CFA Institute"
          date: "2017-06-01"
          summary: "Fundamentos de análisis financiero, valorización y ética profesional."

        - title: "Bloomberg Market Concepts (BMC)"
          awarder: "Bloomberg"
          date: "2020-08-01"
          summary: "Certificación oficial en economía, renta fija, FX y renta variable."

        - title: "TOEFL iBT — 98 / 120"
          awarder: "ETS"
          date: "2016-01-01"
          summary: "29/30 en Listening y Reading."

        - title: "Diplomado en APPs y Proyectos en Activos — 2do puesto"
          awarder: "Proinversión – SERVIR"
          date: "2025-03-01"
          summary: "Especialización en Asociaciones Público Privadas."

        # Agregar aquí futuras certificaciones:
        # - title: "CFA Nivel 2"
        #   awarder: "CFA Institute"
        #   date: ""
        #   summary: ""
    design:
      css_class: ""

  # ── CONTACTO ─────────────────────────────────────────────────────────────────
  - block: contact
    id: contact
    content:
      title: "Contacto"
      email: "dhgutierrezcu@gmail.com"
      address:
        city: "Lima"
        country: "Perú"
        country_code: "PE"
      contact_links:
        - icon: linkedin
          icon_pack: fab
          name: "LinkedIn"
          link: "https://linkedin.com/in/"    # TODO: agregar usuario real
        - icon: github
          icon_pack: fab
          name: "GitHub"
          link: "https://github.com/"         # TODO: agregar usuario real
    design:
      css_class: ""
---
