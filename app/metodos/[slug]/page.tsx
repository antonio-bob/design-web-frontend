import Nav from '../../components/Nav'
import Link from 'next/link'
import { getMetodo } from '../../lib/api'
import { notFound } from 'next/navigation'

const FASE_CORES: Record<string, string> = {
  research: 'var(--coral)',
  ideation: 'var(--blue)',
  prototyping: 'var(--green)',
  facilitation: 'var(--yellow)',
}

const ARTEFATO_CORES: Record<string, string> = {
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

export default async function MetodoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const metodo = await getMetodo(slug)
  if (!metodo) notFound()

  const cor = FASE_CORES[metodo.fase] || 'var(--gray-400)'

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{
        padding: '12px clamp(16px,3vw,48px)',
        borderBottom: '1px solid var(--gray-200)',
        display: 'flex', gap: '8px', alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <Link href="/" style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px' }}>Home</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <Link href={`/metodos?fase=${metodo.fase}`} style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px', textTransform: 'capitalize' }}>{metodo.fase}</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--black)' }}>{metodo.nome}</span>
      </div>

      {/* METHOD HERO */}
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--black)' }}>
        <div style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '3px', color: 'var(--gray-400)', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }}></div>
          {metodo.fase} · Método {metodo.numero}
        </div>

        {/* Número decorativo — oculto no mobile via inline */}
        <div style={{
          fontSize: 'clamp(80px,18vw,220px)', fontWeight: 900,
          lineHeight: 1, color: 'var(--gray-100)', letterSpacing: '-6px',
          float: 'right', marginTop: '-16px', marginLeft: '24px',
        }}>
          {metodo.numero}
        </div>

        <div style={{ fontSize: 'clamp(28px,6vw,96px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 0.92 }}>
          {metodo.nome}
        </div>

        <div style={{
          fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300,
          color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: '640px',
          marginTop: '24px', clear: 'both',
        }}>
          {metodo.descricao}
        </div>

        {/* META GRID */}
        <div className="metodo-meta-grid">
          {[
            { label: 'Duração', val: metodo.duracao },
            { label: 'Energia', val: metodo.energia },
            { label: 'Participantes', val: metodo.participantes },
            { label: 'Output', val: metodo.output },
            { label: 'Gera artefato', val: metodo.gera_artefato || '—' },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: '16px 0',
              borderRight: i < 4 ? '1px solid var(--gray-200)' : 'none',
              paddingRight: i < 4 ? '24px' : '0',
              paddingLeft: i > 0 ? '24px' : '0',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', display: 'block', marginBottom: '6px' }}>{item.label}</span>
              <div style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1.4 }}>{item.val || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* METHOD BODY */}
      <div className="metodo-body-grid">

        {/* MAIN */}
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>

          {/* PASSO A PASSO */}
          {metodo.passos && Array.isArray(metodo.passos) && metodo.passos.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Passo a passo
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {metodo.passos.map((passo: any, i: number) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr',
                    borderBottom: i < metodo.passos.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    padding: '20px 0',
                  }}>
                    <div style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, letterSpacing: '-1px', paddingTop: '2px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      {passo.titulo && (
                        <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{passo.titulo}</div>
                      )}
                      <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{passo.texto || passo.descricao || (typeof passo === 'string' ? passo : '')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VARIAÇÕES */}
          {metodo.variacoes && Array.isArray(metodo.variacoes) && metodo.variacoes.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              {metodo.variacoes.map((v: any, i: number) => (
                <div key={i} style={{ background: 'var(--gray-100)', padding: '24px', marginTop: i === 0 ? '0' : '16px' }}>
                  {v.titulo && <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{v.titulo}</div>}
                  <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{v.texto || v}</div>
                </div>
              ))}
            </div>
          )}

          {/* NOTAS */}
          {metodo.notas && Array.isArray(metodo.notas) && metodo.notas.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Notas do método
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {metodo.notas.map((nota: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', color: 'var(--gray-400)', flexShrink: 0, paddingTop: '1px' }}>→</span>
                    <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6 }}>{nota}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTAS PESSOAIS */}
          <div style={{ marginTop: '32px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Minhas notas de aplicação
              <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
            </div>
            <div style={{ border: '1px dashed var(--gray-200)', padding: '24px' }}>
              {metodo.notas_pessoais ? (
                <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}>{metodo.notas_pessoais}</div>
              ) : (
                <>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '12px' }}>Antonio Farias · FAU USP</div>
                  <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-200)', fontStyle: 'italic' }}>Nenhuma nota ainda. As notas serão adicionadas após a aplicação do método em campo.</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ padding: 'clamp(24px,3vw,40px) clamp(16px,3vw,32px)' }}>

          {metodo.materiais && Array.isArray(metodo.materiais) && metodo.materiais.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Materiais
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {metodo.materiais.map((m: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', color: 'var(--gray-400)', flexShrink: 0, paddingTop: '1px' }}>—</span>
                    <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metodo.gera_artefato && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Artefatos gerados
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <Link href={`/artefatos?tipo=${metodo.gera_artefato}`} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', border: '1px solid var(--gray-200)',
                  textDecoration: 'none', color: 'var(--black)',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ARTEFATO_CORES[metodo.gera_artefato] || cor, flexShrink: 0 }}></div>
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>{metodo.gera_artefato.replace(/_/g, ' ')}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                </Link>
              </div>
            </div>
          )}

          {metodo.relacionados && metodo.relacionados.length > 0 && (
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Métodos relacionados
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {metodo.relacionados.map((rel: any, i: number) => (
                  <Link key={i} href={`/metodos/${rel.slug}`} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', border: '1px solid var(--gray-200)',
                    textDecoration: 'none', color: 'var(--black)',
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{rel.nome}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
