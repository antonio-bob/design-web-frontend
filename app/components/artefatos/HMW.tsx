export default function HMW({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(16px,3vw,40px)', padding: 'clamp(24px,4vw,48px)', borderBottom: '2px solid var(--black)', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 'clamp(64px,12vw,140px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px', flexShrink: 0 }}>HMW</div>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Insight de base</div>
          <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, color: 'var(--gray-600)', maxWidth: '560px', lineHeight: 1.6 }}>{dados.insight}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {dados.perguntas && dados.perguntas.map((p: any, i: number) => {
          const texto = typeof p === 'string' ? p : p.pergunta
          const sub = typeof p === 'string' ? null : p.sub
          return (
            <div key={i} style={{
              padding: 'clamp(20px,3vw,32px)',
              borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none',
              borderBottom: '1px solid var(--gray-200)',
            }}>
              <div style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1, marginBottom: '6px', letterSpacing: '-2px' }}>0{i + 1}</div>
              <div style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>{texto}</div>
              {sub && <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', marginTop: '8px', lineHeight: 1.5 }}>{sub}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}