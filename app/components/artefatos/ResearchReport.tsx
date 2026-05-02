import Link from 'next/link'

const CORES: Record<string, string> = {
  persona: 'var(--coral)',
  journey_map: 'var(--blue)',
  future_journey_map: 'var(--blue)',
  system_map: 'var(--green)',
  hmw: 'var(--green)',
  key_insight: 'var(--yellow)',
  jtbd: 'var(--coral)',
  user_stories: 'var(--blue)',
  research_report: 'var(--black)',
}

export default function ResearchReport({ dados }: { dados: any }) {
  // Normaliza key_findings — aceita array de strings ou array de objetos
  const findings: string[] = dados.findings
    ? dados.findings
    : (dados.key_findings || []).map((f: any) =>
        typeof f === 'string' ? f : `${f.titulo}: ${f.descricao}${f.evidencia ? ` — "${f.evidencia}"` : ''}`
      )

  const processo = dados.processo || []

  // Metadados extras que a Floris pode gerar
  const participantes = dados.participantes
  const metodos = dados.metodos
  const proximos = dados.proximos_passos

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>

      {/* Objetivo */}
      {dados.objetivo && (
        <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '12px' }}>Objetivo</div>
          <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: '720px' }}>{dados.objetivo}</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: processo.length > 0 ? '1fr 1fr' : '1fr', borderBottom: '1px solid var(--gray-200)' }}>

        {/* Processo */}
        {processo.length > 0 && (
          <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Processo de Pesquisa</div>
            {processo.map((p: any, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', marginBottom: '20px' }}>
                <div style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1, letterSpacing: '-1px' }}>0{i + 1}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{p.etapa}</div>
                  <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{p.descricao}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Findings */}
        {findings.length > 0 && (
          <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Key Findings</div>
            {findings.map((f: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1, flexShrink: 0, letterSpacing: '-1px' }}>0{i + 1}</div>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 400, lineHeight: 1.5 }}>{f}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Participantes e Métodos */}
      {(participantes || metodos) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--gray-200)' }}>
          {participantes && (
            <div style={{ padding: 'clamp(24px,4vw,48px)', borderRight: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '12px' }}>Participantes</div>
              <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, lineHeight: 1, marginBottom: '8px' }}>{participantes.quantidade}</div>
              <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{participantes.perfil}</div>
            </div>
          )}
          {metodos && (
            <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '12px' }}>Métodos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {metodos.map((m: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>—</span>
                    <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)' }}>{m.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Próximos passos */}
      {proximos && proximos.length > 0 && (
        <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px' }}>Próximos Passos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {proximos.map((p: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', color: 'var(--gray-400)', flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualizações linkadas */}
      {dados.visualizacoes && dados.visualizacoes.length > 0 && (
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Visualizações</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {dados.visualizacoes.map((v: any, i: number) => (
              <Link key={i} href={`/artefatos/${v.slug}`} style={{ padding: 'clamp(16px,2vw,24px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)', display: 'block', textDecoration: 'none', color: 'var(--black)' }}>
                <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: CORES[v.tipo] || 'var(--gray-400)', marginBottom: '12px' }}></div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{v.tipo}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px' }}>{v.titulo}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}