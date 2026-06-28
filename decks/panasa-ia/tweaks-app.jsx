// Course/theme switcher for the deck template

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "course": "bloomberg",
  "background": "white",
  "showChrome": true,
  "accentIntensity": "subtle"
}/*EDITMODE-END*/;

const COURSE_META = {
  bloomberg: {
    code: '1FIN39',
    name: 'Bloomberg Terminal',
    short: 'Bloomberg',
  },
  corp: {
    code: '1FIN55',
    name: 'Finanzas Corporativas I',
    short: 'Finanzas Corp.',
  },
  analisis: {
    code: '1FIN02',
    name: 'Análisis Financiero I',
    short: 'Análisis Fin.',
  },
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply course theme. Skip mutation on initial mount when the static
  // HTML already matches the default (bloomberg) so the user can directly
  // edit "1FIN39" / "Terminal" / course tags in edit mode.
  const isFirstRun = React.useRef(true);
  React.useEffect(() => {
    const currentAttr = document.documentElement.getAttribute('data-course');
    if (isFirstRun.current && currentAttr === t.course) {
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;

    document.documentElement.setAttribute('data-course', t.course);
    const meta = COURSE_META[t.course];

    document.querySelectorAll('.course-tag').forEach(el => {
      el.innerHTML = `<span class="dot"></span> ${meta.code} · ${meta.short}<span class="bloomberg-dot"></span>`;
    });
    const cct = document.querySelector('.portada .course-code-tag');
    if (cct) {
      cct.innerHTML = `<span>${meta.code}</span><span class="bloomberg-dot"></span>`;
    }
    const ct = document.querySelector('.portada h1.course-title');
    const TITLES = {
      bloomberg: 'Bloomberg <em>Terminal</em>',
      corp:      'Finanzas <em>Corporativas</em> I',
      analisis:  'Análisis <em>Financiero</em> I',
    };
    if (ct) ct.innerHTML = TITLES[t.course];
  }, [t.course]);

  // Apply background mode (white / beige). Same first-run guard so the
  // user can edit the static HTML directly without React clobbering it.
  const bgFirstRun = React.useRef(true);
  React.useEffect(() => {
    const currentAttr = document.documentElement.getAttribute('data-bg');
    if (bgFirstRun.current && (!currentAttr || currentAttr === t.background)) {
      bgFirstRun.current = false;
      if (!currentAttr && t.background === 'white') return;
    }
    bgFirstRun.current = false;
    document.documentElement.setAttribute('data-bg', t.background);
  }, [t.background]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Curso">
        <TweakRadio
          label="Curso activo"
          value={t.course}
          options={[
            { value: 'bloomberg', label: 'Bloomberg' },
            { value: 'corp', label: 'Corp.' },
            { value: 'analisis', label: 'Análisis' },
          ]}
          onChange={(v) => setTweak('course', v)}
        />
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: '#7c8597',
          marginTop: 6,
          lineHeight: 1.5,
        }}>
          {COURSE_META[t.course].code} · {COURSE_META[t.course].name}
          <br/>Cambia color de acento + código + nombre en portada.
          {t.course === 'bloomberg' && (
            <><br/><span style={{color:'#FA8C16'}}>● </span>Guiño Bloomberg activo (punto naranja).</>
          )}
        </div>
      </TweakSection>

      <TweakSection title="Fondo">
        <TweakRadio
          label="Modo"
          value={t.background}
          options={[
            { value: 'white', label: 'White' },
            { value: 'beige', label: 'Beige' },
            { value: 'dark',  label: 'Dark' },
          ]}
          onChange={(v) => setTweak('background', v)}
        />
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: '#7c8597',
          marginTop: 6,
          lineHeight: 1.5,
        }}>
          {t.background === 'white' && 'Fondo #FFFFFF · alto contraste, default.'}
          {t.background === 'beige' && 'Fondo #FAF8F4 · paleta cálida de tu web.'}
          {t.background === 'dark' && 'Fondo #0A0D12 · estilo del slide 2, con glow azul.'}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
