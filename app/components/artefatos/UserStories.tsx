export default function UserStories({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      {dados.stories && dados.stories.map((story: any, i: number) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-2px' }}>0{i + 1}</span>
          </div>
          <div style={{ padding: 'clamp(20px,3vw,40px)' }}>
            <div style={{ fontSize: 'clamp(13px,1.8vw,18px)', fontWeight: 300, lineHeight: 1.8 }}>
              <span style={{ fontWeight: 700 }}>As a </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.usuario}</span>
              <span style={{ fontWeight: 700 }}>, I want </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.acao}</span>
              <span style={{ fontWeight: 700 }}>, so that </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.resultado}</span>.
            </div>
            {story.criterios && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>Critérios de aceitação</div>
                {story.criterios.map((c: string, j: number) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '6px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue)', marginTop: '7px', flexShrink: 0 }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.5, color: 'var(--gray-600)' }}>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
