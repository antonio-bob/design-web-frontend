export default function JTBD({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '24px' }}>Job-to-be-Done</div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,18px)', fontWeight: 300, lineHeight: 1.8, maxWidth: '720px' }}>
          <span style={{ fontWeight: 700 }}>When </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.situacao}</span>
          <span style={{ fontWeight: 700 }}>, I want to </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.motivacao}</span>
          <span style={{ fontWeight: 700 }}>, so I can </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.resultado}</span>.
        </div>
      </div>
      {dados.jobs && dados.jobs.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {dados.jobs.map((job: any, i: number) => (
            <div key={i} style={{ padding: 'clamp(20px,3vw,32px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1, marginBottom: '12px', letterSpacing: '-2px' }}>0{i + 1}</div>
              <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 600 }}>When </span>{job.situacao}
                <span style={{ fontWeight: 600 }}>, I want to </span>{job.motivacao}
                <span style={{ fontWeight: 600 }}>, so I can </span>{job.resultado}.
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
