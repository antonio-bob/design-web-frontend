export default function KeyInsight({ dados }: { dados: any }) {
  return (
    <div style={{ background: 'var(--black)', display: 'grid', gridTemplateColumns: 'clamp(120px,15vw,220px) 1px 1fr' }}>
      <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: '16px' }}>Key Insight</div>
        <div style={{ fontSize: 'clamp(80px,14vw,160px)', fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.05)', letterSpacing: '-4px' }}>{dados.numero || '01'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.07)' }}></div>
      <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
        <div style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, textTransform: 'uppercase', color: 'white', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '32px' }}>
          {dados.observacao}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {dados.cadeia && dados.cadeia.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--yellow)', padding: '4px 8px', border: '1px solid var(--yellow)', flexShrink: 0, marginTop: '2px' }}>{item.tag}</span>
              <span style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
