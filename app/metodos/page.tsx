import Nav from '../components/Nav'
import Link from 'next/link'
import { getMetodos } from '../lib/api'

const FASE_CORES: Record<string, string> = {
  research: 'var(--coral)',
  ideation: 'var(--blue)',
  prototyping: 'var(--green)',
  facilitation: 'var(--yellow)',
}

export default async function MetodosPage({
  searchParams,
}: {
  searchParams: Promise<{ fase?: string }>
}) {
  const { fase } = await searchParams
  const metodos = await getMetodos(fase)

  return (
    <>
      <Nav />

      {/* HEADER */}
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--twilight-indigo)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px' }}>
          Service Design Methods
        </div>
        <div style={{ fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92 }}>
          {fase ? fase : 'Métodos'}
        </div>

        {/* FILTROS */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '32px', flexWrap: 'wrap', paddingBottom: '24px' }}>
          {['research', 'ideation', 'prototyping', 'facilitation'].map(f => (
            <Link key={f} href={`/metodos?fase=${f}`} style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', padding: '7px 14px',
              border: `1px solid ${fase === f ? FASE_CORES[f] : 'var(--gray-200)'}`,
              color: fase === f ? FASE_CORES[f] : 'var(--gray-400)',
              textDecoration: 'none',
              transition: 'all .15s',
            }}>
              {f}
            </Link>
          ))}
          <Link href="/metodos" style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', padding: '7px 14px',
            border: `1px solid ${!fase ? 'var(--black)' : 'var(--gray-200)'}`,
            color: !fase ? 'var(--black)' : 'var(--gray-400)',
            textDecoration: 'none',
          }}>
            Todos
          </Link>
        </div>
      </div>

      {/* LISTA */}
      {metodos.length === 0 ? (
        <div style={{ padding: 'clamp(32px,4vw,64px) clamp(16px,3vw,48px)', fontSize: '13px', fontWeight: 300, color: 'var(--gray-400)' }}>
          Nenhum método cadastrado ainda.
        </div>
      ) : (
        <div className="metodos-grid">
          {metodos.map((m: any) => (
            <Link key={m.slug} href={`/metodos/${m.slug}`} style={{
              padding: 'clamp(20px,3vw,32px)',
              borderRight: '1px solid var(--gray-200)',
              borderBottom: '1px solid var(--gray-200)',
              display: 'block',
              textDecoration: 'none',
              color: 'var(--black)',
              transition: 'background .15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: FASE_CORES[m.fase] || 'var(--gray-400)', flexShrink: 0 }}></div>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{m.fase} · {m.numero}</span>
                {m.gera_artefato && (
                  <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '2px 6px', border: `1px solid ${FASE_CORES[m.fase]}`, color: FASE_CORES[m.fase], marginLeft: 'auto', flexShrink: 0 }}>
                    Artefato
                  </span>
                )}
              </div>
              <div style={{ fontSize: 'clamp(13px,2vw,18px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '8px' }}>{m.nome}</div>
              {m.descricao && (
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {m.descricao}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
