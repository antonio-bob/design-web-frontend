export default function SystemMap({ dados }: { dados: any }) {
  const atores = dados.atores || []
  const relacoes = dados.relacoes || []
  const total = atores.length

  const CORES: Record<string, string> = {
    central: '#0a0a0a',
    usuario: '#4a7fd4',
    provedor: '#2e8b5a',
    sistema: '#3d405b',
    regulador: '#e8483a',
    parceiro: '#f0c030',
  }

  // Posiciona todos os atores em círculo
  const cx = (i: number) => 400 + 200 * Math.cos((2 * Math.PI * i) / total - Math.PI / 2)
  const cy = (i: number) => 280 + 180 * Math.sin((2 * Math.PI * i) / total - Math.PI / 2)

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      {dados.foco && (
        <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Foco do mapa</div>
          <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: '640px' }}>{dados.foco}</div>
        </div>
      )}
      {dados.escopo && !dados.foco && (
        <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Escopo</div>
          <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: '640px' }}>{dados.escopo}</div>
        </div>
      )}
      <svg viewBox="0 0 800 560" style={{ width: '100%', display: 'block', margin: '0 auto' }}>
        {/* Linhas de relação */}
        {relacoes.map((rel: any, i: number) => {
          const fromIdx = atores.findIndex((a: any) => a.nome === rel.de || a.id === rel.de)
          const toIdx = atores.findIndex((a: any) => a.nome === rel.para || a.id === rel.para)
          if (fromIdx < 0 || toIdx < 0) return null
          return (
            <g key={i}>
              <line
                x1={cx(fromIdx)} y1={cy(fromIdx)}
                x2={cx(toIdx)} y2={cy(toIdx)}
                stroke="#d8d8d8" strokeWidth="1.5"
              />
              {rel.valor && (
                <text
                  x={(cx(fromIdx) + cx(toIdx)) / 2}
                  y={(cy(fromIdx) + cy(toIdx)) / 2 - 4}
                  textAnchor="middle" fontSize="9"
                  fill="#999" fontFamily="DM Sans, sans-serif" fontWeight="600"
                >
                  {rel.valor.length > 20 ? rel.valor.substring(0, 18) + '…' : rel.valor}
                </text>
              )}
            </g>
          )
        })}
        {/* Nós dos atores */}
        {atores.map((ator: any, i: number) => {
          const x = cx(i)
          const y = cy(i)
          const cor = CORES[ator.tipo] || '#999'
          const palavras = ator.nome.split(' ')
          const linha1 = palavras.slice(0, Math.ceil(palavras.length / 2)).join(' ')
          const linha2 = palavras.slice(Math.ceil(palavras.length / 2)).join(' ')
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={44} fill={cor} />
              <text x={x} y={linha2 ? y - 4 : y + 4} textAnchor="middle" fontSize="10"
                fill="white" fontFamily="DM Sans, sans-serif" fontWeight="600">
                {linha1}
              </text>
              {linha2 && (
                <text x={x} y={y + 12} textAnchor="middle" fontSize="10"
                  fill="white" fontFamily="DM Sans, sans-serif" fontWeight="600">
                  {linha2}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legenda dos atores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--gray-200)' }}>
        {atores.map((ator: any, i: number) => (
          <div key={i} style={{
            padding: 'clamp(16px,2vw,24px)',
            borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none',
            borderBottom: '1px solid var(--gray-200)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: CORES[ator.tipo] || '#999', flexShrink: 0 }}></div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{ator.tipo}</div>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{ator.nome}</div>
            {ator.descricao && <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', marginTop: '4px', lineHeight: 1.5 }}>{ator.descricao}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}