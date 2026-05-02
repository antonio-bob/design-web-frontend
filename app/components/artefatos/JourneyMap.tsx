export default function JourneyMap({ dados, futuro }: { dados: any; futuro?: boolean }) {
  const headerBg = futuro ? 'var(--blue)' : 'var(--black)'
  const stageBg = futuro ? 'rgba(74,127,212,0.08)' : 'var(--black)'
  const stageColor = futuro ? 'var(--blue)' : 'white'
  const stageNum = futuro ? 'rgba(74,127,212,0.2)' : 'rgba(255,255,255,0.08)'

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)', overflowX: 'auto' }}>
      <div style={{
        background: headerBg,
        padding: 'clamp(20px,3vw,32px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: '24px', flexWrap: 'wrap',
      }}>
        <div>
          {futuro && (
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Future State
            </div>
          )}
          <div style={{ fontSize: 'clamp(24px,5vw,44px)', fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>
            {dados.titulo || 'Journey Map'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(16px,3vw,40px)', flexWrap: 'wrap' }}>
          {dados.meta && Object.entries(dados.meta).map(([k, v]: any) => (
            <div key={k}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 400, color: 'white' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ background: stageBg, padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left', width: '110px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Etapas</span>
            </th>
            {dados.etapas && dados.etapas.map((e: any, i: number) => (
              <th key={i} style={{ background: stageBg, padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: stageNum, lineHeight: 1, display: 'block', letterSpacing: '-1px' }}>0{i + 1}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: stageColor, display: 'block', marginTop: '2px' }}>{e.nome}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.linhas && dados.linhas.map((linha: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', background: linha.tipo === 'emocao' ? stageBg : 'transparent' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{linha.label}</span>
              </td>
              {linha.celulas && linha.celulas.map((cel: string, j: number) => (
                <td key={j} style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--gray-200)',
                  fontStyle: linha.tipo === 'pensamento' ? 'italic' : 'normal',
                  color: linha.tipo === 'oportunidade' ? 'var(--blue)' : linha.tipo === 'pensamento' ? 'var(--gray-600)' : 'var(--black)',
                  background: linha.tipo === 'emocao' ? stageBg : 'transparent',
                  textAlign: linha.tipo === 'emocao' ? 'center' : 'left',
                  fontSize: linha.tipo === 'emocao' ? '20px' : '12px',
                  fontWeight: linha.tipo === 'oportunidade' ? 500 : 300,
                  lineHeight: 1.5,
                }}>{cel}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
