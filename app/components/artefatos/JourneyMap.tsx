export default function JourneyMap({ dados, futuro }: { dados: any; futuro?: boolean }) {
  const headerBg = futuro ? 'var(--blue)' : 'var(--black)'
  const stageBg = futuro ? 'rgba(74,127,212,0.08)' : 'var(--black)'
  const stageColor = futuro ? 'var(--blue)' : 'white'
  const stageNum = futuro ? 'rgba(74,127,212,0.2)' : 'rgba(255,255,255,0.08)'

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)', overflowX: 'auto' }}>
      

      <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ background: 'var(--softSand)', padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left', width: '110px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-600)' }}>Etapas</span>
            </th>
            {dados.etapas && dados.etapas.map((e: any, i: number) => (
              <th key={i} style={{ background: 'var(--softSand)', padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1, display: 'block', letterSpacing: '-1px' }}>0{i + 1}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-600)', display: 'block', marginTop: '2px' }}>{e.nome}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.linhas && dados.linhas.map((linha: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', background: linha.tipo === 'emocao' ? 'var(--softSand)' : 'transparent' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-600)' }}>{linha.label}</span>
              </td>
              {linha.celulas && linha.celulas.map((cel: string, j: number) => (
                <td key={j} style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--gray-200)',
                  fontStyle: linha.tipo === 'pensamento' ? 'italic' : 'normal',
                  color: linha.tipo === 'oportunidade' ? 'var(--blue)' : linha.tipo === 'pensamento' ? 'var(--gray-600)' : 'var(--black)',
                  background: linha.tipo === 'emocao' ? 'var(--softSand)' : 'transparent',
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
