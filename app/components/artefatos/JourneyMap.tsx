const EMOTION_ICON: Record<string, string> = {
  '-2': 'sentiment_very_dissatisfied',
  '-1': 'sentiment_dissatisfied',
  '0':  'sentiment_neutral',
  '1':  'sentiment_satisfied',
  '2':  'sentiment_satisfied_alt',
  '3':  'sentiment_very_satisfied',
}

function getIcon(val: any): string {
  if (typeof val === 'number') return EMOTION_ICON[String(val)] || 'sentiment_neutral'
  return 'sentiment_neutral'
}

function getEmoji(val: any): string {
  const map: Record<string, string> = {
    '-2': '😟', '-1': '😕', '0': '😐', '1': '🙂', '2': '😊', '3': '😄'
  }
  return map[String(val)] || '😐'
}

function bezierPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''
  let d = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 2
    const cp1y = points[i].y
    const cp2x = points[i].x + (points[i + 1].x - points[i].x) / 2
    const cp2y = points[i + 1].y
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`
  }
  return d
}

function EmotionChart({ values, etapas, cor }: { values: number[]; etapas: any[]; cor: string }) {
  const min = -2
  const max = 3
  const range = max - min
  const w = 1000
  const h = 200
  const padX = 24
  const padY = 24
  const innerW = w - padX * 2
  const innerH = h - padY * 2
  const n = values.length

  const pts = values.map((v, i) => ({
    x: padX + (i / (n - 1)) * innerW,
    y: padY + ((max - v) / range) * innerH,
  }))

  const path = bezierPath(pts)

  // Percentuais para posicionar ícones HTML sobre o SVG
  const pcts = pts.map(p => ({
    x: (p.x / w) * 100,
    y: (p.y / h) * 100,
  }))

  return (
    <div style={{ position: 'relative' }}>
      {/* SVG com curva */}
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', display: 'block' }}>
        {/* Linha zero */}
        <line
          x1={padX} y1={padY + ((max - 0) / range) * innerH}
          x2={w - padX} y2={padY + ((max - 0) / range) * innerH}
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3"
        />
        {/* Curva bezier */}
        <path d={path} fill="none" stroke={cor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Pontos pequenos */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={cor} />
        ))}
      </svg>

      {/* Ícones Material Symbols posicionados sobre o SVG */}
      {pcts.map((p, i) => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: 'translate(-50%, -130%)',
            fontSize: '18px',
            color: cor,
            lineHeight: 1,
            fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20",
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {getIcon(values[i])}
        </span>
      ))}
    </div>
  )
}

export default function JourneyMap({ dados, futuro }: { dados: any; futuro?: boolean }) {
  const stageColor = futuro ? 'var(--blue)' : 'white'
  const cor = '#4a7fd4'

  const linhaEmocao = dados.linhas?.find((l: any) => l.tipo === 'emocao')
  const valoresNumericos: number[] | null = linhaEmocao?.celulas?.every((c: any) => typeof c === 'number')
    ? linhaEmocao.celulas
    : null

  const linhasSemEmocao = valoresNumericos
    ? dados.linhas?.filter((l: any) => l.tipo !== 'emocao')
    : dados.linhas

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>

      {/* TABELA */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: 'var(--blue)', padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left', width: '110px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--eggshell)' }}>Etapas</span>
              </th>
              {dados.etapas && dados.etapas.map((e: any, i: number) => (
                <th key={i} style={{ background: 'var(--blue)', padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--eggshell)', lineHeight: 1, display: 'block', letterSpacing: '-1px' }}>0{i + 1}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: stageColor, display: 'block', marginTop: '2px' }}>{e.nome}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Linha de emoção como gráfico bezier */}
            {valoresNumericos && (
              <tr>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--gray-200)', background: 'var(--softSand)', verticalAlign: 'middle' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Emoção</span>
                </td>
                <td colSpan={dados.etapas?.length || 1} style={{ padding: '0 8px', background: 'var(--softSand)', borderBottom: '1px solid var(--gray-200)' }}>
                  <EmotionChart values={valoresNumericos} etapas={dados.etapas || []} cor={cor} />
                </td>
              </tr>
            )}

            {/* Demais linhas */}
            {linhasSemEmocao && linhasSemEmocao.map((linha: any, i: number) => (
              <tr key={i}>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{linha.label}</span>
                </td>
                {linha.celulas && linha.celulas.map((cel: any, j: number) => (
                  <td key={j} style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--gray-200)',
                    fontStyle: linha.tipo === 'pensamento' ? 'italic' : 'normal',
                    color: linha.tipo === 'oportunidade' ? 'var(--blue)' : linha.tipo === 'pensamento' ? 'var(--gray-600)' : 'var(--black)',
                    fontSize: '12px',
                    fontWeight: linha.tipo === 'oportunidade' ? 500 : 300,
                    lineHeight: 1.5,
                  }}>
                    {linha.tipo === 'emocao' ? getEmoji(cel) : cel}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
