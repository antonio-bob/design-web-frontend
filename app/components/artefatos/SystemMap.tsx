export default function SystemMap({ dados }: { dados: any }) {
  const atores = dados.atores || []
  const relacoes = dados.relacoes || []
  const total = atores.length
  const r = total > 6 ? 220 : 180
  const cx = (i: number) => 400 + r * Math.cos((2 * Math.PI * i) / (total - 1) - Math.PI / 2)
  const cy = (i: number) => 300 + r * Math.sin((2 * Math.PI * i) / (total - 1) - Math.PI / 2)

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Foco do mapa</div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: '640px' }}>{dados.foco}</div>
      </div>
      <svg viewBox="0 0 800 600" style={{ width: '100%', maxWidth: '900px', display: 'block', margin: '0 auto' }}>
        {relacoes.map((rel: any, i: number) => {
          const fromIdx = atores.findIndex((a: any) => a.id === rel.de)
          const toIdx = atores.findIndex((a: any) => a.id === rel.para)
          if (fromIdx < 0 || toIdx < 0) return null
          const x1 = fromIdx === 0 ? 400 : cx(fromIdx)
          const y1 = fromIdx === 0 ? 300 : cy(fromIdx)
          const x2 = toIdx === 0 ? 400 : cx(toIdx)
          const y2 = toIdx === 0 ? 300 : cy(toIdx)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gray-200)" strokeWidth="1.5" />
              {rel.label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2} textAnchor="middle" fontSize="9" fill="var(--gray-400)" fontFamily="DM Sans, sans-serif" fontWeight="600">{rel.label}</text>}
            </g>
          )
        })}
        {atores.map((ator: any, i: number) => {
          const x = i === 0 ? 400 : cx(i)
          const y = i === 0 ? 300 : cy(i)
          const cor = ator.tipo === 'central' ? 'var(--black)' : ator.tipo === 'primario' ? 'var(--green)' : 'var(--gray-400)'
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={ator.tipo === 'central' ? 40 : 28} fill={cor} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={ator.tipo === 'central' ? '11' : '10'} fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">
                {ator.nome.length > 12 ? ator.nome.substring(0, 10) + '…' : ator.nome}
              </text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--gray-200)' }}>
        {atores.map((ator: any, i: number) => (
          <div key={i} style={{ padding: 'clamp(16px,2vw,24px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{ator.tipo}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{ator.nome}</div>
            {ator.descricao && <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', marginTop: '4px', lineHeight: 1.5 }}>{ator.descricao}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
